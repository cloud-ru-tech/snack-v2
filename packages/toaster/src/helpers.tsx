import { isBrowser } from '@ds/utils';
import { ReactElement } from 'react';
import { createRoot, Root } from 'react-dom/client';

import { ToasterContainer } from './components/Toaster';
import toasterStyles from './components/Toaster/styles.module.scss';
import { ToastSystemEvent, ToastSystemEventProps } from './components/ToastSystemEvent';
import { ToastUpload, ToastUploadProps } from './components/ToastUpload';
import { ToastUserAction, ToastUserActionProps } from './components/ToastUserAction';
import {
  AUTO_CLOSE_TIME,
  TOASTER_CONTAINER_DEFAULTS,
  TOASTER_CONTAINER_PREFIX,
  TOASTER_ROOT_ID,
  TOASTER_TYPE,
} from './constants';
import { toasterManager } from './manager';
import {
  OpenToast,
  SystemEventOptions,
  Toaster,
  ToasterContainerProps,
  ToasterId,
  ToasterPropsMap,
  ToasterType,
  ToastOptions,
  UpdateToast,
  UploadOptions,
  UserActionOptions,
  WithLayoutType,
} from './types';

// WeakMap-кэш Root по host'у. Без явного unmount Root удерживает React-tree
// после detach'а host'а — поэтому при cache-hit на disconnected host'е сначала
// unmount, потом создаём заново.
const rootCache = new WeakMap<Element, Root>();

function getOrCreateRoot(host: Element): Root {
  const cached = rootCache.get(host);
  if (cached) {
    if (host.isConnected) return cached;
    // Unmount асинхронно: getOrCreateRoot вызывается из openToast, который
    // может стрелять из render-фазы потребителя; синхронный unmount тогда
    // ругается warning'ом "calling ReactDOMClient.unmount() during a render".
    queueMicrotask(() => cached.unmount());
    rootCache.delete(host);
  }
  const root = createRoot(host);
  rootCache.set(host, root);
  return root;
}

// Upload делит дефолтный контейнер с SystemEvent (общие кнопки Expand/Close all,
// Figma 26297:48316). Явный containerId этот mapping не использует.
function defaultContainerType(type: ToasterType): ToasterType {
  return type === TOASTER_TYPE.Upload ? TOASTER_TYPE.SystemEvent : type;
}

function getToasterRoot({
  type,
  toasterParent,
  containerProps,
}: {
  type: ToasterType;
  toasterParent?: HTMLElement;
  containerProps?: ToasterContainerProps;
}) {
  const fallbackType = defaultContainerType(type);
  const containerId = containerProps?.containerId || `${TOASTER_CONTAINER_PREFIX}${fallbackType}`;

  const toasterContainerProps = {
    ...TOASTER_CONTAINER_DEFAULTS[fallbackType],
    ...(containerProps || {}),
    type: fallbackType,
    containerId,
  } as ToasterContainerProps;

  const toasterRootId = `${TOASTER_ROOT_ID}__${fallbackType}`;

  // CSS.escape: id может прийти из user-input через containerProps.
  let rootInDOM = toasterParent && isBrowser() ? toasterParent.querySelector(`#${CSS.escape(toasterRootId)}`) : null;

  // Must be called outside React render: appends a DOM node synchronously.
  if (!rootInDOM && toasterParent && isBrowser()) {
    rootInDOM = document.createElement('div');
    rootInDOM.id = toasterRootId;
    // `container-type: size` делает этот узел containing block для fixed-child'ов
    // и резолвит 100cqh/cqw относительно него.
    rootInDOM.className = toasterStyles.toasterRoot ?? '';
    rootInDOM.setAttribute('data-toaster-root', '');
    toasterParent.appendChild(rootInDOM);
  }

  return {
    toasterRoot: rootInDOM,
    toasterContainerProps,
  };
}

function hasOwnAutoClose(o: object): o is { autoClose?: number | false } {
  return Object.prototype.hasOwnProperty.call(o, 'autoClose');
}

function resolveAutoClose<T extends keyof ToasterPropsMap>({
  type,
  toasterProps,
  toastOptions,
  containerId,
}: {
  type: T;
  toasterProps?: ToasterPropsMap[T];
  toastOptions?: ToastOptions;
  containerId?: string;
}): number | false {
  if (toasterProps && 'loading' in toasterProps && toasterProps.loading) return false;
  // Каскад: per-toast options → container-level default → AUTO_CLOSE_TIME[type].
  if (toastOptions && hasOwnAutoClose(toastOptions)) {
    return toastOptions.autoClose ?? false;
  }
  // Upload закрывается только пользователем (per-toast autoClose уже выше).
  if (type === TOASTER_TYPE.Upload) {
    return false;
  }
  if (containerId) {
    const containerDefaults = toasterManager.getContainerDefaults(containerId);
    if (hasOwnAutoClose(containerDefaults)) {
      return containerDefaults.autoClose ?? false;
    }
  }
  return AUTO_CLOSE_TIME[type];
}

function renderToastContent<T extends keyof ToasterPropsMap>(
  type: T,
  toasterProps: ToasterPropsMap[T],
  autoClose: number | false,
): ReactElement {
  switch (type) {
    case TOASTER_TYPE.UserAction:
      return <ToastUserAction {...(toasterProps as ToastUserActionProps)} />;
    case TOASTER_TYPE.SystemEvent:
      return <ToastSystemEvent {...(toasterProps as ToastSystemEventProps)} autoClose={autoClose} />;
    case TOASTER_TYPE.Upload:
      return <ToastUpload {...(toasterProps as ToastUploadProps)} />;
    default: {
      const exhaustive: never = type;
      return exhaustive;
    }
  }
}

export const openToast: OpenToast = ({
  type,
  toasterProps,
  containerProps,
  toastOptions,
  toasterParent = isBrowser() ? document.body : undefined,
}) => {
  const { toasterRoot, toasterContainerProps } = getToasterRoot({ type, toasterParent, containerProps });
  const containerId = toasterContainerProps.containerId as string;

  const autoClose = resolveAutoClose({ type, toasterProps, toastOptions, containerId });
  const content = renderToastContent(type, toasterProps as ToasterPropsMap[typeof type], autoClose);

  // SSR: toasterRoot is null and we have no React tree to render into — skip
  // root.render. Manager still records the toast, but nothing will subscribe
  // until a container mounts on the client.
  const escapedId = isBrowser() ? CSS.escape(containerId) : containerId;
  const externalContainerExists =
    isBrowser() && Boolean(document.querySelector(`[data-test-id="toaster-container"][id="${escapedId}"]`));

  if (toasterRoot && !externalContainerExists) {
    const root = getOrCreateRoot(toasterRoot);
    root.render(<ToasterContainer {...toasterContainerProps} />);
  }
  const id = toasterManager.open({
    id: toastOptions?.id,
    toastType: type,
    content,
    containerId,
    autoClose,
    onClose: closedId => toastOptions?.onClose?.(closedId),
  });
  return Promise.resolve(id);
};

export const updateToast: UpdateToast = (id, { type, toasterProps, toastOptions, containerId }) => {
  // Должен совпадать с тем, что использовался при open() — иначе manager.update тихо no-op.
  const resolvedContainerId = containerId ?? `${TOASTER_CONTAINER_PREFIX}${defaultContainerType(type)}`;
  const autoClose = resolveAutoClose({ type, toasterProps, toastOptions, containerId: resolvedContainerId });
  const content = renderToastContent(type, toasterProps, autoClose);

  toasterManager.update(id, resolvedContainerId, {
    content,
    autoClose,
    onClose: toastOptions?.onClose ? (closedId: ToasterId) => toastOptions.onClose?.(closedId) : undefined,
  });
};

export const isToastActive = (id: ToasterId, containerId?: string): boolean => toasterManager.isActive(id, containerId);

// Splits routing/toastOptions from public Options-типов; шорткаты используют
// результат, чтобы не повторять одну и ту же распаковку.
function splitOptions(type: ToasterType, options: UserActionOptions | SystemEventOptions | UploadOptions) {
  const { id, onClose, autoClose, containerId, ...toasterProps } = options as Record<string, unknown> & {
    id?: ToasterId;
    onClose?: ToastOptions['onClose'];
    autoClose?: ToastOptions['autoClose'];
    containerId?: string;
  };
  return {
    toasterProps,
    toastOptions: { id, onClose, ...(autoClose !== undefined ? { autoClose } : {}) },
    containerProps: containerId ? ({ type, containerId } as ToasterContainerProps) : undefined,
  };
}

type AppearanceOf<T extends keyof ToasterPropsMap> = ToasterPropsMap[T] extends { appearance?: infer A } ? A : never;

function makeOpenShortcut<T extends keyof ToasterPropsMap>(type: T, appearance: AppearanceOf<T>) {
  return (options: UserActionOptions | SystemEventOptions | UploadOptions) => {
    const { toasterProps, toastOptions, containerProps } = splitOptions(type, options);
    return openToast({
      type,
      toasterProps: { ...toasterProps, appearance } as unknown as ToasterPropsMap[T],
      toastOptions,
      containerProps,
    });
  };
}

function makeUpdateShortcut<T extends keyof ToasterPropsMap>(type: T, appearance: AppearanceOf<T>) {
  return (id: ToasterId, options: UserActionOptions | SystemEventOptions | UploadOptions) => {
    const { toasterProps, toastOptions, containerProps } = splitOptions(type, options);
    updateToast(id, {
      type,
      toasterProps: { ...toasterProps, appearance } as unknown as ToasterPropsMap[T],
      toastOptions,
      containerId: containerProps?.containerId,
    });
  };
}

function dismissImpl(idOrOptions?: ToasterId | { containerId?: string }): void {
  if (idOrOptions === undefined) {
    toasterManager.dismissAll();
    return;
  }
  if (typeof idOrOptions === 'object') {
    toasterManager.dismissAll(idOrOptions.containerId);
    return;
  }
  toasterManager.dismiss(idOrOptions);
}

export const dismissToast = (params?: ToasterId | { containerId?: string }) => dismissImpl(params);

const userAction: Toaster['userAction'] = {
  success: makeOpenShortcut(TOASTER_TYPE.UserAction, 'success'),
  neutral: makeOpenShortcut(TOASTER_TYPE.UserAction, 'neutral'),
  error: makeOpenShortcut(TOASTER_TYPE.UserAction, 'error'),
  warning: makeOpenShortcut(TOASTER_TYPE.UserAction, 'warning'),
  update: {
    success: makeUpdateShortcut(TOASTER_TYPE.UserAction, 'success'),
    neutral: makeUpdateShortcut(TOASTER_TYPE.UserAction, 'neutral'),
    warning: makeUpdateShortcut(TOASTER_TYPE.UserAction, 'warning'),
    error: makeUpdateShortcut(TOASTER_TYPE.UserAction, 'error'),
  },
  dismiss: dismissImpl,
};

const systemEvent: Toaster['systemEvent'] = {
  success: makeOpenShortcut(TOASTER_TYPE.SystemEvent, 'success'),
  neutral: makeOpenShortcut(TOASTER_TYPE.SystemEvent, 'neutral'),
  warning: makeOpenShortcut(TOASTER_TYPE.SystemEvent, 'warning'),
  error: makeOpenShortcut(TOASTER_TYPE.SystemEvent, 'error'),
  errorCritical: makeOpenShortcut(TOASTER_TYPE.SystemEvent, 'errorCritical'),
  update: {
    success: makeUpdateShortcut(TOASTER_TYPE.SystemEvent, 'success'),
    neutral: makeUpdateShortcut(TOASTER_TYPE.SystemEvent, 'neutral'),
    warning: makeUpdateShortcut(TOASTER_TYPE.SystemEvent, 'warning'),
    error: makeUpdateShortcut(TOASTER_TYPE.SystemEvent, 'error'),
    errorCritical: makeUpdateShortcut(TOASTER_TYPE.SystemEvent, 'errorCritical'),
  },
  dismiss: dismissImpl,
};

const upload: Toaster['upload'] = {
  startOrUpdate(options: UploadOptions) {
    const { toasterProps, toastOptions, containerProps } = splitOptions(TOASTER_TYPE.Upload, options);
    const uploadProps = toasterProps as unknown as ToasterPropsMap[typeof TOASTER_TYPE.Upload];
    const toastId = options.id || TOASTER_TYPE.Upload;
    if (isToastActive(toastId)) {
      return updateToast(toastId, {
        type: TOASTER_TYPE.Upload,
        toasterProps: uploadProps,
        containerId: containerProps?.containerId,
      });
    }
    return openToast({
      type: TOASTER_TYPE.Upload,
      toasterProps: uploadProps,
      toastOptions: { ...toastOptions, id: toastId },
      containerProps,
    });
  },
  dismiss: dismissImpl,
};

export const toaster: Toaster = {
  userAction,
  systemEvent,
  upload,
};

// Adaptive API kept for drop-in shape. Layout has no effect on behavior:
// потребитель сам выбирает stacked/position через `<ToasterContainer/>`.
/* eslint-disable @typescript-eslint/no-unused-vars */
export const adaptiveToaster = (_layout: WithLayoutType): Toaster => toaster;
export const adaptiveOpenToast = (_layout: WithLayoutType): OpenToast => openToast;
export const adaptiveUpdateToast = (_layout: WithLayoutType): UpdateToast => updateToast;
export const adaptiveDismissToast = (_layout: WithLayoutType): typeof dismissToast => dismissToast;
/* eslint-enable @typescript-eslint/no-unused-vars */

import { ValueOf } from '@ds/utils';

import { ToastSystemEventProps } from './components/ToastSystemEvent/types';
import { ToastUploadProps } from './components/ToastUpload/types';
import { ToastUserActionProps } from './components/ToastUserAction/types';
import {
  DRAGGABLE_DIRECTION,
  POSITION_SYSTEM_EVENT,
  POSITION_USER_ACTION,
  TOASTER_TYPE,
  TOASTER_WIDTH,
} from './constants';
import { ToasterId as ManagedToasterId } from './manager/types';

export type ToasterId = ManagedToasterId;
export type PromisedId = Promise<ToasterId>;
export type ToasterType = ValueOf<typeof TOASTER_TYPE>;
export type SystemEventPosition = ValueOf<typeof POSITION_SYSTEM_EVENT>;
export type UserActionPosition = ValueOf<typeof POSITION_USER_ACTION>;
export type ToasterPosition = SystemEventPosition | UserActionPosition;
export type ToasterWidth = ValueOf<typeof TOASTER_WIDTH>;
export type DraggableDirection = ValueOf<typeof DRAGGABLE_DIRECTION>;

export type ToastOptions = {
  id?: ToasterId;
  autoClose?: number | false;
  onClose?(id?: ToasterId): void;
  /**
   * Маршрутизация на контейнер. Если не задан — резолвится дефолт
   * `toaster-container__<type>` (см. `TOASTER_CONTAINER_PREFIX`). В `openToast`
   * совпадает с `containerProps.containerId`, в `updateToast` — единственное
   * место, где роутинг указывается потребителем.
   */
  containerId?: string;
};

type CommonToasterContainerProps = {
  /**
   * Идентификатор контейнера — ключ маршрутизации тостов. Вызов
   * `toaster.<type>.open({ containerId })` находит контейнер по этому id и
   * рендерит тост в нём. Если не задан — используется дефолт
   * `toaster-container__<type>` (см. `TOASTER_CONTAINER_PREFIX`), общий для
   * всех контейнеров одного `type`. Задавай явный id, когда на странице
   * несколько контейнеров одного типа и нужно адресовать конкретный.
   */
  containerId?: string;
  /** Максимум одновременно видимых тостов в контейнере. По умолчанию — из TOASTER_CONTAINER_DEFAULTS[type]. */
  limit?: number;
  /**
   * Дефолтное время автозакрытия (мс) для всех тостов этого контейнера. Используется,
   * если в `toastOptions.autoClose` явно не передано значение. Передать `false` —
   * автозакрытие отключено по умолчанию. Если проп не задан — берётся `AUTO_CLOSE_TIME[type]`.
   */
  autoClose?: number | false;
  stacked?: boolean;
  draggable?: boolean;
  draggableDirection?: DraggableDirection;
  /**
   * Override `data-test-id` корня контейнера. Если не задан — используется
   * `TEST_IDS.toasterContainer`. Имеет смысл, если на странице несколько
   * контейнеров одного типа и e2e-тестам нужно адресовать конкретный.
   */
  'data-test-id'?: string;
};

export type SystemEventToasterContainerProps = CommonToasterContainerProps & {
  type: typeof TOASTER_TYPE.SystemEvent;
  position?: SystemEventPosition;
  displayCloseAllButton?: boolean;
  width?: ToasterWidth;
};

export type UserActionToasterContainerProps = CommonToasterContainerProps & {
  type: typeof TOASTER_TYPE.UserAction;
  position?: UserActionPosition;
  displayCloseAllButton?: boolean;
  width?: ToasterWidth;
};

export type UploadToasterContainerProps = CommonToasterContainerProps & {
  type: typeof TOASTER_TYPE.Upload;
  position?: SystemEventPosition;
  displayCloseAllButton?: boolean;
  width?: ToasterWidth;
};

export type ToasterContainerProps =
  | SystemEventToasterContainerProps
  | UserActionToasterContainerProps
  | UploadToasterContainerProps;

export type ToasterContainerDefaults = Required<
  Pick<
    SystemEventToasterContainerProps | UserActionToasterContainerProps | UploadToasterContainerProps,
    'type' | 'position' | 'limit' | 'displayCloseAllButton' | 'width'
  >
>;

export type ToasterPropsMap = {
  [TOASTER_TYPE.UserAction]: ToastUserActionProps;
  [TOASTER_TYPE.SystemEvent]: ToastSystemEventProps;
  [TOASTER_TYPE.Upload]: ToastUploadProps & { loading?: boolean };
};

type OpenNotificationProps<T extends keyof ToasterPropsMap> = {
  type: T;
  toasterProps?: ToasterPropsMap[T];
  containerProps?: ToasterContainerProps;
  toastOptions?: ToastOptions;
  toasterParent?: HTMLElement;
};

type DefaultToasterProps<T extends keyof ToasterPropsMap> = {
  toasterProps: ToasterPropsMap[T];
};

export type OpenToast = <T extends keyof ToasterPropsMap>(
  props: DefaultToasterProps<T> & OpenNotificationProps<T>,
) => PromisedId;

export type UpdateToast = <T extends keyof ToasterPropsMap>(
  id: ToasterId,
  props: {
    type: T;
    toasterProps: ToasterPropsMap[T];
    /** Per-toast options. Маршрутизация (`containerId`) живёт здесь же, в едином месте c `openToast`. */
    toastOptions?: ToastOptions;
  },
) => void;

type RoutingOptions = {
  /** Маршрутизировать тост в контейнер с этим id. По умолчанию используется
   * дефолтный containerId для типа (`toaster-container__<type>`). */
  containerId?: string;
};

export type UserActionOptions = Omit<ToastUserActionProps, 'appearance'> &
  Pick<ToastOptions, 'id' | 'onClose' | 'autoClose'> &
  RoutingOptions;
export type SystemEventOptions = Omit<ToastSystemEventProps, 'appearance'> &
  Pick<ToastOptions, 'id' | 'onClose' | 'autoClose'> &
  RoutingOptions;
export type UploadOptions = ToastUploadProps & Pick<ToastOptions, 'id' | 'onClose' | 'autoClose'> & RoutingOptions;

export type Toaster = {
  userAction: {
    success(options: UserActionOptions): PromisedId;
    neutral(options: UserActionOptions): PromisedId;
    warning(options: UserActionOptions): PromisedId;
    error(options: UserActionOptions): PromisedId;
    update: {
      success(id: ToasterId, options: UserActionOptions): void;
      neutral(id: ToasterId, options: UserActionOptions): void;
      warning(id: ToasterId, options: UserActionOptions): void;
      error(id: ToasterId, options: UserActionOptions): void;
    };
    /**
     * `dismiss()` — закрывает все тосты этого типа во всех контейнерах.
     * `dismiss(id)` — конкретный тост по id.
     * `dismiss({ containerId })` — все тосты в указанном контейнере.
     */
    dismiss(idOrOptions?: ToasterId | { containerId?: string }): void;
  };
  systemEvent: {
    success(options: SystemEventOptions): PromisedId;
    neutral(options: SystemEventOptions): PromisedId;
    warning(options: SystemEventOptions): PromisedId;
    error(options: SystemEventOptions): PromisedId;
    errorCritical(options: SystemEventOptions): PromisedId;
    update: {
      success(id: ToasterId, options: SystemEventOptions): void;
      neutral(id: ToasterId, options: SystemEventOptions): void;
      warning(id: ToasterId, options: SystemEventOptions): void;
      error(id: ToasterId, options: SystemEventOptions): void;
      errorCritical(id: ToasterId, options: SystemEventOptions): void;
    };
    /**
     * `dismiss()` — закрывает все тосты этого типа во всех контейнерах.
     * `dismiss(id)` — конкретный тост по id.
     * `dismiss({ containerId })` — все тосты в указанном контейнере.
     */
    dismiss(idOrOptions?: ToasterId | { containerId?: string }): void;
  };
  upload: {
    startOrUpdate(options: UploadOptions): PromisedId | void;
    /**
     * `dismiss()` — закрывает все тосты этого типа во всех контейнерах.
     * `dismiss(id)` — конкретный тост по id.
     * `dismiss({ containerId })` — все тосты в указанном контейнере.
     */
    dismiss(idOrOptions?: ToasterId | { containerId?: string }): void;
  };
};

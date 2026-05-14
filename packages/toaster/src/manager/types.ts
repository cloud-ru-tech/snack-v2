import { ReactNode } from 'react';

export type ToasterId = string | number;

// Duplicates ValueOf<typeof TOASTER_TYPE>; not imported to keep manager/ leaf
// (constants.ts depends on src/types.ts, which would loop back through here).
export type ManagedToastType = 'system-event' | 'user-action' | 'upload';

// Контракт, инжектируемый менеджером в карточку при рендере; читается из
// `ToastSystemEvent` / `ToastUserAction` / `ToastUpload`.
export type ToastContentProps = {
  closeToast?: () => void;
  toastProps?: { autoClose?: number | false };
};

export type ManagedToastStatus = 'entering' | 'visible' | 'leaving';

/**
 * Immutable snapshot, видимый подписчикам. Mutable timer-state (runningAt/elapsedMs)
 * вынесен в приватный `timers`-Map менеджера и доступен только через
 * `getTimerSnapshot()` — это гарантирует, что подписчики не видят in-place мутаций.
 */
export type ManagedToast = {
  id: ToasterId;
  // Тип карточки. Контейнер использует для split-rendering'а (Upload-блок
  // отдельно от SystemEvent-стека) и для scope'а Close-all / Expand-кнопок.
  toastType: ManagedToastType;
  content: ReactNode;
  // Дублирует ключ контейнера для удобства потребителей (renderStackToasts и т.п.).
  containerId: string;
  autoClose: number | false;
  onClose?: (id: ToasterId) => void;
  status: ManagedToastStatus;
};

export type ManagerListener = (toasts: ManagedToast[]) => void;

export type OpenToastInput = {
  id?: ToasterId;
  toastType: ManagedToastType;
  content: ReactNode;
  containerId: string;
  autoClose?: number | false;
  onClose?: (id: ToasterId) => void;
};

export type UpdateToastInput = {
  content?: ReactNode;
  autoClose?: number | false;
  onClose?: (id: ToasterId) => void;
};

export type ContainerId = string;

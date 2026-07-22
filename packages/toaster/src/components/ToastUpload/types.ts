import { LinkProps } from '@ds/link';
import { ValueOf, WithSupportProps } from '@ds/utils';
import { MouseEvent } from 'react';

import { ToastContentProps } from '../../manager/types';
import { TOAST_UPLOAD_ITEM_STATUS, TOAST_UPLOAD_STATUS } from './constants';

export type ToastUploadStatus = ValueOf<typeof TOAST_UPLOAD_STATUS>;

export type ToastUploadItemStatus = ValueOf<typeof TOAST_UPLOAD_ITEM_STATUS>;

export type ToastUploadStateSubscription<T> = (subscription: (newValue: T) => void) => () => void;
export type WithStateSubscription<T> = {
  /**
   * Позволяет подписываться на изменения процесса загрузки файла внутри компонента
   * — обновляет элемент независимо от всего списка (повышение производительности при частых обновлениях).
   */
  subscribeToState?: ToastUploadStateSubscription<Partial<T>>;
} & T;

export type ToastUploadItemLink = Pick<LinkProps, 'target' | 'href' | 'onClick' | 'label'>;

export type UploadActions = {
  onCancel?: () => void;
  onPause?: () => void;
  onRetry?: () => void;
  onContinue?: () => void;
};

export type UploadItem = WithStateSubscription<{
  /** Уникальный id элемента */
  id?: string;
  /** Название элемента */
  title: string;
  /** Статус загрузки */
  status: ToastUploadItemStatus;
  /** Описание статуса загрузки */
  statusLabel: string;
  /** Процент прогресса */
  progress: number;
  /** Отображаемый размер файла */
  formattedSize: string;
  /** Экшены управления загрузкой */
  actions?: UploadActions;
  /** Ссылка на загруженный файл */
  link?: ToastUploadItemLink;
}>;

export type ToastUploadProps = ToastContentProps &
  WithSupportProps<{
    /** Общий статус загрузки */
    status: ToastUploadStatus;
    /** Заголовок тостера */
    title?: string;
    /** Описание статуса загрузки */
    description: string;
    /** Общий прогресс загрузки */
    progress: {
      current: number;
      total: number;
    };
    /** Закрыть тостер */
    onCloseClick?(e: MouseEvent<HTMLButtonElement>, close?: () => void): void;
    /** Показывать кнопку закрытия тостера. По умолчанию `true`. */
    closable?: boolean;
    /** CSS-класс контейнера */
    className?: string;
    /** Загружаемые элементы */
    files: UploadItem[];
    /** Тостер свернут/развернут */
    collapsed?: boolean;
    /** Развернуть/свернуть тостер */
    onCollapsed?: (collapsed: boolean) => void;
    /** Экшены для управления общей загрузкой */
    generalActions?: Omit<UploadActions, 'onCancel'>;
    /** Колбэк кнопки отмены всей загрузки. Кнопка рендерится только при наличии колбэка; подпись — из `@ds/locale` (`ToastUpload.cancelAll`). */
    onCancelAll?: (e: MouseEvent<HTMLButtonElement>) => void;
  }>;

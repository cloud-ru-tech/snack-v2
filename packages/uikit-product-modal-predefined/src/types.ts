import { ButtonProps } from '@ds/button';
import { ModalCustomProps } from '@ds/modal';
import { ValueOf, WithSupportProps } from '@ds/utils';
import { ReactNode } from 'react';

import { CONFIRM_TEXT_VARIANT, CONTENT_STATE } from './constants';

export type ReleaseNotesContentState = ValueOf<typeof CONTENT_STATE>;

export type ConfirmTextVariant = ValueOf<typeof CONFIRM_TEXT_VARIANT>;

export type NoteItemProps = {
  /** Заголовок новости */
  title: string;
  /** Описание новости в markdown */
  description: string;
  /** Иллюстрация */
  image: {
    src: string;
    alt: string;
  };
  /** Видео вместо статичной иллюстрации */
  video?: string;
};

type BaseActionModalProps = Pick<ModalCustomProps, 'open' | 'onClose' | 'mode' | 'closeOnPopstate'> & {
  /** Подсказка рядом с заголовком */
  titleTooltip?: ReactNode;
  /** Текст, который нужно ввести для подтверждения. Если передан — модалка показывает поле подтверждения */
  confirmText?: string;
  /** Скрыть кнопку копирования текста подтверждения */
  hideConfirmCopyButton?: boolean;
  /** Основной текст модалки */
  content?: ReactNode;
  /** Подзаголовок */
  subtitle?: ReactNode;
};

export type DeleteModalProps = WithSupportProps<
  BaseActionModalProps & {
    /** Тип удаляемого объекта, отображается в заголовке */
    objectType?: string;
    /** Колбэк подтверждения удаления */
    onDelete(onClose: () => void): void;
    /** Состояние загрузки кнопки удаления */
    deleting?: boolean;
    /** Тип текста подтверждения */
    confirmTextVariant?: ConfirmTextVariant;
  }
>;

export type RecallModalProps = WithSupportProps<
  BaseActionModalProps & {
    /** Колбэк подтверждения отзыва */
    onRecall(onClose: () => void): void;
    /** Состояние загрузки кнопки отзыва */
    loading?: boolean;
  }
>;

export type ReleaseNotesProps = WithSupportProps<
  Pick<ModalCustomProps, 'open' | 'onClose' | 'closeOnPopstate'> & {
    /** Визуальное состояние контента по Figma */
    contentState?: ReleaseNotesContentState;
    /** Массив новостей */
    items: NoteItemProps[];
    /** Состояние загрузки контента */
    loading?: boolean;
    /** Действие "Ознакомиться позже" */
    onReadLaterClick?(): void;
    /** Действие перезагрузки на экране ошибки */
    onDataErrorRetryClick?(): void;
    /** Действие при смене слайда */
    onSlideChange?(slide: number): void;
    /** Только mobile: дополнительные пропсы action-кнопки "Ознакомиться позже" (на desktop игнорируется). */
    readLaterButtonProps?: Partial<ButtonProps>;
  }
>;

import { ValueOf, WithSupportProps } from '@ds/utils';
import { ComponentPropsWithoutRef, ElementType, MouseEvent } from 'react';

import { ToastContentProps } from '../../manager/types';
import { TOAST_USER_ACTION_APPEARANCE } from './constants';

export type ToastUserActionAppearance = ValueOf<typeof TOAST_USER_ACTION_APPEARANCE>;

/**
 * Action-слот: по умолчанию `<button>`. Через `as` можно отрендерить как `<a>` —
 * тогда становится валидной ссылкой (потребуется `href`). Intrinsic-атрибуты
 * выбранного элемента (`href`, `target`, `rel`, `to` для роутер-Link и т.п.)
 * типобезопасно пробрасываются через `Omit<ComponentPropsWithoutRef<As>, ...>`.
 */
export type ToastUserActionAction<As extends ElementType = 'button'> = {
  /** Текст action-кнопки */
  label: string;
  /** Обработчик клика */
  onClick?(e: MouseEvent<HTMLElement>): void;
  /** Polymorphic элемент. Дефолт — `'button'`. */
  as?: As;
} & Omit<ComponentPropsWithoutRef<As>, 'label' | 'onClick' | 'as'>;

export type ToastUserActionProps = ToastContentProps &
  WithSupportProps<{
    /** Текст-уведомление */
    label: string;
    /** Цветовая схема (status в Figma) */
    appearance?: ToastUserActionAppearance;
    /** Slot для action-кнопки (по умолчанию `<button>`, через `as='a'` — линка) */
    action?: ToastUserActionAction;
    /** Доп. класс корневого элемента */
    className?: string;
    /** Loading-состояние с заменой иконки на Sun-спиннер */
    loading?: boolean;
    /**
     * Показывать ли таймер обратного отсчёта (24×24 SVG-кольцо).
     * Анимация = `AUTO_CLOSE_TIME[UserAction]`. Пауза при hover.
     * Figma axis: `timer=true|false`.
     */
    timer?: boolean;
  }>;

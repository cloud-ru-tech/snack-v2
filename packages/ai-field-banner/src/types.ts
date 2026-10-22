import { LayoutPresets } from '@ds/adaptive';
import { WithSupportProps } from '@ds/utils';
import { ComponentPropsWithoutRef, MouseEvent, ReactNode } from 'react';

import { SIZE, VARIANT } from './constants';

export type Variant = (typeof VARIANT)[keyof typeof VARIANT];
export type Size = (typeof SIZE)[keyof typeof SIZE];

export type AiFieldBannerOwnProps = {
  /** Семантический вариант баннера (ось `Variant` в Figma). По умолчанию `information`. */
  variant?: Variant;
  /**
   * Размер на desktop: `s` — Field Banner, `m` — Field Banner Mobile. Высота по содержимому: при одной строке `s` 40, `m` 48.
   * На mobile размер задаёт пресет `AI_FIELD_BANNER_LAYOUT_PRESETS` (`m`); изменить его — через `layoutPresets`.
   */
  size?: Size;
  /** Текст или контент основной строки. Не рендерится, если не задан. */
  content?: ReactNode;
  /** Дополнительный слот под основной строкой. Не рендерится, если не задан. */
  bottomContent?: ReactNode;
  /** Иконка слева от текста */
  icon?: ReactNode;
  /** Подпись кнопки действия справа. Кнопка не рендерится, если не задана. */
  actionLabel?: string;
  /** Обработчик клика по кнопке действия. */
  onActionClick?(event: MouseEvent<HTMLButtonElement>): void;
  /** Нажатие на крестик. Крестик показывается, только если обработчик передан; убрать баннер решает потребитель. */
  onClose?(event: MouseEvent<HTMLButtonElement>): void;
  /**
   * Override mobile-дефолтов адаптива для этого инстанса (deep-merge поверх `AI_FIELD_BANNER_LAYOUT_PRESETS`).
   * Escape-hatch: обычно не нужен — DS-пресет применяется автоматически по `AdaptiveProvider`.
   */
  layoutPresets?: LayoutPresets<AiFieldBannerLayoutDefaults>;
  /** Доп. класс корня. */
  className?: string;
};

/** Пропы баннера, дефолты которых меняет адаптив (preset-класс). */
export type AiFieldBannerLayoutDefaults = Pick<AiFieldBannerOwnProps, 'size'>;

export type AiFieldBannerProps = WithSupportProps<
  AiFieldBannerOwnProps & Omit<ComponentPropsWithoutRef<'div'>, keyof AiFieldBannerOwnProps | 'children'>
>;

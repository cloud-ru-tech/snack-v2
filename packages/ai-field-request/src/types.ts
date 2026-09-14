import { ValueOf, WithSupportProps } from '@ds/utils';
import { ComponentPropsWithoutRef, MouseEvent, ReactNode } from 'react';

import { APPEARANCE } from './constants';

export type Appearance = ValueOf<typeof APPEARANCE>;

export type AiFieldRequestAction = {
  /** Подпись кнопки. */
  label: string;
  /** Клик по кнопке. */
  onClick?(event: MouseEvent<HTMLButtonElement>): void;
};

export type AiFieldRequestPrimaryAction = AiFieldRequestAction & {
  /**
   * Состояние отправки: индикатор на основной кнопке, вторичная кнопка недоступна.
   * Раскрытие содержимого остаётся доступным.
   */
  loading?: boolean;
};

export type AiFieldRequestOwnProps = {
  /** Заголовок панели. Максимум две строки с обрезкой. Обязательный пропс. */
  title: ReactNode;
  /** Слот тела панели (текст, форма, опросник). */
  content?: ReactNode;
  /** Подпись под карточкой. Не рендерится, если не задана. */
  hint?: ReactNode;
  /** Цвет основной кнопки: `primary` или `destructive`. По умолчанию `primary`. */
  appearance?: Appearance;
  /** Controlled — раскрыто содержимое. Без `open` компонент uncontrolled, стартует свёрнутым. */
  open?: boolean;
  /** Колбэк смены раскрытия. */
  onOpenChange?(open: boolean): void;
  /**
   * Максимальная высота свёрнутого содержимого в px. По умолчанию `88`.
   * Слот принимает любой ReactNode, поэтому предел задаётся высотой, а не числом строк.
   * Для строкового `content` высота округляется вниз до целого числа строк, чтобы не резать глифы;
   * для любого другого содержимого это обычный предел по высоте.
   */
  maxHeight?: number;
  /** Основная кнопка действий: подпись, клик и состояние отправки. Обязательный пропс. */
  primaryAction: AiFieldRequestPrimaryAction;
  /** Вторичная кнопка действий: подпись и клик. Обязательный пропс. */
  secondaryAction: AiFieldRequestAction;
  /** Доп. класс корня. */
  className?: string;
};

export type AiFieldRequestProps = WithSupportProps<
  AiFieldRequestOwnProps & Omit<ComponentPropsWithoutRef<'div'>, keyof AiFieldRequestOwnProps | 'children' | 'title'>
>;

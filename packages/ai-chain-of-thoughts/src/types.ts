import { WithSupportProps } from '@ds/utils';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

export type AiChainOfThoughtsOwnProps = {
  /**
   * Идёт ли рассуждение прямо сейчас. `true` — иконка GigaChat и подпись
   * «Размышляю»; `false` — без иконки и «Размышлял». По умолчанию `true`.
   */
  inProgress?: boolean;
  /**
   * Поток рассуждения прерван. Заголовок показывает сообщение `brokenMessage`,
   * контент-цепочка не раскрывается. По умолчанию `false`.
   */
  broken?: boolean;
  /**
   * Длительность рассуждения в секундах. Форматируется в д/ч/м/с. Скрыта в
   * состоянии `broken`.
   */
  duration?: number;
  /** Подпись заголовка. По умолчанию «Размышляю» / «Размышлял» — по `inProgress`. */
  label?: ReactNode;
  /** Текст сообщения о прерванном потоке (показывается при `broken`). */
  brokenMessage?: ReactNode;
  /** Раскрытое состояние (controlled). Для uncontrolled-режима — `defaultOpen`. */
  open?: boolean;
  /** Начальное раскрытое состояние (uncontrolled). По умолчанию `false`. */
  defaultOpen?: boolean;
  /** Переключение раскрытия. Получает новое значение `open`. */
  onOpenChange?(open: boolean): void;
  /**
   * Контент-цепочка рассуждения — строки `AiTool` / `AiToolSimple`. Рендерится
   * под заголовком в раскрытом состоянии.
   */
  children?: ReactNode;
  /** Доп. класс корня. */
  className?: string;
};

/**
 * Публичный props компонента `AiChainOfThoughts`.
 *
 * Цепочка рассуждений (Chain of Thoughts) AI-агента: сворачиваемый заголовок
 * («Размышляю» / «Размышлял», длительность, статус прерывания) и контент со
 * строками инструментов. Раскрытие — controlled (`open` + `onOpenChange`) либо
 * uncontrolled (`defaultOpen`); chevron появляется только при наличии
 * контента и вне состояния `broken`.
 */
export type AiChainOfThoughtsProps = WithSupportProps<
  AiChainOfThoughtsOwnProps & Omit<ComponentPropsWithoutRef<'div'>, keyof AiChainOfThoughtsOwnProps>
>;

export type AiChainOfThoughtsHeadlineOwnProps = {
  /**
   * Идёт ли рассуждение прямо сейчас. `true` — слева иконка GigaChat и подпись
   * «Размышляю» (настоящее время); `false` — без иконки и «Размышлял»
   * (прошедшее время). По умолчанию `true`.
   */
  inProgress?: boolean;
  /**
   * Поток рассуждения прерван. Вместо длительности и chevron'а под подписью
   * показывается сообщение `brokenMessage`. По умолчанию `false`.
   */
  broken?: boolean;
  /**
   * Длительность рассуждения в секундах. Форматируется в д/ч/м/с (ведущие
   * нулевые единицы опускаются, секунды показываются всегда). Скрыта в
   * состоянии `broken`.
   */
  duration?: number;
  /** Подпись заголовка. По умолчанию «Размышляю» / «Размышлял» — по `inProgress`. */
  label?: ReactNode;
  /** Текст сообщения о прерванном потоке (показывается при `broken`). */
  brokenMessage?: ReactNode;
  /**
   * Рендерить ли chevron-кнопку раскрытия. Управляется родителем
   * (`AiChainOfThoughts` ставит `true`, когда есть раскрываемый контент).
   * В состоянии `broken` chevron не рендерится. По умолчанию `false`.
   */
  collapsible?: boolean;
  /** Раскрытое состояние — задаёт направление chevron'а. По умолчанию `false`. */
  open?: boolean;
  /** Клик по chevron'у. Получает новое значение `open`. */
  onOpenChange?(open: boolean): void;
  /** Доп. класс корня. */
  className?: string;
};

/**
 * Публичный props компонента `AiChainOfThoughtsHeadline`.
 *
 * Заголовок цепочки рассуждений (Chain of Thoughts): иконка GigaChat, подпись
 * «Размышляю» / «Размышлял», длительность и chevron раскрытия. В состоянии
 * `broken` показывает сообщение о прерванном потоке вместо длительности.
 * Презентационный: раскрытие управляется родителем через `open` + `onOpenChange`.
 * Собственный контент (`children`) не рендерит.
 */
export type AiChainOfThoughtsHeadlineProps = WithSupportProps<
  AiChainOfThoughtsHeadlineOwnProps &
    Omit<ComponentPropsWithoutRef<'div'>, keyof AiChainOfThoughtsHeadlineOwnProps | 'children'>
>;

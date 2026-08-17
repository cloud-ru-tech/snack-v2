import { ValueOf, WithSupportProps } from '@ds/utils';
import type { ComponentPropsWithoutRef } from 'react';

import { AI_QUEUE_STEP_STATE } from './constants';

export type AiQueueStepState = ValueOf<typeof AI_QUEUE_STEP_STATE>;

export type AiQueueStep = {
  id?: string | number;
  label: string;
  state?: AiQueueStepState;
};

export type AiQueueSummary = {
  total?: number;
  planned?: number;
  progress?: number;
  done?: number;
};

export type AiQueueLabels = {
  tasks: string;
  planned: string;
  inProgress: string;
  done: string;
};

export type AiQueueOwnProps = {
  /** Шаги очереди. */
  steps?: AiQueueStep[];
  /** Принудительные счётчики в заголовке; если не заданы, считаются по `steps`. */
  summary?: AiQueueSummary;
  /** Контролируемое состояние раскрытия. */
  open?: boolean;
  /** Начальное состояние раскрытия в uncontrolled-режиме. */
  defaultOpen?: boolean;
  /** Коллбек изменения раскрытия. */
  onOpenChange?(open: boolean): void;
  /** Тексты счётчика в заголовке. */
  labels?: Partial<AiQueueLabels>;
  /** Дополнительный CSS-класс корня. */
  className?: string;
};

export type AiQueueProps = WithSupportProps<
  AiQueueOwnProps & Omit<ComponentPropsWithoutRef<'div'>, keyof AiQueueOwnProps | 'children'>
>;

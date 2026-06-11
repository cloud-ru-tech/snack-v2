import { WithSupportProps } from '@ds/utils';
import { HTMLAttributes, ReactNode } from 'react';

export type AiReasoningOwnProps = {
  /** Текстовый контент блока reasoning. */
  description?: ReactNode;
  /** Дополнительный контент под описанием (например, карточка с деталями). */
  children?: ReactNode;
  /** Показывает продолжение степпера вниз (для промежуточного шага). */
  stepperLine?: boolean;
  /** Явно управляет нижним коннектором. Если не передан, совпадает с `stepperLine`. */
  connector?: boolean;
  /** Дополнительный CSS-класс корневого контейнера. */
  className?: string;
};

export type AiReasoningProps = WithSupportProps<
  AiReasoningOwnProps & Omit<HTMLAttributes<HTMLDivElement>, keyof AiReasoningOwnProps>
>;

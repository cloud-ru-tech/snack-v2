import { WithSupportProps } from '@ds/utils';
import { ReactNode } from 'react';

export type HeadlineProps = WithSupportProps<{
  /** Заголовок страницы */
  title: string;
  /** Слот перед заголовком (например, кнопка «назад») */
  slotBeforeTitle?: ReactNode;
  /** Слот после заголовка (например, статус) */
  slotAfterTitle?: ReactNode;
  /** Действия справа от заголовка */
  actions?: ReactNode;
  /** Слот действий внутри строки заголовка (mobile-рендереры кладут сюда kebab/«ещё») */
  moreActions?: ReactNode;
  /** Подзаголовок под заголовком */
  subtitle?: ReactNode;
  /** Обрезать заголовок в одну строку с многоточием */
  truncateTitle?: boolean;
}>;

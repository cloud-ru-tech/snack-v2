import { WithSupportProps } from '@ds/utils';
import { MouseEvent, ReactNode } from 'react';

import { Size } from '../AiSuggestionSimple/types';
import { CHILD_TYPE } from './constants';

export type AiSuggestionParentProps = WithSupportProps<{
  /** Текст на триггере */
  label?: string;
  /** Иконка слева от текста */
  icon?: ReactNode;
  /** Размер (Figma: Mobile Off → `s`, Mobile On → `m`) */
  size?: Size;
  /** Блокирует взаимодействие */
  disabled?: boolean;
  /** Controlled — раскрыт (Figma: Activated=On) */
  expanded?: boolean;
  /** Uncontrolled — initial expanded */
  defaultExpanded?: boolean;
  /** Колбэк toggle (controlled и uncontrolled) */
  onExpandedChange?(expanded: boolean): void;
  /** Вложенные подсказки и группы */
  items?: AiSuggestionParentItem[];
  /** Колбэк клика по вложенной подсказке */
  onItemClick?(index: number, event: MouseEvent<HTMLButtonElement>): void;
  /** Дополнительный CSS-класс */
  className?: string;
}>;

export type AiSuggestionParentSuggestionItem = {
  type?: typeof CHILD_TYPE.Suggestion;
  key?: string;
  items?: never;
  label?: string;
  icon?: ReactNode;
  disabled?: boolean;
  onClick?(event: MouseEvent<HTMLButtonElement>): void;
};

export type AiSuggestionParentNestedItem = {
  type?: typeof CHILD_TYPE.Parent;
  key?: string;
  label?: string;
  icon?: ReactNode;
  disabled?: boolean;
  items?: AiSuggestionParentItem[];
};

export type AiSuggestionParentItem = AiSuggestionParentSuggestionItem | AiSuggestionParentNestedItem;

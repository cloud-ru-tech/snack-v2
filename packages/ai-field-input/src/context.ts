import { createContext, useContext } from 'react';

import {
  AiFieldInputActionListItem,
  AiFieldInputActionListProps,
  AiFieldInputMentionSegment,
  AiFieldInputSkillSegment,
  SearchTrigger,
} from './types';

/** Управление списком по `/` и `@` со стороны редактора. */
export type ActionListHandle = {
  focusFirst(): void;
  focusLast(): void;
  selectFirst(): boolean;
  close(): void;
};

/** Управление редактором со стороны Action List. */
export type EditorHandle = {
  focus(): void;
  insertText(text: string): void;
  /** Закрывает поиск: набранный текст остаётся в поле обычным текстом. */
  dismissSearch(): void;
  /** Стирает запрос после знака поиска, знак остаётся. */
  clearSearchQuery(): void;
  /** Лежит ли узел внутри текстовой области. */
  contains(node: Node): boolean;
  /** Вставляет чип туда, где стоял курсор (в конец, если поле ещё не фокусировали), и возвращает фокус. */
  insertChip(chip: AiFieldInputSkillSegment | AiFieldInputMentionSegment): void;
};

/** Меню кнопки футера на mobile: показывает список у себя вместо отдельного окна. */
export type ActionListHost = {
  open(items: AiFieldInputActionListProps['items'], trigger: SearchTrigger): void;
};

export type AiFieldInputContextValue = {
  /** Поле выключено — кнопки футера выключаются вслед за ним (IF-4.2). */
  disabled: boolean;
  registerActionList?(handle: ActionListHandle | null): void;
  getActionList?(): ActionListHandle | null;
  getEditor?(): EditorHandle | null;
  openActionList?(trigger: SearchTrigger): void;
  /** Меню, из пункта которого сейчас вызывают `openActionList`; `null` — после вызова. */
  hostActionList?(host: ActionListHost | null): void;
  /** Ставит выбранную строку чипом в поле. */
  pickActionListItem?(item: AiFieldInputActionListItem, trigger: SearchTrigger): void;
};

export const AiFieldInputContext = createContext<AiFieldInputContextValue>({ disabled: false });

export function useAiFieldInputContext(): AiFieldInputContextValue {
  return useContext(AiFieldInputContext);
}

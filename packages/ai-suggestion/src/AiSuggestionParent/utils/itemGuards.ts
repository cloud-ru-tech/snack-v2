import { CHILD_TYPE } from '../constants';
import { AiSuggestionParentItem, AiSuggestionParentNestedItem, AiSuggestionParentSuggestionItem } from '../types';

export function isNestedItem(item: AiSuggestionParentItem): item is AiSuggestionParentNestedItem {
  return item.type === CHILD_TYPE.Parent || item.items !== undefined;
}

export function isSuggestionItem(item: AiSuggestionParentItem): item is AiSuggestionParentSuggestionItem {
  return !isNestedItem(item);
}

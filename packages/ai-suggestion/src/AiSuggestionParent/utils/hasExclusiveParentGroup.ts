import { AiSuggestionParentItem } from '../types';
import { isNestedItem } from './itemGuards';

export function hasExclusiveParentGroup(items: AiSuggestionParentItem[]): boolean {
  return items.filter(isNestedItem).length >= 2;
}

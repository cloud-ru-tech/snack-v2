import { ACTION_LIST_ITEM_TYPE, SEARCH_TRIGGER, SEGMENT_TYPE } from '../constants';
import {
  AiFieldInputActionListGroup,
  AiFieldInputActionListItem,
  AiFieldInputActionListProps,
  AiFieldInputMentionSegment,
  AiFieldInputSearchSegment,
  AiFieldInputSkillSegment,
  AiFieldInputValue,
  SearchTrigger,
} from '../types';

type ActionListEntries = AiFieldInputActionListProps['items'];

export function isActionListGroup(
  item: AiFieldInputActionListItem | AiFieldInputActionListGroup,
): item is AiFieldInputActionListGroup {
  return 'items' in item && (item as AiFieldInputActionListItem).type !== ACTION_LIST_ITEM_TYPE.DrillDown;
}

export function flattenActionListItems(items: ActionListEntries): AiFieldInputActionListItem[] {
  return items.flatMap(item => (isActionListGroup(item) ? item.items : [item]));
}

export function filterActionListItems(items: ActionListEntries, query: string): ActionListEntries {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return items;
  }

  const matches = (item: AiFieldInputActionListItem) => item.label.toLowerCase().includes(normalizedQuery);

  return items.flatMap<ActionListEntries[number]>(entry => {
    if (!isActionListGroup(entry)) {
      return matches(entry) ? [entry] : [];
    }

    const groupItems = entry.items.filter(matches);
    return groupItems.length > 0 ? [{ ...entry, items: groupItems }] : [];
  });
}

export function mapActionListItems(
  items: ActionListEntries,
  mapItem: (item: AiFieldInputActionListItem) => AiFieldInputActionListItem,
): ActionListEntries {
  return items.map(entry =>
    isActionListGroup(entry) ? { ...entry, items: entry.items.map(mapItem) } : mapItem(entry),
  );
}

export function findSearchSegment(value: AiFieldInputValue): AiFieldInputSearchSegment | undefined {
  return value.find((segment): segment is AiFieldInputSearchSegment => segment.type === SEGMENT_TYPE.Search);
}

export function toChipSegment(
  item: AiFieldInputActionListItem,
  trigger: SearchTrigger,
): AiFieldInputSkillSegment | AiFieldInputMentionSegment {
  return trigger === SEARCH_TRIGGER.Skill
    ? {
        type: SEGMENT_TYPE.Skill,
        id: item.id,
        label: item.label,
        icon: item.icon,
        tooltip: item.tooltip,
        paramsPlaceholder: item.paramsPlaceholder,
      }
    : { type: SEGMENT_TYPE.Mention, id: item.id, label: item.label, icon: item.icon, tooltip: item.tooltip };
}

export function replaceSearchSegment(
  value: AiFieldInputValue,
  item: AiFieldInputActionListItem,
  trigger: SearchTrigger,
): AiFieldInputValue {
  const chip = toChipSegment(item, trigger);

  return value.map(segment => (segment.type === SEGMENT_TYPE.Search ? chip : segment));
}

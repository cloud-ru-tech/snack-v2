import { ItemId } from '@ds/list';

import { SELECTION_MODE } from '../constants';
import { FieldSelectMultipleProps, Selection } from '../types';

export function isMultiple(props: { selection?: Selection }): props is FieldSelectMultipleProps {
  return props.selection === SELECTION_MODE.Multiple;
}

/** Выбранные id в нормализованном виде: массив и для `single`, и для `multiple`. */
export function getSelectedIds(params: {
  multiple: boolean;
  multipleValue: ItemId[];
  singleValue: ItemId | undefined;
}): ItemId[] {
  if (params.multiple) {
    return params.multipleValue;
  }

  if (params.singleValue === undefined) {
    return [];
  }

  return [params.singleValue];
}

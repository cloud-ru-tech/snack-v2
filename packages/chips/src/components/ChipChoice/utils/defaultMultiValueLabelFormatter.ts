import { ItemId } from '@sbercloud/snack-v2-list';

import { ContentRenderProps } from '../types';
import { FlattenOption } from './kindFlattenOptions';

export type ChipChoiceMultipleValueFormatterProps<T extends ContentRenderProps = ContentRenderProps> = {
  value: FlattenOption<T>[];
  total: number;
  allLabel: string;
};

export function defaultMultiValueLabelFormatter({
  value,
  total,
  allLabel,
}: ChipChoiceMultipleValueFormatterProps): ItemId {
  const len = value.length;

  if ([0, total].includes(len) && total !== len) {
    return allLabel;
  }

  if (len === 1) {
    return value[0].label;
  }

  return `${len.toString()}/${total}`;
}

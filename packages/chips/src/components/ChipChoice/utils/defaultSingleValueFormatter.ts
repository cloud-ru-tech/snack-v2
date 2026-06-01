import { ItemId } from '@sbercloud/snack-v2-list';

type ChipChoiceSingleValueFormatterProps = {
  label?: ItemId;
  allLabel?: string;
};

export function defaultSingleValueFormatter({ label, allLabel }: ChipChoiceSingleValueFormatterProps) {
  return label ?? allLabel;
}

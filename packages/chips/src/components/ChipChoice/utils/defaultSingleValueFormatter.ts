import { ItemId } from '@ds/list';

type ChipChoiceSingleValueFormatterProps = {
  label?: ItemId;
  allLabel?: string;
};

export function defaultSingleValueFormatter({ label, allLabel }: ChipChoiceSingleValueFormatterProps) {
  return label ?? allLabel;
}

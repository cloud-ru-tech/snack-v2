import { DEFAULT_EMPTY_VALUE } from '../../../constants';
import { DEFAULT_LOCALE } from '../constants';
import { Range } from '../types';

type DefaultRangeFormatterProps = {
  value?: Range;
  allLabel?: string;
};

export function defaultRangeFormatter({ value, allLabel }: DefaultRangeFormatterProps) {
  if (!value || !value.length) return allLabel;

  const [from, to] = value;

  return `${from.toLocaleDateString(DEFAULT_LOCALE)} ${DEFAULT_EMPTY_VALUE} ${to.toLocaleDateString(DEFAULT_LOCALE)}`;
}

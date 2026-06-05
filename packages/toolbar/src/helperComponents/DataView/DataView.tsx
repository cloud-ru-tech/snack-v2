import { SegmentControl, SIZE } from '@ds/segment-control';

import { DATA_VIEW_VALUE, DEFAULT_ITEMS } from './constants';
import { DataViewProps } from './types';

export function DataView({
  value,
  defaultValue = DATA_VIEW_VALUE.List,
  onChange,
  items = DEFAULT_ITEMS,
}: DataViewProps) {
  return (
    <SegmentControl
      outline={false}
      size={SIZE.M}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      items={items}
    />
  );
}

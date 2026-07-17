import { ViewCardSVG, ViewTableSVG } from '@ds/icons/interface/product';
import { type SegmentControlProps } from '@ds/segment-control';
import { ValueOf } from '@ds/utils';

export const DATA_VIEW_VALUE = {
  List: 'list',
  Compact: 'compact',
} as const;

type DataViewValue = ValueOf<typeof DATA_VIEW_VALUE>;

export const DEFAULT_ITEMS: SegmentControlProps<DataViewValue>['items'] = [
  { value: DATA_VIEW_VALUE.List, label: '', icon: <ViewTableSVG /> },
  { value: DATA_VIEW_VALUE.Compact, label: '', icon: <ViewCardSVG /> },
];

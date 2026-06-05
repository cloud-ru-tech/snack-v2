import { type SegmentControlProps } from '@ds/segment-control';
import { ValueOf, WithSupportProps } from '@ds/utils';

import { DATA_VIEW_VALUE } from './constants';

export type DataViewValue = ValueOf<typeof DATA_VIEW_VALUE>;

type DataViewBaseProps = {
  value?: DataViewValue;
  defaultValue?: DataViewValue;
  onChange?(value: DataViewValue): void;
  items?: SegmentControlProps<DataViewValue>['items'];
};

export type DataViewProps = WithSupportProps<DataViewBaseProps>;

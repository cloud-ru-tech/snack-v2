import { LAYOUT_TYPE } from '../../constants';
import { LayoutType } from '../../types';
import { InfoGroup } from '../InfoGroup';
import { InfoGroupProps } from '../InfoGroup/types';
import { DataType } from '../InfoRow';
import { MobileInfoGroup } from '../MobileInfoGroup';

export type AdaptiveInfoGroupProps<T extends DataType> = InfoGroupProps<T> & {
  layoutType: LayoutType;
};

export function AdaptiveInfoGroup<T extends DataType>({
  layoutType,
  columns,
  width,
  ...shared
}: AdaptiveInfoGroupProps<T>) {
  if (layoutType === LAYOUT_TYPE.Comfort) {
    return <MobileInfoGroup {...shared} />;
  }
  return <InfoGroup columns={columns} width={width} {...shared} />;
}

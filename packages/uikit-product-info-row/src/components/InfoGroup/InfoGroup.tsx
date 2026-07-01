import { isMobileLayout, useAdaptiveLayout } from '@ds/adaptive';

import { DesktopInfoGroup } from '../../helperComponents/DesktopInfoGroup';
import { DesktopInfoGroupProps } from '../../helperComponents/DesktopInfoGroup/types';
import { DataType } from '../../helperComponents/DesktopInfoRow';
import { MobileInfoGroup } from '../../helperComponents/MobileInfoGroup';

export type InfoGroupProps<T extends DataType> = DesktopInfoGroupProps<T>;

export function InfoGroup<T extends DataType>({ columns, width, ...shared }: InfoGroupProps<T>) {
  const { layoutType } = useAdaptiveLayout();

  if (isMobileLayout(layoutType)) {
    return <MobileInfoGroup {...shared} />;
  }

  return <DesktopInfoGroup columns={columns} width={width} {...shared} />;
}

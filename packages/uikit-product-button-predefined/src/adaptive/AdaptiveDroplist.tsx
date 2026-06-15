import { DroplistProps } from '@ds/list';
import { WithLayoutType } from '@ds/utils';

import { DesktopDroplist } from './DesktopDroplist';
import { MobileDroplist, MobileDroplistProps } from './MobileDroplist';

export type AdaptiveDroplistProps = WithLayoutType<
  Omit<DroplistProps, 'children'> & Pick<MobileDroplistProps, 'children'>
>;

export function AdaptiveDroplist({ layoutType, children, size, ...dropListProps }: AdaptiveDroplistProps) {
  if (layoutType === 'mobile') {
    return <MobileDroplist {...dropListProps}>{children}</MobileDroplist>;
  }

  return (
    <DesktopDroplist {...dropListProps} size={size}>
      {children}
    </DesktopDroplist>
  );
}

export type { DroplistProps };

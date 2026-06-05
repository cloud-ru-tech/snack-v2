import { extractSupportProps, LAYOUT_TYPE, WithSupportProps } from '@ds/utils';
import { Droplist, DroplistProps } from '@sbercloud/snack-v2-list';
import { ReactNode } from 'react';

import { LayoutType } from '../../types';
import { MobileDroplist } from './components';

type AdaptiveDroplistBaseProps = Omit<DroplistProps, 'children'> & {
  layoutType?: LayoutType;
  children: DroplistProps['children'];
  /** Заголовок mobile BottomSheet */
  label?: string;
  actionButton?: ReactNode;
  slotAfterHeadline?: ReactNode;
  onBackButtonClick?(): void;
};

export type AdaptiveDroplistProps = WithSupportProps<AdaptiveDroplistBaseProps>;

export type { DroplistProps };

export function AdaptiveDroplist({
  layoutType = LAYOUT_TYPE.Desktop,
  children,
  size,
  label,
  actionButton,
  slotAfterHeadline,
  onBackButtonClick,
  ...rest
}: AdaptiveDroplistProps) {
  const supportProps = extractSupportProps(rest);
  const isMobile = layoutType === LAYOUT_TYPE.Mobile;

  if (isMobile) {
    return (
      <MobileDroplist
        {...rest}
        {...supportProps}
        label={label}
        actionButton={actionButton}
        slotAfterHeadline={slotAfterHeadline}
        onBackButtonClick={onBackButtonClick}
      >
        {children}
      </MobileDroplist>
    );
  }

  return (
    <Droplist {...rest} {...supportProps} size={size ?? 'm'}>
      {children}
    </Droplist>
  );
}

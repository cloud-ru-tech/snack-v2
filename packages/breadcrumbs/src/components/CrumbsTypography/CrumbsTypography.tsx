import { Typography } from '@design-system/typography';
import { PropsWithChildren } from 'react';

import { SIZE } from '../../constants';
import { Size } from '../../types';

export type CrumbsTypographyProps = PropsWithChildren<{
  size: Size;
  className?: string;
}>;

export function CrumbsTypography({ size, children, className }: CrumbsTypographyProps) {
  return (
    <Typography className={className} size={size === SIZE.S ? 'm' : 's'} as='div' variant='body' weight='regular'>
      {children}
    </Typography>
  );
}

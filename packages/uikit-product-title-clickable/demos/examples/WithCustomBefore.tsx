import { Typography } from '@ds/typography';
import { TitleClickable } from '@ds/uikit-product-title-clickable';

export function WithCustomBefore() {
  return (
    <TitleClickable
      href='#'
      before={
        <Typography variant='label' size='s' as='span'>
          Custom before
        </Typography>
      }
    />
  );
}

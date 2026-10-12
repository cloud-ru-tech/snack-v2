import { Typography } from '@ds/typography';
import { TitleClickable } from '@ds/uikit-product-title-clickable';

export function WithCustomNode() {
  return (
    <TitleClickable
      href='#'
      content={
        <Typography variant='label' size='s' as='span'>
          Custom content
        </Typography>
      }
    />
  );
}

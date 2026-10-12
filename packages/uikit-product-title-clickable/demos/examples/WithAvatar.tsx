import { TitleClickable } from '@ds/uikit-product-title-clickable';

export function WithAvatar() {
  return (
    <TitleClickable
      href='#'
      fullWidth
      content={<TitleClickable.UserTitle name='John Doe' subtitle='jdoe@example.com' />}
    />
  );
}

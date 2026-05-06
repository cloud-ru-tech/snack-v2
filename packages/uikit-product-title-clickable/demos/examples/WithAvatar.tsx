import { TitleClickable, TitleClickableAvatar } from '@ds/uikit-product-title-clickable';

export function WithAvatar() {
  return (
    <TitleClickable href='#' fullWidth before={<TitleClickableAvatar name='John Doe' subtitle='jdoe@example.com' />} />
  );
}

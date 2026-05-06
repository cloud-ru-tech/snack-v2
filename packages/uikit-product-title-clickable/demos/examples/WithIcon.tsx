import { PlaceholderSVG } from '@ds/icons';
import { TitleClickable, TitleClickableIcon } from '@ds/uikit-product-title-clickable';

export function WithIcon() {
  return (
    <TitleClickable href='#' title='Production environment' before={<TitleClickableIcon icon={<PlaceholderSVG />} />} />
  );
}

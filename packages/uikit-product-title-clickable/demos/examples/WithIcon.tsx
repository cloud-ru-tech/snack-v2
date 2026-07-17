import { PlaceholderSVG } from '@ds/icons/interface/system';
import { TitleClickable, TitleClickableIcon } from '@ds/uikit-product-title-clickable';

export function WithIcon() {
  return (
    <TitleClickable href='#' title='Production environment' before={<TitleClickableIcon icon={<PlaceholderSVG />} />} />
  );
}

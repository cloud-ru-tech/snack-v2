import { PlaceholderSVG } from '@ds/icons/interface/system';
import { TitleClickable } from '@ds/uikit-product-title-clickable';

export function WithIcon() {
  return <TitleClickable href='#' title='Production environment' icon={<PlaceholderSVG />} />;
}

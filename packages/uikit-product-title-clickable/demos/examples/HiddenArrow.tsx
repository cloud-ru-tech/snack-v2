import { PlaceholderSVG } from '@ds/icons';
import { TitleClickable } from '@ds/uikit-product-title-clickable';

export function HiddenArrow() {
  return <TitleClickable href='#' title='Без шеврона' icon={<PlaceholderSVG />} showArrow={false} />;
}

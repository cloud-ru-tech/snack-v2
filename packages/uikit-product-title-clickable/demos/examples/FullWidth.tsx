import { PlaceholderSVG } from '@ds/icons';
import { TitleClickable } from '@ds/uikit-product-title-clickable';

export function FullWidth() {
  return <TitleClickable href='#' title='Раздел занимает всю ширину контейнера' icon={<PlaceholderSVG />} fullWidth />;
}

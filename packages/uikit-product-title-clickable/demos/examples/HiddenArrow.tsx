import { PlaceholderSVG } from '@ds/icons/interface/system';
import { TitleClickable } from '@ds/uikit-product-title-clickable';

export function HiddenArrow() {
  return (
    <TitleClickable
      href='#'
      content={<TitleClickable.SimpleTitle title='Без шеврона' icon={<PlaceholderSVG />} />}
      showArrow={false}
    />
  );
}

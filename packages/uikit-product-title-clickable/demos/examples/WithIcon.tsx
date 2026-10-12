import { PlaceholderSVG } from '@ds/icons/interface/system';
import { TitleClickable } from '@ds/uikit-product-title-clickable';

export function WithIcon() {
  return (
    <TitleClickable
      href='#'
      content={<TitleClickable.SimpleTitle title='Production environment' icon={<PlaceholderSVG />} />}
    />
  );
}

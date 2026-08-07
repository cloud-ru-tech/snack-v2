import { PromoTagPredefined, VARIANTS } from '@ds/uikit-product-promo-tag-predefined';
import { MouseEvent } from 'react';

function handleSupportClick(e: MouseEvent) {
  e.preventDefault();
}

export function Connecting() {
  return <PromoTagPredefined variant={VARIANTS.Connecting} tooltip={{ onSupportClick: handleSupportClick }} />;
}

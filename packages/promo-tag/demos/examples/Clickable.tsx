import { PromoTag } from '@ds/promo-tag';

export function Clickable() {
  return (
    <PromoTag
      text='Кликабельный'
      appearance='blue'
      onClick={() => {
        /* handle click */
      }}
    />
  );
}

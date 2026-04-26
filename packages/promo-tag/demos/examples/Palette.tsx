import { PromoTag } from '@ds/promo-tag';

export function Palette() {
  return (
    <>
      <PromoTag text='Primary' appearance='primary' />
      <PromoTag text='Green' appearance='green' />
      <PromoTag text='Red' appearance='red' />
      <PromoTag text='Violet' appearance='violet' />
    </>
  );
}

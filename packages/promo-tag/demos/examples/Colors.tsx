import { PromoTag } from '@ds/promo-tag';

export function Colors() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <PromoTag text='Primary' appearance='primary' />
      <PromoTag text='Green' appearance='green' />
      <PromoTag text='Red' appearance='red' />
      <PromoTag text='Violet' appearance='violet' />
    </div>
  );
}

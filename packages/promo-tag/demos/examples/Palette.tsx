import { PromoTag } from '@ds/promo-tag';

export function Palette() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <PromoTag label='Primary' appearance='primary' />
      <PromoTag label='Green' appearance='green' />
      <PromoTag label='Red' appearance='red' />
      <PromoTag label='Violet' appearance='violet' />
    </div>
  );
}

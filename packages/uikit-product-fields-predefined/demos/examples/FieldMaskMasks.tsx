import { FieldMask, MASK } from '@ds/uikit-product-fields-predefined';

export function FieldMaskMasks() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <FieldMask label='UUID' mask={MASK.Uuid} />
      <FieldMask label='СНИЛС' mask={MASK.Snils} />
      <FieldMask label='IPv4' mask={MASK.IpV4Address} />
    </div>
  );
}

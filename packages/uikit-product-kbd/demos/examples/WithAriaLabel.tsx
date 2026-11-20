import { Kbd } from '@ds/uikit-product-kbd';

export function WithAriaLabel() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Kbd aria-label='Слэш'>/</Kbd>
      <Kbd aria-label='Пробел'>Space</Kbd>
    </div>
  );
}

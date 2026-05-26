import { LoadStatus } from '@ds/uikit-product-load-status';

export function Thresholds() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
      <LoadStatus label='Низкий' progress={40} valueType='percent' />
      <LoadStatus label='Средний' progress={75} valueType='percent' />
      <LoadStatus label='Высокий' progress={95} valueType='percent' />
    </div>
  );
}

import { InfoBlock } from '@ds/info-block';

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <InfoBlock size='s' title='Size S' description='Компактный блок' />
      <InfoBlock size='m' title='Size M' description='Средний блок' />
      <InfoBlock size='l' title='Size L' description='Крупный блок для пустых состояний' />
    </div>
  );
}

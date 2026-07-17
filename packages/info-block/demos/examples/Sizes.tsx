import { InfoBlock } from '@ds/info-block';

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <InfoBlock size='s' title='Size S' content='Компактный блок' />
      <InfoBlock size='m' title='Size M' content='Средний блок' />
      <InfoBlock size='l' title='Size L' content='Крупный блок для пустых состояний' />
    </div>
  );
}

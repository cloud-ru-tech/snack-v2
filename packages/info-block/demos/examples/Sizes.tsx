import { InfoBlock } from '@ds/info-block';

export function Sizes() {
  return (
    <>
      <InfoBlock size='s' title='Size S' description='Компактный блок' />
      <InfoBlock size='m' title='Size M' description='Средний блок' />
      <InfoBlock size='l' title='Size L' description='Крупный блок для пустых состояний' />
    </>
  );
}

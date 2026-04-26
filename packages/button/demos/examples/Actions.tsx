import { Button } from '@ds/button';

export function Actions() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button appearance='primary' view='filled' label='Сохранить' />
      <Button appearance='neutral' view='simple' label='Отмена' />
    </div>
  );
}

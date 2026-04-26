import { Button } from '@ds/button';
import { Dropdown } from '@ds/dropdown';

export function Basic() {
  return (
    <Dropdown content={<div style={{ padding: 12 }}>Контент меню</div>}>
      <Button label='Открыть' />
    </Dropdown>
  );
}

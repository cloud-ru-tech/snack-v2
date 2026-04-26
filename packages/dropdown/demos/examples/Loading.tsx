import { Button } from '@ds/button';
import { Dropdown, STATE } from '@ds/dropdown';

export function Loading() {
  return (
    <Dropdown state={{ type: STATE.Loading }} content={null}>
      <Button label='Загрузка' />
    </Dropdown>
  );
}

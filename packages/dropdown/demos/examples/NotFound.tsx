import { Button } from '@ds/button';
import { Dropdown, STATE } from '@ds/dropdown';

export function NotFound() {
  return (
    <Dropdown
      state={{
        type: STATE.NotFound,
        description: 'Ничего не нашли',
        actionLabel: 'Сбросить фильтры',
        onActionClick: () => {},
      }}
      content={null}
    >
      <Button label='Поиск' />
    </Dropdown>
  );
}

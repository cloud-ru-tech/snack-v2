import { Button } from '@ds/button';
import { Dropdown } from '@ds/dropdown';

export function OpenForReview() {
  return (
    <Dropdown content={<div style={{ padding: 12 }}>Видимое содержимое</div>}>
      <Button label='Триггер' />
    </Dropdown>
  );
}

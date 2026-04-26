import { Popover } from '@ds/popover';

export function HoverTrigger() {
  return (
    <Popover content='Открывается при наведении' trigger='hover' placement='top'>
      <button type='button'>Наведи курсор</button>
    </Popover>
  );
}

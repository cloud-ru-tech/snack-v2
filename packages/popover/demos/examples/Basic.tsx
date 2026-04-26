import { Popover } from '@ds/popover';

export function Basic() {
  return (
    <Popover content='Подсказка для пользователя' placement='top'>
      <button type='button'>Открыть поповер</button>
    </Popover>
  );
}

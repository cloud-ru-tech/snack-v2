import { Popover } from '@ds/popover';

export function Basic() {
  return (
    <Popover content='Подсказка для пользователя' placement='top' trigger='click'>
      <button type='button'>Открыть поповер</button>
    </Popover>
  );
}

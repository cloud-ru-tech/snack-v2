import { Tooltip } from '@ds/tooltip';

export function ClickTrigger() {
  return (
    <Tooltip tip='Открывается по клику и остаётся видимой' trigger='click'>
      <button type='button'>Подробнее</button>
    </Tooltip>
  );
}

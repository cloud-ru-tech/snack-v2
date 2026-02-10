import { Tooltip } from '@design-system/tooltip';

export function TooltipBasicExample() {
  return (
    <Tooltip content='Подсказка при наведении' placement='right'>
      <button type='button'>Наведи курсор</button>
    </Tooltip>
  );
}

import { Popover } from '@ds/popover';

export function Placement() {
  return (
    <Popover content='Снизу справа' placement='bottom-end' trigger='click'>
      <button type='button'>bottom-end</button>
    </Popover>
  );
}

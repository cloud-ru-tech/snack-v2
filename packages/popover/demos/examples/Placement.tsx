import { Popover } from '@ds/popover';

export function Placement() {
  return (
    <Popover content='Снизу справа' placement='bottom-end'>
      <button type='button'>bottom-end</button>
    </Popover>
  );
}

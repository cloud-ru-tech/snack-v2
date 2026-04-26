import { Button } from '@ds/button';
import { HotSpot } from '@ds/hot-spot';

export function RedAccent() {
  return (
    <HotSpot appearance='red' placement='right-top'>
      <Button label='Ошибки' view='outline' />
    </HotSpot>
  );
}

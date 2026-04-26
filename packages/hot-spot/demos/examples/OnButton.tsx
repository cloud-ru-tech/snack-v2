import { Button } from '@ds/button';
import { HotSpot } from '@ds/hot-spot';

export function OnButton() {
  return (
    <HotSpot placement='right-top'>
      <Button label='Уведомления' view='outline' />
    </HotSpot>
  );
}

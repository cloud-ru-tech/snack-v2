import { Button } from '@ds/button';
import { HotSpot } from '@ds/hot-spot';

export function NoPulse() {
  return (
    <HotSpot placement='right' pulse={false}>
      <Button label='Settings' view='outline' />
    </HotSpot>
  );
}

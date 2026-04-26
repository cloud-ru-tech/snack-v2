import { Slider } from '@ds/slider';

export function Range() {
  return <Slider range min={0} max={100} defaultValue={[20, 70]} handleTip />;
}

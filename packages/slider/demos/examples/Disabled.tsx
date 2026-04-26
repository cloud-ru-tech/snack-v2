import { Slider } from '@ds/slider';

export function Disabled() {
  return <Slider min={0} max={100} defaultValue={40} disabled />;
}

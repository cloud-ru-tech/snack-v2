import { Slider } from '@ds/slider';

export function Marks() {
  return (
    <Slider
      min={0}
      max={100}
      step={25}
      marks={{ 0: '0', 25: '25', 50: '50', 75: '75', 100: '100' }}
      defaultValue={50}
      handleTip
    />
  );
}

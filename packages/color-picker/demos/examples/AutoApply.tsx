import { ColorPicker } from '@ds/color-picker';
import { useState } from 'react';

export function AutoApply() {
  const [color, setColor] = useState<string>('#4387e2');

  return <ColorPicker value={color} autoApply onChange={raw => setColor(raw.hex)} />;
}

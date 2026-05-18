import { ColorPicker } from '@ds/color-picker';
import { useState } from 'react';

export function Basic() {
  const [color, setColor] = useState<string>('#389f74');

  return <ColorPicker value={color} onChange={raw => setColor(raw.hex)} />;
}

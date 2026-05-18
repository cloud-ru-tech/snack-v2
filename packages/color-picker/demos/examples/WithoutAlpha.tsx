import { ColorPicker } from '@ds/color-picker';
import { useState } from 'react';

export function WithoutAlpha() {
  const [color, setColor] = useState<string>('#d52e33');

  return <ColorPicker value={color} withAlpha={false} autoApply onChange={raw => setColor(raw.hex)} />;
}

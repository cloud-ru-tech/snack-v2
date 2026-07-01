import { ColorPicker } from '@ds/color-picker';
import { useState } from 'react';

export function Compact() {
  const [color, setColor] = useState<string>('#389f74');

  return <ColorPicker value={color} withColorArea={false} autoApply={false} onChange={raw => setColor(raw.hex)} />;
}

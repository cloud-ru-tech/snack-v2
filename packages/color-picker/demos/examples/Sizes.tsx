import { ColorPicker } from '@ds/color-picker';
import { useState } from 'react';

export function Sizes() {
  const [color, setColor] = useState<string>('#389f74');
  const handleChange = (raw: { hex: string }) => setColor(raw.hex);

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <ColorPicker size='s' value={color} onChange={handleChange} autoApply />
      <ColorPicker size='m' value={color} onChange={handleChange} autoApply />
      <ColorPicker size='l' value={color} onChange={handleChange} autoApply />
    </div>
  );
}

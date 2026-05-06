import { CopyButton } from '@ds/uikit-product-copy';
import { useState } from 'react';

export function CopyButtonWithHandler() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <CopyButton valueToCopy='tracked-value' onClick={() => setCount(c => c + 1)} />
      <span>Скопировано раз: {count}</span>
    </div>
  );
}

import { LazyCodeEditor } from '@ds/code-editor';
import { useState } from 'react';

const INITIAL = `{
  "loaded": "lazily"
}
`;

export function LazyLoaded() {
  const [value, setValue] = useState(INITIAL);

  return <LazyCodeEditor language='json' value={value} hasHeader height={220} onChange={v => setValue(v ?? '')} />;
}

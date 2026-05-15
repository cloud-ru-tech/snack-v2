import { CodeEditor } from '@ds/code-editor';
import { useState } from 'react';

const INITIAL = `{
  "name": "@ds/code-editor",
  "version": "0.0.0",
  "language": "json"
}
`;

export function Json() {
  const [value, setValue] = useState(INITIAL);

  return <CodeEditor language='json' value={value} height={220} onChange={v => setValue(v ?? '')} />;
}

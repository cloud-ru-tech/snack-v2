import { CodeEditor } from '@ds/code-editor';
import { useState } from 'react';

const INITIAL = `name: '@ds/code-editor'
version: 0.0.0
language: yaml
`;

export function Yaml() {
  const [value, setValue] = useState(INITIAL);

  return <CodeEditor language='yaml' value={value} hasHeader height={220} onChange={v => setValue(v ?? '')} />;
}

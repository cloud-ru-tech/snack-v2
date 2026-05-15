import { CodeEditor } from '@ds/code-editor';
import { useState } from 'react';

const INITIAL = `{
  "copy": "me"
}
`;

export function WithHeader() {
  const [value, setValue] = useState(INITIAL);
  const [copiedAt, setCopiedAt] = useState<string | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <CodeEditor
        language='json'
        value={value}
        hasHeader
        height={200}
        onChange={v => setValue(v ?? '')}
        onCopyClick={() => setCopiedAt(new Date().toLocaleTimeString())}
      />
      <span>Last copy: {copiedAt ?? '—'}</span>
    </div>
  );
}

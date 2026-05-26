import { Markdown } from '@ds/markdown';
import { useState } from 'react';

const SOURCE = `Нажмите Copy на блоке кода — \`onCodeCopyClick\` получит сырой текст.

\`\`\`bash
pnpm add @ds/markdown
\`\`\`
`;

export function ViewerCodeCopy() {
  const [copied, setCopied] = useState<string | null>(null);

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Markdown value={SOURCE} onCodeCopyClick={setCopied} />
      {copied !== null && <span>Скопировано: {copied}</span>}
    </div>
  );
}

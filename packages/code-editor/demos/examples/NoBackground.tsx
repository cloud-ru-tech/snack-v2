import { CodeEditor } from '@ds/code-editor';
import { useState } from 'react';

import styles from './NoBackground.module.scss';

const INITIAL = `// transparent background, embedded into a card
const config = { mode: 'inline' }
`;

export function NoBackground() {
  const [value, setValue] = useState(INITIAL);

  return (
    <div className={styles.surface}>
      <CodeEditor
        language='javascript'
        value={value}
        hasBackground={false}
        height={220}
        onChange={v => setValue(v ?? '')}
      />
    </div>
  );
}

import { BlockPredefinedSimple } from '@ds/uikit-product-block-predefined';
import { useState } from 'react';

import styles from './styles.module.scss';

export function BlockPredefinedSimpleDemo() {
  const [count, setCount] = useState(1);
  return (
    <div className={styles.preview} data-docs-preview>
      <BlockPredefinedSimple
        title='Участники проекта'
        actions={[{ label: 'Добавить участника', onClick: () => setCount(value => value + 1) }]}
      >
        Участников в проекте: {count}
      </BlockPredefinedSimple>
    </div>
  );
}

import { Accordion } from '@ds/accordion';
import { useState } from 'react';

import styles from './styles.module.scss';
export function MultipleMode() {
  const [expanded, setExpanded] = useState<string[]>(['email']);

  return (
    <div className={styles.wrapper}>
      <Accordion selectionMode='multiple' expanded={expanded} onExpandedChange={next => setExpanded(next ?? [])}>
        <Accordion.CollapseBlockPrimary id='email' title='Email' view='outline'>
          Уведомления на почту.
        </Accordion.CollapseBlockPrimary>
        <Accordion.CollapseBlockPrimary id='push' title='Push' view='outline'>
          Браузерные push-уведомления.
        </Accordion.CollapseBlockPrimary>
        <Accordion.CollapseBlockPrimary id='messenger' title='Мессенджеры' view='outline'>
          Telegram, Slack, Mattermost.
        </Accordion.CollapseBlockPrimary>
      </Accordion>
    </div>
  );
}

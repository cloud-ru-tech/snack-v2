import { Accordion } from '@ds/accordion';
import { Counter } from '@ds/counter';

import styles from './styles.module.scss';

export function AfterTitle() {
  return (
    <div className={styles.wrapper}>
      <Accordion>
        <Accordion.CollapseBlockPrimary id='inbox' title='Входящие' view='outline' afterTitle={<Counter value={12} />}>
          Непрочитанные сообщения и уведомления.
        </Accordion.CollapseBlockPrimary>
        <Accordion.CollapseBlockPrimary id='archive' title='Архив' view='outline' afterTitle={<Counter value={238} />}>
          Перемещённые из входящих.
        </Accordion.CollapseBlockPrimary>
      </Accordion>
    </div>
  );
}

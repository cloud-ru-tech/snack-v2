import { Accordion } from '@ds/accordion';

import styles from './styles.module.scss';

export function Appearances() {
  return (
    <div className={styles.wrapper}>
      <Accordion>
        <Accordion.CollapseBlockPrimary id='neutral' appearance='neutral' title='Neutral' view='outline'>
          Нейтральный акрил — значение по умолчанию.
        </Accordion.CollapseBlockPrimary>
        <Accordion.CollapseBlockPrimary id='primary' appearance='primary' title='Primary' view='outline'>
          Акцентный раздел, выделенный основным цветом.
        </Accordion.CollapseBlockPrimary>
        <Accordion.CollapseBlockPrimary id='green' appearance='green' title='Green' view='outline'>
          Успех, подтверждённые действия.
        </Accordion.CollapseBlockPrimary>
        <Accordion.CollapseBlockPrimary id='red' appearance='red' title='Red' view='outline'>
          Предупреждение или критическое внимание.
        </Accordion.CollapseBlockPrimary>
      </Accordion>
    </div>
  );
}

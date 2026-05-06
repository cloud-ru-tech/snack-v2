import { Accordion } from '@ds/accordion';
import { BACKGROUND_PREDEFINED_FILL } from '@ds/materials';

import styles from './styles.module.scss';

export function Appearances() {
  return (
    <div className={styles.wrapper}>
      <Accordion>
        <Accordion.CollapseBlockPrimary
          id='neutral'
          backgroundPredefined={BACKGROUND_PREDEFINED_FILL.NeutralBackground1Level}
          title='Neutral'
          view='outline'
        >
          Нейтральный акрил — значение по умолчанию.
        </Accordion.CollapseBlockPrimary>
        <Accordion.CollapseBlockPrimary
          id='primary'
          backgroundPredefined={BACKGROUND_PREDEFINED_FILL.PrimaryBackground}
          title='Primary'
          view='outline'
        >
          Акцентный раздел, выделенный основным цветом.
        </Accordion.CollapseBlockPrimary>
        <Accordion.CollapseBlockPrimary
          id='green'
          backgroundPredefined={BACKGROUND_PREDEFINED_FILL.GreenBackground}
          title='Green'
          view='outline'
        >
          Успех, подтверждённые действия.
        </Accordion.CollapseBlockPrimary>
        <Accordion.CollapseBlockPrimary
          id='red'
          backgroundPredefined={BACKGROUND_PREDEFINED_FILL.RedBackground}
          title='Red'
          view='outline'
        >
          Предупреждение или критическое внимание.
        </Accordion.CollapseBlockPrimary>
      </Accordion>
    </div>
  );
}

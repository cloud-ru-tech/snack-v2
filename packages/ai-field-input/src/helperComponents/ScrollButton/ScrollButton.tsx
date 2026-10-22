import { AiButtonControls, DIRECTION } from '@ds/ai-button-controls';
import { APPEARANCE, HotSpot, PLACEMENT } from '@ds/hot-spot';

import { TEST_IDS } from '../../constants';
import { aiFieldInputLocale } from '../../locale';
import { AiFieldInputScrollButton } from '../../types';
import styles from './styles.module.scss';

const HALF_DOT = 4;

export function ScrollButton({ onClick, indicator = false }: AiFieldInputScrollButton) {
  const { t } = aiFieldInputLocale.useTranslations();

  return (
    <span className={styles.root}>
      <HotSpot
        enabled={indicator}
        appearance={APPEARANCE.Green}
        pulse={false}
        placement={PLACEMENT.RightTop}
        offsetX={HALF_DOT}
        offsetY={-HALF_DOT}
        data-test-id={TEST_IDS.scrollButtonIndicator}
      >
        <AiButtonControls
          direction={DIRECTION.Down}
          aria-label={t('scrollDown')}
          data-test-id={TEST_IDS.scrollButton}
          onClick={onClick}
        />
      </HotSpot>
    </span>
  );
}

import { AiButtonGigaFunction, APPEARANCE as GIGA_APPEARANCE } from '@ds/ai-button-giga';
import { APPEARANCE as LINK_APPEARANCE, Link } from '@ds/link';
import { Tooltip } from '@ds/tooltip';
import { Typography } from '@ds/typography';

import { Size } from '../../AiSuggestionPanel';
import { TEST_IDS } from '../../constants';
import { aiSuggestionPanelLocale } from '../../locale';
import styles from './styles.module.scss';

const TOOLTIP_DELAY_OPEN_MS = 350;

type LogoCellProps = {
  size: Size;
};

/** Ячейка для ряда замера: та же кнопка, чтобы ширина совпадала на любой платформе. */
export function LogoCell({ size }: LogoCellProps) {
  return (
    <span className={styles.logoCell}>
      <AiButtonGigaFunction
        size={size}
        appearance={GIGA_APPEARANCE.Neutral}
        className={styles.logoButton}
        tabIndex={-1}
        data-test-id=''
      />
    </span>
  );
}

export type LogoButtonProps = LogoCellProps & {
  docsUrl: string;
  onClick?(): void;
};

export function LogoButton({ size, docsUrl, onClick }: LogoButtonProps) {
  const { t } = aiSuggestionPanelLocale.useTranslations();

  const tip = (
    <span className={styles.tooltip} data-test-id={TEST_IDS.logoTooltip}>
      <Typography
        variant='label'
        size='m'
        as='span'
        className={styles.tooltipTitle}
        data-test-id={TEST_IDS.tooltipTitle}
      >
        {t('tooltipTitle')}
      </Typography>
      <Typography variant='body' size='s' as='span' data-test-id={TEST_IDS.tooltipDescription}>
        {t('tooltipDescription')}
      </Typography>
      <Link
        underlined
        className={styles.docsLink}
        label={t('documentationLink')}
        appearance={LINK_APPEARANCE.InvertNeutral}
        href={docsUrl}
        target='_blank'
        data-test-id={TEST_IDS.documentationLink}
      />
    </span>
  );

  return (
    <span className={styles.logoCell}>
      <Tooltip tip={tip} placement='bottom-start' hoverDelayOpen={TOOLTIP_DELAY_OPEN_MS} disableSpanWrapper>
        <AiButtonGigaFunction
          size={size}
          appearance={GIGA_APPEARANCE.Neutral}
          className={styles.logoButton}
          aria-label={t('tooltipTitle')}
          data-test-id={TEST_IDS.logo}
          onClick={onClick}
        />
      </Tooltip>
    </span>
  );
}

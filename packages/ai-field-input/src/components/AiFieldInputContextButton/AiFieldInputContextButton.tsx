import { withInnerRefSupport } from '@ds/utils';
import cn from 'classnames';

import { TEST_IDS } from '../../constants';
import { FooterTooltip } from '../../helperComponents';
import { aiFieldInputLocale } from '../../locale';
import { AiFieldInputContextButtonProps } from '../../types';
import { clampPercent, resolveContextProgress } from '../../utils';
import styles from './styles.module.scss';

const VIEWBOX = 16;
const RADIUS = 7;

export function AiFieldInputContextButton({
  value,
  progress,
  tooltip,
  onClick,
  innerRef,
  className,
  'data-test-id': dataTestId = TEST_IDS.context,
  ...rest
}: AiFieldInputContextButtonProps) {
  const { t } = aiFieldInputLocale.useTranslations();
  const percent = clampPercent(value);
  const resolvedProgress = progress ?? resolveContextProgress(percent);

  return (
    <FooterTooltip tooltip={tooltip}>
      <button
        {...rest}
        ref={innerRef}
        type='button'
        className={cn(styles.root, className)}
        data-progress={resolvedProgress}
        data-test-id={dataTestId}
        aria-label={t('context')}
        onClick={onClick}
      >
        <span className={styles.stateLayer} data-state='emptyNeutralOnBackground' aria-hidden />
        <svg className={styles.indicator} viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`} aria-hidden>
          <circle className={styles.base} cx={VIEWBOX / 2} cy={VIEWBOX / 2} r={RADIUS} pathLength={100} />
          <circle
            className={styles.progress}
            cx={VIEWBOX / 2}
            cy={VIEWBOX / 2}
            r={RADIUS}
            pathLength={100}
            strokeDasharray={`${percent} 100`}
          />
        </svg>
      </button>
    </FooterTooltip>
  );
}

withInnerRefSupport(AiFieldInputContextButton);

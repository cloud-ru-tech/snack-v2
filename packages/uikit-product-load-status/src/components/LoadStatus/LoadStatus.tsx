import { NotifierCriticalFilledSVG } from '@ds/icons';
import { APPEARANCE, PROGRESS_BAR_SIZE, ProgressBar, ProgressBarProps } from '@ds/progress-bar';
import { SIZE, Typography, VARIANT, WEIGHT } from '@ds/typography';
import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { forwardRef } from 'react';

import { DEFAULT_APPEARANCE_BY_PROGRESS, SYMBOL_BY_TYPE, TEST_IDS } from '../../constants';
import { LoadValueType, ProgressLimitList } from '../types';
import { getProgressBarColor } from '../utils';
import styles from './styles.module.scss';

export type LoadStatusProps = WithSupportProps<
  {
    /** Заголовок строки загрузки */
    label?: string;
    /** Дополнительный текст в заголовке (рядом с label) */
    value?: string;
    /** Подсказка под полосой прогресса */
    hint?: string;
    /** Формат значения в заголовке: без процента (`none`) или с процентом (`percent`) */
    valueType?: LoadValueType;
    /** Правила смены цвета полосы в зависимости от `progress`; при `showError` игнорируются */
    appearanceByProgress?: ProgressLimitList;
    /** Ошибка: полоса `red` */
    showError?: boolean;
    /** Иконка в hint; показывается при `hint` и вместе с `showError` */
    showErrorIcon?: boolean;
    /** CSS-класс корневого элемента */
    className?: string;
  } & Pick<ProgressBarProps, 'progress' | 'size'>
>;

export const LoadStatus = forwardRef<HTMLDivElement, LoadStatusProps>(function LoadStatus(
  {
    label,
    value,
    hint,
    valueType = 'none',
    progress,
    size = PROGRESS_BAR_SIZE.S,
    appearanceByProgress = DEFAULT_APPEARANCE_BY_PROGRESS,
    showError,
    showErrorIcon,
    className,
    ...props
  },
  ref,
) {
  const progressAppearance = showError ? APPEARANCE.Red : getProgressBarColor(progress, appearanceByProgress);
  const isShowHeader = Boolean(label || value || valueType !== 'none');
  const resolvedValueType: LoadValueType = valueType;
  const symbol = SYMBOL_BY_TYPE[resolvedValueType];

  const progressSymbolValue = !symbol ? progress : `${progress}${symbol}`;

  return (
    <div
      className={cn(styles.loadStatus, className)}
      ref={ref}
      data-test-id={TEST_IDS.root}
      {...extractSupportProps(props)}
    >
      {isShowHeader && (
        <div className={styles.header} data-test-id={TEST_IDS.header}>
          <Typography className={styles.labelRow} variant={VARIANT.body} size={SIZE.m} weight={WEIGHT.regular}>
            {label}

            {value && <span className={styles.labelValue}>{value}</span>}
          </Typography>

          {symbol && (
            <Typography className={styles.valueSymbol} variant={VARIANT.body} size={SIZE.m} weight={WEIGHT.regular}>
              {progressSymbolValue}
            </Typography>
          )}
        </div>
      )}
      <ProgressBar progress={progress} size={size} appearance={progressAppearance} />

      {hint && (
        <div className={styles.hintWrapper} data-test-id={TEST_IDS.hint}>
          {showErrorIcon && (
            <NotifierCriticalFilledSVG className={styles.errorIcon} size={16} data-test-id={TEST_IDS.errorIcon} />
          )}

          <Typography className={styles.hint} variant={VARIANT.body} size={SIZE.m} weight={WEIGHT.regular}>
            {hint}
          </Typography>
        </div>
      )}
    </div>
  );
});

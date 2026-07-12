import { Spinner } from '@ds/loader';
import { ProgressBarCircle } from '@ds/progress-bar';
import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { JSX } from 'react';

import { APPEARANCE, STATUS_SIZE, TEST_IDS } from '../../constants';
import { Appearance, StatusSize } from '../../types';
import { StatusIndicator } from '../StatusIndicator';
import styles from './styles.module.scss';

const MAP_SIZE_TO_INDICATOR_SIZE = {
  xs: '3xs',
  s: '2xs',
} as const;

export type StatusProps = WithSupportProps<{
  /** Подпись к индикатору (точка с текстом). Если не передано — только точка */
  label: string;
  /** Размер индикатора и подписи */
  size?: StatusSize;
  /** Внешний вид (цветовая схема) */
  appearance?: Appearance;
  /** CSS-класс */
  className?: string;
  /** Наличие фона */
  hasBackground?: boolean;
  /** Состояние загрузки */
  loading?: boolean;
  /** Прогресс загрузки (от 0 до 100) */
  progress?: number;
}>;

export function Status({
  label,
  size = STATUS_SIZE.S,
  appearance: appearanceProp = APPEARANCE.Neutral,
  className,
  loading = false,
  hasBackground = false,
  progress,
  ...rest
}: StatusProps) {
  let marker: JSX.Element;
  let appearance = appearanceProp;

  if (loading) {
    appearance = APPEARANCE.Neutral;
    marker = <Spinner size='xs' />;
  } else if (progress !== undefined) {
    marker = <ProgressBarCircle progress={progress} appearance={appearance} size='xs' />;
  } else {
    marker = (
      <StatusIndicator size={MAP_SIZE_TO_INDICATOR_SIZE[size]} appearance={appearance} className={styles.indicator} />
    );
  }

  return (
    <div
      role='status'
      {...extractSupportProps(rest)}
      className={cn(styles.container, className)}
      data-size={size}
      data-appearance={appearance}
      data-has-background={hasBackground || undefined}
    >
      <div className={styles.centeredWrapper}>{marker}</div>
      <label className={styles.textWrapper} data-test-id={TEST_IDS.status.label}>
        {/* TODO: <TruncateString> - компонент в работе */}
        {label}
        {/* </TruncateString> */}
      </label>
    </div>
  );
}

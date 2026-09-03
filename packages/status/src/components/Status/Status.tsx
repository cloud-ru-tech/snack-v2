import { Spinner } from '@ds/loader';
import { ProgressBarCircle } from '@ds/progress-bar';
import { TruncateString, TruncateStringProps } from '@ds/truncate-string';
import { extractSupportProps, withInnerRefSupport, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { JSX, Ref } from 'react';

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
  /** Вариант обрезания подписи, не поместившейся в контейнер. */
  truncateVariant?: TruncateStringProps['variant'];
  /** Наличие фона */
  background?: boolean;
  /** Состояние загрузки */
  loading?: boolean;
  /** Прогресс загрузки (от 0 до 100) */
  progress?: number;
  /**
   * Ref на корневой DOM-элемент.
   * Используем явный проп, чтобы не зависеть от `forwardRef` и не тащить type-assertions на экспорт.
   */
  innerRef?: Ref<HTMLDivElement>;
}>;

export function Status({
  label,
  truncateVariant,
  size = STATUS_SIZE.S,
  appearance: appearanceProp = APPEARANCE.Neutral,
  className,
  loading = false,
  background = false,
  progress,
  innerRef,
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
      ref={innerRef}
      role='status'
      {...extractSupportProps(rest)}
      className={cn(styles.container, className)}
      data-size={size}
      data-appearance={appearance}
      data-background={background || undefined}
    >
      <div className={styles.centeredWrapper}>{marker}</div>
      <span className={styles.label} data-test-id={TEST_IDS.status.label}>
        <TruncateString text={label} variant={truncateVariant} />
      </span>
    </div>
  );
}

withInnerRefSupport(Status);

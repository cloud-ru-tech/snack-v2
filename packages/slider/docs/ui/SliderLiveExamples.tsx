import 'rc-slider/assets/index.css';
import '@packages/slider/src/components/slider.scss';

import { Slider, type SliderProps } from '@packages/slider/src';
import cn from 'classnames';
import { type ReactNode, useState } from 'react';

import styles from './styles.module.scss';

/** Use instead of `ExampleContainer` so rc-slider marks/track keep correct spacing. */
export function SliderLiveExampleShell({ children }: { children: ReactNode }) {
  return <div className={styles.docsLiveShell}>{children}</div>;
}

const MARKS_LINEAR: NonNullable<SliderProps['marks']> = {
  10: '10',
  20: '20',
  30: '30',
  40: '40',
  50: '50',
};

const MARKS_NON_LINEAR: NonNullable<SliderProps['marks']> = {
  1: '1',
  2: '2',
  4: '4',
  8: '8',
  16: '16',
  24: '24',
  32: '32',
};

function sortedMarkKeys(marks: NonNullable<SliderProps['marks']>): number[] {
  return Object.keys(marks)
    .map(k => Number(k))
    .filter(k => !Number.isNaN(k))
    .sort((a, b) => a - b);
}

/** Single value, linear scale, marks aligned to numeric positions. */
export function SliderSingleWithMarksExample() {
  return (
    <div className={styles.wrapper}>
      <Slider min={10} max={50} step={10} defaultValue={30} marks={MARKS_LINEAR} />
    </div>
  );
}

/** Range, same linear marks. */
export function SliderRangeWithMarksExample() {
  return (
    <div className={styles.wrapper}>
      <Slider range min={10} max={50} step={10} defaultValue={[20, 40]} marks={MARKS_LINEAR} />
    </div>
  );
}

/** Tooltip on the handle; `tipFormatter` for units. */
export function SliderHandleTipExample() {
  return (
    <div className={styles.wrapper}>
      <Slider handleTip tipFormatter={v => `${v} мин`} min={0} max={100} defaultValue={50} />
    </div>
  );
}

/**
 * Non-linear mark values: linear axis vs evenly spaced labels (`marksEqualSpacing`).
 * Controlled state shows the same domain values in both cases.
 */
export function SliderMarksEqualSpacingComparisonExample() {
  const keys = sortedMarkKeys(MARKS_NON_LINEAR);
  const linearMin = keys[0] ?? 0;
  const linearMax = keys[keys.length - 1] ?? 100;

  const [valueLinear, setValueLinear] = useState(8);
  const [valueEqual, setValueEqual] = useState(8);

  return (
    <div className={cn(styles.wrapper, styles.comparison)}>
      <div className={styles.comparisonGrid}>
        <div className={styles.comparisonColumn}>
          <div className={styles.comparisonSliderHost}>
            <Slider
              marks={MARKS_NON_LINEAR}
              marksEqualSpacing={false}
              min={linearMin}
              max={linearMax}
              step={null}
              value={valueLinear}
              onChange={setValueLinear}
            />
          </div>
          <p className={styles.comparisonCaption}>Линейная ось (min / max / step по значениям)</p>
        </div>
        <div className={styles.comparisonColumn}>
          <div className={styles.comparisonSliderHost}>
            <Slider marks={MARKS_NON_LINEAR} marksEqualSpacing={true} value={valueEqual} onChange={setValueEqual} />
          </div>
          <p className={styles.comparisonCaption}>Равные интервалы подписей (marksEqualSpacing)</p>
        </div>
      </div>
    </div>
  );
}

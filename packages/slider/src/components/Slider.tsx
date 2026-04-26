import 'rc-slider/assets/index.css';

import './slider.scss';

import { excludeSupportProps, extractSupportProps } from '@ds/utils';
import cn from 'classnames';
import RcSlider, { SliderProps as RCSliderProps } from 'rc-slider';
import { ReactNode, useCallback, useMemo } from 'react';

import { THEME_CLASS } from './constants';
import {
  buildMarksByIndex,
  createTipHandleRender,
  getSortedMarkValues,
  internalToDomain,
  mapDomainValueToEqualInternal,
  mapInternalToDomain,
  snapToMarkIndex,
  swipeOnlyHandleRender,
} from './utils';

export type SliderProps = Omit<
  RCSliderProps,
  | 'trackStyle'
  | 'handleStyle'
  | 'railStyle'
  | 'dotStyle'
  | 'activeDotStyle'
  | 'styles'
  | 'classNames'
  | 'prefixCls'
  | 'style'
  | 'handleRender'
  | 'vertical'
> & {
  /** Показывать значение в тултипе на ручке */
  handleTip?: boolean;
  /** Форматирование подсказки; по умолчанию — сырое значение */
  tipFormatter?(value: string | number): ReactNode;
  /** Включение равномерного распределения при нелинейных значениях меток. */
  marksEqualSpacing?: boolean;
  /** Стабильный идентификатор для e2e/tests */
  'data-test-id'?: string;
};

export function Slider({
  className,
  handleTip,
  tipFormatter,
  marksEqualSpacing,
  marks,
  min,
  max,
  step,
  value,
  defaultValue,
  onChange,
  onChangeComplete,
  onBeforeChange,
  onAfterChange,
  range,
  ...rest
}: SliderProps) {
  const markValues = useMemo(() => (marks ? getSortedMarkValues(marks) : []), [marks]);

  const useEqual = marksEqualSpacing === true && Boolean(marks && markValues.length > 0);

  const lastIndex = Math.max(0, markValues.length - 1);

  const rcMin = useEqual ? 0 : min;
  const rcMax = useEqual ? lastIndex : max;
  const rcStep = useEqual ? 1 : step;
  const rcMarks = useEqual && marks ? buildMarksByIndex(markValues, marks) : marks;

  const toInternal = useCallback((d: number) => snapToMarkIndex(d, markValues), [markValues]);

  const isRange = Boolean(range);

  const rcValue = useMemo(
    () => mapDomainValueToEqualInternal(useEqual, isRange, value, toInternal),
    [useEqual, value, isRange, toInternal],
  );

  const rcDefaultValue = useMemo(
    () => mapDomainValueToEqualInternal(useEqual, isRange, defaultValue, toInternal),
    [useEqual, defaultValue, isRange, toInternal],
  );

  const mapOut = useCallback(
    (v: number | number[]) => mapInternalToDomain(v, isRange, markValues),
    [isRange, markValues],
  );

  const wrap = useCallback(
    (handler: ((v: number | number[]) => void) | undefined) => {
      if (!handler) {
        return undefined;
      }
      if (!useEqual) {
        return handler;
      }
      return (v: number | number[]) => handler(mapOut(v) as never);
    },
    [useEqual, mapOut],
  );

  const handleRender = useMemo(() => {
    if (!handleTip) {
      return swipeOnlyHandleRender;
    }
    const domain = useEqual && markValues.length > 0 ? (v: number) => internalToDomain(v, markValues) : undefined;
    return createTipHandleRender(tipFormatter, domain);
  }, [handleTip, tipFormatter, useEqual, markValues]);

  return (
    <div {...extractSupportProps(rest)} className={className}>
      <RcSlider
        key={JSON.stringify({ marks, marksEqualSpacing })}
        className={cn(THEME_CLASS, {
          withMarks: Boolean(marks),
          reverse: Boolean(rest.reverse),
        })}
        handleRender={handleRender}
        min={rcMin}
        max={rcMax}
        step={rcStep}
        marks={rcMarks}
        value={rcValue}
        defaultValue={rcDefaultValue}
        range={range}
        onChange={wrap(onChange)}
        onChangeComplete={wrap(onChangeComplete)}
        onBeforeChange={wrap(onBeforeChange)}
        onAfterChange={wrap(onAfterChange)}
        {...excludeSupportProps(rest)}
      />
    </div>
  );
}

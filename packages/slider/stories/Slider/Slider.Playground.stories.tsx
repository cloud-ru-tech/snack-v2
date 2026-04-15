import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import sliderReadme from '../../README.md?raw';
import { Slider } from '../../src';
import { getSortedMarkValues } from '../../src/components/utils';
import styles from '../styles.module.scss';
import { LINEAR_MARKS, MARK_PRESETS } from './constants';
import type { StoryProps } from './types';
import { computeValueFromArgs, formatStateValue } from './utils';

const meta: Meta<StoryProps> = {
  title: 'Components/Slider/Playground',
  component: Slider,
  parameters: {
    readme: { content: sliderReadme },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=3461-243&m=dev',
    },
  },
  args: {
    marksPreset: 'linear',
    min: 10,
    max: 50,
    step: 10,
    disabled: false,
    range: false,
    handleTip: false,
    showMarks: true,
    defaultValue: 30,
    marksEqualSpacing: false,
    reverse: false,
    'data-test-id': undefined,
  },
  argTypes: {
    marksPreset: {
      name: 'Marks preset',
      control: 'select',
      options: ['linear', ...Object.keys(MARK_PRESETS)] as Array<StoryProps['marksPreset']>,
      description:
        '`linear`: шкала 10…50 и `min` / `max` / `step`. Остальные варианты — демо-наборы для сравнения равномерных и линейных меток.',
      table: { category: 'Scale' },
    },
    showMarks: {
      name: '[Story] showMarks',
      description: 'Показывать подписи меток под треком (для всех пресетов меток).',
      table: { category: 'Story' },
    },
    marksEqualSpacing: {
      name: 'Equal mark spacing',
      control: 'boolean',
      description:
        'Равномерный шаг меток по нелинейным ключам. Булевы из URL: `args=marksEqualSpacing:!false` / `!true`.',
      table: { category: 'Mode' },
    },
    min: { table: { category: 'Slider' } },
    max: { table: { category: 'Slider' } },
    step: { table: { category: 'Slider' } },
    defaultValue: {
      name: 'defaultValue',
      description: 'Начальное значение для стора (число или кортеж при `range: true`).',
      table: { category: 'Slider' },
    },
    range: { table: { category: 'Mode' } },
    handleTip: { table: { category: 'Mode' } },
    disabled: { table: { category: 'State' } },
    reverse: { table: { category: 'Mode' } },
    className: { table: { category: 'Styling' } },
    tipFormatter: { control: false, table: { disable: true } },
    'data-test-id': {
      control: false,
      description: 'Test ID для автотестов',
      table: { category: 'Testing' },
    },
  },
};

export default meta;

type Story = StoryObj<StoryProps>;

function PlaygroundDemo(props: StoryProps) {
  /* eslint-disable @typescript-eslint/no-unused-vars -- omit marks/value/onChange/defaultValue from `rest` */
  const {
    showMarks,
    marksPreset,
    marksEqualSpacing,
    range,
    handleTip,
    disabled,
    reverse,
    min = 0,
    max = 100,
    step = 1,
    className,
    tipFormatter,
    marks,
    value: valueFromProps,
    onChange,
    defaultValue,
    ...rest
  } = props;
  /* eslint-enable @typescript-eslint/no-unused-vars */

  const presetDefinition = marksPreset === 'linear' ? LINEAR_MARKS : MARK_PRESETS[marksPreset];
  const keys = getSortedMarkValues(presetDefinition);
  const marksFromPreset = showMarks ? presetDefinition : undefined;

  const linearMin = keys[0] ?? 0;
  const linearMax = keys[keys.length - 1] ?? 100;

  const isLinear = marksPreset === 'linear';
  const useEqualSpacing = marksEqualSpacing === true;

  let sliderMin: number | undefined;
  let sliderMax: number | undefined;
  let sliderStep: number | null | undefined;

  if (isLinear) {
    sliderMin = min;
    sliderMax = max;
    sliderStep = step;
  } else if (useEqualSpacing) {
    sliderMin = undefined;
    sliderMax = undefined;
    sliderStep = undefined;
  } else {
    sliderMin = linearMin;
    sliderMax = linearMax;
    sliderStep = null;
  }

  const [value, setValue] = useState<number | [number, number]>(() => computeValueFromArgs(props));

  const defaultValueKey = JSON.stringify(defaultValue);

  useEffect(() => {
    setValue(computeValueFromArgs(props));
    // Сброс при смене шкалы/режима и при изменении `defaultValue` в Controls.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- намеренно не все поля `props`, чтобы не затирать позицию после drag
  }, [marksPreset, range, showMarks, marksEqualSpacing, defaultValueKey]);

  const handleChange = (v: number | number[]) => {
    if (range && Array.isArray(v) && v.length >= 2) {
      setValue([v[0], v[1]]);
      return;
    }
    if (!range && typeof v === 'number') {
      setValue(v);
    }
  };

  return (
    <div className={styles.sliderWrap}>
      <Slider
        key={`${marksPreset}-${String(range)}-${String(showMarks)}-${String(marksEqualSpacing)}`}
        {...rest}
        className={className}
        tipFormatter={tipFormatter}
        marksEqualSpacing={useEqualSpacing}
        marks={marksFromPreset}
        range={range}
        value={value}
        onChange={handleChange}
        handleTip={handleTip}
        disabled={disabled}
        reverse={reverse}
        min={sliderMin}
        max={sliderMax}
        step={sliderStep}
      />
      <p className={styles.equalSpacingState} role='status' aria-live='polite'>
        Текущее <code>value</code> (контролируется через <code>useState</code>):{' '}
        <strong>{formatStateValue(value)}</strong>
      </p>
    </div>
  );
}

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => <PlaygroundDemo {...args} />,
};

import { FieldStepper, SIZE, VALIDATION_STATE } from '@ds/fields';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './stories.module.scss';

const meta: Meta<typeof FieldStepper> = {
  title: 'Components/Fields/FieldStepper',
  component: FieldStepper,
};

export default meta;
type Story = StoryObj<typeof FieldStepper>;

const keySizes = [SIZE.S, SIZE.M, SIZE.L] as const;
const keyStates = [
  VALIDATION_STATE.Default,
  VALIDATION_STATE.Error,
  VALIDATION_STATE.Warning,
  VALIDATION_STATE.Success,
] as const;

// Слоты (prefix/postfix), границы (− disabled на min, + disabled на max), дробный шаг и
// background=false — оси API, которые не выражаются через Size × ValidationState.
const slotsAndStates = [
  { key: 'default', extra: { defaultValue: 5 } },
  { key: 'with postfix', extra: { defaultValue: 12, postfix: 'шт' } },
  { key: 'with prefix', extra: { defaultValue: 100, prefix: '₽' } },
  { key: 'prefix + postfix', extra: { defaultValue: 100, prefix: '₽', postfix: 'шт' } },
  { key: 'at min (− disabled)', extra: { defaultValue: 0, min: 0, max: 10 } },
  { key: 'at max (+ disabled)', extra: { defaultValue: 10, min: 0, max: 10 } },
  { key: 'fractional step', extra: { defaultValue: 1.5, step: 0.5 } },
  { key: 'background=false', extra: { defaultValue: 5, background: false } },
] as const;

const interactivity = [
  { key: 'default', extra: {} },
  { key: 'readonly', extra: { readonly: true } },
  { key: 'disabled', extra: { disabled: true } },
] as const;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='Size × ValidationState'
        firstColumnHeader='Size'
        columnHeaders={keyStates.map(s => s.toUpperCase())}
        rows={keySizes.map(size => ({
          variantLabel: size,
          cells: keyStates.map(state => (
            <FieldStepper
              key={state}
              className={styles.stepper}
              size={size}
              validationState={state}
              label='Quantity'
              hint={state === VALIDATION_STATE.Default ? 'Hint' : `${state} hint`}
              showHintIcon
              defaultValue={5}
              postfix='шт'
            />
          )),
        }))}
      />

      <StoryTable
        sectionTitle='Slots & numeric states (size=m)'
        firstColumnHeader='State'
        columnHeaders={['Render']}
        rows={slotsAndStates.map(({ key, extra }) => ({
          variantLabel: key,
          cells: [
            <FieldStepper
              key={key}
              className={styles.stepper}
              size={SIZE.M}
              validationState={VALIDATION_STATE.Default}
              label='Quantity'
              {...extra}
            />,
          ],
        }))}
      />

      <StoryTable
        sectionTitle='Size × Interactivity'
        firstColumnHeader='Size'
        columnHeaders={interactivity.map(i => i.key.toUpperCase())}
        rows={keySizes.map(size => ({
          variantLabel: size,
          cells: interactivity.map(({ key, extra }) => (
            <FieldStepper
              key={key}
              className={styles.stepper}
              size={size}
              validationState={VALIDATION_STATE.Default}
              label='Quantity'
              defaultValue={5}
              postfix='шт'
              {...extra}
            />
          )),
        }))}
      />
    </div>
  ),
};

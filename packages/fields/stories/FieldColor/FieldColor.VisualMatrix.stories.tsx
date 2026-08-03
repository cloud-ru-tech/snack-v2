import { FieldColor, SIZE, VALIDATION_STATE } from '@ds/fields';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './stories.module.scss';

// Оси availableModes / withAlpha / autoApply живут внутри ColorPicker в popover
// и здесь, в закрытом триггере, не видны. Они покрываются demo-сценариями
// ColorModes и ColorWithAlpha (см. docs/color.mdx).
const meta: Meta<typeof FieldColor> = {
  title: 'Components/Fields/FieldColor',
  component: FieldColor,
};

export default meta;
type Story = StoryObj<typeof FieldColor>;

const keySizes = [SIZE.S, SIZE.M, SIZE.L] as const;
const keyStates = [
  VALIDATION_STATE.Default,
  VALIDATION_STATE.Error,
  VALIDATION_STATE.Warning,
  VALIDATION_STATE.Success,
] as const;

const stateExtras = [
  { key: 'empty', extra: { defaultValue: '' } },
  { key: 'filled', extra: { defaultValue: '#ff5722' } },
  { key: 'alpha', extra: { defaultValue: 'rgba(33,150,243,0.5)' } },
  { key: 'disabled', extra: { defaultValue: '#4caf50', disabled: true } },
  { key: 'readonly', extra: { defaultValue: '#9c27b0', readonly: true } },
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
            <FieldColor
              key={state}
              size={size}
              validationState={state}
              label='Color'
              hint={state === VALIDATION_STATE.Default ? 'Hint' : `${state} hint`}
              showHintIcon
              defaultValue='#1976d2'
            />
          )),
        }))}
      />

      <StoryTable
        sectionTitle='State (size=m)'
        firstColumnHeader='State'
        columnHeaders={['Render']}
        rows={stateExtras.map(({ key, extra }) => ({
          variantLabel: key,
          cells: [
            <FieldColor key={key} size={SIZE.M} validationState={VALIDATION_STATE.Default} label='Color' {...extra} />,
          ],
        }))}
      />

      <StoryTable
        sectionTitle='Background (size=m)'
        firstColumnHeader='Background'
        columnHeaders={['Render']}
        rows={[
          {
            variantLabel: 'true (acrylic shell)',
            cells: [
              <FieldColor
                key='bg-on'
                size={SIZE.M}
                validationState={VALIDATION_STATE.Default}
                label='Color'
                background
                defaultValue='#1976d2'
              />,
            ],
          },
          {
            variantLabel: 'false (no acrylic)',
            cells: [
              <FieldColor
                key='bg-off'
                size={SIZE.M}
                validationState={VALIDATION_STATE.Default}
                label='Color'
                background={false}
                defaultValue='#1976d2'
              />,
            ],
          },
        ]}
      />
    </div>
  ),
};

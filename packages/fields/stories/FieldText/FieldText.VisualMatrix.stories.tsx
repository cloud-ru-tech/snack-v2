import { FieldText, SIZE, VALIDATION_STATE } from '@ds/fields';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './stories.module.scss';

const meta: Meta<typeof FieldText> = {
  title: 'Components/Fields/FieldText',
  component: FieldText,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof FieldText>;

const keySizes = [SIZE.S, SIZE.M, SIZE.L] as const;
const keyStates = [
  VALIDATION_STATE.Default,
  VALIDATION_STATE.Error,
  VALIDATION_STATE.Warning,
  VALIDATION_STATE.Success,
  VALIDATION_STATE.Valid,
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
            <FieldText
              key={state}
              size={size}
              validationState={state}
              label='Label'
              hint={state === VALIDATION_STATE.Default ? 'Hint' : `${state} hint`}
              showHintIcon
              defaultValue='Value'
            />
          )),
        }))}
      />

      <StoryTable
        sectionTitle='State (size=m)'
        firstColumnHeader='State'
        columnHeaders={['Render']}
        rows={[
          {
            variantLabel: 'placeholder',
            cells: [<FieldText key='ph' size={SIZE.M} label='Label' placeholder='Введите значение' />],
          },
          {
            variantLabel: 'readonly + copy',
            cells: [<FieldText key='ro' size={SIZE.M} label='Token' readonly defaultValue='sk-XXXXXXXX' />],
          },
          {
            variantLabel: 'disabled',
            cells: [<FieldText key='dis' size={SIZE.M} label='Label' disabled defaultValue='Value' />],
          },
          {
            variantLabel: 'required + caption',
            cells: [<FieldText key='req' size={SIZE.M} label='Label' required caption='Caption' hint='Hint' />],
          },
          {
            variantLabel: 'counter',
            cells: [<FieldText key='cnt' size={SIZE.M} label='Label' maxLength={40} defaultValue='Value' />],
          },
        ]}
      />
    </div>
  ),
};

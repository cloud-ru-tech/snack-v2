import { FieldSecure, SIZE, VALIDATION_STATE } from '@ds/fields';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './stories.module.scss';

const meta: Meta<typeof FieldSecure> = {
  title: 'Components/Fields/FieldSecure',
  component: FieldSecure,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof FieldSecure>;

const keySizes = [SIZE.S, SIZE.M, SIZE.L] as const;
const keyStates = [
  VALIDATION_STATE.Default,
  VALIDATION_STATE.Error,
  VALIDATION_STATE.Warning,
  VALIDATION_STATE.Success,
  VALIDATION_STATE.Valid,
] as const;

const SECRET = 'sup3r-secret';

const stateExtras = [
  { key: 'empty', extra: { defaultValue: '', placeholder: '••••••••' } },
  { key: 'hidden value', extra: { defaultValue: SECRET, defaultHidden: true } },
  { key: 'visible value', extra: { defaultValue: SECRET, defaultHidden: false } },
  { key: 'readonly + copy', extra: { defaultValue: SECRET, readonly: true, defaultHidden: true } },
  // readonly без значения: «глаз» скрыт (showHideUi=false при readonly && !value), copy тоже нет.
  { key: 'readonly empty', extra: { defaultValue: '', readonly: true } },
  { key: 'no hide button', extra: { defaultValue: SECRET, showHideButton: false } },
  // readonly + showCopyButton=false: остаётся только «глаз».
  { key: 'copy button hidden', extra: { defaultValue: SECRET, readonly: true, showCopyButton: false } },
  { key: 'no background', extra: { defaultValue: SECRET, background: false } },
  { key: 'disabled', extra: { defaultValue: SECRET, disabled: true } },
  // error-проп форсит красный тон оболочки и выводит сообщение в hint — отлично от validationState='error'.
  { key: 'error message', extra: { defaultValue: SECRET, error: 'Wrong password' } },
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
            <FieldSecure
              key={state}
              size={size}
              validationState={state}
              label='Password'
              hint={state === VALIDATION_STATE.Default ? 'Hint' : `${state} hint`}
              showHintIcon
              defaultValue={SECRET}
              defaultHidden
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
            <FieldSecure
              key={key}
              size={SIZE.M}
              validationState={VALIDATION_STATE.Default}
              label='Password'
              {...extra}
            />,
          ],
        }))}
      />
    </div>
  ),
};

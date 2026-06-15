import { TimeValue } from '@ds/calendar';
import { FieldTime, FieldTimeProps, SIZE, VALIDATION_STATE } from '@ds/fields';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './stories.module.scss';

const meta: Meta<typeof FieldTime> = {
  title: 'Components/Fields/FieldTime',
  component: FieldTime,
  parameters: { controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof FieldTime>;

const keySizes = [SIZE.S, SIZE.M, SIZE.L] as const;
// Все 5 публичных значений валидации (паритет с FieldDate). `valid` — отдельная колонка:
// тонировка фона на decorator-уровне совпадает с default, но колонка обязательна для полноты оси.
const keyStates = [
  VALIDATION_STATE.Default,
  VALIDATION_STATE.Error,
  VALIDATION_STATE.Warning,
  VALIDATION_STATE.Success,
  VALIDATION_STATE.Valid,
] as const;

const sample: TimeValue = { hours: 14, minutes: 25, seconds: 36 };

// hover / focused / input — динамические псевдо-состояния (Figma state-ось), статикой в матрице
// не выражаются, их несёт interaction-states.png.

const stateExtras: { key: string; extra: Partial<FieldTimeProps> }[] = [
  { key: 'empty', extra: {} },
  { key: 'filled', extra: { defaultValue: sample } },
  { key: 'disabled', extra: { defaultValue: sample, disabled: true } },
  { key: 'readonly', extra: { defaultValue: sample, readonly: true } },
];

// Маска зависит от showSeconds: чч:мм:сс (true) ↔ чч:мм (false). Проверяем обе формы пустыми и
// заполненными — это ключевая ось FieldTime, невыразимая в Size × ValidationState.
const maskRows: { key: string; extra: Partial<FieldTimeProps> }[] = [
  { key: 'showSeconds=true (чч:мм:сс)', extra: { showSeconds: true } },
  { key: 'showSeconds=false (чч:мм)', extra: { showSeconds: false } },
];

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='Size × ValidationState (filled 14:25:36)'
        firstColumnHeader='Size'
        columnHeaders={keyStates.map(s => s.toUpperCase())}
        rows={keySizes.map(size => ({
          variantLabel: size,
          cells: keyStates.map(state => (
            <div key={state} className={styles.narrow}>
              <FieldTime
                size={size}
                validationState={state}
                label='Время'
                hint={state === VALIDATION_STATE.Default ? 'Hint' : `${state} hint`}
                showHintIcon
                defaultValue={sample}
              />
            </div>
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
            <div key={key} className={styles.narrow}>
              <FieldTime size={SIZE.M} validationState={VALIDATION_STATE.Default} label='Время' {...extra} />
            </div>,
          ],
        }))}
      />

      <StoryTable
        sectionTitle='Mask: seconds on/off (size=m)'
        firstColumnHeader='Mask'
        columnHeaders={['Empty', 'Filled']}
        rows={maskRows.map(({ key, extra }) => ({
          variantLabel: key,
          cells: [
            <div key={`${key}-empty`} className={styles.narrow}>
              <FieldTime size={SIZE.M} label='Время' {...extra} />
            </div>,
            <div key={`${key}-filled`} className={styles.narrow}>
              <FieldTime size={SIZE.M} label='Время' defaultValue={sample} {...extra} />
            </div>,
          ],
        }))}
      />
    </div>
  ),
};

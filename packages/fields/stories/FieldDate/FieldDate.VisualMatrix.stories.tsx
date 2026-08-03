import { DATE_MODE, FieldDate, FieldDateProps, SIZE, VALIDATION_STATE } from '@ds/fields';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './stories.module.scss';

const meta: Meta<typeof FieldDate> = {
  title: 'Components/Fields/FieldDate',
  component: FieldDate,
  parameters: { controls: { disable: true } },
};
export default meta;
type Story = StoryObj<typeof FieldDate>;

const keySizes = [SIZE.S, SIZE.M, SIZE.L] as const;
const keyStates = [
  VALIDATION_STATE.Default,
  VALIDATION_STATE.Error,
  VALIDATION_STATE.Warning,
  VALIDATION_STATE.Success,
] as const;

// Hover / focused / input — динамические псевдо-состояния (Figma state-ось), статикой в матрице
// не выражаются, их несёт interaction-states.png.

const fixedDate = new Date(2026, 4, 17); // 17.05.2026
const fixedDateTo = new Date(2026, 4, 24); // 24.05.2026
const fixedDateTime = new Date(2026, 4, 17, 14, 30, 45);

// Mode × state: каждая ось value=false/true × mode × disabled/readonly из Figma-мастера.
const modes: { key: string; extra: Partial<FieldDateProps> }[] = [
  { key: 'empty (date)', extra: {} },
  { key: 'filled (date)', extra: { defaultValue: fixedDate } },
  { key: 'empty (date-time)', extra: { mode: DATE_MODE.DateTime } },
  { key: 'filled (date-time)', extra: { mode: DATE_MODE.DateTime, defaultValue: fixedDateTime } },
  {
    key: 'filled (date-time, showSeconds=false)',
    extra: { mode: DATE_MODE.DateTime, showSeconds: false, defaultValue: fixedDateTime },
  },
  { key: 'empty (date-range)', extra: { mode: DATE_MODE.DateRange } },
  {
    key: 'filled (date-range)',
    extra: { mode: DATE_MODE.DateRange, defaultValue: [fixedDate, fixedDateTo] },
  },
  {
    key: 'filled (date-range, partial [from, —])',
    extra: { mode: DATE_MODE.DateRange, defaultValue: [fixedDate, undefined] },
  },
  { key: 'disabled', extra: { defaultValue: fixedDate, disabled: true } },
  { key: 'readonly', extra: { defaultValue: fixedDate, readonly: true } },
];

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='Size × ValidationState (date, filled 17.05.2026)'
        firstColumnHeader='Size'
        columnHeaders={keyStates.map(s => s.toUpperCase())}
        rows={keySizes.map(size => ({
          variantLabel: size,
          cells: keyStates.map(state => (
            <div key={state} className={styles.narrow}>
              <FieldDate
                size={size}
                validationState={state}
                label='Label'
                hint={state === VALIDATION_STATE.Default ? 'Hint' : `${state} hint`}
                showHintIcon
                defaultValue={fixedDate}
              />
            </div>
          )),
        }))}
      />

      <StoryTable
        sectionTitle='Mode & state (size=m)'
        firstColumnHeader='Variant'
        columnHeaders={['Render']}
        cellAlign='start'
        rows={modes.map(({ key, extra }) => ({
          variantLabel: key,
          // Без .narrow: поле занимает всю ширину ячейки — показывает full-width-раскладку
          // (`fieldWrapper` тянется на 100% контейнера формы).
          cells: [<FieldDate key={key} size={SIZE.M} label='Label' {...(extra as FieldDateProps)} />],
        }))}
      />
    </div>
  ),
};

import { FieldSlider, SIZE, VALIDATION_STATE } from '@ds/fields';
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { Meta, StoryObj } from '@storybook/react';
import { ReactNode } from 'react';

import { StoryTable } from '#storybook/components';

import styles from './stories.module.scss';

const meta: Meta<typeof FieldSlider> = {
  title: 'Components/Fields/FieldSlider',
  component: FieldSlider,
};

export default meta;
type Story = StoryObj<typeof FieldSlider>;

const keySizes = [SIZE.S, SIZE.M, SIZE.L] as const;
const keyStates = [
  VALIDATION_STATE.Default,
  VALIDATION_STATE.Error,
  VALIDATION_STATE.Warning,
  VALIDATION_STATE.Success,
] as const;

// Метки вне сетки шага и с подписями ≠ ключам: визуально показывает off-grid-кейс снэпа.
const offGridMarks = { 10: { label: 'low' }, 55: { label: 'mid' }, 90: { label: 'high' } };

type ScaleVariant = { key: string; cell: ReactNode };

const scaleVariants: ScaleVariant[] = [
  {
    key: 'single (default)',
    cell: <FieldSlider size={SIZE.M} label='Volume' min={0} max={100} step={1} defaultValue={50} />,
  },
  {
    key: 'range (two-handle min – max)',
    cell: <FieldSlider size={SIZE.M} label='Price range' range min={0} max={100} step={1} defaultValue={[20, 80]} />,
  },
  {
    key: 'with marks (off-grid, labels≠keys)',
    cell: (
      <FieldSlider size={SIZE.M} label='Quality' min={0} max={100} step={null} marks={offGridMarks} defaultValue={55} />
    ),
  },
  {
    key: 'fractional step (0.5)',
    cell: <FieldSlider size={SIZE.M} label='Zoom' min={0} max={5} step={0.5} defaultValue={1.5} />,
  },
];

type SlotVariant = { key: string; cell: ReactNode };

const slotVariants: SlotVariant[] = [
  {
    key: 'postfix %',
    cell: <FieldSlider size={SIZE.M} label='Volume' min={0} max={100} step={1} defaultValue={75} postfix='%' />,
  },
  {
    key: 'prefix',
    cell: <FieldSlider size={SIZE.M} label='Volume' min={0} max={100} step={1} defaultValue={75} prefix='≈' />,
  },
  {
    key: 'postfixIcon',
    cell: (
      <FieldSlider
        size={SIZE.M}
        label='Volume'
        min={0}
        max={100}
        step={1}
        defaultValue={75}
        postfixIcon={<PlaceholderSVG />}
      />
    ),
  },
  {
    key: 'prefix + postfix + postfixIcon',
    cell: (
      <FieldSlider
        size={SIZE.M}
        label='Volume'
        min={0}
        max={100}
        step={1}
        defaultValue={75}
        prefix='≈'
        postfix='%'
        postfixIcon={<PlaceholderSVG />}
      />
    ),
  },
  {
    key: "textInputFormatter ('75 %')",
    cell: (
      <FieldSlider
        size={SIZE.M}
        label='Volume'
        min={0}
        max={100}
        step={1}
        defaultValue={75}
        textInputFormatter={v => `${v} %`}
      />
    ),
  },
  {
    key: 'readonly',
    cell: <FieldSlider size={SIZE.M} label='Used' min={0} max={100} step={1} defaultValue={60} readonly />,
  },
  {
    key: 'disabled',
    cell: <FieldSlider size={SIZE.M} label='Volume' min={0} max={100} step={1} defaultValue={60} disabled />,
  },
];

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
            <div key={state} className={styles.cell}>
              <FieldSlider
                size={size}
                validationState={state}
                label='Volume'
                hint={state === VALIDATION_STATE.Default ? 'Hint' : `${state} hint`}
                showHintIcon
                defaultValue={50}
                min={0}
                max={100}
                step={1}
              />
            </div>
          )),
        }))}
      />

      <StoryTable
        sectionTitle='Value mode & scale features (size=m)'
        firstColumnHeader='Mode'
        columnHeaders={['Render']}
        rows={scaleVariants.map(({ key, cell }) => ({
          variantLabel: key,
          cells: [
            <div key={key} className={styles.cell}>
              {cell}
            </div>,
          ],
        }))}
      />

      <StoryTable
        sectionTitle='Slots & formatting (size=m)'
        firstColumnHeader='Slot'
        columnHeaders={['Render']}
        rows={slotVariants.map(({ key, cell }) => ({
          variantLabel: key,
          cells: [
            <div key={key} className={styles.cell}>
              {cell}
            </div>,
          ],
        }))}
      />
    </div>
  ),
};

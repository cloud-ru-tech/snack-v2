import { ButtonGroup, ButtonGroupProps, SIZE } from '@ds/button';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './stories.module.scss';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/Button/ButtonGroup',
  component: ButtonGroup,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

const keySizes = [SIZE.S, SIZE.M, SIZE.L] as const;

const primaryAction = { label: 'Сохранить', appearance: 'primary', view: 'filled' } as const;
const secondaryAction = { label: 'Отмена', appearance: 'neutral', view: 'outline' } as const;
const tertiaryAction = { label: 'Помощь', appearance: 'neutral', view: 'simple' } as const;

type CompositionKey = 'primaryOnly' | 'primarySecondary' | 'allThree';

const compositions: Array<{ key: CompositionKey; props: Partial<ButtonGroupProps> }> = [
  { key: 'primaryOnly', props: { primaryAction } },
  { key: 'primarySecondary', props: { primaryAction, secondaryAction } },
  { key: 'allThree', props: { primaryAction, secondaryAction, tertiaryAction } },
];

type ModifierKey = 'default' | 'centered' | 'break' | 'filled' | 'vertical';

const modifiers: Array<{ key: ModifierKey; props: Partial<ButtonGroupProps> }> = [
  { key: 'default', props: {} },
  { key: 'centered', props: { centered: true } },
  { key: 'break', props: { break: true } },
  { key: 'filled', props: { filled: true } },
  { key: 'vertical', props: { vertical: true } },
];

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='Composition × Size'
        firstColumnHeader='Composition'
        columnHeaders={keySizes.map(s => s.toUpperCase())}
        rows={compositions.map(({ key, props }) => ({
          variantLabel: key,
          cells: keySizes.map(size => (
            <div key={size} className={styles.narrow}>
              <ButtonGroup size={size} {...props} />
            </div>
          )),
        }))}
      />

      <StoryTable
        sectionTitle='Modifier × Composition (size=m)'
        firstColumnHeader='Modifier'
        columnHeaders={compositions.map(c => c.key)}
        rows={modifiers.map(({ key, props }) => ({
          variantLabel: key,
          cells: compositions.map(c => (
            <div key={c.key} className={styles.narrow}>
              <ButtonGroup {...c.props} {...props} />
            </div>
          )),
        }))}
      />
    </div>
  ),
};

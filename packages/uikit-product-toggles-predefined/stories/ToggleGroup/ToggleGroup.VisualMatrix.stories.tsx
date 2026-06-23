import { GAP, ORIENTATION, ToggleCard, ToggleGroup } from '@ds/uikit-product-toggles-predefined';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const meta: Meta<typeof ToggleGroup> = {
  title: 'Uikit Product/TogglesPredefined/ToggleGroup',
  component: ToggleGroup,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof ToggleGroup>;

const keyGaps = [GAP.S, GAP.M, GAP.L] as const;
const keyOrientations = [ORIENTATION.Vertical, ORIENTATION.Horizontal] as const;

function Group({ orientation, gap }: { orientation: (typeof keyOrientations)[number]; gap: (typeof keyGaps)[number] }) {
  return (
    <div className={styles.wide}>
      <ToggleGroup orientation={orientation} gap={gap} breakpoint={160} defaultValue='pro'>
        <ToggleCard value='start' title='Start' description='10 ГБ' />
        <ToggleCard value='pro' title='Pro' description='100 ГБ' />
      </ToggleGroup>
    </div>
  );
}

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='Orientation × Gap'
        firstColumnHeader='Orientation'
        columnHeaders={keyGaps.map(g => g.toUpperCase())}
        rows={keyOrientations.map(orientation => ({
          variantLabel: orientation,
          cells: keyGaps.map(gap => <Group key={gap} orientation={orientation} gap={gap} />),
        }))}
      />
    </div>
  ),
};

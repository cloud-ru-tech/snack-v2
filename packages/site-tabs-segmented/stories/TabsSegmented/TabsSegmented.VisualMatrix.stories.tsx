import { APPEARANCE, Appearance, SIZE, TabsSegmented } from '@ds/site-tabs-segmented';
import { Meta, StoryObj } from '@storybook/react';
import { ReactNode } from 'react';

import { StoryTable } from '#storybook/components';

import { AccentBackdrop, ITEMS, ITEMS_WITH_DISABLED, MANY_ITEMS } from './fixtures';
import styles from './styles.module.scss';

const meta: Meta<typeof TabsSegmented> = {
  title: 'Site/TabsSegmented',
  component: TabsSegmented,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof TabsSegmented>;

const APPEARANCES = Object.values(APPEARANCE);
const SIZES = Object.values(SIZE);

function Surface({ appearance, children }: { appearance: Appearance; children: ReactNode }) {
  return appearance === APPEARANCE.OnAccent ? <AccentBackdrop>{children}</AccentBackdrop> : children;
}

const STATES = [
  {
    label: 'disabled item',
    render: (appearance: Appearance) => <TabsSegmented items={ITEMS_WITH_DISABLED} appearance={appearance} />,
  },
  {
    label: 'wrap',
    render: (appearance: Appearance) => (
      <div className={styles.narrow}>
        <TabsSegmented items={MANY_ITEMS} appearance={appearance} wrap />
      </div>
    ),
  },
  {
    label: 'scroll (no wrap)',
    render: (appearance: Appearance) => (
      <div className={styles.narrow}>
        <TabsSegmented items={MANY_ITEMS} appearance={appearance} />
      </div>
    ),
  },
];

export const VisualMatrix: Story = {
  tags: ['test', 'dev', 'no-a11y'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        cellAlign='start'
        sectionTitle='Appearance × Size'
        firstColumnHeader='appearance'
        columnHeaders={SIZES}
        rows={APPEARANCES.map(appearance => ({
          variantLabel: appearance,
          cells: SIZES.map(size => (
            <Surface key={size} appearance={appearance}>
              <TabsSegmented items={ITEMS} size={size} appearance={appearance} />
            </Surface>
          )),
        }))}
      />
      <StoryTable
        cellAlign='start'
        sectionTitle='State × Appearance'
        firstColumnHeader='state'
        columnHeaders={APPEARANCES}
        rows={STATES.map(({ label, render }) => ({
          variantLabel: label,
          cells: APPEARANCES.map(appearance => (
            <Surface key={appearance} appearance={appearance}>
              {render(appearance)}
            </Surface>
          )),
        }))}
      />
    </div>
  ),
};

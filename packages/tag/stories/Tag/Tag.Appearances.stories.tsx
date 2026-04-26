import { APPEARANCE, Tag } from '@ds/tag';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import styles from './stories.module.scss';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Tag>;

const appearances = [
  APPEARANCE.Neutral,
  APPEARANCE.Primary,
  APPEARANCE.Red,
  APPEARANCE.Orange,
  APPEARANCE.Yellow,
  APPEARANCE.Green,
  APPEARANCE.Blue,
  APPEARANCE.Violet,
  APPEARANCE.Pink,
];

export const Appearances: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.row}>
      {appearances.map(a => (
        <Tag key={a} appearance={a} label={a} />
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    for (const a of appearances) {
      expect(within(canvasElement).getByText(a)).toBeVisible();
    }
  },
};

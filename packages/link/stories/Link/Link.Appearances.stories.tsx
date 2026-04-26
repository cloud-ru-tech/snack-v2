import { APPEARANCE, Link } from '@ds/link';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import styles from './stories.module.scss';

const meta: Meta<typeof Link> = {
  title: 'Components/Link',
  component: Link,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Link>;

const values = [
  APPEARANCE.Primary,
  APPEARANCE.Neutral,
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
      {values.map(appearance => (
        <Link key={appearance} appearance={appearance} text={appearance} href='#' data-test-id={`link-${appearance}`} />
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const first = within(canvasElement).getByTestId(`link-${values[0]}`);
    await expect(first).toBeVisible();
  },
};

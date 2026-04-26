import { Link } from '@ds/link';
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

export const Truncated: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.stack}>
      <div className={styles.narrow}>
        <Link text='Очень длинный текст ссылки, который не помещается' href='#' />
      </div>
      <div className={styles.narrow}>
        <Link truncateVariant='middle' text='very-long-document-name-abc-2024.pdf' href='#' />
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const links = within(canvasElement).getAllByRole('link');
    expect(links.length).toBe(2);
  },
};

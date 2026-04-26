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
        <Link text='Очень длинный текст ссылки, который не помещается' href='#' data-test-id='link-end' />
      </div>
      <div className={styles.narrow}>
        <Link
          truncateVariant='middle'
          text='very-long-document-name-abc-2024.pdf'
          href='#'
          data-test-id='link-middle'
        />
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId('link-end')).toBeVisible();
    await expect(within(canvasElement).getByTestId('link-middle')).toBeVisible();
  },
};

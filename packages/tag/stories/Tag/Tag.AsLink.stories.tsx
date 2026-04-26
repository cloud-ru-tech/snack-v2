import { Tag } from '@ds/tag';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import styles from './stories.module.scss';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag/Tag',
  component: Tag,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const AsLink: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.row}>
      <Tag label='Документация' href='https://example.com' data-test-id='tag-docs' />
      <Tag
        appearance='blue'
        label='Frontend'
        href='https://example.com/tags/frontend'
        target='_blank'
        data-test-id='tag-frontend'
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const root = within(canvasElement);
    await expect(root.getByTestId('tag-docs')).toBeVisible();
    await expect(root.getByTestId('tag-frontend')).toBeVisible();
  },
};

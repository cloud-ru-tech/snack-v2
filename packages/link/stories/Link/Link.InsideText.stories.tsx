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

export const InsideText: Story = {
  tags: ['dev'],
  render: () => (
    <p className={styles.paragraph}>
      Подробнее о работе сервиса читайте{' '}
      <Link insideText text='в документации' href='https://example.com' data-test-id='link-docs' />, а также
      ознакомьтесь с{' '}
      <Link
        insideText
        underlined
        text='условиями использования'
        href='https://example.com/terms'
        data-test-id='link-terms'
      />
      .
    </p>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId('link-docs')).toBeVisible();
    await expect(within(canvasElement).getByTestId('link-terms')).toBeVisible();
  },
};

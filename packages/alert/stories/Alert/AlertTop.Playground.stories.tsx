import { AlertTop, APPEARANCE } from '@ds/alert';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import styles from './stories.module.scss';

const meta: Meta<typeof AlertTop> = {
  title: 'Components/Alert/AlertTop',
  component: AlertTop,
  parameters: { layout: 'padded' },
  args: {
    title: 'Системное уведомление',
    description: 'Краткое описание изменения, которое касается всех пользователей.',
    appearance: APPEARANCE.Info,
    icon: true,
    'data-test-id': 'alert-top',
  },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    appearance: { control: 'select', options: Object.values(APPEARANCE) },
    icon: { control: 'boolean' },
  },
  decorators: [
    Story => (
      <div className={styles.wide}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AlertTop>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId('alert-top')).toBeVisible();
  },
};

import { Alert } from '@ds/alert';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import styles from './stories.module.scss';
import { ALERT_TEST_ID } from './testIds';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert/Alert',
  component: Alert,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Collapsible: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.container}>
      <Alert
        appearance='info'
        collapsible
        title='Совет по настройке'
        description='Полное описание того, как правильно настроить функцию и на что обратить внимание. Текст длинный, поэтому сворачивается до раскрытия по клику на заголовок.'
        data-test-id={ALERT_TEST_ID}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(ALERT_TEST_ID)).toBeVisible();
  },
};

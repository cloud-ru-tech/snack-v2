import { Button } from '@ds/button';
import { Dropdown } from '@ds/dropdown';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import styles from './stories.module.scss';
import { DROPDOWN_TEST_ID, DROPDOWN_TRIGGER_TEST_ID } from './testIds';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Open: Story = {
  tags: ['dev'],
  render: () => (
    <Dropdown
      data-test-id={DROPDOWN_TEST_ID}
      open
      content={
        <div className={styles.content}>
          <strong>Заголовок</strong>
          <p>Раскрытый Dropdown — видно контент и стрелку.</p>
        </div>
      }
    >
      <Button data-test-id={DROPDOWN_TRIGGER_TEST_ID} label='Триггер' />
    </Dropdown>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(DROPDOWN_TRIGGER_TEST_ID)).toBeVisible();
  },
};

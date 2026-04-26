import { Button } from '@ds/button';
import { Dropdown } from '@ds/dropdown';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import styles from './stories.module.scss';

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
      open
      content={
        <div className={styles.content}>
          <strong>Заголовок</strong>
          <p>Раскрытый Dropdown — видно контент и стрелку.</p>
        </div>
      }
    >
      <Button label='Триггер' />
    </Dropdown>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('button', { name: 'Триггер' })).toBeVisible();
  },
};

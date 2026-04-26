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
  args: {
    trigger: 'click',
    placement: 'bottom-start',
    content: <div className={styles.content}>Содержимое выпадающего блока</div>,
    children: <Button data-test-id={DROPDOWN_TRIGGER_TEST_ID} label='Открыть' />,
    'data-test-id': DROPDOWN_TEST_ID,
  },
  argTypes: {
    trigger: {
      control: 'radio',
      options: ['click', 'hover', 'focus'],
      description: 'Тип триггера открытия',
    },
    placement: {
      control: 'select',
      options: ['top-start', 'top', 'top-end', 'bottom-start', 'bottom', 'bottom-end', 'left', 'right'],
      description: 'Позиция относительно триггера',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(DROPDOWN_TRIGGER_TEST_ID)).toBeVisible();
  },
};

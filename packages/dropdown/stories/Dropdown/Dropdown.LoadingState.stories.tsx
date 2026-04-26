import { Button } from '@ds/button';
import { Dropdown, STATE } from '@ds/dropdown';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DROPDOWN_TEST_ID, DROPDOWN_TRIGGER_TEST_ID } from './testIds';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const LoadingState: Story = {
  tags: ['dev'],
  render: () => (
    <Dropdown data-test-id={DROPDOWN_TEST_ID} open state={{ type: STATE.Loading }} content={null}>
      <Button data-test-id={DROPDOWN_TRIGGER_TEST_ID} label='Загрузка' />
    </Dropdown>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(DROPDOWN_TRIGGER_TEST_ID)).toBeVisible();
  },
};

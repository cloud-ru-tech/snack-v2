import { CHIP_CHOICE_TEST_IDS, ChipChoice, SIZE } from '@ds/chips';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';

const meta: Meta<typeof ChipChoice.Date> = {
  title: 'Components/Chips/ChipChoice/Date/Tests/Interaction',
  component: ChipChoice.Date,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    label: 'Date',
    size: SIZE.S,
    mode: 'date',
    onChange: fn(),
    'data-test-id': TEST_IDS.chipChoice.root,
  },
};

export default meta;
type Story = StoryObj<typeof ChipChoice.Date>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>InteractionTest (Date)</DemoTitle>
        <DemoHint>Клик открывает календарь для выбора даты.</DemoHint>
        <DemoActions align='center'>
          <ChipChoice.Date {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const chip = canvas.getByTestId(TEST_IDS.chipChoice.root);

    await step('click: opens calendar dropdown', async () => {
      await userEvent.click(chip);
      await waitFor(() => {
        expect(canvas.getByTestId(CHIP_CHOICE_TEST_IDS.droplist)).toBeVisible();
      });
    });

    await step('Escape: closes dropdown', async () => {
      await userEvent.keyboard('{Escape}');
      await waitFor(() => {
        expect(canvas.queryByTestId(CHIP_CHOICE_TEST_IDS.droplist)).not.toBeInTheDocument();
      });
    });
  },
};

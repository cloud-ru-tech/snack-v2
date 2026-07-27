import { CHIP_CHOICE_TEST_IDS, ChipChoice, SIZE } from '@ds/chips';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';
import { OPTIONS } from '../playground.helpers';

const meta: Meta<typeof ChipChoice.Multiple> = {
  title: 'Components/Chips/ChipChoice/Multiple/Tests/Interaction',
  component: ChipChoice.Multiple,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    label: 'Filter',
    size: SIZE.S,
    options: OPTIONS,
    autoApply: true,
    onChange: fn(),
    'data-test-id': TEST_IDS.chipChoice.root,
  },
};

export default meta;
type Story = StoryObj<typeof ChipChoice.Multiple>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>InteractionTest (Multiple)</DemoTitle>
        <DemoHint>Клик открывает дроплист; множественный выбор вызывает onChange.</DemoHint>
        <DemoActions align='center'>
          <ChipChoice.Multiple {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const chip = canvas.getByTestId(TEST_IDS.chipChoice.root);

    await step('click: opens droplist', async () => {
      await userEvent.click(chip);
      await waitFor(() => {
        expect(canvas.getByTestId(CHIP_CHOICE_TEST_IDS.droplist)).toBeVisible();
      });
    });

    await step('click option: onChange fires', async () => {
      const droplist = canvas.getByTestId(CHIP_CHOICE_TEST_IDS.droplist);
      const option = within(droplist).getByTestId(TEST_IDS.chipChoice.option1);
      await userEvent.click(option);
    });

    await step('Escape: closes droplist', async () => {
      await userEvent.keyboard('{Escape}');
      await waitFor(() => {
        expect(canvas.queryByTestId(CHIP_CHOICE_TEST_IDS.droplist)).not.toBeInTheDocument();
      });
    });
  },
};

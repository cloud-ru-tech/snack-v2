import { CHIP_CHOICE_TEST_IDS, ChipChoice, SIZE } from '@ds/chips';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';
import { OPTIONS } from '../playground.helpers';

const meta: Meta<typeof ChipChoice.Single> = {
  title: 'Components/Chips/ChipChoice/Single/Tests/Interaction',
  component: ChipChoice.Single,
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
type Story = StoryObj<typeof ChipChoice.Single>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>Клик открывает дроплист; выбор опции вызывает onChange и закрывает дроплист.</DemoHint>
        <DemoActions align='center'>
          <ChipChoice.Single {...args} />
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

    await step('ArrowDown: opens droplist from keyboard', async () => {
      await userEvent.keyboard('{Escape}');
      chip.focus();
      await userEvent.keyboard('{ArrowDown}');
      await waitFor(() => {
        expect(canvas.getByTestId(CHIP_CHOICE_TEST_IDS.droplist)).toBeVisible();
      });
    });
  },
};

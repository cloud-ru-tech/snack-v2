import { ChipChoice } from '@ds/chips';
import { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoResizable, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';
import {
  CHIP_CHOICE_COMMON_ARG_TYPES,
  CHIP_CHOICE_COMMON_ARGS,
  ChipChoiceCustomStoryProps,
  useControlledStoryArgs,
} from './playground.helpers';

type StoryProps = ChipChoiceCustomStoryProps & ComponentProps<typeof ChipChoice.DateRange>;

const Template = (args: StoryProps) => {
  const controlledArgs = useControlledStoryArgs<StoryProps>({ defaultValue: undefined });

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground (DateRange)</DemoTitle>
        <DemoHint>Чип-фильтр с выбором диапазона дат через календарь.</DemoHint>
        <DemoActions align='center'>
          <DemoResizable width='fit'>
            <ChipChoice.DateRange {...args} {...controlledArgs} />
          </DemoResizable>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
};

const meta: Meta<typeof ChipChoice.DateRange> = {
  title: 'Components/Chips/ChipChoice/DateRange',
  component: ChipChoice.DateRange,
  parameters: { layout: 'fullscreen' },
  render: Template,
  args: {
    ...CHIP_CHOICE_COMMON_ARGS,
    label: 'Period',
    'data-test-id': TEST_IDS.chipChoice.root,
  },
  argTypes: {
    ...CHIP_CHOICE_COMMON_ARG_TYPES,
  },
};

export default meta;
type Story = StoryObj<typeof ChipChoice.DateRange>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.chipChoice.root)).toBeVisible();
  },
};

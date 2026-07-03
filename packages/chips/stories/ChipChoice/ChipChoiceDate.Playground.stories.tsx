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

type StoryProps = ChipChoiceCustomStoryProps & ComponentProps<typeof ChipChoice.Date>;

const Template = (args: StoryProps) => {
  const controlledArgs = useControlledStoryArgs<StoryProps>({ defaultValue: undefined });

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground (Date)</DemoTitle>
        <DemoHint>Чип-фильтр с выбором даты через календарь.</DemoHint>
        <DemoActions align='center'>
          <DemoResizable width='fit'>
            <ChipChoice.Date {...args} {...controlledArgs} />
          </DemoResizable>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
};

const meta: Meta<typeof ChipChoice.Date> = {
  title: 'Components/Chips/ChipChoice/Date',
  component: ChipChoice.Date,
  parameters: { layout: 'fullscreen' },
  render: Template,
  args: {
    ...CHIP_CHOICE_COMMON_ARGS,
    label: 'Date',
    mode: 'date-time',
    showSeconds: false,
    'data-test-id': TEST_IDS.chipChoice.root,
  },
  argTypes: {
    ...CHIP_CHOICE_COMMON_ARG_TYPES,
    showSeconds: { control: 'boolean', if: { arg: 'mode', eq: 'date-time' } },
  },
};

export default meta;
type Story = StoryObj<typeof ChipChoice.Date>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.chipChoice.root)).toBeVisible();
  },
};

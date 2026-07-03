import { ChipAssist, ChipAssistProps } from '@ds/chips';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoResizable, DemoTitle } from '#storybook/components';

import { COMMON_ARG_TYPES, COMMON_ARGS, CustomStoryProps, useIconProps } from '../playground.helpers';
import { TEST_IDS } from '../testIds';

const Template: StoryFn<ChipAssistProps & CustomStoryProps> = args => {
  const iconProps = useIconProps<ChipAssistProps>();

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Кликабельный чип с иконкой и лейблом.</DemoHint>
        <DemoActions align='center'>
          <DemoResizable width='fit'>
            <ChipAssist {...args} {...iconProps} />
          </DemoResizable>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
};

const meta: Meta<ChipAssistProps & CustomStoryProps> = {
  title: 'Components/Chips/ChipAssist',
  component: ChipAssist,
  parameters: { layout: 'fullscreen' },
  render: Template,
  args: {
    ...COMMON_ARGS,
    label: 'Chip label',
    'data-test-id': TEST_IDS.chipAssist.root,
  },
  argTypes: {
    ...COMMON_ARG_TYPES,
  },
};

export default meta;
type Story = StoryObj<ChipAssistProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.chipAssist.root)).toBeVisible();
  },
};

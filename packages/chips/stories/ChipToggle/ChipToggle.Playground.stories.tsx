import { ChipToggle, ChipToggleProps } from '@ds/chips';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useArgs } from 'storybook/internal/preview-api';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoResizable, DemoTitle } from '#storybook/components';

import { COMMON_ARG_TYPES, COMMON_ARGS, CustomStoryProps, useIconProps } from '../playground.helpers';
import { TEST_IDS } from '../testIds';

const Template: StoryFn<ChipToggleProps & CustomStoryProps> = args => {
  const iconProps = useIconProps<ChipToggleProps>();
  const [{ checked }, updateArgs] = useArgs<ChipToggleProps & CustomStoryProps>();

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Чип с состоянием выбран/не выбран.</DemoHint>
        <DemoActions align='center'>
          <DemoResizable width='fit'>
            <ChipToggle
              {...args}
              {...iconProps}
              checked={checked}
              onChange={updatedValue => updateArgs({ checked: updatedValue })}
            />
          </DemoResizable>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
};

const meta: Meta<ChipToggleProps & CustomStoryProps> = {
  title: 'Components/Chips/ChipToggle',
  component: ChipToggle,
  parameters: { layout: 'fullscreen' },
  render: Template,
  args: {
    ...COMMON_ARGS,
    label: 'Chip label',
    'data-test-id': TEST_IDS.chipToggle.root,
  },
  argTypes: {
    ...COMMON_ARG_TYPES,
  },
};

export default meta;
type Story = StoryObj<ChipToggleProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.chipToggle.root)).toBeVisible();
  },
};

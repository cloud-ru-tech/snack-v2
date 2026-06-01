import { ChipChoice } from '@ds/chips';
import { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';
import {
  CHIP_CHOICE_COMMON_ARG_TYPES,
  CHIP_CHOICE_COMMON_ARGS,
  ChipChoiceCustomStoryProps,
  useControlledStoryArgs,
} from './playground.helpers';

type StoryProps = ChipChoiceCustomStoryProps & ComponentProps<typeof ChipChoice.Time>;

const Template = (args: StoryProps) => {
  const controlledArgs = useControlledStoryArgs<StoryProps>({ defaultValue: undefined });

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground (Time)</DemoTitle>
        <DemoHint>Чип-фильтр с выбором времени.</DemoHint>
        <DemoActions align='center'>
          <div className={styles.resizableWrapper}>
            <ChipChoice.Time {...args} {...controlledArgs} />
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
};

const meta: Meta<typeof ChipChoice.Time> = {
  title: 'Components/Chips/ChipChoice/Time',
  component: ChipChoice.Time,
  parameters: { layout: 'fullscreen' },
  render: Template,
  args: {
    ...CHIP_CHOICE_COMMON_ARGS,
    label: 'Time',
    showSeconds: true,
    'data-test-id': TEST_IDS.chipChoice.root,
  },
  argTypes: {
    ...CHIP_CHOICE_COMMON_ARG_TYPES,
  },
};

export default meta;
type Story = StoryObj<typeof ChipChoice.Time>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.chipChoice.root)).toBeVisible();
  },
};

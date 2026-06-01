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
  OPTIONS,
  useControlledStoryArgs,
} from './playground.helpers';

type StoryProps = ChipChoiceCustomStoryProps & ComponentProps<typeof ChipChoice.Single>;

const Template = (args: StoryProps) => {
  const controlledArgs = useControlledStoryArgs<StoryProps>({ defaultValue: undefined });

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground (Single)</DemoTitle>
        <DemoHint>Чип-фильтр с выпадающим одиночным выбором.</DemoHint>
        <DemoActions align='center'>
          <div className={styles.resizableWrapper}>
            <ChipChoice.Single {...args} {...controlledArgs} />
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
};

const meta: Meta<typeof ChipChoice.Single> = {
  title: 'Components/Chips/ChipChoice/Single',
  component: ChipChoice.Single,
  parameters: { layout: 'fullscreen' },
  render: Template,
  args: {
    ...CHIP_CHOICE_COMMON_ARGS,
    label: 'Filter',
    options: OPTIONS,
    autoApply: true,
    searchable: false,
    disableFuzzySearch: false,
    'data-test-id': TEST_IDS.chipChoice.root,
  },
  argTypes: {
    ...CHIP_CHOICE_COMMON_ARG_TYPES,
    disableFuzzySearch: { control: 'boolean', if: { arg: 'searchable', eq: true } },
  },
};

export default meta;
type Story = StoryObj<typeof ChipChoice.Single>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.chipChoice.root)).toBeVisible();
  },
};

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
import customStyles from './styles.module.scss';

const CUSTOM_OPTIONS = ['Alpha', 'Beta', 'Gamma'];

type StoryProps = ChipChoiceCustomStoryProps & ComponentProps<typeof ChipChoice.Custom>;

const Template = (args: StoryProps) => {
  const controlledArgs = useControlledStoryArgs<StoryProps>({ defaultValue: undefined });

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground (Custom)</DemoTitle>
        <DemoHint>Чип-фильтр с произвольным содержимым выпадающего меню.</DemoHint>
        <DemoActions align='center'>
          <div className={styles.resizableWrapper}>
            <ChipChoice.Custom
              {...args}
              {...controlledArgs}
              content={({ closeDroplist, value, onChange }) => (
                <div className={customStyles.customContent}>
                  {CUSTOM_OPTIONS.map(opt => (
                    <button
                      key={opt}
                      type='button'
                      className={
                        value === opt
                          ? `${customStyles.customOption} ${customStyles.customOptionSelected}`
                          : customStyles.customOption
                      }
                      onClick={() => {
                        onChange?.(opt);
                        closeDroplist();
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
              valueRender={value => value ?? null}
            />
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
};

const meta: Meta<typeof ChipChoice.Custom> = {
  title: 'Components/Chips/ChipChoice/Custom',
  component: ChipChoice.Custom,
  parameters: { layout: 'fullscreen' },
  render: Template,
  args: {
    ...CHIP_CHOICE_COMMON_ARGS,
    label: 'Custom',
    'data-test-id': TEST_IDS.chipChoice.root,
  },
  argTypes: {
    ...CHIP_CHOICE_COMMON_ARG_TYPES,
  },
};

export default meta;
type Story = StoryObj<typeof ChipChoice.Custom>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.chipChoice.root)).toBeVisible();
  },
};

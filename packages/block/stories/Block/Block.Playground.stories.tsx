import { Block, BlockProps, SIZE, VIEW } from '@ds/block';
import { BACKGROUND_PREDEFINED_FILL } from '@ds/materials';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from './styles.module.scss';
import { TEST_IDS } from './testIds';

const meta: Meta<BlockProps> = {
  title: 'Components/Block',
  component: Block,
  parameters: { layout: 'fullscreen' },
  args: {
    size: SIZE.L,
    view: VIEW.Simple,
    backgroundPredefined: BACKGROUND_PREDEFINED_FILL.NeutralBackground1Level,
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    size: {
      control: 'radio',
      options: Object.values(SIZE),
    },
    view: {
      control: 'radio',
      options: Object.values(VIEW),
    },
    backgroundPredefined: {
      control: 'select',
      options: Object.values(BACKGROUND_PREDEFINED_FILL),
    },
  },
};

export default meta;

type StoryProps = BlockProps & {
  showBackground: boolean;
  customText: string;
};

type Story = StoryObj<StoryProps>;

const Template: StoryFn<StoryProps> = ({ showBackground, customText, ...args }: StoryProps) => (
  <DemoPage>
    <DemoPanel>
      <DemoTitle>Playground</DemoTitle>
      <DemoHint>Контейнер-блок со слоем backgroundPredefined и акриловым эффектом.</DemoHint>
      <DemoActions block>
        <div className={styles.externalWrapper} data-show-background={showBackground || undefined}>
          <Block {...args}>
            <span className={styles.sampleContent}>{customText}</span>
          </Block>
        </div>
      </DemoActions>
    </DemoPanel>
  </DemoPage>
);

export const Playground: Story = {
  tags: ['dev', 'test'],
  args: {
    showBackground: true,
    size: SIZE.L,
    view: VIEW.Simple,
    customText: '# slot content',
  },
  argTypes: {
    showBackground: {
      name: '[Stories]: Show colorful background',
    },
    customText: {
      name: '[Stories]: Custom text',
    },
  },
  render: Template,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};

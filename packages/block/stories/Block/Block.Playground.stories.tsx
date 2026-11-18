import { Block, BlockProps, SIZE, VIEW } from '@ds/block';
import { BACKGROUND_PREDEFINED_FILL } from '@ds/materials';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from './styles.module.scss';
import { TEST_IDS } from './testIds';

type StoryProps = BlockProps & {
  showBackground: boolean;
  customText: string;
  headerText: string;
};

const meta: Meta<StoryProps> = {
  title: 'Components/Block',
  component: Block,
  parameters: { layout: 'fullscreen' },
  args: {
    headerText: 'Текст заглавия',
    customText: '# slot content',
    size: SIZE.L,
    view: VIEW.Simple,
    backgroundPredefined: BACKGROUND_PREDEFINED_FILL.NeutralBackground1Level,
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    header: { table: { disable: true } },
    headerText: {
      name: '[Stories]: Header text',
      control: 'text',
    },
    customText: {
      name: '[Stories]: Custom text',
    },
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

type Story = StoryObj<StoryProps>;

const Template: StoryFn<StoryProps> = ({ showBackground, customText, headerText, ...args }: StoryProps) => (
  <DemoPage>
    <DemoPanel>
      <DemoTitle>Playground</DemoTitle>
      <DemoHint>Контейнер-блок со слоем backgroundPredefined и акриловым эффектом.</DemoHint>
      <DemoActions block>
        <div className={styles.externalWrapper} data-show-background={showBackground || undefined}>
          <Block {...args} header={headerText}>
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
  },
  argTypes: {
    showBackground: {
      name: '[Stories]: Show colorful background',
    },
  },
  render: Template,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};

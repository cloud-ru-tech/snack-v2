import { Flex, GAP_SIZE } from '@ds/uikit-product-flex';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from './styles.module.scss';
import { TEST_IDS } from './testIds';

// Сужённые CSS-значения (типы у пропов — Extract из CSSProperties).
const directionOptions = ['row', 'row-reverse', 'column', 'column-reverse'];
const justifyOptions = ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'];
const alignOptions = ['flex-start', 'center', 'flex-end', 'self-start', 'self-end', 'baseline', 'stretch'];
const alignContentOptions = [
  'flex-start',
  'center',
  'flex-end',
  'space-between',
  'space-around',
  'space-evenly',
  'stretch',
];
const wrapOptions = ['nowrap', 'wrap', 'wrap-reverse'];
const overflowOptions = ['visible', 'hidden', 'clip', 'scroll', 'auto'];

const meta: Meta<typeof Flex> = {
  title: 'Uikit Product/Flex',
  component: Flex,
  parameters: { layout: 'fullscreen', figma: { disable: true } },
  args: {
    direction: 'row',
    justify: 'space-between',
    align: 'center',
    gap: GAP_SIZE.Gap2,
    fullWidth: true,
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    direction: { control: 'select', options: directionOptions },
    justify: { control: 'select', options: justifyOptions },
    align: { control: 'select', options: alignOptions },
    alignContent: { control: 'select', options: alignContentOptions },
    gap: { control: 'select', options: Object.values(GAP_SIZE) },
    columnGap: { control: 'select', options: Object.values(GAP_SIZE) },
    rowGap: { control: 'select', options: Object.values(GAP_SIZE) },
    wrap: { control: 'radio', options: wrapOptions },
    overflow: { control: 'select', options: overflowOptions },
    overflowX: { control: 'select', options: overflowOptions },
    overflowY: { control: 'select', options: overflowOptions },
  },
};

export default meta;
type Story = StoryObj<typeof Flex>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Контейнер flex-раскладки: направление, выравнивание, перенос и отступы между детьми.</DemoHint>
        <DemoActions block>
          <Flex {...args}>
            <span className={styles.box}>1</span>
            <span className={styles.box}>2</span>
            <span className={styles.box}>3</span>
          </Flex>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};

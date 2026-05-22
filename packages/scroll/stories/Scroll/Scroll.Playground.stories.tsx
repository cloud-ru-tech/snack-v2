import { AUTOSCROLL_TO, BAR_HIDE_STRATEGY, RESIZE, Scroll, ScrollProps, SIZE } from '@ds/scroll';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from './styles.module.scss';
import { TEST_IDS } from './testIds';

const defaultContent = (
  <div className={styles.scrollContent}>
    {Array.from({ length: 20 }, (_, i) => (
      <div key={i} className={styles.playgroundLine}>
        Line of content {String(i + 1).padStart(2, '0')}. Scroll to see the scrollbar, this is some long long long text.
      </div>
    ))}
  </div>
);

const meta: Meta<ScrollProps> = {
  title: 'Components/Scroll',
  component: Scroll,
  parameters: { layout: 'fullscreen' },
  args: {
    children: defaultContent,
    size: SIZE.M,
    barHideStrategy: BAR_HIDE_STRATEGY.Leave,
    clickScrolling: true,
    untouchableScrollbars: false,
    resize: RESIZE.None,
    paddingAbsolute: false,
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    children: { table: { disable: true } },
    size: { options: Object.values(SIZE), control: 'radio' },
    barHideStrategy: { options: Object.values(BAR_HIDE_STRATEGY), control: 'select' },
    clickScrolling: { control: 'boolean' },
    untouchableScrollbars: { control: 'boolean' },
    resize: { options: Object.values(RESIZE), control: 'select' },
    paddingAbsolute: { control: 'boolean' },
    autoscrollTo: {
      options: Object.values(AUTOSCROLL_TO),
      control: 'select',
    },
    onScroll: { table: { disable: true } },
    onInitialized: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<ScrollProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Кастомный скроллбар вокруг прокручиваемой области.</DemoHint>
        <DemoActions align='start'>
          <Scroll {...args} className={styles.scroll} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};

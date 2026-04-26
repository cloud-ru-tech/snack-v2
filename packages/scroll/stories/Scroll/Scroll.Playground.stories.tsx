import { AUTOSCROLL_TO, BAR_HIDE_STRATEGY, RESIZE, Scroll, ScrollProps, SIZE } from '@ds/scroll';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import styles from './styles.module.scss';
import { SCROLL_TEST_ID } from './testIds';

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
    'data-test-id': SCROLL_TEST_ID,
  },
  argTypes: {
    children: { control: false },
    size: { options: Object.values(SIZE), control: 'radio' },
    barHideStrategy: { options: Object.values(BAR_HIDE_STRATEGY), control: 'select' },
    clickScrolling: { control: 'boolean' },
    untouchableScrollbars: { control: 'boolean' },
    resize: { options: Object.values(RESIZE), control: 'select' },
    paddingAbsolute: { control: 'boolean' },
    autoscrollTo: {
      options: [undefined, ...Object.values(AUTOSCROLL_TO)],
      control: 'select',
    },
    onScroll: { action: 'scroll', control: false },
    onInitialized: { action: 'initialized', control: false },
  },
};

export default meta;
type Story = StoryObj<ScrollProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => <Scroll {...args} className={styles.scroll} />,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(SCROLL_TEST_ID)).toBeVisible();
  },
};

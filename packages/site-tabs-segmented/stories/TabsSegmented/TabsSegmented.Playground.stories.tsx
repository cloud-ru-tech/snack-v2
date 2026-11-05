import { APPEARANCE, SIZE, TabsSegmented, TabsSegmentedProps } from '@ds/site-tabs-segmented';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { AccentBackdrop, MANY_ITEMS } from './fixtures';
import styles from './styles.module.scss';
import { TEST_IDS } from './testIds';

const meta: Meta<typeof TabsSegmented> = {
  title: 'Site/TabsSegmented',
  component: TabsSegmented,
  parameters: { layout: 'fullscreen' },
  args: {
    items: MANY_ITEMS,
    size: SIZE.M,
    appearance: APPEARANCE.Default,
    wrap: false,
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    items: { table: { disable: true } },
    value: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof TabsSegmented>;

function PlaygroundRender(args: TabsSegmentedProps) {
  const tabs = (
    <div className={styles.narrow}>
      <TabsSegmented {...args} />
    </div>
  );

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Ряд в узком контейнере: без переноса прокручивается, с `wrap` переносится на новые строки.</DemoHint>
        <DemoActions align='start'>
          {args.appearance === APPEARANCE.OnAccent ? <AccentBackdrop>{tabs}</AccentBackdrop> : tabs}
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => <PlaygroundRender {...args} />,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};

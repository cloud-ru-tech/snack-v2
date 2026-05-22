/* eslint-disable @typescript-eslint/no-non-null-assertion -- test fixtures intentionally assert preconditions */
import { BAR_HIDE_STRATEGY, Scroll, ScrollProps } from '@ds/scroll';
import { Meta, StoryObj } from '@storybook/react';
import { expect, waitFor } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';
import { getHost, getVerticalScrollbar, longContent, VISIBLE_CLASS } from './_shared';

const meta: Meta<ScrollProps> = {
  title: 'Components/Scroll/Examples/BarHideStrategyScroll',
  component: Scroll,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};
export default meta;

type Story = StoryObj<ScrollProps>;

export const BarHideStrategyScroll: Story = {
  tags: ['dev', 'test'],
  args: {
    barHideStrategy: BAR_HIDE_STRATEGY.Scroll,
    'data-test-id': TEST_IDS.root,
  },
  render: args => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>BarHideStrategyScroll</DemoTitle>
        <DemoHint>{'Scrollbar появляется только во время прокрутки и затем исчезает.'}</DemoHint>
        <DemoActions align='center'>
          <div className={styles.scroll}>
            <Scroll {...args}>{longContent}</Scroll>
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    const host = getHost(canvasElement);
    await waitFor(() => expect(getVerticalScrollbar(host)).not.toBeNull());

    const viewport = host.querySelector<HTMLElement>('.os-viewport') ?? host;
    viewport.scrollTop = 80;
    viewport.dispatchEvent(new Event('scroll', { bubbles: true }));
    viewport.dispatchEvent(new WheelEvent('wheel', { bubbles: true, deltaY: 80 }));

    await waitFor(() => {
      const bar = getVerticalScrollbar(host);
      expect(bar!.classList.contains(VISIBLE_CLASS)).toBe(true);
    });
  },
};

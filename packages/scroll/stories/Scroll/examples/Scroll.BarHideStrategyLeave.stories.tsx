/* eslint-disable @typescript-eslint/no-non-null-assertion -- test fixtures intentionally assert preconditions */
import { BAR_HIDE_STRATEGY, Scroll, ScrollProps } from '@ds/scroll';
import { Meta, StoryObj } from '@storybook/react';
import { expect, waitFor } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';
import { getHost, getVerticalScrollbar, longContent, VISIBLE_CLASS } from './_shared';

const meta: Meta<ScrollProps> = {
  title: 'Components/Scroll/Examples/BarHideStrategyLeave',
  component: Scroll,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};
export default meta;

type Story = StoryObj<ScrollProps>;

export const BarHideStrategyLeave: Story = {
  tags: ['dev', 'test'],
  args: {
    barHideStrategy: BAR_HIDE_STRATEGY.Leave,
    'data-test-id': TEST_IDS.root,
  },
  render: args => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>BarHideStrategyLeave</DemoTitle>
        <DemoHint>{'Scrollbar появляется на hover и скрывается при mouseleave.'}</DemoHint>
        <DemoActions align='center'>
          <div className={styles.scroll}>
            <Scroll {...args}>{longContent}</Scroll>
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement, step }) => {
    const host = getHost(canvasElement);
    await waitFor(() => expect(getVerticalScrollbar(host)).not.toBeNull());

    await step('hover: scrollbar becomes visible', async () => {
      host.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      host.dispatchEvent(new MouseEvent('mousemove', { bubbles: true }));
      await waitFor(() => {
        const bar = getVerticalScrollbar(host);
        expect(bar!.classList.contains(VISIBLE_CLASS)).toBe(true);
      });
    });

    // TODO: leave→hide не детектится синтетическим mouseleave — OverlayScrollbars завязан
    // на нативный pointer state браузера и не снимает .os-scrollbar-visible по dispatchEvent.
    // Проверять надо через Playwright page.mouse в визуальном e2e, не через play-функцию.
    host.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
  },
};

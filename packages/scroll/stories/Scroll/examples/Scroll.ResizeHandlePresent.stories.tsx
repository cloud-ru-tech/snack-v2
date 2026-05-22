import { RESIZE, Scroll, ScrollProps } from '@ds/scroll';
import { Meta, StoryObj } from '@storybook/react';
import { expect, waitFor } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';
import { getHost, longContent } from './_shared';

const meta: Meta<ScrollProps> = {
  title: 'Components/Scroll/Examples/ResizeHandlePresent',
  component: Scroll,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};
export default meta;

type Story = StoryObj<ScrollProps>;

export const ResizeHandlePresent: Story = {
  tags: ['dev', 'test'],
  args: {
    resize: RESIZE.Both,
    'data-test-id': TEST_IDS.root,
  },
  render: args => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>ResizeHandlePresent</DemoTitle>
        <DemoHint>{'Resize handle на правом нижнем углу позволяет менять размеры контейнера.'}</DemoHint>
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
    await waitFor(() => {
      // resize может стоять на корне host либо на внутреннем .os-host
      const inner = host.querySelector<HTMLElement>('.os-host') ?? host;
      const resizeValue = getComputedStyle(inner).resize;
      const hostResize = getComputedStyle(host).resize;
      expect([resizeValue, hostResize]).toContain('both');
    });
  },
};

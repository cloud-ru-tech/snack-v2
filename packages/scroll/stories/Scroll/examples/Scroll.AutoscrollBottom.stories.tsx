import { AUTOSCROLL_TO, Scroll, ScrollProps } from '@ds/scroll';
import { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import { expect, waitFor } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';
import { getHost } from './_shared';

const meta: Meta<ScrollProps> = {
  title: 'Components/Scroll/Examples/AutoscrollBottom',
  component: Scroll,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};
export default meta;

type Story = StoryObj<ScrollProps>;

function AutoscrollScenario(args: ScrollProps) {
  const [count, setCount] = useState(5);
  useEffect(() => {
    const t = setTimeout(() => setCount(c => c + 30), 200);
    return () => clearTimeout(t);
  }, []);
  return (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>AutoscrollBottom</DemoTitle>
        <DemoHint>{'При добавлении новых строк скролл автоматически едет к нижней границе.'}</DemoHint>
        <DemoActions align='center'>
          <div className={styles.scroll}>
            <Scroll {...args}>
              <div className={styles.scrollContent}>
                {Array.from({ length: count }, (_, i) => (
                  <div key={i} className={styles.playgroundLine}>
                    Line {i + 1}
                  </div>
                ))}
              </div>
            </Scroll>
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

export const AutoscrollBottom: Story = {
  tags: ['dev', 'test'],
  args: {
    autoscrollTo: AUTOSCROLL_TO.Bottom,
    'data-test-id': TEST_IDS.root,
  },
  render: args => <AutoscrollScenario {...args} />,
  play: async ({ canvasElement }) => {
    const host = getHost(canvasElement);
    const viewport =
      host.querySelector<HTMLElement>('.os-viewport') ??
      (host.querySelector<HTMLElement>('[data-overlayscrollbars-viewport]') as HTMLElement | null) ??
      host;

    await waitFor(
      () => {
        const distance = viewport.scrollHeight - viewport.clientHeight - viewport.scrollTop;
        expect(distance).toBeLessThanOrEqual(2);
      },
      { timeout: 3000 },
    );
  },
};

import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { AdaptiveProvider, isMobileLayout, LAYOUT_TYPE, LayoutType, useAdaptiveLayout } from '../../src';
import styles from './styles.module.scss';
import { TEST_IDS } from './testIds';

/**
 * Компонент-потребитель: берёт раскладку из `AdaptiveProvider` через `useAdaptiveLayout()` —
 * без пропа `layoutType` и без обёрток. Так же это делают `Adaptive*`-компоненты внутри.
 */
function LayoutSurface() {
  const { layoutType } = useAdaptiveLayout();
  const mobile = isMobileLayout(layoutType);

  return (
    <div className={styles.adaptiveSurface} data-test-id={TEST_IDS.adaptiveProvider}>
      <p>
        Из контекста (<code>useAdaptiveLayout</code>): <b>{layoutType}</b>
      </p>
      <p>{mobile ? 'Мобильная ветка (на мобиле — BottomSheet и т.п.)' : 'Десктопная ветка'}</p>
    </div>
  );
}

type StoryProps = {
  layoutType: LayoutType;
};

const meta: Meta<StoryProps> = {
  title: 'Components/Adaptive',
  parameters: {
    layout: 'fullscreen',
    figma: { disable: true },
  },
  args: {
    layoutType: LAYOUT_TYPE.Desktop,
  },
  argTypes: {
    layoutType: { control: 'radio', options: Object.values(LAYOUT_TYPE) },
  },
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Adaptive Provider</DemoTitle>
        <DemoHint>
          <code>AdaptiveProvider</code> ставится один раз в корне и раздаёт <code>layoutType</code> вложенным
          компонентам через контекст — без обёрток и проброса пропа. Переключите контрол; в приложении значение приходит
          из <code>useAdaptiveBootstrap()</code> или реактивного <code>store</code> хост-приложения. Явно переданный
          компоненту проп <code>layoutType</code> всегда побеждает контекст.
        </DemoHint>
        <DemoActions block>
          <div className={styles.adaptiveStack}>
            <AdaptiveProvider layoutType={args.layoutType}>
              <LayoutSurface />
            </AdaptiveProvider>
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.adaptiveProvider)).toBeVisible();
  },
};

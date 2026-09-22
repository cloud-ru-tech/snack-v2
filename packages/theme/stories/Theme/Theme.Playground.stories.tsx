import { BRAND, Brand, ChildThemeProvider, DENSITY, Density, PLATFORM, Platform } from '@ds/theme';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { ThemePreview } from '../shared/ThemePreview';
import { TEST_IDS } from './testIds';

type StoryProps = {
  brand: Brand;
  platform?: Platform;
  density: Density;
  acrylic: boolean;
};

const meta: Meta<StoryProps> = {
  title: 'Components/Theme/Overview',
  parameters: { layout: 'fullscreen', figma: { disable: true } },
  args: {
    brand: BRAND.CloudConsole,
    density: DENSITY.Comfort,
    acrylic: false,
  },
  argTypes: {
    brand: { control: 'select', options: Object.values(BRAND) },
    platform: { control: 'radio', options: Object.values(PLATFORM) },
    density: { control: 'radio', options: Object.values(DENSITY) },
    acrylic: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Оси оформления</DemoTitle>
        <DemoHint>
          Светлая/тёмная схема наследуется от аддона темы в тулбаре Storybook. Меняйте контролы <code>brand</code>,{' '}
          <code>platform</code>, <code>density</code>, <code>acrylic</code> — <code>ChildThemeProvider</code>{' '}
          переопределяет эти оси в поддереве (colorScheme наследуется), и реальные компоненты перекрашиваются. Без{' '}
          <code>platform</code> наследуется платформа из декоратора Storybook (переключатель Layout).
        </DemoHint>
        <DemoActions block>
          <ChildThemeProvider
            value={{
              brand: args.brand,
              platform: args.platform,
              density: args.density,
              acrylic: args.acrylic,
            }}
          >
            <ThemePreview testId={TEST_IDS.root} />
          </ChildThemeProvider>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};

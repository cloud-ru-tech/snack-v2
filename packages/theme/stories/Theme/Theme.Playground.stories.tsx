import { BRAND, Brand, BRAND_ROLE, BrandRole, ChildThemeProvider, DENSITY, Density } from '@ds/theme';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { ThemePreview } from '../shared/ThemePreview';
import { TEST_IDS } from './testIds';

type StoryProps = {
  brand: Brand;
  brandRole: BrandRole;
  density: Density;
  acrylic: boolean;
};

const meta: Meta<StoryProps> = {
  title: 'Components/Theme/Overview',
  parameters: { layout: 'fullscreen', figma: { disable: true } },
  args: {
    brand: BRAND.A,
    brandRole: BRAND_ROLE.Main,
    density: DENSITY.Comfort,
    acrylic: false,
  },
  argTypes: {
    brand: { control: 'radio', options: Object.values(BRAND) },
    brandRole: { control: 'select', options: Object.values(BRAND_ROLE) },
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
          <code>brandRole</code>, <code>density</code>, <code>acrylic</code> — <code>ChildThemeProvider</code>{' '}
          переопределяет эти оси в поддереве (colorScheme наследуется), и реальные компоненты перекрашиваются.
        </DemoHint>
        <DemoActions block>
          <ChildThemeProvider
            value={{
              brand: args.brand,
              brandRole: args.brandRole,
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

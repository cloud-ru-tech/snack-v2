import {
  BRAND,
  Brand,
  BRAND_ROLE,
  BrandRole,
  ChildThemeProvider,
  COLOR_SCHEME,
  ColorScheme,
  DENSITY,
  Density,
  useThemeClassnames,
} from '@ds/theme';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from './styles.module.scss';
import { TEST_IDS } from './testIds';

/**
 * Консьюмер: берёт полный набор `sn-*` из ближайшего оформления через `useThemeClassnames()`
 * и навешивает его на свою DOM-границу. Так же ведут себя реальные компоненты, фиксирующие ось.
 */
function ThemeSurface() {
  const classNames = useThemeClassnames();

  return (
    <div className={`${classNames} ${styles.surface}`}>
      <div className={styles.swatchGrid}>
        <div className={`${styles.swatch} ${styles.swatchAccent}`}>
          <span className={styles.swatchLabel}>Accent</span>
          <span>Кнопка, ссылка</span>
        </div>
        <div className={`${styles.swatch} ${styles.swatchNeutral}`}>
          <span className={styles.swatchLabel}>Neutral</span>
          <span>Фон, текст</span>
        </div>
        <div className={`${styles.swatch} ${styles.swatchCritical}`}>
          <span className={styles.swatchLabel}>Critical</span>
          <span>Ошибка, удаление</span>
        </div>
      </div>
      <pre className={styles.classnames}>{classNames}</pre>
    </div>
  );
}

type StoryProps = {
  colorScheme: ColorScheme;
  brand: Brand;
  brandRole: BrandRole;
  density: Density;
  acrylic: boolean;
  'data-test-id'?: string;
};

const meta: Meta<StoryProps> = {
  title: 'Components/Theme',
  parameters: { layout: 'fullscreen', figma: { disable: true } },
  args: {
    colorScheme: COLOR_SCHEME.Light,
    brand: BRAND.A,
    brandRole: BRAND_ROLE.Main,
    density: DENSITY.Compact,
    acrylic: false,
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    colorScheme: { control: 'radio', options: Object.values(COLOR_SCHEME) },
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
    <div data-test-id={args['data-test-id'] ?? TEST_IDS.root}>
      <DemoPage>
        <DemoPanel width='wide'>
          <DemoTitle>Theme</DemoTitle>
          <DemoHint>
            <code>ChildThemeProvider</code> переопределяет оси оформления в поддереве и эмитит полный набор{' '}
            <code>sn-*</code> на границе. Меняйте контролы — <code>useThemeClassnames()</code> подмешивает оси из
            контекста, и образцы цвета перекрашиваются. В приложении корень держит <code>RootThemeProvider</code>, а{' '}
            <code>colorScheme</code> приходит из <code>useColorScheme</code>.
          </DemoHint>
          <DemoActions block>
            <div className={styles.stack}>
              <ChildThemeProvider
                value={{
                  colorScheme: args.colorScheme,
                  brand: args.brand,
                  brandRole: args.brandRole,
                  density: args.density,
                  acrylic: args.acrylic,
                }}
              >
                <ThemeSurface />
              </ChildThemeProvider>
            </div>
          </DemoActions>
        </DemoPanel>
      </DemoPage>
    </div>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};

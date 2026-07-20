import { APPEARANCE, Button, SIZE, VIEW } from '@ds/button';
import { useThemeConfig } from '@ds/theme';
import { Meta, StoryObj } from '@storybook/react';
import cn from 'classnames';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { ThemedShowcase } from '../shared/ThemedShowcase';
import styles from './styles.module.scss';
import { TEST_IDS } from './testIds';

const THEME_MAP = { light: 'sn-light', dark: 'sn-dark' } as const;
type ConfigTheme = keyof typeof THEME_MAP;

function ThemeScope({ defaultTheme, testId }: { defaultTheme: ConfigTheme; testId: string }) {
  const { theme, themeClassName, changeTheme } = useThemeConfig<ConfigTheme>({ themeMap: THEME_MAP, defaultTheme });

  return (
    <div className={cn(themeClassName, styles.scope)} data-test-id={testId}>
      <div className={styles.toggle}>
        <Button
          label='Светлая'
          size={SIZE.S}
          appearance={APPEARANCE.Neutral}
          view={theme === 'light' ? VIEW.Filled : VIEW.Outline}
          onClick={() => changeTheme('light')}
        />
        <Button
          label='Тёмная'
          size={SIZE.S}
          appearance={APPEARANCE.Neutral}
          view={theme === 'dark' ? VIEW.Filled : VIEW.Outline}
          onClick={() => changeTheme('dark')}
        />
      </div>
      <ThemedShowcase
        caption={
          <>
            Локальная схема: <code>{theme}</code>
          </>
        }
      />
    </div>
  );
}

const meta: Meta = {
  title: 'Components/Theme/Config',
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: () => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>useThemeConfig — независимые области</DemoTitle>
        <DemoHint>
          Хук держит цветовую схему локально в поддереве и вешает класс через <code>themeClassName</code>. Две области
          ниже переключаются независимо — видно, как перекрашивается живой UI, а не строка классов.
        </DemoHint>
        <DemoActions block>
          <div className={styles.grid}>
            <ThemeScope defaultTheme='light' testId={TEST_IDS.scopeLight} />
            <ThemeScope defaultTheme='dark' testId={TEST_IDS.scopeDark} />
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId(TEST_IDS.scopeLight)).toBeVisible();
    await expect(canvas.getByTestId(TEST_IDS.scopeDark)).toBeVisible();
  },
};

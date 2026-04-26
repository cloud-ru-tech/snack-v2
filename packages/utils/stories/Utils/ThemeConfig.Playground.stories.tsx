import type { Meta, StoryObj } from '@storybook/react';
import cn from 'classnames';

import utilsReadme from '../../README.md?raw';
import { useThemeConfig } from '../../src';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Utils/Theme Config',
  parameters: {
    readme: { content: utilsReadme },
  },
  args: {},
};

export default meta;

enum Theme {
  Light = 'Light',
  Dark = 'Dark',
}

const themeMap = {
  [Theme.Light]: 'sn-light',
  [Theme.Dark]: 'sn-dark',
};

type StorybookTheme = 'light' | 'dark';

type StoryProps = {
  initialTheme?: StorybookTheme;
};

type Story = StoryObj<StoryProps>;

function PlaygroundDemo({ initialTheme }: StoryProps) {
  const defaultTheme = initialTheme === 'dark' ? Theme.Dark : Theme.Light;
  const theme1 = useThemeConfig<Theme>({ themeMap, defaultTheme });
  const theme2 = useThemeConfig<Theme>({ themeMap, defaultTheme });

  return (
    <div className={cn(theme1.themeClassName, styles.themeWrapper)}>
      <p>Текущая тема: {theme1.theme}</p>
      <p>Класс: {theme1.themeClassName}</p>
      <div className={styles.buttonWrapper}>
        <button type='button' onClick={() => theme1.changeTheme(Theme.Light)}>
          Light Theme
        </button>
        <button type='button' onClick={() => theme1.changeTheme(Theme.Dark)}>
          Dark Theme
        </button>
      </div>
      <div className={cn(theme2.themeClassName, styles.themeWrapper)}>
        <p>Текущая тема: {theme2.theme}</p>
        <p>Класс: {theme2.themeClassName}</p>
        <div className={styles.buttonWrapper}>
          <button type='button' onClick={() => theme2.changeTheme(Theme.Light)}>
            Light Theme
          </button>
          <button type='button' onClick={() => theme2.changeTheme(Theme.Dark)}>
            Dark Theme
          </button>
        </div>
      </div>
    </div>
  );
}

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: (_args, context) => {
    const theme = (context.globals?.theme as StorybookTheme | undefined) ?? 'light';
    return <PlaygroundDemo initialTheme={theme} />;
  },
};

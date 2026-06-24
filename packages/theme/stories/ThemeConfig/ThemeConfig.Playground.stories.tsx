import { APPEARANCE, Button, VIEW } from '@ds/button';
import { Meta, StoryObj } from '@storybook/react';
import cn from 'classnames';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { useThemeConfig } from '../../src';
import styles from './styles.module.scss';
import { TEST_IDS } from './testIds';

type ValueOf<T> = T[keyof T];

const meta: Meta = {
  title: 'Theme/Theme Config',
  parameters: {
    layout: 'fullscreen',
  },
  args: { 'data-test-id': TEST_IDS.themeConfig },
};

export default meta;

const Theme = {
  Light: 'Light',
  Dark: 'Dark',
} as const;
type Theme = ValueOf<typeof Theme>;

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
        <Button
          label='Light Theme'
          view={VIEW.Outline}
          appearance={APPEARANCE.Neutral}
          onClick={() => theme1.changeTheme(Theme.Light)}
        />
        <Button
          label='Dark Theme'
          view={VIEW.Outline}
          appearance={APPEARANCE.Neutral}
          onClick={() => theme1.changeTheme(Theme.Dark)}
        />
      </div>
      <div className={cn(theme2.themeClassName, styles.themeWrapper)}>
        <p>Текущая тема: {theme2.theme}</p>
        <p>Класс: {theme2.themeClassName}</p>
        <div className={styles.buttonWrapper}>
          <Button
            label='Light Theme'
            view={VIEW.Outline}
            appearance={APPEARANCE.Neutral}
            onClick={() => theme2.changeTheme(Theme.Light)}
          />
          <Button
            label='Dark Theme'
            view={VIEW.Outline}
            appearance={APPEARANCE.Neutral}
            onClick={() => theme2.changeTheme(Theme.Dark)}
          />
        </div>
      </div>
    </div>
  );
}

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: (_args, context) => {
    const theme = (context.globals?.theme as StorybookTheme | undefined) ?? 'light';
    return (
      <DemoPage>
        <DemoPanel>
          <DemoTitle>Playground</DemoTitle>
          <DemoHint>Хук useThemeConfig: два независимых scope-провайдера, каждый со своей темой.</DemoHint>
          <DemoActions align='center'>
            <PlaygroundDemo initialTheme={theme} />
          </DemoActions>
        </DemoPanel>
      </DemoPage>
    );
  },
};

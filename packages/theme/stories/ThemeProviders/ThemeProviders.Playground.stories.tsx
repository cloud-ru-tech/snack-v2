import { APPEARANCE, Button, VIEW } from '@ds/button';
import { Meta, StoryObj } from '@storybook/react';
import { useMemo, useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { ChildThemeProvider } from '../../src/components/ChildThemeProvider';
import { RootThemeProvider } from '../../src/components/RootThemeProvider';
import { ThemeAppearanceContextValue, useThemeAppearance } from '../../src/context/appearanceContext';
import { getGlobalThemeStore } from '../../src/store/globalStore';
import { ThemedShowcase } from '../shared/ThemedShowcase';
import styles from './styles.module.scss';
import { TEST_IDS } from './testIds';

const meta: Meta = {
  title: 'Components/Theme/Providers',
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj;

/** Акцентный тон бренда, унаследованный элементом из ближайшего провайдера. */
function accentTone(element: Element): string {
  return getComputedStyle(element).getPropertyValue('--sn-brand-color-primary-55').trim();
}

function RootChildDemo() {
  // colorScheme (и acrylic) наследуются от тулбар-аддона темы; демонстрируется переопределение brand/density в Child.
  const { appearance } = useThemeAppearance();

  return (
    <RootThemeProvider value={{ ...appearance, brand: 'brandA', brandRole: 'main', density: 'comfort' }}>
      <div className={styles.stack}>
        <ThemedShowcase
          testId={TEST_IDS.rootRegion}
          caption={
            <>
              Root — <code>brandA · comfort</code>
            </>
          }
        />
        <ChildThemeProvider value={{ brand: 'brandC', density: 'spacious' }}>
          <ThemedShowcase
            testId={TEST_IDS.childRegion}
            caption={
              <>
                Child — <code>brandC · spacious</code> (colorScheme наследуется)
              </>
            }
          />
        </ChildThemeProvider>
      </div>
    </RootThemeProvider>
  );
}

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: () => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Root → Child: переопределение осей</DemoTitle>
        <DemoHint>
          <code>ChildThemeProvider</code> переопределяет оси в поддереве (здесь <code>brand</code> и{' '}
          <code>density</code>) поверх родителя; остальные оси (<code>colorScheme</code> из тулбар-аддона,{' '}
          <code>brandRole</code>) наследуются. У вложенного showcase другой акцент и отступы — видно, что
          переопределение работает.
        </DemoHint>
        <DemoActions block>
          <RootChildDemo />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const root = canvas.getByTestId(TEST_IDS.rootRegion);
    const child = canvas.getByTestId(TEST_IDS.childRegion);

    await expect(root).toBeVisible();
    await expect(child).toBeVisible();

    // Разный brand → разный акцентный тон: переопределение видно на токене, унаследованном showcase'ем.
    await waitFor(() => {
      const rootAccent = accentTone(root);
      const childAccent = accentTone(child);
      expect(rootAccent).not.toBe('');
      expect(childAccent).not.toBe('');
      expect(rootAccent).not.toBe(childAccent);
    });
  },
};

function RootRefDemo() {
  const [element, setElement] = useState<HTMLDivElement | null>(null);
  const rootRef = useMemo<{ current: HTMLElement | null }>(() => ({ current: element }), [element]);
  // colorScheme наследуется от тулбар-аддона; density переопределяем явно, чтобы показать эффект на внешнем элементе.
  const { appearance } = useThemeAppearance();

  return (
    <div ref={setElement} data-test-id={TEST_IDS.rootRefTarget}>
      <RootThemeProvider value={{ ...appearance, density: 'comfort' }} rootRef={rootRef}>
        <ThemedShowcase caption={<>Классы `sn-*` навешены на внешний элемент (rootRef), без лишнего DOM-узла.</>} />
      </RootThemeProvider>
    </div>
  );
}

export const RootRef: Story = {
  tags: ['dev', 'test'],
  render: () => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>rootRef — классы на внешнем элементе</DemoTitle>
        <DemoHint>
          <code>RootThemeProvider</code> применяет полный набор к переданному элементу через эффект, не создавая
          обёрточный `div`. Схема — от тулбар-аддона, <code>density</code> переопределён на <code>comfort</code>.
        </DemoHint>
        <DemoActions block>
          <RootRefDemo />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    const target = within(canvasElement).getByTestId(TEST_IDS.rootRefTarget);

    // Явно переопределённая ось density попадает на внешний элемент — доказывает работу rootRef.
    await waitFor(() => {
      expect(target.classList.contains('sn-comfort')).toBe(true);
    });
  },
};

function StoreBackedDemo() {
  // Локальный реактивный стор (не глобальный) — демонстрирует store-режим без мутации синглтона.
  const [store] = useState(() => {
    let current: ThemeAppearanceContextValue = { appearance: { colorScheme: 'light', density: 'compact' } };
    const listeners = new Set<() => void>();

    return {
      external: {
        subscribe: (onChange: () => void) => {
          listeners.add(onChange);

          return () => {
            listeners.delete(onChange);
          };
        },
        getSnapshot: () => current,
        getServerSnapshot: () => current,
      },
      toggle: () => {
        const next: ThemeAppearanceContextValue['appearance'] =
          current.appearance.colorScheme === 'light'
            ? { colorScheme: 'dark', density: 'comfort' }
            : { colorScheme: 'light', density: 'compact' };
        current = { appearance: next };
        listeners.forEach(listener => listener());
      },
    };
  });

  return (
    <RootThemeProvider store={store.external}>
      <div className={styles.stack}>
        <ThemedShowcase
          testId={TEST_IDS.storeRegion}
          caption={<>Оформление из внешнего стора — смена реэмитит классы без перерендера провайдера.</>}
        />
        <Button
          label='Переключить схему стора'
          view={VIEW.Outline}
          appearance={APPEARANCE.Neutral}
          data-test-id={TEST_IDS.storeToggle}
          onClick={store.toggle}
        />
      </div>
    </RootThemeProvider>
  );
}

export const StoreBacked: Story = {
  tags: ['dev', 'test'],
  render: () => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>store-режим (реактивный)</DemoTitle>
        <DemoHint>
          <code>RootThemeProvider</code> подписан на внешний стор; смена значения реэмитит классы у всех потребителей
          без перерендера провайдера (так глобальный стор пробивает микрофронты — см. <code>getGlobalThemeStore</code>).
        </DemoHint>
        <DemoActions block>
          <StoreBackedDemo />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const region = canvas.getByTestId(TEST_IDS.storeRegion);

    const backgroundBefore = getComputedStyle(region)
      .getPropertyValue('--sn-theme-color-neutral-background2Level')
      .trim();

    await userEvent.click(canvas.getByTestId(TEST_IDS.storeToggle));

    // Смена схемы в сторе перекрашивает showcase: токен фона стал другим.
    await waitFor(() => {
      const backgroundAfter = getComputedStyle(region)
        .getPropertyValue('--sn-theme-color-neutral-background2Level')
        .trim();
      expect(backgroundAfter).not.toBe(backgroundBefore);
    });

    // Ссылка на getGlobalThemeStore — публичный экспорт (используется в шеллах).
    expect(typeof getGlobalThemeStore).toBe('function');
  },
};

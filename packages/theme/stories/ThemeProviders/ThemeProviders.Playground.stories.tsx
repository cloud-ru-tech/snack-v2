import { Button } from '@ds/button';
import { Typography } from '@ds/typography';
import { Meta, StoryObj } from '@storybook/react';
import { useMemo, useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { ChildThemeProvider } from '../../src/components/ChildThemeProvider';
import { RootThemeProvider } from '../../src/components/RootThemeProvider';
import { ThemeAppearanceContextValue } from '../../src/context/appearanceContext';
import { useThemeClassnames } from '../../src/hooks/useThemeClassnames';
import { getGlobalThemeStore } from '../../src/store/globalStore';
import { TEST_IDS } from './testIds';

const meta: Meta = {
  title: 'Theme/Theme Providers',
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj;

/** Показывает строку классов, которую `useThemeClassnames` собрал из ближайшего контекста. */
function ClassReadout({ testId, label }: { testId: string; label: string }) {
  const className = useThemeClassnames();

  return (
    <div className={className}>
      <Typography variant='body' size='s' as='div'>
        {label}
      </Typography>
      <code data-test-id={testId}>{className}</code>
    </div>
  );
}

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: () => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Root → Child (Figma-цепочка)</DemoTitle>
        <DemoHint>
          Child переопределяет density+brand поверх Root; colorScheme/brandRole наследуются. Каждая граница реэмитит
          полный набор `sn-*`.
        </DemoHint>
        <DemoActions align='start'>
          <RootThemeProvider value={{ colorScheme: 'dark', brand: 'brandA', brandRole: 'main', density: 'compact' }}>
            <ClassReadout testId={TEST_IDS.rootReadout} label='root' />
            <ChildThemeProvider value={{ density: 'comfort', brand: 'brandC' }}>
              <ClassReadout testId={TEST_IDS.childReadout} label='child' />
            </ChildThemeProvider>
          </RootThemeProvider>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const root = canvas.getByTestId(TEST_IDS.rootReadout).textContent ?? '';
    const child = canvas.getByTestId(TEST_IDS.childReadout).textContent ?? '';

    expect(root).toContain('sn-dark');
    expect(root).toContain('sn-compact');
    expect(root).toContain('sn-brandA');

    // Наследование + локальный override.
    expect(child).toContain('sn-dark'); // colorScheme унаследован
    expect(child).toContain('sn-main'); // brandRole унаследован
    expect(child).toContain('sn-comfort'); // density переопределён
    expect(child).toContain('sn-brandC'); // brand переопределён
    expect(child).not.toContain('sn-compact');
  },
};

function RootRefDemo() {
  const [el, setEl] = useState<HTMLDivElement | null>(null);
  const ref = useMemo<{ current: HTMLElement | null }>(() => ({ current: el }), [el]);

  return (
    <div ref={setEl} data-test-id={TEST_IDS.rootRefTarget}>
      <RootThemeProvider value={{ colorScheme: 'dark', density: 'comfort' }} rootRef={ref}>
        <Typography variant='body' size='s'>
          Полный набор `sn-*` навешен на внешний элемент (rootRef), без лишнего DOM-узла.
        </Typography>
      </RootThemeProvider>
    </div>
  );
}

export const RootRef: Story = {
  tags: ['dev', 'test'],
  render: () => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>rootRef — классы на внешнем элементе</DemoTitle>
        <DemoHint>RootThemeProvider применяет полный набор к переданному элементу через эффект.</DemoHint>
        <DemoActions align='start'>
          <RootRefDemo />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    const target = within(canvasElement).getByTestId(TEST_IDS.rootRefTarget);

    await waitFor(() => {
      expect(target.classList.contains('sn-dark')).toBe(true);
      expect(target.classList.contains('sn-comfort')).toBe(true);
    });
  },
};

function StoreBackedDemo() {
  // Локальный стор (не глобальный) — демонстрирует store-режим без мутации глобального синглтона.
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
        current = { appearance: { colorScheme: 'dark', density: 'comfort' } };
        listeners.forEach(listener => listener());
      },
    };
  });

  return (
    <RootThemeProvider store={store.external}>
      <ClassReadout testId={TEST_IDS.storeReadout} label='store' />
      <Button label='Тёмная + comfort' data-test-id={TEST_IDS.storeToggle} onClick={store.toggle} />
    </RootThemeProvider>
  );
}

export const StoreBacked: Story = {
  tags: ['dev', 'test'],
  render: () => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>store-режим (реактивный)</DemoTitle>
        <DemoHint>
          RootThemeProvider подписан на внешний стор; смена значения реэмитит классы у всех потребителей без перерендера
          провайдера (так глобальный стор пробивает микрофронты — см. getGlobalThemeStore).
        </DemoHint>
        <DemoActions align='start'>
          <StoreBackedDemo />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByTestId(TEST_IDS.storeReadout).textContent ?? '').toContain('sn-light');

    await userEvent.click(canvas.getByTestId(TEST_IDS.storeToggle));

    await waitFor(() => {
      const text = canvas.getByTestId(TEST_IDS.storeReadout).textContent ?? '';
      expect(text).toContain('sn-dark');
      expect(text).toContain('sn-comfort');
    });

    // Ссылка на getGlobalThemeStore — экспорт зафиксирован публично (используется в шеллах).
    expect(typeof getGlobalThemeStore).toBe('function');
  },
};

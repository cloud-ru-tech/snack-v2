import { APPEARANCE, Button, SIZE, VIEW } from '@ds/button';
import { FieldColor } from '@ds/fields';
import { RootThemeProvider, useApplyCustomTheme, useThemeAppearance } from '@ds/theme';
import { Meta, StoryObj } from '@storybook/react';
import { ReactNode, useMemo, useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { ThemePreview } from '../shared/ThemePreview';
import styles from './CustomTheme.module.scss';
import { TEST_IDS } from './testIds';

const meta: Meta = {
  title: 'Components/Theme/Custom Theme',
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj;

const PRESETS = [
  { color: '#ff7a00', label: 'Оранжевый', testId: TEST_IDS.presetOrange },
  { color: '#8a2be2', label: 'Фиолетовый', testId: TEST_IDS.presetViolet },
  { color: '#389f74', label: 'Зелёный', testId: TEST_IDS.presetGreen },
] as const;

const HOOK_SCOPE_ID = 'custom-theme-hook-scope';

/** Левая панель управления: поле цвета + пресеты. Дропдаун открывается вниз в этой колонке. */
function Controls({
  color,
  onColor,
  fieldTestId,
}: {
  color: string;
  onColor(color: string): void;
  fieldTestId: string;
}) {
  return (
    <div className={styles.sidebar}>
      <div className={styles.field}>
        <FieldColor
          value={color}
          onChange={onColor}
          showClearButton={false}
          data-test-id={fieldTestId}
          withAlpha={false}
        />
      </div>
      <div className={styles.presets}>
        {PRESETS.map(preset => (
          <Button
            key={preset.color}
            appearance={APPEARANCE.Neutral}
            view={VIEW.Outline}
            size={SIZE.S}
            label={preset.label}
            data-test-id={preset.testId}
            onClick={() => onColor(preset.color)}
          />
        ))}
      </div>
    </div>
  );
}

function DeclarativeDemo() {
  const [color, setColor] = useState('#0077ff');
  // Светлая/тёмная схема (и остальные оси) наследуются от тулбар-аддона темы; brandColor переопределяет акцент.
  const { appearance } = useThemeAppearance();

  return (
    <div className={styles.layout}>
      <Controls color={color} onColor={setColor} fieldTestId={TEST_IDS.field} />
      <RootThemeProvider value={appearance} brandColor={color} className={styles.preview}>
        <ThemePreview testId={TEST_IDS.preview} />
      </RootThemeProvider>
    </div>
  );
}

/**
 * Декларативный путь: `brandColor` на `RootThemeProvider`. Панель управления слева, превью справа —
 * дропдаун color-picker'а не перекрывает акцентные элементы.
 */
export const Playground: Story = {
  tags: ['dev', 'test'],
  render: () => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Кастомная тема из seed-цвета</DemoTitle>
        <DemoHint>
          Выберите бренд-цвет полем или пресетом — палитра `--sn-brand-color-primary-*` перегенерируется, и все
          акцентные элементы превью перекрашиваются (семантический слой каскадит из тонов).
        </DemoHint>
        <DeclarativeDemo />
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const preview = canvas.getByTestId(TEST_IDS.preview);

    await expect(canvas.getByTestId(TEST_IDS.field)).toBeVisible();
    await expect(preview).toBeVisible();

    await userEvent.click(canvas.getByTestId(TEST_IDS.presetOrange));

    // Seed каскадит на бренд-тон 55, который наследуется вглубь превью.
    await waitFor(() => {
      const accent = getComputedStyle(preview).getPropertyValue('--sn-brand-color-primary-55').trim();
      expect(accent.toLowerCase()).toContain('#ff7a00');
    });
  },
};

function HookScope({ color, children }: { color: string; children: ReactNode }) {
  const [element, setElement] = useState<HTMLDivElement | null>(null);
  const rootRef = useMemo<{ current: HTMLElement | null }>(() => ({ current: element }), [element]);
  // Схема наследуется от тулбар-аддона темы; хук инжектит только бренд-переменные.
  const { appearance } = useThemeAppearance();

  // Хук инжектит `<style>` на бренд-классы поддерева `#id` — правило переживает переэмиты sn-* внутри.
  useApplyCustomTheme({ color, scope: `#${HOOK_SCOPE_ID}` });

  return (
    <div id={HOOK_SCOPE_ID} ref={setElement} className={styles.preview}>
      <RootThemeProvider value={appearance} rootRef={rootRef}>
        {children}
      </RootThemeProvider>
    </div>
  );
}

function ImperativeDemo() {
  const [color, setColor] = useState('#e5006e');

  return (
    <div className={styles.layout}>
      <Controls color={color} onColor={setColor} fieldTestId={TEST_IDS.hookField} />
      <HookScope color={color}>
        <ThemePreview testId={TEST_IDS.hookPreview} />
      </HookScope>
    </div>
  );
}

/**
 * Императивный путь: хук `useApplyCustomTheme` инжектит `<style>` на бренд-классы. Здесь скоуплен на
 * `#id`, чтобы перекрасить только превью; в приложении вызывается без `scope` — глобально (и порталы).
 */
export const ImperativeHook: Story = {
  tags: ['dev', 'test'],
  render: () => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>useApplyCustomTheme (императивный хук)</DemoTitle>
        <DemoHint>
          Тот же результат через хук: <code>useApplyCustomTheme({'{ color, scope }'})</code>. В приложении вызывается
          один раз в bootstrap, без <code>scope</code> — глобально (перекрашивает и порталы).
        </DemoHint>
        <ImperativeDemo />
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const preview = canvas.getByTestId(TEST_IDS.hookPreview);

    await expect(preview).toBeVisible();

    await waitFor(() => {
      const accent = getComputedStyle(preview).getPropertyValue('--sn-brand-color-primary-55').trim();
      expect(accent.toLowerCase()).toContain('#e5006e');
    });
  },
};

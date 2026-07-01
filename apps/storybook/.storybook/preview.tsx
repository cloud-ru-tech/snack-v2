import '@sbercloud/figma-variables/build/css/tokens.css';

import './global.scss';

import { AdaptiveProvider, LAYOUT_TYPE, LayoutType } from '@ds/adaptive';
import { LocaleProvider } from '@ds/locale';
import { PortalContextProvider } from '@ds/portal-context';
import { RootThemeProvider } from '@ds/theme';
import type { Preview } from '@storybook/react';
import { useMemo, useState } from 'react';
import { configure } from 'storybook/test';

import { GLOBAL_KEYS, INITIAL_GLOBALS } from './addons/theme-controls';
import { StoryWrapper } from './components';
import type { Acrylic, Brand, BrandRole, Density, Language, Theme } from './components/types';
// Реп использует `data-test-id` (TEST_ID_ATTRIBUTE в playwright/constants/common.ts),
// testing-library по умолчанию ищет `data-testid`. Синхронизируем, чтобы getByTestId
// из play-функций находил элементы по нашему атрибуту.
configure({ testIdAttribute: 'data-test-id' });

const preview: Preview = {
  // Адаптивная раскладка — глобал в тулбаре (по аналогии с theme/brand/density). Декоратор выше
  // оборачивает каждую стори в единый `AdaptiveProvider`, поэтому адаптивным стори больше не нужны
  // ни per-story `<AdaptiveProvider>`, ни контрол `layoutType` в args.
  initialGlobals: {
    layoutType: LAYOUT_TYPE.Desktop,
  },
  globalTypes: {
    layoutType: {
      description: 'Адаптивная раскладка (AdaptiveProvider)',
      toolbar: {
        title: 'Layout',
        icon: 'mobile',
        items: [
          { value: LAYOUT_TYPE.Desktop, title: 'Desktop', icon: 'browser' },
          { value: LAYOUT_TYPE.Mobile, title: 'Mobile', icon: 'mobile' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      // Ref через state, а не useRef, + отложенный рендер story (ниже): стори с initially-open
      // порталом (tests/Open, visual-спеки) создают FloatingPortal на первом рендере, когда
      // `current` ещё null — floating-ui в этом случае монтирует портал в `body` мимо
      // theme-классов (sn-compact/sn-light) и НЕ пересоздаёт его при появлении root
      // (guard `portalNodeRef.current`). Контент портала терял density/цветовые токены.
      const [storyWrapperEl, setStoryWrapperEl] = useState<HTMLDivElement | null>(null);
      const storyWrapperRef = useMemo(() => ({ current: storyWrapperEl }), [storyWrapperEl]);
      const g = context.globals ?? {};
      const theme = (g[GLOBAL_KEYS.THEME] as Theme) ?? INITIAL_GLOBALS[GLOBAL_KEYS.THEME];
      const brand = (g[GLOBAL_KEYS.BRAND] as Brand) ?? INITIAL_GLOBALS[GLOBAL_KEYS.BRAND];
      const brandRole = (g[GLOBAL_KEYS.BRAND_ROLE] as BrandRole) ?? INITIAL_GLOBALS[GLOBAL_KEYS.BRAND_ROLE];
      const density = (g[GLOBAL_KEYS.DENSITY] as Density) ?? INITIAL_GLOBALS[GLOBAL_KEYS.DENSITY];
      const language = (g[GLOBAL_KEYS.LANGUAGE] as Language) ?? INITIAL_GLOBALS[GLOBAL_KEYS.LANGUAGE];
      const acrylic = (g[GLOBAL_KEYS.ACRYLIC] as Acrylic) ?? INITIAL_GLOBALS[GLOBAL_KEYS.ACRYLIC];
      // Адаптивная раскладка из тулбара (см. globalTypes.layoutType выше). Один глобальный
      // AdaptiveProvider избавляет адаптивные стори от per-story обёртки + контрола `layoutType`;
      // VisualMatrix, рендерящие обе раскладки осью, ставят свои внутренние провайдеры (они
      // переопределяют этот для своих поддеревьев). Форс конкретной стори — `withLayoutType`.
      const layoutType = (g.layoutType as LayoutType) ?? LAYOUT_TYPE.Desktop;

      return (
        <RootThemeProvider
          value={{ colorScheme: theme, brand, brandRole, density, acrylic: acrylic === 'enabled' }}
          rootRef={storyWrapperRef}
        >
          <PortalContextProvider root={storyWrapperRef}>
            <LocaleProvider lang={language}>
              <AdaptiveProvider layoutType={layoutType}>
                <StoryWrapper ref={setStoryWrapperEl}>
                  {/* Story монтируется только после появления wrapper-элемента — гарантия,
                      что порталы создаются уже с корректным root внутри theme-обёртки. */}
                  {storyWrapperEl ? <Story /> : null}
                </StoryWrapper>
              </AdaptiveProvider>
            </LocaleProvider>
          </PortalContextProvider>
        </RootThemeProvider>
      );
    },
  ],

  parameters: {
    controls: {
      // expanded: true → колонка Description рядом с Name/Control в панели.
      // JSDoc на каждом пропе подтягивается через react-docgen-typescript.
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /date$/i,
      },
    },
    // Встроенный аддон Backgrounds выключен — фон сцены задаёт кастомный theme-controls (тема/бренд).
    backgrounds: { disable: true },

    // Сортировка stories
    options: {
      // @ts-expect-error storybook не парсит TS-типы и ломается
      storySort: (a, b) => {
        // Storybook извлекает storySort из исходника и eval-ит отдельно — импорты внутри
        // недоступны. Порядок групп приходит из globalThis.__DS_SB_ORDER__, который main.ts
        // строит из domains.ts + categories.ts (один источник, без дубля списка здесь).
        const order = globalThis.__DS_SB_ORDER__ || { domains: [], categories: [] };
        const TOP_ORDER = ['Introduction', 'Documentation'].concat(order.domains);
        const CATEGORY_ORDER = order.categories;
        const STORY_PRIORITY = { Playground: 1, VisualMatrix: 2 };
        // @ts-expect-error storybook eval-ит storySort как JS — TS-аннотации недопустимы
        const rank = (arr, v) => {
          const i = arr.indexOf(v);
          return i === -1 ? 999 : i;
        };

        const at = a.title.split('/');
        const bt = b.title.split('/');

        // 1. Верхний уровень (домен)
        if (at[0] !== bt[0]) {
          const ar = rank(TOP_ORDER, at[0]);
          const br = rank(TOP_ORDER, bt[0]);
          return ar !== br ? ar - br : at[0].localeCompare(bt[0]);
        }

        // 2. Категория (второй сегмент)
        if (at[1] !== bt[1]) {
          const ar = rank(CATEGORY_ORDER, at[1]);
          const br = rank(CATEGORY_ORDER, bt[1]);
          if (ar !== br) return ar - br;
        }

        // 3. Tests-подпапка последней
        if (a.title !== b.title) {
          const aIsTests = a.title.endsWith('/Tests');
          const bIsTests = b.title.endsWith('/Tests');
          if (aIsTests !== bIsTests) return aIsTests ? 1 : -1;
          return a.title.localeCompare(b.title);
        }

        // 4. Playground первым, VisualMatrix вторым, дальше alphabet
        // @ts-expect-error storybook не парсит TS-типы и ломается
        const aP = STORY_PRIORITY[a.name] ?? 99;
        // @ts-expect-error storybook не парсит TS-типы и ломается
        const bP = STORY_PRIORITY[b.name] ?? 99;
        if (aP !== bP) return aP - bP;
        return a.name.localeCompare(b.name);
      },
    },
  },
};

export default preview;

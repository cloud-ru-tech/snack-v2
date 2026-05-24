import '@sbercloud/figma-variables/build/css/tokens.css';

import './global.scss';

import { LocaleProvider } from '@ds/locale';
import { PortalContextProvider } from '@ds/portal-context';
import type { Preview } from '@storybook/react';
import { useRef } from 'react';
import { configure } from 'storybook/test';

import { GLOBAL_KEYS, INITIAL_GLOBALS } from './addons/theme-controls';
import { PreviewThemeProvider, StoryWrapper } from './components';
import type { Acrylic, Brand, BrandRole, Density, Language, Theme } from './components/types';
// Реп использует `data-test-id` (TEST_ID_ATTRIBUTE в playwright/constants/common.ts),
// testing-library по умолчанию ищет `data-testid`. Синхронизируем, чтобы getByTestId
// из play-функций находил элементы по нашему атрибуту.
configure({ testIdAttribute: 'data-test-id' });

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const storyWrapperRef = useRef<HTMLDivElement>(null);
      const g = context.globals ?? {};
      const theme = (g[GLOBAL_KEYS.THEME] as Theme) ?? INITIAL_GLOBALS[GLOBAL_KEYS.THEME];
      const brand = (g[GLOBAL_KEYS.BRAND] as Brand) ?? INITIAL_GLOBALS[GLOBAL_KEYS.BRAND];
      const brandRole = (g[GLOBAL_KEYS.BRAND_ROLE] as BrandRole) ?? INITIAL_GLOBALS[GLOBAL_KEYS.BRAND_ROLE];
      const density = (g[GLOBAL_KEYS.DENSITY] as Density) ?? INITIAL_GLOBALS[GLOBAL_KEYS.DENSITY];
      const language = (g[GLOBAL_KEYS.LANGUAGE] as Language) ?? INITIAL_GLOBALS[GLOBAL_KEYS.LANGUAGE];
      const acrylic = (g[GLOBAL_KEYS.ACRYLIC] as Acrylic) ?? INITIAL_GLOBALS[GLOBAL_KEYS.ACRYLIC];

      return (
        <PreviewThemeProvider theme={theme}>
          <PortalContextProvider root={storyWrapperRef}>
            <LocaleProvider lang={language}>
              <StoryWrapper
                ref={storyWrapperRef}
                theme={theme}
                brand={brand}
                brandRole={brandRole}
                density={density}
                acrylic={acrylic}
              >
                <Story />
              </StoryWrapper>
            </LocaleProvider>
          </PortalContextProvider>
        </PreviewThemeProvider>
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
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: 'oklch(98% 0 0)' },
        { name: 'surface', value: 'oklch(96% 0 0)' },
      ],
    },

    // Сортировка stories
    options: {
      storySort: (a, b) => {
        const TOP_ORDER = ['Introduction', 'Documentation', 'Materials', 'Icons', 'Utils', 'Components'];
        const STORY_PRIORITY = {
          Playground: 1,
          VisualMatrix: 2,
        };

        // 1. Top-level group order
        const aTop = a.title.split('/')[0];
        const bTop = b.title.split('/')[0];
        if (aTop !== bTop) {
          const aIdx = TOP_ORDER.indexOf(aTop);
          const bIdx = TOP_ORDER.indexOf(bTop);
          if (aIdx === -1 && bIdx === -1) return aTop.localeCompare(bTop);
          if (aIdx === -1) return 1;
          if (bIdx === -1) return -1;
          return aIdx - bIdx;
        }

        // 2. Same top-level, different titles — Tests subfolder идёт последним
        if (a.title !== b.title) {
          const aIsTests = a.title.endsWith('/Tests');
          const bIsTests = b.title.endsWith('/Tests');
          if (aIsTests !== bIsTests) return aIsTests ? 1 : -1;
          return a.title.localeCompare(b.title);
        }

        // 3. Same title — Playground first, Visual Matrix second, остальное alphabet
        const aP = STORY_PRIORITY[a.name] ?? 99;
        const bP = STORY_PRIORITY[b.name] ?? 99;
        if (aP !== bP) return aP - bP;
        return a.name.localeCompare(b.name);
      },
    },
  },
};

export default preview;

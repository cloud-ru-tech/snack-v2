import '@sbercloud/figma-variables/build/css/tokens.css';

import './global.scss';

import { PortalContextProvider } from '@ds/portal-context';
import type { Preview } from '@storybook/react';
import { useRef } from 'react';
import { configure } from 'storybook/test';

import { GLOBAL_KEYS, INITIAL_GLOBALS } from './addons/theme-controls';
import { StoryWrapper } from './components';
import type { Acrylic, Brand, Language, Platform, Theme } from './components/types';

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
      const platform = (g[GLOBAL_KEYS.PLATFORM] as Platform) ?? INITIAL_GLOBALS[GLOBAL_KEYS.PLATFORM];
      const language = (g[GLOBAL_KEYS.LANGUAGE] as Language) ?? INITIAL_GLOBALS[GLOBAL_KEYS.LANGUAGE];
      const acrylic = (g[GLOBAL_KEYS.ACRYLIC] as Acrylic) ?? INITIAL_GLOBALS[GLOBAL_KEYS.ACRYLIC];

      return (
        <PortalContextProvider root={storyWrapperRef}>
          <StoryWrapper
            ref={storyWrapperRef}
            theme={theme}
            brand={brand}
            platform={platform}
            language={language}
            acrylic={acrylic}
          >
            <Story />
          </StoryWrapper>
        </PortalContextProvider>
      );
    },
  ],

  parameters: {
    controls: {
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
      storySort: {
        order: ['Introduction', 'Documentation', 'Materials', 'Icons', 'Utils', 'Components', '*'],
      },
    },
  },
};

export default preview;

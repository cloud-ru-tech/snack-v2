import '@cloud-ru/figma-variables/build/css/tokens.css';

import './global.scss';

import { PortalContextProvider } from '@ds/portal-context';
import type { Preview } from '@storybook/react';
import { useRef } from 'react';
import { configure } from 'storybook/test';

import { StoryWrapper } from './components';

// Реп использует `data-test-id` (TEST_ID_ATTRIBUTE в playwright/constants/common.ts),
// testing-library по умолчанию ищет `data-testid`. Синхронизируем, чтобы getByTestId
// из play-функций находил элементы по нашему атрибуту.
configure({ testIdAttribute: 'data-test-id' });

const preview: Preview = {
  decorators: [
    Story => {
      const storyWrapperRef = useRef<HTMLDivElement>(null);
      // const theme = (context.globals?.[GLOBAL_KEYS.THEME] as 'light' | 'dark') ?? 'light';
      // const brand = (context.globals?.[GLOBAL_KEYS.BRAND] as 'brandA' | 'brandB') ?? 'brandA';
      // const platform = (context.globals?.[GLOBAL_KEYS.PLATFORM] as 'desktop' | 'mobile') ?? 'desktop';
      // const language = (context.globals?.[GLOBAL_KEYS.LANGUAGE] as 'en-GB' | 'ru-RU') ?? 'en-GB';

      return (
        <PortalContextProvider root={storyWrapperRef}>
          <StoryWrapper ref={storyWrapperRef} theme='light' brand='brandA' platform='desktop' language='en-GB'>
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
  },
};

export default preview;

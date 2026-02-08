import '@sbercloud/figma-variables/build/css/tokens.css';

import './global.scss';

import type { Preview } from '@storybook/react-vite';
import React from 'react';

import { GLOBAL_KEYS, INITIAL_GLOBALS } from './addons/theme-controls';
import { StoryWrapper } from './components';

const preview: Preview = {
  initialGlobals: INITIAL_GLOBALS,
  decorators: [
    (Story, context) => {
      const theme = (context.globals?.[GLOBAL_KEYS.THEME] as 'light' | 'dark') ?? 'light';
      const brand = (context.globals?.[GLOBAL_KEYS.BRAND] as 'brandA' | 'brandB') ?? 'brandA';
      const platform = (context.globals?.[GLOBAL_KEYS.PLATFORM] as 'desktop' | 'mobile') ?? 'desktop';
      return (
        <StoryWrapper theme={theme} brand={brand} platform={platform}>
          <Story />
        </StoryWrapper>
      );
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },

    // Сортировка stories
    options: {
      storySort: {
        order: ['Introduction', 'Documentation', 'Components', '*'],
      },
    },

    // Настройки для addon-designs (Figma)
    design: {
      type: 'figma',
    },

    // Глобальные настройки для всех stories
    layout: 'padded',
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#1a1a1a',
        },
        {
          name: 'gray',
          value: '#f5f5f5',
        },
      ],
    },

    // Настройки для addon-actions
    // argTypesRegex отключен для совместимости с visual test addon
    // Используйте явные action handlers в stories вместо regex
    actions: {
      // argTypesRegex: '^on[A-Z].*',
    },
  },
};

export default preview;

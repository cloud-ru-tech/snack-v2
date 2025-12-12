import type { Preview } from '@storybook/react-vite';
import React from 'react';
import './global.scss';

import './build/css/base/base.css';
import './build/css/brandmode/brandA.css';
import './build/css/brandmode/brandB.css';
import './build/css/platformmode/desktop.css';
import './build/css/platformmode/mobile.css';
import './build/css/styles/styles.css';
import './build/css/thememode/dark.css';
import './build/css/thememode/light.css';

import cn from 'classnames';

/**
 * Базовая обертка для всех stories
 * Подключает глобальные стили, шрифты и обеспечивает единообразное отображение
 */
const StoryWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div
      className={cn(
        'sb-story-wrapper',
        'sn-base-styles',
        'sn-figmaStyles',
        'sn-desktop',
        'sn-light',
        'sn-brandA'
      )}
      style={{ backgroundColor: 'transparent' }}
    >
      {children}
    </div>
  );
};

const preview: Preview = {
  decorators: [
    (Story) => (
      <StoryWrapper>
        <Story />
      </StoryWrapper>
    ),
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

    // Глобальные настройки для всех stories
    layout: 'padded',
    backgrounds: {
      default: 'dark',
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
  },
};

export default preview;

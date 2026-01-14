import type { Preview } from '@storybook/react-vite';
import React, { useState } from 'react';
import './global.scss';

import '@sbercloud/figma-variables/build/css/tokens.css';

import cn from 'classnames';

type Theme = 'light' | 'dark';
type Brand = 'brandA' | 'brandB';
type Platform = 'desktop' | 'mobile';

/**
 * Базовая обертка для всех stories
 * Подключает глобальные стили, шрифты и обеспечивает единообразное отображение
 */
const StoryWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [brand, setBrand] = useState<Brand>('brandA');
  const [platform, setPlatform] = useState<Platform>('desktop');

  // Синхронизация темы с родительским окном (документацией)
  React.useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'theme-sync') {
        if (event.data.theme) setTheme(event.data.theme);
        if (event.data.brand) setBrand(event.data.brand);
        if (event.data.platform) setPlatform(event.data.platform);
      }
    };

    window.addEventListener('message', handleMessage);
    
    // Запрашиваем текущую тему при загрузке
    window.parent?.postMessage({ type: 'theme-sync-request' }, '*');

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <div
      style={{
        padding: '16px',
        backgroundColor: 'var(--sn-color-neutral-background)',
        boxSizing: 'border-box',
        margin: '-1rem',
        width: 'calc(100% + 2rem)',
      }}
      className={cn(
        'sb-story-wrapper',
        'sn-primitive',
        'sn-figmaStyles',
        'sn-conmonents',
        `sn-${platform}`,
        `sn-${theme}`,
        `sn-${brand}`
      )}
    >
      <div
        style={{
          display: 'flex',
          gap: '16px',
          marginBottom: '16px',
          padding: '12px',
          //   backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          alignItems: 'center',
          flexWrap: 'wrap',
          backgroundColor: 'var(--sn-color-neutral-background1-level)',
        }}
      >
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
          <span style={{ fontWeight: 500 }}>Тема:</span>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as Theme)}
            style={{
              padding: '4px 8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            <option value="light">Светлая</option>
            <option value="dark">Темная</option>
          </select>
        </label>

        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
          <span style={{ fontWeight: 500 }}>Бренд:</span>
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value as Brand)}
            style={{
              padding: '4px 8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            <option value="brandA">Brand A</option>
            <option value="brandB">Brand B</option>
          </select>
        </label>

        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
          <span style={{ fontWeight: 500 }}>Платформа:</span>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value as Platform)}
            style={{
              padding: '4px 8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            <option value="desktop">Desktop</option>
            <option value="mobile">Mobile</option>
          </select>
        </label>
      </div>

      <div
        className={cn(
          'sb-story-wrapper',
          'sn-base-styles',
          'sn-figmaStyles',
          `sn-${platform}`,
          `sn-${theme}`,
          `sn-${brand}`
        )}
        style={{ backgroundColor: 'var(--sn-color-neutral-background)', padding: '16px' }}
      >
        {children}
      </div>
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

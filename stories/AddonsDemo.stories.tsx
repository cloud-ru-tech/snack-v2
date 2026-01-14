import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React from 'react';

/**
 * # Демонстрация Storybook аддонов
 *
 * Эта story демонстрирует возможности установленных аддонов.
 *
 * ## Доступные аддоны:
 * - **addon-docs** - автоматическая документация
 * - **addon-designs** - интеграция с Figma (вкладка "Design")
 * - **addon-links** - навигация между stories
 * - **addon-a11y** - проверка accessibility (вкладка "Accessibility")
 * - **Встроенные**: controls, actions, viewport, backgrounds (в Storybook 10.x)
 */
const DemoComponent: React.FC<{
  variant: 'primary' | 'secondary' | 'tertiary';
  size: 'small' | 'medium' | 'large';
  disabled?: boolean;
  label: string;
  onClick?: () => void;
}> = ({ variant, size, disabled = false, label, onClick }) => {
  const styles: React.CSSProperties = {
    padding: size === 'small' ? '8px 16px' : size === 'medium' ? '12px 24px' : '16px 32px',
    fontSize: size === 'small' ? '14px' : size === 'medium' ? '16px' : '18px',
    backgroundColor:
      variant === 'primary' ? '#0066cc' : variant === 'secondary' ? '#6c757d' : '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'all 0.2s',
    fontFamily: 'inherit',
  };

  return (
    <button
      style={styles}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      type="button"
    >
      {label}
    </button>
  );
};

const meta: Meta<typeof DemoComponent> = {
  title: 'Documentation/Addons Demo',
  component: DemoComponent,
  parameters: {
    docs: {
      description: {
        component: `
## Как использовать аддоны

### 1. Figma Integration (addon-designs)
Перейдите на вкладку **"Design"** в нижней панели, чтобы увидеть связанные дизайны из Figma.

Чтобы добавить свой Figma файл:
\`\`\`tsx
parameters: {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/YOUR_FILE_ID/...',
  },
}
\`\`\`

### 2. Controls (встроенные)
Используйте панель **Controls** справа для изменения props компонента в реальном времени.

### 3. Accessibility (addon-a11y)
Перейдите на вкладку **"Accessibility"** в нижней панели для проверки a11y правил.

### 4. Actions (встроенные)
Кликните на кнопку и откройте вкладку **"Actions"** для просмотра событий.

### 5. Backgrounds (встроенные)
Используйте иконку **сетки** в toolbar для изменения фона canvas.

### 6. Viewport (встроенные)
Используйте иконку **устройства** в toolbar для тестирования разных размеров экрана.

### 7. Docs (addon-docs)
Автоматически генерируется документация на основе TypeScript types и JSDoc комментариев.
        `,
      },
    },
    // Пример интеграции с Figma
    // Раскомментируйте и замените на реальный URL
    // design: {
    //   type: 'figma',
    //   url: 'https://www.figma.com/file/YOUR_FILE_ID/YOUR_FILE_NAME?node-id=YOUR_NODE_ID',
    // },
  },
  args: {
    variant: 'primary',
    size: 'medium',
    disabled: false,
    label: 'Click Me',
    onClick: fn(),
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: 'Вариант кнопки',
      table: {
        type: { summary: "'primary' | 'secondary' | 'tertiary'" },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: 'Размер кнопки',
      table: {
        type: { summary: "'small' | 'medium' | 'large'" },
        defaultValue: { summary: 'medium' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Отключить кнопку',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    label: {
      control: 'text',
      description: 'Текст кнопки',
      table: {
        type: { summary: 'string' },
      },
    },
    onClick: {
      description: 'Обработчик клика',
      table: {
        type: { summary: '() => void' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DemoComponent>;

/**
 * ## Primary кнопка
 *
 * Основная кнопка для главных действий.
 *
 * **Попробуйте:**
 * 1. Измените props в панели Controls
 * 2. Кликните на кнопку и посмотрите Actions
 * 3. Проверьте исходный код во вкладке Story
 * 4. Проверьте accessibility во вкладке Accessibility
 */
export const Primary: Story = {
  args: {
    variant: 'primary',
    label: 'Primary Button',
  },
};

/**
 * ## Secondary кнопка
 *
 * Дополнительная кнопка для второстепенных действий.
 */
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    label: 'Secondary Button',
  },
};

/**
 * ## Все размеры
 *
 * Демонстрация всех доступных размеров кнопки.
 */
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
      <DemoComponent variant="primary" size="small" label="Small" />
      <DemoComponent variant="primary" size="medium" label="Medium" />
      <DemoComponent variant="primary" size="large" label="Large" />
    </div>
  ),
};

/**
 * ## Все варианты
 *
 * Демонстрация всех доступных вариантов кнопки.
 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
      <DemoComponent variant="primary" size="medium" label="Primary" />
      <DemoComponent variant="secondary" size="medium" label="Secondary" />
      <DemoComponent variant="tertiary" size="medium" label="Tertiary" />
    </div>
  ),
};

/**
 * ## Disabled состояние
 *
 * Демонстрация отключенного состояния.
 *
 * **Проверьте accessibility:**
 * - Кнопка имеет `disabled` атрибут
 * - Визуально отличается от активной кнопки
 * - Курсор показывает, что взаимодействие невозможно
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Disabled Button',
  },
};

/**
 * ## Интерактивная playground
 *
 * Используйте панель Controls для экспериментов со всеми параметрами.
 *
 * **Попробуйте:**
 * - Изменить variant
 * - Изменить size
 * - Переключить disabled
 * - Изменить label
 * - Кликнуть и посмотреть Actions
 */
export const Playground: Story = {};

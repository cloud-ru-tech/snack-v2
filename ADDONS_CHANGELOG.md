# Changelog: Добавление Storybook аддонов

Дата: 2026-01-14

## Что было добавлено

### Установленные аддоны

#### 1. @storybook/addon-designs (v11.1.1)
**Интеграция с дизайн-инструментами**

✅ **Возможности:**
- Интеграция с Figma, Sketch, Adobe XD
- Просмотр дизайнов рядом с компонентами
- Поддержка нескольких дизайнов на одну story
- Разные типы интеграций: figma, figspec, sketch, image, link, iframe, pdf

📝 **Использование:**
```tsx
export const Primary: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/YOUR_FILE_ID/...',
    },
  },
};
```

#### 2. @storybook/addon-links (v10.1.11)
**Навигация между stories**

✅ **Возможности:**
- Создание ссылок между stories
- Программная навигация
- Интерактивные демонстрации

📝 **Использование:**
```tsx
import { linkTo } from '@storybook/addon-links';

export const Primary: Story = {
  render: () => (
    <button onClick={linkTo('Components/Button', 'Secondary')}>
      Go to Secondary
    </button>
  ),
};
```

### Уже установленные аддоны (из коробки)

- **@storybook/addon-docs** - автоматическая документация
- **@storybook/addon-a11y** - проверка accessibility
- **@storybook/addon-vitest** - интеграция с Vitest
- **@chromatic-com/storybook** - visual regression testing

### Встроенные возможности Storybook 10.x

Следующие возможности уже встроены в Storybook 10.x:
- **Controls** - динамическое изменение props
- **Actions** - логирование событий
- **Viewport** - тестирование разных размеров экрана
- **Backgrounds** - изменение фона canvas
- **Measure** - измерение размеров элементов
- **Outline** - показ границ элементов

## Что НЕ было добавлено (несовместимо)

### ❌ @storybook/addon-essentials (v8.6.14)
**Причина:** Последняя версия 8.6.14, несовместима со Storybook 10.1.4. Функциональность уже встроена в ядро Storybook 10.x.

### ❌ @storybook/addon-storysource (v8.6.14)
**Причина:** Последняя версия 8.6.14, несовместима со Storybook 10.1.4. 

**✅ Альтернативы:**
1. **Встроенная Docs страница** - переключитесь на вкладку "Docs" и нажмите "Show code"
2. **Примеры в описании** - добавьте код в `parameters.docs.description.story`
3. **Ссылки на репозиторий** - добавьте ссылки на GitLab/GitHub

📖 **Подробнее:** [SOURCE_CODE_ALTERNATIVES.md](.storybook/SOURCE_CODE_ALTERNATIVES.md)

### ❌ storybook-dark-mode (v4.0.2)
**Причина:** Несовместим со Storybook 10.x, вызывает ошибки сборки. Альтернатива: использовать встроенный Backgrounds addon для переключения темы.

## Обновленные файлы

### .storybook/main.ts
Добавлены новые аддоны в конфигурацию:
```ts
addons: [
  '@chromatic-com/storybook',
  '@storybook/addon-vitest',
  '@storybook/addon-a11y',
  '@storybook/addon-docs',
  '@storybook/addon-links',       // ← новый
  '@storybook/addon-designs',     // ← новый
],
```

### .storybook/preview.tsx
Добавлены параметры для новых аддонов:
- Настройка сортировки stories
- Настройка по умолчанию для addon-designs
- Настройка backgrounds
- Настройка actions regex

### Новые файлы документации

1. **.storybook/ADDONS.md** - подробная документация по всем аддонам
2. **.storybook/README.md** - краткий обзор конфигурации Storybook
3. **stories/AddonsDemo.stories.tsx** - демонстрационная story с примерами
4. **README.md** - обновлен основной README проекта

## Примеры использования

### Пример 1: Добавление Figma дизайна

```tsx
const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/abc123/Avatar?node-id=1:2',
    },
  },
};
```

### Пример 2: Несколько дизайнов

```tsx
export const Responsive: Story = {
  parameters: {
    design: [
      {
        type: 'figma',
        name: 'Desktop',
        url: 'https://www.figma.com/file/.../Desktop',
      },
      {
        type: 'figma',
        name: 'Mobile',
        url: 'https://www.figma.com/file/.../Mobile',
      },
    ],
  },
};
```

### Пример 3: Навигация между stories

```tsx
import { linkTo } from '@storybook/addon-links';

export const NavigationExample: Story = {
  render: () => (
    <div>
      <button onClick={linkTo('Components/Button', 'Primary')}>
        View Button Component
      </button>
      <button onClick={linkTo('Components/Avatar', 'Sizes')}>
        View Avatar Sizes
      </button>
    </div>
  ),
};
```

## Исправления

### ✅ Убрано предупреждение об argTypesRegex
Заменено использование `argTypesRegex: '^on[A-Z].*'` на явное определение actions через `fn()` из `@storybook/test`.

**Было:**
```tsx
parameters: {
  actions: {
    argTypesRegex: '^on[A-Z].*',
  },
}
```

**Стало:**
```tsx
import { fn } from '@storybook/test';

args: {
  onClick: fn(),
}
```

### ✅ Убрано предупреждение о .mdx файлах
Удален паттерн `stories/**/*.mdx` из конфигурации, так как .mdx файлы не используются.

## Проверка работы

1. Перезапустите Storybook: `pnpm storybook`
2. Откройте http://localhost:6006/
3. Проверьте, что предупреждения исчезли
4. Перейдите в "Documentation/Addons Demo"
5. Проверьте следующие вкладки:
   - **Controls** - панель справа
   - **Actions** - вкладка внизу (кликните на кнопку)
   - **Accessibility** - вкладка внизу
   - **Design** - вкладка внизу (если добавлен Figma URL)
   - **Backgrounds** - иконка в toolbar
   - **Viewport** - иконка в toolbar

## Следующие шаги

1. **Добавьте Figma URLs** к существующим stories:
   - `packages/avatar/Avatar.stories.tsx`
   - Другие компоненты по мере разработки

2. **Создайте документацию** для каждого компонента используя addon-docs

3. **Настройте CI/CD** для автоматического деплоя Storybook

4. **Интегрируйте Chromatic** для visual regression testing (опционально)

5. **Добавьте больше примеров** с использованием addon-links для навигации

## Полезные ссылки

- [Документация по аддонам](.storybook/ADDONS.md)
- [Конфигурация Storybook](.storybook/README.md)
- [Демонстрационная story](stories/AddonsDemo.stories.tsx)
- [Основной README](README.md)

## Известные ограничения

1. **storybook-dark-mode** не совместим - используйте Backgrounds для переключения темы
2. **addon-storysource** не доступен для v10.x - используйте DevTools
3. **addon-essentials** не нужен - функциональность встроена

## Контакты

Если у вас есть вопросы или предложения, создайте issue в GitLab.

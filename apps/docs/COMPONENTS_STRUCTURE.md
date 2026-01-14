# Components Structure

Структура папки компонентов в `apps/docs/src/components/`

## Организация

```
components/
├── astro/                          # Компоненты для Astro/Starlight
│   ├── Changelog.astro            # Ссылка на changelog компонента
│   ├── ComponentsList.astro       # Список компонентов
│   ├── DesignSystemContent.astro  # Обёртка контента с стилями дизайн-системы
│   ├── DesignSystemHead.astro     # Head с theme-manager
│   ├── DesignSystemStyles.astro   # Стили дизайн-системы
│   ├── DocsNavigation.astro       # Навигация по документации
│   ├── LlmLink.astro              # Ссылка на LLM документацию компонента
│   ├── LlmsLinks.astro            # Список ссылок на LLM документацию
│   ├── PageFrame.astro            # Фрейм страницы
│   ├── Sidebar.astro              # Sidebar компонент
│   ├── StorybookIframe.astro      # Iframe для Storybook историй
│   ├── ThemeSelect.astro          # Переключатель темы в toolbar
│   ├── ThemeSwitcher.astro        # Полный переключатель темы
│   ├── ThemeSwitcherExample.mdx   # Примеры использования переключателя
│   ├── ThemeSwitcherSidebar.astro # Компактный переключатель для sidebar
│   ├── VersionSwitcher.astro      # Переключатель версий
│   └── index.ts                   # Документация и типы
│
├── mdx/                           # Компоненты для использования в MDX
│   ├── ExampleContainer/          # Контейнер для примеров
│   │   ├── ExampleContainer.tsx
│   │   ├── styles.module.scss
│   │   └── index.ts
│   ├── ExampleGrid/               # Сетка для примеров
│   │   ├── ExampleGrid.tsx
│   │   ├── styles.module.scss
│   │   └── index.ts
│   ├── ExampleItem/               # Элемент примера с label
│   │   ├── ExampleItem.tsx
│   │   ├── styles.module.scss
│   │   └── index.ts
│   ├── ExampleRow/                # Строка для примеров
│   │   ├── ExampleRow.tsx
│   │   ├── styles.module.scss
│   │   └── index.ts
│   ├── Trans/                     # Компонент перевода
│   │   ├── Trans.tsx
│   │   └── index.ts
│   ├── ExampleComponents.tsx      # Реэкспорт всех Example* компонентов
│   └── index.ts                   # Общий экспорт MDX компонентов
│
└── index.ts                       # Корневой экспорт всех компонентов
```

## Соглашения

### Astro компоненты

- Файлы с расширением `.astro`
- Импортируются напрямую:
  ```astro
  import Changelog from './astro/Changelog.astro';
  ```
- Используются в конфигурации Starlight и других Astro файлах

### MDX/React компоненты

- Файлы с расширением `.tsx`
- Если компонент имеет стили:
  - Создаётся отдельная папка с именем компонента
  - Компонент в файле `ComponentName.tsx`
  - Стили в файле `styles.module.scss`
  - Экспорт через `index.ts`
- Импортируются через index:
  ```typescript
  import { ExampleContainer, ExampleGrid } from '@/components/mdx';
  // или
  import { ExampleContainer } from '@/components/mdx/ExampleContainer';
  ```

### Стили

- Используется CSS Modules для изоляции стилей
- Имя файла: `styles.module.scss`
- Импорт в компоненте:
  ```typescript
  import styles from './styles.module.scss';
  ```

### Index файлы

Каждая папка с компонентом содержит `index.ts`:

```typescript
export { ComponentName } from './ComponentName';
export type { ComponentNameProps } from './ComponentName';
```

## Примеры использования

### В MDX файлах

```mdx
---
import { ExampleContainer, ExampleGrid, ExampleItem } from '@/components/mdx';
import Changelog from '@/components/astro/Changelog.astro';
---

<ExampleContainer>
  <ExampleGrid columns={3}>
    <ExampleItem label="Пример 1">
      Контент
    </ExampleItem>
  </ExampleGrid>
</ExampleContainer>

<Changelog packageName="avatar" />
```

### В Astro конфигурации

```javascript
// astro.config.mjs
{
  components: {
    Content: './src/components/astro/DesignSystemContent.astro',
    Head: './src/components/astro/DesignSystemHead.astro',
    ThemeSelect: './src/components/astro/ThemeSelect.astro',
  }
}
```

## Преимущества структуры

1. **Чёткое разделение** - легко найти нужный компонент
2. **Изолированные стили** - каждый компонент со стилями в своей папке
3. **Единообразие** - все компоненты следуют одному паттерну
4. **Удобный импорт** - index файлы упрощают импорты
5. **Масштабируемость** - легко добавлять новые компоненты

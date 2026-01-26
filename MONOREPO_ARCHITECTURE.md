# Архитектура Monorepo и Storybook: Инструкция для LLM Агента

> Эта инструкция описывает архитектуру сборки пакетов и Storybook в monorepo проекте на основе Lerna + pnpm workspaces

## 📦 Общая Структура Monorepo

### Менеджмент пакетов
- **Package Manager**: `pnpm` с workspace support
- **Monorepo Tool**: `lerna` в режиме independent versioning
- **Стратегия версионирования**: Independent (каждый пакет версионируется независимо)

### Конфигурационные файлы корня

```
├── package.json              # Root package.json с workspaces
├── pnpm-workspace.yaml       # Настройки pnpm workspaces
├── lerna.json                # Настройки lerna
├── tsconfig.json             # Базовый TypeScript конфиг
├── packages/                 # Все пакеты здесь
│   ├── tsconfig.esm.json    # Общий конфиг для ESM сборки
│   └── tsconfig.cjs.json    # Общий конфиг для CJS сборки
└── storybook/               # Конфигурация Storybook
```

### pnpm-workspace.yaml
```yaml
shamefullyHoist: true
sideEffectsCache: false
linkWorkspacePackages: true
saveWorkspaceProtocol: false
packages:
  - "packages/*"
```

### lerna.json
```json
{
  "npmClient": "pnpm",
  "packages": ["packages/*"],
  "version": "independent",
  "command": {
    "publish": {
      "ignoreChanges": ["ignored-file", "*.md"],
      "message": "[ci skip] Version bump",
      "registry": "https://registry.npmjs.org/"
    },
    "version": {
      "changelogPreset": "@cloud-ru/ft-conventional-changelog",
      "ignoreChanges": [
        "**/*.md",
        "**/*.MDX",
        "./scripts/**/*",
        "packages/*/stories/**/*.*",
        "packages/*/__tests__/**/*.*"
      ]
    }
  }
}
```

## 🏗️ Структура Пакета

### Стандартная структура каждого пакета в `/packages/*`

```
packages/button/
├── package.json              # Package manifest
├── tsconfig.esm.json        # ESM TypeScript config
├── tsconfig.cjs.json        # CJS TypeScript config
├── README.md                # Документация (генерируется автоматически)
├── CHANGELOG.md             # История изменений
├── LICENSE                  # Apache-2.0 лицензия
├── src/                     # Исходный код
│   ├── index.ts            # Главная точка входа (экспорт всех компонентов)
│   ├── components/         # React компоненты
│   │   ├── ButtonFilled/
│   │   │   ├── index.ts
│   │   │   ├── ButtonFilled.tsx
│   │   │   ├── types.ts
│   │   │   ├── constants.ts
│   │   │   └── styles.module.scss
│   │   └── index.ts        # Экспорт всех компонентов
│   ├── helperComponents/   # Вспомогательные/приватные компоненты
│   ├── types.ts            # Общие типы
│   ├── constants.ts        # Общие константы
│   └── utils.ts            # Утилиты
├── stories/                 # Storybook истории
│   ├── ButtonFilled.story.tsx
│   └── helperComponents/   # Компоненты для сторей
├── __test__/               # Unit тесты (vitest)
│   └── button.spec.ts
└── dist/                   # Собранные файлы (генерируется)
    ├── esm/                # ES Modules
    │   ├── index.js
    │   ├── index.d.ts
    │   └── **/*.css
    └── cjs/                # CommonJS
        ├── index.js
        ├── index.d.ts
        └── **/*.css
```

### package.json пакета

```json
{
  "name": "@snack-uikit/button",
  "publishConfig": {
    "access": "public"
  },
  "title": "Button",
  "version": "0.19.17",
  "sideEffects": ["*.css", "*.woff", "*.woff2"],
  "description": "Кнопка в различных вариациях",
  "types": "./dist/esm/index.d.ts",
  "exports": {
    "import": "./dist/esm/index.js",
    "require": "./dist/cjs/index.js"
  },
  "homepage": "https://github.com/cloud-ru-tech/snack-uikit/tree/master/packages/button",
  "repository": {
    "type": "git",
    "url": "https://github.com/cloud-ru-tech/snack-uikit.git",
    "directory": "packages/button"
  },
  "files": [
    "dist/cjs",
    "dist/esm",
    "src",
    "./CHANGELOG.md",
    "./LICENSE"
  ],
  "license": "Apache-2.0",
  "scripts": {},
  "dependencies": {
    "@snack-uikit/counter": "0.8.11",
    "@snack-uikit/loaders": "0.9.10",
    "@snack-uikit/utils": "4.0.1",
    "classnames": "2.5.1"
  }
}
```

**Ключевые особенности:**
- `exports` с dual package (ESM + CJS)
- `types` указывает на ESM declarations
- `sideEffects` для tree-shaking (CSS, шрифты)
- `files` определяет что публикуется в npm
- Пустой `scripts` (сборка управляется из корня)

### tsconfig для пакета

**tsconfig.esm.json:**
```json
{
  "extends": "../tsconfig.esm.json",
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist/esm"
  },
  "include": ["./src", "../../types"],
  "exclude": ["./dist"]
}
```

**tsconfig.cjs.json:**
```json
{
  "extends": "../tsconfig.cjs.json",
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist/cjs"
  },
  "include": ["./src", "../../types"],
  "exclude": ["./dist"]
}
```

## 🔨 Процесс Сборки Пакетов

### Команды сборки из root package.json

```json
{
  "scripts": {
    "build:packages": "pnpm compile:packages && pnpm build:ts && pnpm build:css",
    "compile:packages": "lerna run compile",
    "build:ts": "pnpm build:packages:esm && pnpm build:packages:cjs",
    "build:packages:esm": "tspc -b ./packages/tsconfig.esm.json",
    "build:packages:cjs": "tspc -b ./packages/tsconfig.cjs.json",
    "build:css": "ts-node scripts/compileCSS && ts-node scripts/compileJsCssModules"
  }
}
```

### Этапы сборки

#### 1. **Pre-compile** (`lerna run compile`)
- Выполняет кастомные compile скрипты в пакетах (если есть)
- Используется для специфичных задач отдельных пакетов

#### 2. **TypeScript компиляция** (`build:ts`)

**ESM сборка** (`tspc -b ./packages/tsconfig.esm.json`):
- Компилятор: `tspc` (ts-patch для кастомных трансформеров)
- Project references для инкрементальной сборки
- Output: `dist/esm/` в каждом пакете
- Module: `es6`
- Plugins:
  - `scss-extension-transformer.ts` - трансформация импортов `.scss` → `.css`
  - `typescript-plugin-css-modules` - типизация CSS modules

**CJS сборка** (`tspc -b ./packages/tsconfig.cjs.json`):
- Аналогично ESM, но с `module: "CommonJS"`
- Output: `dist/cjs/` в каждом пакете

**Общие настройки TypeScript:**
```json
{
  "compilerOptions": {
    "target": "es6",
    "lib": ["es2017", "dom", "dom.iterable", "esnext"],
    "strict": true,
    "jsx": "react-jsx",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "allowSyntheticDefaultImports": true,
    "declaration": true,
    "composite": true
  }
}
```

#### 3. **CSS компиляция** (`build:css`)

**Шаг 1: compileCSS.ts** - компиляция SCSS → CSS
```typescript
// Для каждого пакета:
// 1. Найти все SCSS файлы (кроме _partials)
const scssFiles = globSync(`${src}/**/!(_)*.scss`);

// 2. Скомпилировать через sass
const { css } = await sass.compileAsync(file, {
  loadPaths: [path.resolve(__dirname, '../../node_modules')],
});

// 3. Post-process через PostCSS (autoprefixer, discard-comments)
const { css: processedCss } = await postProcessCss({ from: srcOutFile, css });

// 4. Записать в dist/esm/ и dist/cjs/
fs.writeFileSync(`dist/cjs/${filename}.css`, processedCss);
fs.writeFileSync(`dist/esm/${filename}.css`, processedCss);

// 5. Также копирует другие статические файлы (woff, woff2, png, css)
```

**Шаг 2: compileJsCssModules.ts** - трансформация CSS Modules импортов
```typescript
// Только для CJS!
// Обрабатывает .js файлы через babel-plugin-react-css-modules
// Трансформирует styleName → className с CSS modules
const { code } = transformFileSync(file, {
  plugins: [require('babel-plugin-react-css-modules')],
});
```

### TypeScript Project References

**packages/tsconfig.esm.json** содержит все references:
```json
{
  "references": [
    { "path": "./utils/tsconfig.esm.json" },
    { "path": "./button/tsconfig.esm.json" },
    { "path": "./modal/tsconfig.esm.json" }
    // ... все пакеты
  ]
}
```

Это позволяет:
- Инкрементальную сборку (пересобирать только изменённое)
- Правильное разрешение зависимостей между пакетами
- Параллельную сборку независимых пакетов

## 📚 Storybook Архитектура

### Структура Storybook

```
storybook/
├── main.ts                  # Главная конфигурация Storybook
├── preview.tsx              # Preview конфигурация (decorators, parameters)
├── manager.js               # Manager конфигурация (UI кастомизация)
├── global.scss              # Глобальные стили
├── constants.ts             # Константы (brands, badges)
├── assets/                  # Статические ассеты
│   ├── *.svg               # Логотипы
│   └── *.jpg               # Изображения
├── fonts/                   # Шрифты
│   ├── Inter-*.ttf
│   └── SBSansUI-*.otf
├── customBrands/           # Кастомные темы
│   ├── gold.module.css
│   ├── orange.module.css
│   └── pink.module.css
├── stories/                # Welcome страницы
│   ├── GettingStarted.story.tsx
│   ├── ContributionGuide.story.tsx
│   ├── Tokens.story.tsx
│   └── components/         # Вспомогательные компоненты для сторей
│       ├── BasePalette/
│       ├── SystemPalette/
│       └── Code/
└── utils/
    └── getDependenciesLinks.ts
```

### Storybook main.ts

```typescript
import path from 'path';
import { StorybookConfig } from '@storybook/react-vite';
import { globSync } from 'glob';
import dotenv from 'dotenv';

dotenv.config();

// Динамическое определение stories
const STORIES = globSync(`packages/${process.env.STORYBOOK_PACKAGE_NAME || '*'}/stories/**/*.story.{ts,tsx}`)
  .map(x => path.resolve(__dirname, `../${x}`))
  .sort((a, b) => a.localeCompare(b));

const mainConfig: StorybookConfig = {
  // Stories: welcome страницы + все пакеты
  stories: [WELCOME, GETTING_STARTED, CONTRIBUTION_GUIDE, ICONS, TOKENS, ...STORIES],
  
  // Addons
  addons: [
    // SCSS поддержка с CSS Modules
    {
      name: '@storybook/preset-scss',
      options: {
        cssLoaderOptions: {
          modules: {
            auto: true,
            localIdentName: '[local]--[hash:base64:5]',
          },
        },
      }
    },
    // Custom addons
    '@cloud-ru/ft-storybook-readme-addon',     // README sidebar
    '@cloud-ru/ft-storybook-brand-addon',      // Бренд переключатель
    '@cloud-ru/ft-storybook-deps-graph-addon', // Граф зависимостей
    // Официальные addons
    '@storybook/addon-designs',                // Figma integration
    '@storybook/addon-storysource',            // Source code viewer
    '@storybook/addon-essentials',             // Controls, Actions, etc
    '@geometricpanda/storybook-addon-badges',  // Badges
    'storybook-dark-mode',                     // Тёмная тема
    '@storybook/addon-links',
    '@storybook/addon-a11y',                   // Accessibility testing
  ],
  
  // Static directories
  staticDirs: [
    './public',
    { from: '../storybook/assets', to: '/storybook/assets' },
  ],
  
  // Framework
  framework: '@storybook/react-vite',
  
  // TypeScript
  typescript: {
    check: true,
    reactDocgen: 'react-docgen-typescript',  // Автогенерация props docs
  },
  
  // Babel (для code coverage в тестах)
  babel: (base) => ({
    ...base,
    plugins: [
      ...base.plugins,
      ...(isTestServer ? ['istanbul'] : [])  // Code coverage
    ],
  }),
  
  // Environment variables
  env: config => ({
    ...config,
    DEPENDENCIES_LINKS: DEPENDENCIES_LINKS,
    DEPS_URL: process.env.DEPS_URL || '',
  }),
  
  // Vite configuration
  viteFinal: async viteConfig => defineConfig({
    ...viteConfig,
    plugins: [
      ...viteConfig.plugins,
      tsconfigPaths(),                       // Alias поддержка
      vitePluginReact(),
      svgr(),                                // SVG as React components
      {
        // Markdown loader
        name: "markdown-loader",
        transform(code, id) {
          if (id.slice(-3) === ".md") {
            return `export default ${JSON.stringify(code)};`;
          }
        }
      },
      monacoEditorPlugin({                   // Monaco editor для code examples
        globalAPI: false,
        customWorkers: [
          { label: 'yaml', entry: 'monaco-yaml' },
        ],
      }),
    ],
  }),
};

export default mainConfig;
```

**Ключевые особенности:**
- **Динамические stories**: через `globSync` можно загружать истории конкретного пакета или всех
- **Vite builder**: быстрая сборка и HMR
- **CSS Modules**: поддержка с той же конфигурацией что и в пакетах
- **TypeScript**: автоматическая генерация документации props
- **Кастомные аддоны**: для README, брендов, графа зависимостей

### Storybook preview.tsx

```typescript
import './global.scss';
import { Preview } from '@storybook/react';
import { withBrand } from '@cloud-ru/ft-storybook-brand-addon';
import { Sprite, SpriteSVG } from '@snack-uikit/icons';
import { LocaleProvider } from '@snack-uikit/locale';

// Parameters (глобальные настройки для всех сторей)
const parameters = {
  actions: { handlers: [], disable: true },
  options: {
    storySort: {
      order: ['Welcome', 'Documentation', 'Components'],
    },
  },
  dependenciesGraph: {
    graphLinks: process.env.DEPENDENCIES_LINKS,
  },
  darkMode: {
    dark: { ...themes.dark, brandImage: 'assets/SnackUILogoDark.svg' },
    light: { ...themes.normal, brandImage: 'assets/SnackUILogoLight.svg' },
  },
  badgesConfig: {
    private: {
      styles: { backgroundColor: '#f2db72', color: '#333' },
      title: 'private',
    },
  },
};

// GlobalTypes (глобальные переменные для toolbar)
const globalTypes = {
  brand: {
    name: 'Brand',
    description: 'Changing brands',
    defaultValue: Brand.Default,
  },
  // Themes configuration
};

// Decorators (обёртки для всех stories)
const decorators = [
  Story => (
    <div id='story-root'>
      <Sprite content={SpriteSVG} />  {/* SVG sprite для иконок */}
      <LocaleProvider lang='en-GB'>  {/* Локализация */}
        {Story()}
      </LocaleProvider>
    </div>
  ),
  withBrand,  // Аддон для переключения брендов/тем
];

export default { decorators, parameters, globalTypes };
```

**Ключевые особенности:**
- **Decorators**: обёртки для всех сторей (sprite, локализация, темы)
- **GlobalTypes**: toolbar controls (выбор темы/бренда)
- **Parameters**: глобальная конфигурация (сортировка, темы, badges)
- **Dark mode**: поддержка светлой/тёмной темы

### Структура Story файла

```typescript
import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Button, ButtonProps } from '../src';

const meta: Meta = {
  title: 'Components/Button',  // Путь в sidebar
  component: Button,
};
export default meta;

const Template: StoryFn<ButtonProps> = (args) => <Button {...args} />;

export const buttonFilled: StoryObj<ButtonProps> = {
  render: Template,
  args: {
    label: 'Button',
    size: 'm',
  },
  argTypes: {
    size: {
      options: ['s', 'm', 'l'],
      control: { type: 'select' },
    },
  },
  parameters: {
    readme: {
      sidebar: [
        `Latest version: ${componentPackage.version}`,
        componentReadme,
        componentChangelog,
      ],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://figma.com/...',
    },
  },
};
```

**Ключевые паттерны:**
- Импорт README, CHANGELOG, package.json
- Meta с title и component
- Template функция для переиспользования
- args для default props
- argTypes для controls конфигурации
- parameters для кастомных аддонов (readme, design)

### Команды Storybook

```json
{
  "scripts": {
    "storybook:all": "pnpm install:themes && storybook dev -c storybook -p 6006 --https",
    "storybook:partial": "pnpm install:themes && ts-node scripts/start-storybook-partially",
    "build:storybook": "pnpm install:themes && cross-env TEST_SERVER=true storybook build -c storybook",
    "install:themes": "ts-node scripts/install-additional-themes"
  }
}
```

**storybook:all** - запуск всего Storybook:
- Устанавливает дополнительные темы
- Загружает stories из всех пакетов
- Запускается на https://localhost:6006

**storybook:partial** - запуск частичного Storybook:
- Интерактивный выбор пакетов для загрузки
- Ускоряет разработку при работе с конкретным пакетом
- Устанавливает `STORYBOOK_PACKAGE_NAME` env variable

**build:storybook** - статическая сборка:
- Собирает Storybook в статические файлы
- Включает Istanbul для code coverage (`TEST_SERVER=true`)
- Используется для деплоя и E2E тестов

## 🎨 Темы и Бренды

### Система тем

```typescript
// storybook/constants.ts
export enum Brand {
  Default = 'default',
  Nachos = 'nachos',
}

export const DEFAULT_BRAND_MAP = {
  [Brand.Default]: DefaultBrandThemes,
  [Brand.Nachos]: NachosBrandThemes,
};

// themes.config.ts
type Theme = {
  key: string;
  name: string;
  color: string;
  defaultValue: { [key: string]: string };
};

export const themes: Theme[] = [
  // Дополнительные темы добавляются сюда
];
```

**Архитектура тем:**
- Базовые темы: Default (Cloud.ru), Nachos
- CSS Modules для брендирования
- Figma tokens: `@snack-uikit/figma-tokens`, `@snack-uikit/figma-tokens-nachos`
- Динамическое переключение через Storybook toolbar
- Кастомные темы в `storybook/customBrands/`

## 🧪 Тестирование

### Unit тесты (Vitest)

**vitest.config.ts:**
```typescript
import createConfig from '@cloud-ru/ft-config-vitest';

export default createConfig({
  test: {
    include: ['**/__unit__/**/*.spec.(ts|tsx)'],
  },
}, { useAliases: false });
```

**Структура:**
- Тесты: `packages/*/__test__/*.spec.ts`
- Запуск: `pnpm test:unit`
- Watch mode: `pnpm test:unit:local`

### E2E тесты (Playwright)

**playwright.config.ts:**
- Тесты на базе Storybook stories
- Запуск через собранный Storybook (`TEST_SERVER=true`)
- Coverage через Istanbul + babel-plugin-istanbul

**Команды:**
```bash
pnpm test:e2e:chrome    # Chrome only
pnpm test:e2e:firefox   # Firefox only
pnpm test:e2e:local     # UI mode для разработки
pnpm test:coverage      # Coverage отчёт для пакетов
```

## 🚀 Создание Нового Пакета

### Автоматический способ

```bash
pnpm add-package
```

Скрипт (`scripts/npm-init.ts`) интерактивно:
1. Спрашивает название пакета
2. Генерирует структуру папок
3. Создаёт базовые файлы:
   - `package.json`
   - `tsconfig.esm.json`, `tsconfig.cjs.json`
   - `src/index.ts`, `src/components/ComponentName.tsx`
   - `stories/ComponentName.story.tsx`
   - `README.md`, `CHANGELOG.md`, `LICENSE`
4. Обновляет global tsconfig references
5. Запускает `pnpm deps:all && pnpm build:packages`

### Генерируемая структура

```typescript
// src/components/ComponentName.tsx
import styles from './styles.module.scss';

export type ComponentNameProps = any;

export function ComponentName(props: ComponentNameProps) {
  return <div className={styles.componentName} />;
}

// styles.module.scss
.componentName {
  box-sizing: border-box;
}

// stories/ComponentName.story.tsx
import { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from '../src';

const meta: Meta = {
  title: 'Components/Component Name',
  component: ComponentName,
};
export default meta;

export const componentName: StoryObj = {
  render: (args) => <ComponentName {...args} />,
  args: {},
};
```

## 📝 Best Practices

### Структура кода

1. **Компоненты:**
   - Одна папка = один компонент
   - Обязательно: `index.ts`, `ComponentName.tsx`, `styles.module.scss`
   - Опционально: `types.ts`, `constants.ts`, `utils.ts`

2. **Экспорты:**
   ```typescript
   // src/components/Button/index.ts
   export * from './Button';
   export { Button as default } from './Button';
   
   // src/components/index.ts
   export * from './Button';
   
   // src/index.ts
   export * from './components';
   ```

3. **Стили:**
   - Использовать CSS Modules (`*.module.scss`)
   - Figma tokens: `@use '@snack-uikit/figma-tokens/build/scss/...';`
   - Именование классов: camelCase

4. **Типизация:**
   - Экспортировать Props типы
   - Использовать строгие типы (no `any`, no `unknown`)
   - Type-safe CSS Modules через `typescript-plugin-css-modules`

### Зависимости

1. **Между пакетами:**
   - Использовать workspace protocol: `"@snack-uikit/button": "workspace:*"`
   - Только production dependencies (no devDependencies между пакетами)

2. **External dependencies:**
   - Минимизировать количество
   - Версии управляются через `pnpm.overrides` в root

3. **peerDependencies:**
   - React, React-DOM в peer (не в dependencies)

### Сборка

1. **Не коммитить:**
   - `dist/` - генерируется при сборке
   - `*.tsbuildinfo` - кеш TypeScript
   - `node_modules/`

2. **Коммитить:**
   - `src/` - исходники
   - Конфиги: `tsconfig.*.json`, `package.json`
   - Документацию: `README.md`, `CHANGELOG.md`

3. **Инкрементальная сборка:**
   - TypeScript project references обеспечивают инкрементальность
   - При изменении одного пакета пересобираются только он и зависимые

### Storybook

1. **Stories:**
   - Одна story = один вариант использования
   - Используйте Template для DRY
   - Добавляйте README и CHANGELOG

2. **Args и Controls:**
   - Все важные props должны быть в args
   - Используйте argTypes для кастомизации controls

3. **Аддоны:**
   - README addon - для документации
   - Designs addon - для Figma links
   - A11y addon - для accessibility проверок

4. **Performance:**
   - Используйте `storybook:partial` для разработки конкретного пакета
   - Lazy load тяжёлых компонентов

## 🔄 Workflow

### Разработка нового пакета

1. **Создание:**
   ```bash
   pnpm add-package
   # Ответить на вопросы интерактивно
   ```

2. **Разработка:**
   ```bash
   # Запустить Storybook для конкретного пакета
   STORYBOOK_PACKAGE_NAME=button pnpm storybook:partial
   
   # Или все пакеты
   pnpm storybook:all
   ```

3. **Сборка:**
   ```bash
   # Собрать все пакеты
   pnpm build:packages
   
   # Или конкретный пакет
   pnpm build:packages --scope=@snack-uikit/button
   ```

4. **Тестирование:**
   ```bash
   # Unit тесты
   pnpm test:unit
   
   # E2E тесты
   pnpm test:e2e:local
   ```

### Изменение существующего пакета

1. **Разработка:**
   ```bash
   cd packages/button
   # Редактировать src/
   # Storybook автоматически обновится (HMR)
   ```

2. **Пересборка:**
   ```bash
   pnpm build:packages
   # Или инкрементально (пересоберёт только изменённое)
   ```

3. **Changelog:**
   ```bash
   pnpm changelog
   ```

4. **Версионирование:**
   ```bash
   lerna version
   # Интерактивный выбор версий для изменённых пакетов
   ```

5. **Публикация:**
   ```bash
   lerna publish
   ```

## 🛠️ Утилиты и Скрипты

### Основные скрипты

```json
{
  "add-package": "Создать новый пакет",
  "build:packages": "Собрать все пакеты",
  "build:storybook": "Собрать Storybook статически",
  "storybook:all": "Запустить Storybook со всеми пакетами",
  "storybook:partial": "Запустить Storybook с выбранными пакетами",
  "test:unit": "Запустить unit тесты",
  "test:e2e:local": "Запустить E2E тесты в UI режиме",
  "clean:all": "Очистить все артефакты сборки",
  "deps:reinstall": "Переустановить все зависимости",
  "docgen": "Генерировать документацию для всех пакетов",
  "changelog": "Генерировать changelog"
}
```

### Вспомогательные скрипты

- **scripts/npm-init.ts** - создание нового пакета
- **scripts/compileCSS.ts** - компиляция SCSS в CSS
- **scripts/compileJsCssModules.ts** - трансформация CSS Modules
- **scripts/docgen/** - генерация документации из TypeScript
- **scripts/start-storybook-partially.ts** - частичный запуск Storybook
- **scripts/utils/getAllPackageFolders.ts** - получение списка всех пакетов

## 🌐 Deployment

### GitHub Pages (Storybook)

```bash
# Сборка статического Storybook
pnpm build:storybook

# Output в storybook-static/
# Deploy через GitHub Actions или вручную
```

### NPM публикация

```bash
# 1. Version bump
lerna version --conventional-commits

# 2. Publish
lerna publish from-package
```

## 📚 Ссылки и Зависимости

### Ключевые зависимости

**Build tools:**
- `typescript` - TypeScript compiler
- `ts-patch` - для кастомных трансформеров
- `lerna` - monorepo управление
- `pnpm` - package manager

**Storybook:**
- `@storybook/react-vite` - React + Vite builder
- `@storybook/addon-essentials` - базовые аддоны
- Custom addons: `@cloud-ru/ft-storybook-*`

**Styling:**
- `sass` - SCSS компилятор
- `postcss` + `autoprefixer` - CSS постобработка
- `babel-plugin-react-css-modules` - CSS Modules поддержка

**Testing:**
- `vitest` - unit тестирование
- `@playwright/test` - E2E тестирование
- `@testing-library/react` - React тестирование

### Конфигурационные пакеты

Все базовые конфигурации вынесены в `@cloud-ru/ft-config-*`:
- `@cloud-ru/ft-config-babel`
- `@cloud-ru/ft-config-tsconfig`
- `@cloud-ru/ft-config-prettier`
- `@cloud-ru/ft-config-stylelint`
- `@cloud-ru/ft-config-vitest`

Это обеспечивает консистентность конфигурации во всех пакетах.

## 📖 Заключение

Эта архитектура обеспечивает:
- ✅ **Масштабируемость** - легко добавлять новые пакеты
- ✅ **Type-safety** - строгая типизация везде
- ✅ **DX** - HMR, инкрементальная сборка, partial Storybook
- ✅ **Dual package** - ESM + CJS поддержка
- ✅ **CSS Modules** - изолированные стили
- ✅ **Темы** - multi-brand поддержка
- ✅ **Документация** - автогенерация + Storybook
- ✅ **Тестирование** - unit + E2E coverage

При адаптации для другого проекта:
1. Настройте workspace в `pnpm-workspace.yaml`
2. Адаптируйте `lerna.json` под свою стратегию версионирования
3. Настройте Storybook темы и бренды
4. Обновите скрипты под свои нужды
5. Настройте CI/CD pipeline для сборки и тестов

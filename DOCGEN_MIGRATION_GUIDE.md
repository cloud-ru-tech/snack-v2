# Инструкция по переносу системы автогенерации документации (docgen)

> Руководство по переносу системы автоматической генерации документации из TypeScript компонентов в другой monorepo проект

## 📋 Содержание

- [Обзор системы](#обзор-системы)
- [Что включает docgen](#что-включает-docgen)
- [Зависимости](#зависимости)
- [Структура файлов](#структура-файлов)
- [Шаг 1: Копирование файлов](#шаг-1-копирование-файлов)
- [Шаг 2: Установка зависимостей](#шаг-2-установка-зависимостей)
- [Шаг 3: Настройка утилит](#шаг-3-настройка-утилит)
- [Шаг 4: Интеграция в проект](#шаг-4-интеграция-в-проект)
- [Шаг 5: Настройка README](#шаг-5-настройка-readme)
- [Шаг 6: Git Hooks](#шаг-6-git-hooks)
- [Шаг 7: Кастомизация парсинга](#шаг-7-кастомизация-парсинга)
- [Использование](#использование)
- [Примеры](#примеры)
- [Troubleshooting](#troubleshooting)

## 🎯 Обзор системы

### Что делает docgen?

Система автоматически генерирует документацию из TypeScript компонентов:
- ✅ Парсит TypeScript файлы с React компонентами
- ✅ Извлекает типы props, их описания и дефолтные значения
- ✅ Генерирует markdown таблицы с документацией
- ✅ Вставляет документацию в README.md между специальными плейсхолдерами
- ✅ Автоматически обновляет документацию при коммитах (через git hooks)

### Принцип работы

```
TypeScript Component (src/index.ts)
         ↓
react-docgen-typescript парсит типы
         ↓
Markdown.ts форматирует в таблицу
         ↓
Docgen.ts вставляет в README.md между плейсхолдерами
         ↓
Обновлённый README.md с актуальной документацией
```

### Пример результата

**Исходный компонент:**
```typescript
export type ButtonProps = {
  /** Текст кнопки */
  label: string;
  /** Размер кнопки */
  size?: 's' | 'm' | 'l';
  /** Колбек клика */
  onClick?: () => void;
};

export function Button({ label, size = 'm', onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}
```

**Сгенерированная документация в README.md:**
```markdown
## Button
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| label* | `string` | - | Текст кнопки |
| size | enum Size: `"s"`, `"m"`, `"l"` | m | Размер кнопки |
| onClick | `() => void` | - | Колбек клика |
```

## 📦 Что включает docgen

### Основные компоненты

1. **Docgen.ts** - главный класс для генерации документации
   - Находит все пакеты с плейсхолдерами в README
   - Парсит TypeScript файлы
   - Вставляет документацию между плейсхолдерами

2. **Markdown.ts** - рендеринг документации в markdown
   - Форматирует props в таблицы
   - Обрабатывает enum types, unions
   - Добавляет описания и дефолтные значения

3. **constants.ts** - константы для плейсхолдеров
   - Маркеры начала и конца секции документации

4. **index.ts** - точка входа с настроенным инстансом
   - Конфигурация docgen для проекта

5. **docgenForAllPackages.ts** - генерация для всех пакетов
   - Запускается вручную через npm script

6. **docgenForStagedPackages.ts** - генерация для изменённых пакетов
   - Запускается автоматически через git hooks
   - Добавляет обновлённый README в stage

### Вспомогательные утилиты

- **console.ts** - цветной вывод в консоль
- **getAllPackageFolders.ts** - получение списка всех пакетов
- **git.ts** - работа с git (staged files, unstaged files)

## 🔧 Зависимости

### NPM пакеты

Добавьте в `package.json` в `devDependencies`:

```json
{
  "devDependencies": {
    "react-docgen": "7.1.0",
    "react-docgen-typescript": "2.2.2",
    "colors": "1.4.0",
    "shelljs": "0.8.5",
    "@types/shelljs": "0.8.15",
    "glob": "11.0.0",
    "ts-node": "10.9.2"
  }
}
```

**Описание зависимостей:**

- **`react-docgen-typescript`** - парсит TypeScript компоненты, извлекает типы props
- **`react-docgen`** - базовая библиотека для docgen
- **`colors`** - цветной вывод в консоль (для логирования)
- **`shelljs`** - выполнение shell команд (git operations)
- **`glob`** - поиск файлов по паттернам
- **`ts-node`** - выполнение TypeScript файлов напрямую

## 📁 Структура файлов

### Файлы для копирования

```
scripts/
├── docgen/
│   ├── constants.ts                 # Константы плейсхолдеров
│   ├── Docgen.ts                    # Главный класс генерации
│   ├── Markdown.ts                  # Рендеринг в markdown
│   ├── index.ts                     # Точка входа с конфигурацией
│   ├── docgenForAllPackages.ts      # Генерация для всех пакетов
│   └── docgenForStagedPackages.ts   # Генерация для staged файлов
└── utils/
    ├── console.ts                   # Утилиты логирования
    ├── getAllPackageFolders.ts      # Получение списка пакетов
    └── git.ts                       # Git утилиты
```

## 🚀 Шаг 1: Копирование файлов

### 1.1. Создайте структуру папок

```bash
mkdir -p scripts/docgen
mkdir -p scripts/utils
```

### 1.2. Скопируйте файлы docgen

**scripts/docgen/constants.ts:**

```typescript
/** Плейсхолдер начала секции автогенерируемой документации */
export const DOCGEN_SECTION_PLACEHOLDER_START = '[//]: DOCUMENTATION_SECTION_START';

/** Плейсхолдер конца секции автогенерируемой документации */
export const DOCGEN_SECTION_PLACEHOLDER_END = '[//]: DOCUMENTATION_SECTION_END';
```

**scripts/docgen/Docgen.ts:**

```typescript
import fs from 'fs';
import path from 'path';

import { parse, ParserOptions } from 'react-docgen-typescript';

import { logHelp, logInfo } from '../utils/console';
import { Markdown } from './Markdown';

const CAUTION = '[//]: THIS_SECTION_IS_AUTOGENERATED_PLEASE_DONT_EDIT_IT';
const CUSTOM_CONFIG = 'doc.config.ts';

type Options = {
  packagesRoot: string;
  docPlaceholder: [string, string];
  parserOptions: ParserOptions;
};

export class Docgen {
  private readonly packagesRootPath: string;
  private readonly parserOptions: ParserOptions;
  private readonly docPlaceholder: [string, string];

  constructor({ packagesRoot, parserOptions, docPlaceholder }: Options) {
    this.packagesRootPath = path.resolve(packagesRoot);
    this.parserOptions = parserOptions;
    this.docPlaceholder = docPlaceholder;
  }

  private path(...paths: string[]): string {
    return path.resolve(this.packagesRootPath, ...paths);
  }

  private readReadmeFile(packageName: string) {
    try {
      return fs.readFileSync(this.path(packageName, 'README.md'), 'utf-8');
    } catch (_e) {
      console.warn(`Error while reading README.md file in "${packageName}".`);
      return '';
    }
  }

  private getPackagesList() {
    const entities = fs.readdirSync(this.packagesRootPath);
    const packages = entities.filter(entity => fs.statSync(this.path(entity)).isDirectory());
    const [startDocPlaceholder, endDocPlaceholder] = this.docPlaceholder;
    return packages.filter((packageName: string) => {
      const readmeFile = this.readReadmeFile(packageName);
      return readmeFile.includes(startDocPlaceholder) && readmeFile.includes(endDocPlaceholder);
    });
  }

  private writeDocsSectionToReadmeFile(packageName: string, doc: string) {
    const [placeholderStart, placeholderEnd] = this.docPlaceholder;
    const readmeFile = this.readReadmeFile(packageName);
    const startPosition = readmeFile.indexOf(placeholderStart);
    const endPosition = readmeFile.indexOf(placeholderEnd);

    const startOfFile = readmeFile.slice(0, startPosition);
    const endOfFile = readmeFile.slice(endPosition + placeholderEnd.length);

    fs.writeFileSync(
      this.path(packageName, 'README.md'),
      [startOfFile, [placeholderStart, CAUTION, doc, '\n', placeholderEnd].join('\n'), endOfFile].join(''),
      'utf-8',
    );
  }

  private async resolvePackageParserOptions(packageName: string): Promise<ParserOptions | null> {
    const optionsPath = path.resolve(this.packagesRootPath, packageName, CUSTOM_CONFIG);

    try {
      await fs.promises.access(optionsPath);

      logHelp(`ℹ load custom parserOptions for ${packageName}: ${packageName}/${CUSTOM_CONFIG}`);

      const { config } = await import(optionsPath);
      return config as ParserOptions;
    } catch (_e) {
      return null;
    }
  }

  private async generateDoc(packageName: string) {
    const packageSrc = path.resolve(this.packagesRootPath, packageName, 'src', 'index.ts');

    const packageDocOptions = await this.resolvePackageParserOptions(packageName);
    const parserOptions = packageDocOptions ? Object.assign(this.parserOptions, packageDocOptions) : this.parserOptions;

    return parse(packageSrc, parserOptions).map(docData => {
      const doc = new Markdown(docData).renderComponentSpec();
      logInfo(`✔ doc generated for ${packageName}/README.md - ${docData.displayName}`);
      return doc;
    });
  }

  async run(packagesPaths: string[] = []) {
    const packages = this.getPackagesList();

    for (const packageName of packages) {
      if (packagesPaths.length && !packagesPaths.some(packagePath => packagePath.endsWith(packageName))) {
        continue;
      }

      const docs = await this.generateDoc(packageName);
      this.writeDocsSectionToReadmeFile(packageName, docs.join('\n'));
    }
  }
}
```

**scripts/docgen/Markdown.ts:**

```typescript
import { ComponentDoc, PropItemType } from 'react-docgen-typescript';

export class Markdown {
  private readonly doc: ComponentDoc;

  constructor(doc: ComponentDoc) {
    this.doc = doc;
  }

  private lines(lines: string[]) {
    return lines.map(line => line.replaceAll('\n', ' ')).join('\n');
  }

  private blocks(blocks: string[]) {
    return blocks.filter(Boolean).join('\n');
  }

  private getProps() {
    return Object.entries(this.doc.props).filter(([name]) => !name.match(/^(data-test|aria)-/));
  }

  private markdownTableCellEscape(str: string): string {
    return String(str).replaceAll('|', '\\|');
  }

  private getTypeDescription({ name, value, raw }: PropItemType) {
    switch (name) {
      case `enum`: {
        if (raw && raw?.includes('|')) {
          // это union
          return raw;
        }
        const enumItems = Array.isArray(value)
          ? `: ${value
              .map(({ value, description }) => `\`${value}\`${description ? ` - ${description}` : ''}`)
              .join(', ')}`
          : '';
        return `enum ${raw}${enumItems}`;
      }
      default:
        return `\`${name}\``;
    }
  }

  private renderHeader(): string {
    return this.blocks([`## ${this.doc.displayName}`, this.renderTags(), this.doc.description]);
  }

  private isNotReactComponent() {
    return Object.keys(this.doc.tags || {}).includes('function');
  }

  private getDescription(name: string, description?: string): string {
    if (name === 'className' && !description) {
      return 'CSS-класс';
    }
    return description || '';
  }

  private renderTags() {
    const tags: string[] = [];
    for (const [tagName, tagValue] of Object.entries(this.doc.tags || {})) {
      if (tagName === 'function') {
        tags.push(`\`${tagValue}\``);
      }
    }
    return tags.length ? `${tags.join(' ')} \n` : '';
  }

  private renderPropsTable(): string {
    return this.lines([
      '### Props',
      '| name | type | default value | description |',
      '|------|------|---------------|-------------|',
      ...this.getProps()
        .sort(a => (a[1].required ? -1 : 1))
        .map(([name, { type, defaultValue, description, required }]) => {
          const defaultPropValue = defaultValue?.value || '-';
          const propRow = [
            // name
            required ? `${name}*` : name,
            // type
            this.getTypeDescription(type),
            // default value
            defaultPropValue,
            // description
            this.getDescription(name, description),
          ]
            .map(this.markdownTableCellEscape)
            .join(' | ');
          return `| ${propRow} |`;
        }),
    ]);
  }

  renderComponentSpec() {
    return this.isNotReactComponent()
      ? this.blocks([this.renderHeader()]) // TODO: для функций можно сделать рендер аргументов
      : this.blocks([this.renderHeader(), this.renderPropsTable()]);
  }
}
```

**scripts/docgen/index.ts:**

```typescript
import { DOCGEN_SECTION_PLACEHOLDER_END, DOCGEN_SECTION_PLACEHOLDER_START } from './constants';
import { Docgen } from './Docgen';

const instance = new Docgen({
  packagesRoot: './packages',
  docPlaceholder: [DOCGEN_SECTION_PLACEHOLDER_START, DOCGEN_SECTION_PLACEHOLDER_END],
  parserOptions: {
    shouldExtractLiteralValuesFromEnum: true,
  },
});

export const docgen = (packages?: string[]) => instance.run(packages);
```

**scripts/docgen/docgenForAllPackages.ts:**

```typescript
import { docgen } from '.';

docgen();
```

**scripts/docgen/docgenForStagedPackages.ts:**

```typescript
import { execSync } from 'child_process';
import { resolve } from 'path';

import { logInfo } from '../utils/console';
import { getAllPackageFolders } from '../utils/getAllPackageFolders';
import { getChangedUnstagedFiles, getStagedFiles } from '../utils/git';
import { docgen } from './';

type Packages = {
  [key: string]: {
    staged: string[];
    unstaged: string[];
  };
};

const getReadmePath = (packagePath: string) => resolve(packagePath, 'README.md');

(async function () {
  const stagedList = getStagedFiles();
  const unstagedList = getChangedUnstagedFiles();
  const packagesList = getAllPackageFolders();

  const packages: Packages = {};

  for (const packageName of packagesList) {
    const staged = stagedList.filter(file => file.includes(packageName));
    const unstaged = unstagedList.filter(file => file.includes(packageName));

    if (staged.length || unstaged.length) {
      packages[packageName] = { staged, unstaged };
    }
  }

  const needDocGeneration: string[] = [];
  const needDocStage: string[] = [];

  Object.entries(packages).forEach(([packageName, { staged, unstaged }]) => {
    // если есть хоть какое-то изменение, генерируем доку
    if (staged.length || unstaged.length) {
      needDocGeneration.push(packageName);
    }
    // если что-то коммитится, тоже коммитим
    if (staged.length) {
      needDocStage.push(getReadmePath(packageName));
    }
  });

  if (needDocGeneration.length) {
    await docgen(needDocGeneration);
  }

  if (needDocStage.length) {
    execSync(`git add ${needDocStage.join(' ')}`);
    logInfo('Files added to stage:');
    needDocStage.map(logInfo);
  }
})();
```

### 1.3. Скопируйте утилиты

**scripts/utils/console.ts:**

```typescript
import colors from 'colors/safe';

const themes = {
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red',
} as const;

colors.setTheme(themes);

const log = (message: string, theme: keyof typeof themes = 'warn'): void => {
  console.log(colors[themes[theme]](`${message}\n`));
};

export const logError = (message: string) => log(message, 'error');
export const logInfo = (message: string) => log(message, 'info');
export const logHelp = (message: string) => log(message, 'help');
export const logSilly = (message: string) => log(message, 'silly');
export const logDebug = (message: string) => log(message, 'debug');
```

**scripts/utils/getAllPackageFolders.ts:**

```typescript
import path from 'path';

import { globSync } from 'glob';

const PACKAGES_PATTERN = '../../packages';
const TSCONFIG_CJS_PATH = path.resolve(__dirname, '../../packages/tsconfig.cjs.json');
const TSCONFIG_ESM_PATH = path.resolve(__dirname, '../../packages/tsconfig.esm.json');

export function getAllPackageFolders(filter = '*') {
  return globSync(`${path.resolve(__dirname, PACKAGES_PATTERN, filter)}`, {
    ignore: [TSCONFIG_CJS_PATH, TSCONFIG_ESM_PATH],
  });
}
```

**scripts/utils/git.ts:**

```typescript
import { execSync } from 'child_process';
import { resolve } from 'path';

import shell from 'shelljs';

import { logError } from './console';

export const getGitUserName = () => {
  const user = shell.exec('git config user.name', { silent: true }).stdout.trim();
  if (!user) {
    logError('No username set - please set it in git with \'git config --global user.name "Firstname Lastname"\'');
    process.exit(1);
  }
  return user;
};

export const getGitEmail = () => {
  const email = shell.exec('git config user.email', { silent: true }).stdout.trim();
  if (!email) {
    logError('No email set - please set it in git with \'git config --global user.email "your@email.com"\'');
    process.exit(1);
  }
  return email;
};

export const gitFetch = () => shell.exec('git fetch', { silent: true });

export const checkIfBehindMaster = () => {
  const behindMaster = shell.exec('git log @..origin/master', { silent: true }).stdout.trim();

  if (behindMaster) {
    logError(
      'Looks like you are not up to date with origin/master - do a rebase and try again (git pull --rebase origin master)',
    );
    process.exit(1);
  }
};

export function getStagedFiles() {
  return String(execSync(`git diff --name-only --cached`))
    .split('\n')
    .filter(Boolean)
    .map(file => resolve(__dirname, './../../', file));
}

export function getChangedUnstagedFiles() {
  return String(execSync(`git ls-files --exclude-standard --others -m`))
    .split('\n')
    .filter(Boolean)
    .map(file => resolve(__dirname, './../../', file));
}
```

## 📦 Шаг 2: Установка зависимостей

### 2.1. Установите NPM пакеты

```bash
# pnpm
pnpm add -D react-docgen react-docgen-typescript colors shelljs @types/shelljs glob ts-node

# npm
npm install --save-dev react-docgen react-docgen-typescript colors shelljs @types/shelljs glob ts-node

# yarn
yarn add -D react-docgen react-docgen-typescript colors shelljs @types/shelljs glob ts-node
```

### 2.2. Проверьте установку

```bash
# Проверить что пакеты установились
ls node_modules/react-docgen-typescript
```

## ⚙️ Шаг 3: Настройка утилит

### 3.1. Адаптируйте getAllPackageFolders.ts

Если у вас другая структура папок, измените пути:

```typescript
// Для структуры packages/*
const PACKAGES_PATTERN = '../../packages';

// Для структуры libs/*
const PACKAGES_PATTERN = '../../libs';

// Для нескольких папок
export function getAllPackageFolders(filter = '*') {
  const packagesPatterns = ['../../packages', '../../libs'];
  return packagesPatterns.flatMap(pattern => 
    globSync(`${path.resolve(__dirname, pattern, filter)}`)
  );
}
```

### 3.2. Настройте docgen/index.ts

Измените настройки под ваш проект:

```typescript
const instance = new Docgen({
  packagesRoot: './packages', // или './libs', './modules', etc
  docPlaceholder: [DOCGEN_SECTION_PLACEHOLDER_START, DOCGEN_SECTION_PLACEHOLDER_END],
  parserOptions: {
    shouldExtractLiteralValuesFromEnum: true,
    // Дополнительные опции:
    // shouldRemoveUndefinedFromOptional: true,
    // savePropValueAsString: true,
    // skipChildrenPropWithoutDoc: false,
    // propFilter: (prop) => {
    //   // Фильтровать props (например, исключить служебные)
    //   return !prop.name.startsWith('data-');
    // },
  },
});
```

## 🔌 Шаг 4: Интеграция в проект

### 4.1. Добавьте скрипты в package.json

```json
{
  "scripts": {
    "docgen": "ts-node scripts/docgen/docgenForAllPackages",
    "docgen:staged": "ts-node scripts/docgen/docgenForStagedPackages"
  }
}
```

### 4.2. Настройте TypeScript

Убедитесь что `tsconfig.json` поддерживает выполнение скриптов:

```json
{
  "ts-node": {
    "compilerOptions": {
      "module": "CommonJS"
    },
    "files": true
  },
  "compilerOptions": {
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "skipLibCheck": true
  }
}
```

## 📄 Шаг 5: Настройка README

### 5.1. Добавьте плейсхолдеры в README.md каждого пакета

В файле `packages/your-package/README.md`:

```markdown
# Your Package

## Installation

`npm i @your-scope/your-package`

## Description

Описание вашего пакета

## Usage

Примеры использования

[//]: DOCUMENTATION_SECTION_START
[//]: DOCUMENTATION_SECTION_END
```

**Важно:**
- Плейсхолдеры должны быть на отдельных строках
- Между ними будет вставлена автогенерируемая документация
- Не редактируйте содержимое между плейсхолдерами вручную

### 5.2. Структура компонентов

Для правильной генерации документации структурируйте компоненты так:

**packages/button/src/index.ts:**

```typescript
// Экспортируйте компоненты и типы из главного index.ts
export { Button } from './components/Button';
export type { ButtonProps } from './components/Button';
```

**packages/button/src/components/Button.tsx:**

```typescript
import React from 'react';

export type ButtonProps = {
  /** Текст кнопки */
  label: string;
  /** Размер кнопки */
  size?: 's' | 'm' | 'l';
  /** Внешний вид */
  appearance?: 'primary' | 'secondary';
  /** Состояние disabled */
  disabled?: boolean;
  /** Колбек клика */
  onClick?: () => void;
  /** CSS-класс */
  className?: string;
};

/**
 * Компонент кнопки
 * 
 * @example
 * ```tsx
 * <Button label="Click me" size="m" onClick={() => console.log('clicked')} />
 * ```
 */
export function Button({ 
  label, 
  size = 'm', 
  appearance = 'primary',
  disabled,
  onClick,
  className 
}: ButtonProps) {
  return (
    <button 
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
```

**Правила документирования:**

1. **JSDoc комментарии** - используйте `/** ... */` для описания props
2. **Дефолтные значения** - указывайте в параметрах функции
3. **Типы** - используйте TypeScript типы, не `any`
4. **Enum/Union types** - используйте литеральные типы для ограниченного набора значений
5. **Optional props** - используйте `?:` для опциональных props

### 5.3. Запустите генерацию

```bash
pnpm docgen
```

Проверьте что README.md обновился с документацией.

## 🔗 Шаг 6: Git Hooks

### 6.1. Установите husky (если ещё не установлен)

```bash
pnpm add -D husky
npx husky install
```

### 6.2. Создайте pre-commit hook

```bash
npx husky add .husky/pre-commit "pnpm docgen:staged"
```

Или вручную создайте `.husky/pre-commit`:

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Другие pre-commit hooks
# pnpm lint-staged

# Генерация документации для staged файлов
node_modules/.bin/ts-node scripts/docgen/docgenForStagedPackages.ts
```

**Что это даёт:**
- При каждом коммите автоматически обновляется документация
- Обновлённый README.md автоматически добавляется в commit
- Документация всегда актуальна

### 6.3. Настройте в package.json

```json
{
  "scripts": {
    "prepare": "husky install"
  }
}
```

## 🎨 Шаг 7: Кастомизация парсинга

### 7.1. Создайте doc.config.ts для пакета

Если нужна специальная обработка для конкретного пакета:

**packages/link/doc.config.ts:**

```typescript
import { ParserOptions } from 'react-docgen-typescript';

export const config: ParserOptions = {
  propFilter: (prop, component) => {
    // Исключить props из node_modules
    if (prop.declarations !== undefined && prop.declarations.length > 0) {
      const hasPropAdditionalDescription = prop.declarations.find(
        declaration => !declaration.fileName.includes('node_modules'),
      );
      return Boolean(hasPropAdditionalDescription);
    }
    return true;
  },
};
```

**Примеры кастомизации:**

```typescript
// Исключить служебные props
propFilter: (prop) => {
  return !prop.name.startsWith('data-') && !prop.name.startsWith('aria-');
}

// Только собственные props (не из библиотек)
propFilter: (prop) => {
  if (prop.parent) {
    return !prop.parent.fileName.includes('node_modules');
  }
  return true;
}

// Изменить отображение типов
componentNameResolver: (exp, source) => {
  // Кастомное определение имени компонента
  return exp.getName();
}
```

## 📖 Использование

### Генерация документации вручную

```bash
# Для всех пакетов
pnpm docgen

# Только для изменённых (staged) пакетов
pnpm docgen:staged
```

### Автоматическая генерация

При коммите изменений в пакете:

```bash
git add packages/button/src/components/Button.tsx
git commit -m "feat(button): add new size option"

# Pre-commit hook автоматически:
# 1. Определит что изменился пакет button
# 2. Сгенерирует документацию
# 3. Добавит обновлённый README.md в commit
```

### Отключение генерации для конкретного коммита

```bash
git commit --no-verify -m "wip: work in progress"
```

## 💡 Примеры

### Пример 1: Простой компонент

**src/components/Badge.tsx:**

```typescript
export type BadgeProps = {
  /** Текст badge */
  text: string;
  /** Цветовая схема */
  color?: 'red' | 'green' | 'blue';
};

export function Badge({ text, color = 'blue' }: BadgeProps) {
  return <span className={`badge badge-${color}`}>{text}</span>;
}
```

**Результат в README.md:**

```markdown
## Badge
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| text* | `string` | - | Текст badge |
| color | enum Color: `"red"`, `"green"`, `"blue"` | blue | Цветовая схема |
```

### Пример 2: Сложный компонент с enum

**src/components/Modal.tsx:**

```typescript
enum ModalSize {
  Small = 's',
  Medium = 'm',
  Large = 'l',
}

export type ModalProps = {
  /** Видимость модального окна */
  open: boolean;
  /** Размер модального окна */
  size?: ModalSize;
  /** Заголовок */
  title?: string;
  /** Контент */
  children: ReactNode;
  /** Колбек закрытия */
  onClose: () => void;
};

export function Modal({ open, size = ModalSize.Medium, title, children, onClose }: ModalProps) {
  // ...
}
```

**Результат:**

```markdown
## Modal
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| open* | `boolean` | - | Видимость модального окна |
| onClose* | `() => void` | - | Колбек закрытия |
| children* | `ReactNode` | - | Контент |
| size | enum ModalSize: `"s"`, `"m"`, `"l"` | m | Размер модального окна |
| title | `string` | - | Заголовок |
```

### Пример 3: Компонент с функцией (не React компонент)

**src/utils/formatDate.ts:**

```typescript
/**
 * @function formatDate
 * Форматирует дату в строку
 */
export function formatDate(date: Date, format: string): string {
  // ...
}
```

**Результат:**

```markdown
## formatDate
`formatDate`

Форматирует дату в строку
```

## 🐛 Troubleshooting

### Проблема: Документация не генерируется

**Решение 1:** Проверьте плейсхолдеры в README.md

```markdown
[//]: DOCUMENTATION_SECTION_START
[//]: DOCUMENTATION_SECTION_END
```

Они должны быть точно такими и на отдельных строках.

**Решение 2:** Проверьте структуру экспорта

Компоненты должны экспортироваться из `src/index.ts`.

**Решение 3:** Проверьте путь к пакетам

В `scripts/docgen/index.ts`:
```typescript
packagesRoot: './packages' // должен указывать на вашу папку с пакетами
```

### Проблема: Props не отображаются

**Причина:** Компонент не экспортируется из главного index.ts

**Решение:**

```typescript
// packages/button/src/index.ts
export { Button } from './components/Button';
export type { ButtonProps } from './components/Button';
```

### Проблема: Отображаются лишние props (из node_modules)

**Решение:** Создайте `doc.config.ts` с фильтром:

```typescript
export const config: ParserOptions = {
  propFilter: (prop) => {
    if (prop.declarations) {
      return prop.declarations.some(
        declaration => !declaration.fileName.includes('node_modules')
      );
    }
    return true;
  },
};
```

### Проблема: TypeScript ошибки при запуске

**Решение:** Проверьте `tsconfig.json`:

```json
{
  "ts-node": {
    "compilerOptions": {
      "module": "CommonJS"
    }
  }
}
```

### Проблема: Git hook не работает

**Решение 1:** Проверьте права доступа

```bash
chmod +x .husky/pre-commit
```

**Решение 2:** Проверьте путь к ts-node

```bash
# В .husky/pre-commit используйте полный путь
node_modules/.bin/ts-node scripts/docgen/docgenForStagedPackages.ts
```

### Проблема: Документация генерируется, но не добавляется в commit

**Причина:** В `docgenForStagedPackages.ts` не работает `git add`

**Решение:** Проверьте что скрипт возвращает корректные пути:

```typescript
console.log('Adding to stage:', needDocStage);
execSync(`git add ${needDocStage.join(' ')}`);
```

## 📚 Дополнительные настройки

### Кастомные плейсхолдеры

Если нужны другие маркеры:

**scripts/docgen/constants.ts:**

```typescript
export const DOCGEN_SECTION_PLACEHOLDER_START = '<!-- DOCS_START -->';
export const DOCGEN_SECTION_PLACEHOLDER_END = '<!-- DOCS_END -->';
```

### Генерация в другой формат

Можно расширить `Markdown.ts` для генерации в другие форматы:

```typescript
class JsonDocGenerator {
  renderComponentSpec() {
    return JSON.stringify({
      name: this.doc.displayName,
      props: this.doc.props,
    }, null, 2);
  }
}
```

### Интеграция с CI/CD

**GitHub Actions:**

```yaml
name: Check Documentation

on: [pull_request]

jobs:
  check-docs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          cache: 'pnpm'
      
      - run: pnpm install
      - run: pnpm docgen
      
      - name: Check for changes
        run: |
          git diff --exit-code || (echo "Documentation is outdated" && exit 1)
```

## ✅ Чеклист миграции

- [ ] Скопированы все файлы из `scripts/docgen/`
- [ ] Скопированы утилиты из `scripts/utils/`
- [ ] Установлены все NPM зависимости
- [ ] Настроен `scripts/docgen/index.ts` под структуру проекта
- [ ] Добавлены скрипты в `package.json`
- [ ] Добавлены плейсхолдеры в README.md пакетов
- [ ] Запущена генерация документации вручную
- [ ] Настроен pre-commit hook
- [ ] Проверена генерация при коммите
- [ ] Создан `doc.config.ts` для пакетов с особенностями (если нужно)

## 🎯 Заключение

После завершения миграции у вас будет:

✅ **Автоматическая генерация** документации из TypeScript кода
✅ **Актуальная документация** всегда синхронизирована с кодом
✅ **Git hooks** автоматически обновляют README при коммитах
✅ **Кастомизация** через `doc.config.ts` для особых случаев
✅ **Консистентный формат** документации во всех пакетах

Система docgen значительно упрощает поддержку документации в больших monorepo проектах!

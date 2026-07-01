# CodeEditor

`@ds/code-editor` — Обёртка над monaco-editor с темизацией на токенах дизайн-системы, шапкой с языком и кнопкой копирования, async/lazy-загрузкой и JSON/YAML-валидацией по schema.

Тонкая обёртка над [`@monaco-editor/react`](https://github.com/suren-atoyan/monaco-react) с темой на токенах дизайн-системы, опциональной шапкой (language label + copy button) и фиксированными типографическими опциями. Поддерживает JSON/YAML-валидацию по JSON-Schema, async/lazy-варианты загрузки monaco-бандла и встраивание в продуктовые формы и карточки.

## Когда использовать

- Просмотр и редактирование JSON/YAML конфигов прямо в продукте.
- Inline-редакторы с подсветкой синтаксиса.
- Просмотр логов/манифестов с кнопкой копирования всего содержимого.

Когда **не** нужен `CodeEditor`:

- Большие IDE-сценарии (мульти-файлы, расширения, дебаггер):
  - используйте полноценный monaco-host или web-IDE.
- Однострочный ввод без подсветки:
  - используйте `Input` / `Textarea` из соответствующих пакетов.

## Анатомия

### Header (no default, опускается ⇒ скрыта)

`hasHeader` не имеет явного дефолта в API; если не передан — шапка не рендерится. Включение шапки добавляет:

- Имя языка (`language`), отформатированное с заглавной буквы.
- Кнопку копирования — копирует текущее значение `value` в clipboard и вызывает `onCopyClick`.

### Background (default `true`)

- `true` — поверх monaco-области рисуется лёгкий полупрозрачный фон, чтобы редактор не сливался с поверхностью.
- `false` — режим встраивания в карточки / модалки с собственным фоном.

### Language

Любое значение, поддерживаемое monaco (`json`, `yaml`, `typescript`, `javascript`, `markdown`, `shell`, …). Для `json` и `yaml` дополнительно поддерживается `jsonSchema` — конфигурация диагностики и автокомплитов через JSON-Schema.

### Loading

- `loading={true}` — поверх редактора рендерится `<Spinner />`, само Monaco-поле скрыто. Использовать, когда контент ещё загружается из API.
- `loading={<CustomNode />}` — подменяет дефолтный `<Spinner />` на время инициализации monaco-бандла.

### Row numbers (default `true`)

`showRowNumber={false}` скрывает колонку с номерами строк (mapping на monaco-опции `lineNumbers: 'off'`, `lineDecorationsWidth: 0`, `lineNumbersMinChars: 0`).

## Установка

```bash
pnpm add @ds/code-editor
```

```ts
import { CodeEditor, LazyCodeEditor, AsyncCodeEditor } from '@ds/code-editor'
```

## Props

**CodeEditorProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `beforeMount` | `BeforeMount` | — | Signature: function(monaco: Monaco) => void <br/> An event is emitted before the editor is mounted <br/> It gets the monaco instance as a first argument <br/> Defaults to "noop" |
| `className` | `string` | — | Class name for the editor container |
| `data-test-id` | `string` | — |  |
| `defaultLanguage` | `string` | — | Default language of the current model |
| `defaultPath` | `string` | — | Default path of the current model <br/> Will be passed as the third argument to `.createModel` method <br/> `monaco.editor.createModel(..., ..., monaco.Uri.parse(defaultPath))` |
| `defaultValue` | `string` | — | Default value of the current model |
| `hasBackground` | `boolean` | — | Включение/отключение псевдобекграунда. |
| `hasHeader` | `boolean` | — | Включение/отключение шапки. |
| `height` | `string \| number` | `100%` | Height of the editor wrapper |
| `jsonSchema` | `JsonSchema` | — | Конфигурация JSON-Schema, по которой monaco валидирует контент. |
| `keepCurrentModel` | `boolean` | `false` | Indicator whether to dispose the current model when the Editor is unmounted or not |
| `language` | `string` | — | Language of the current model <br/> Язык контента редактора. Schema-режим работает только для `json` и `yaml`. |
| `line` | `number` | — | The line to jump on it |
| `loading` | `ReactNode` | `Loading...` | The loading screen before the editor will be mounted |
| `onChange` | `OnChange` | — | Signature: function(value: string \| undefined, ev: monaco.editor.IModelContentChangedEvent) => void <br/> An event is emitted when the content of the current model is changed |
| `onCopyClick` | `(() => void)` | — | Клик по кнопке копирования. |
| `onMount` | `OnMount` | — | Signature: function(editor: monaco.editor.IStandaloneCodeEditor, monaco: Monaco) => void <br/> An event is emitted when the editor is mounted <br/> It gets the editor instance as a first argument and the monaco instance as a second <br/> Defaults to "noop" |
| `onValidate` | `OnValidate` | — | Signature: function(markers: monaco.editor.IMarker[]) => void <br/> An event is emitted when the content of the current model is changed <br/> and the current model markers are ready <br/> Defaults to "noop" |
| `options` | `IStandaloneEditorConstructionOptions` | — | IStandaloneEditorConstructionOptions |
| `overrideServices` | `IEditorOverrideServices` | — | IEditorOverrideServices |
| `path` | `string` | — | Path of the current model <br/> Will be passed as the third argument to `.createModel` method <br/> `monaco.editor.createModel(..., ..., monaco.Uri.parse(defaultPath))` <br/> В schema-режиме путь модели управляется внутренне (нужен стабильный `path`, <br/> совпадающий с `fileMatch`), снаружи задать его нельзя. `never` запрещает <br/> передачу `path` на уровне типа — попытка приводит к compile-time ошибке. |
| `saveViewState` | `boolean` | — | Indicator whether to save the models' view states between model changes or not <br/> Defaults to true |
| `showRowNumber` | `boolean` | — | Включение/отключение колонки с номерами строк. |
| `theme` | `string` | — | Имя зарегистрированной monaco-темы из глобального реестра <br/> (`monaco.editor.defineTheme(name, …)`). По умолчанию подбирается <br/> автоматически по DS-теме провайдера: `'snack'` для светлой, `'snackDark'` <br/> для тёмной. Передавай вручную только если регистрируешь свою кастомную <br/> тему — иначе оставляй `undefined`. |
| `themeName` | `string` | — | Используется как trigger в effect deps для перепересчёта theme tokens при смене темы. Уникальное значение на каждую тему. |
| `value` | `string` | — | Value of the current model |
| `width` | `string \| number` | `100%` | Width of the editor wrapper |
| `wrapperProps` | `object` | — | Props applied to the wrapper element |

#### Related types

**JsonSchema**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `fileMatch` | `string` | — | Паттерн match'а пути модели, к которой применяется схема. |
| `schema` | `JSONSchema` | — | Тело JSON-Schema. |
| `uri` | `string \| undefined` | — | Идентификатор схемы. Если не задан — генерится автоматически. |

## Микрофронтовая интеграция

`monaco-editor` — крупный бандл (~3-5 MB после tree-shaking). В микрофронтовой архитектуре он должен грузиться **один раз** на уровне хост-приложения (хоста микрофронтов) и переиспользоваться всеми routed-MFE, иначе каждый микрофронт тянет свою копию.

Контракт реализован через глобальный реестр на `window['__snack-monaco-editor-loader__']`: хост регистрирует loader один раз, все MFE переиспользуют его без своей копии бандла.

### Хост — однократная регистрация loader'а

В корневой конфигурации хоста (single-spa root-config / Module Federation host; вызывается до маунта любого MFE):

```ts
export function initCodeEditorConfig() {
  if (typeof window === 'undefined') return
  window['__snack-monaco-editor-loader__'] = {
    loadMonaco: () => import('monaco-editor').then(m => m.default),
  }
}
```

Хост содержит `monaco-editor` в собственных `dependencies` и в `monaco-editor-webpack-plugin` / Vite chunk-конфиге; MFE — **не должны его содержать**. Динамический `import('monaco-editor')` даёт отдельный chunk, который грузится только при первом обращении к `loadMonaco()`.

### MFE — потребитель

```tsx
import { LazyCodeEditor } from '@ds/code-editor'

export function ManifestPanel({ manifest }: { manifest: string }) {
  return <LazyCodeEditor height='100%' value={manifest} language='json' options={{ readOnly: true }} />
}
```

`LazyCodeEditor` сам:

- Внутри `Suspense` происходит lazy loading `AsyncCodeEditor`-фабрики.
- В фабрике вызывает `loadMonacoEditor()` — читает `window['__snack-monaco-editor-loader__']`.
- Если ключа нет (например, MFE отрендерился в standalone-режиме вне хоста) — fallback на дефолтный loader `@monaco-editor/react`, который тянет бандл с jsDelivr CDN.

Если нужен собственный `Suspense` (например, общий лоадер MFE), используй `AsyncCodeEditor` напрямую:

```tsx
import { Suspense, lazy } from 'react'
import { AsyncCodeEditor } from '@ds/code-editor'

const CodeEditor = lazy(() => AsyncCodeEditor())

export function MyMfe() {
  return (
    <Suspense fallback={<MfeSpinner />}>
      <CodeEditor language='json' value='' />
    </Suspense>
  )
}
```

### Prefetch — `preloadMonacoEditor()`

Если заранее известно, что пользователь перейдёт к редактору (например, по клику в навигации) — предзагрузи бандл, чтобы Suspense-фолбэк не появлялся:

```ts
import { preloadMonacoEditor } from '@ds/code-editor'

linkRef.current?.addEventListener('mouseenter', () => preloadMonacoEditor(), { once: true })
```

Если хост ещё не зарегистрировал loader (`__snack-monaco-editor-loader__` отсутствует), `preloadMonacoEditor()` возвращает `null` — без ошибок.

### SSR

`loadMonacoEditor` и `preloadMonacoEditor` имеют SSR-guard и в Node-окружении возвращают `null`. Сам `CodeEditor` / `LazyCodeEditor` под SSR не рендерится: `monaco-editor` обращается к `window` и `document.fonts` на module-init. В документации (Astro) demo-примеры монтируются через `client:only='react'` — в продуктовом SPA это не проблема, но при SSR-фреймворке (Next, Remix) оборачивай редактор в `dynamic({ ssr: false })`/аналог.

### Self-hosted vs CDN

| Сценарий | Что делать |
|----------|------------|
| Хост + MFE | Зарегистрируй loader в хосте — `import('monaco-editor')`. MFE использует `LazyCodeEditor`. Один бандл на все MFE. |
| Standalone-приложение (без хоста) | Можешь либо зарегистрировать тот же loader локально, либо не делать ничего — `@monaco-editor/react` стянет бандл с jsDelivr CDN. Для продакшена предпочтительно self-hosted (offline, контроль версий, CSP). |
| Прямой `CodeEditor` (не Lazy/Async) | Использует дефолтный loader `@monaco-editor/react` (CDN). Lazy/Async-варианты — единственный способ self-host'а через `__snack-monaco-editor-loader__`. |

### 1. JSON

Базовый сценарий: json-редактор без шапки

```tsx
import { CodeEditor } from '@ds/code-editor';
import { useState } from 'react';

const INITIAL = `{
  "name": "@ds/code-editor",
  "version": "0.0.0",
  "language": "json"
}
`;

export function Json() {
  const [value, setValue] = useState(INITIAL);

  return <CodeEditor language='json' value={value} height={220} onChange={v => setValue(v ?? '')} />;
}
```

### 2. YAML

YAML с включённой шапкой и кнопкой копирования

```tsx
import { CodeEditor } from '@ds/code-editor';
import { useState } from 'react';

const INITIAL = `name: '@ds/code-editor'
version: 0.0.0
language: yaml
`;

export function Yaml() {
  const [value, setValue] = useState(INITIAL);

  return <CodeEditor language='yaml' value={value} hasHeader height={220} onChange={v => setValue(v ?? '')} />;
}
```

### 3. С шапкой и onCopyClick

hasHeader + onCopyClick — продуктовая обвязка

```tsx
import { CodeEditor } from '@ds/code-editor';
import { useState } from 'react';

const INITIAL = `{
  "copy": "me"
}
`;

export function WithHeader() {
  const [value, setValue] = useState(INITIAL);
  const [copiedAt, setCopiedAt] = useState<string | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <CodeEditor
        language='json'
        value={value}
        hasHeader
        height={200}
        onChange={v => setValue(v ?? '')}
        onCopyClick={() => setCopiedAt(new Date().toLocaleTimeString())}
      />
      <span>Last copy: {copiedAt ?? '—'}</span>
    </div>
  );
}
```

### 4. Без фона

hasBackground=false — для встраивания в карточки с собственным фоном

```tsx
import { CodeEditor } from '@ds/code-editor';
import { useState } from 'react';

import styles from './NoBackground.module.scss';

const INITIAL = `// transparent background, embedded into a card
const config = { mode: 'inline' }
`;

export function NoBackground() {
  const [value, setValue] = useState(INITIAL);

  return (
    <div className={styles.surface}>
      <CodeEditor
        language='javascript'
        value={value}
        hasBackground={false}
        height={220}
        onChange={v => setValue(v ?? '')}
      />
    </div>
  );
}
```

### 5. Lazy-загрузка

LazyCodeEditor — Suspense + lazy-chunk с monaco-бандлом

```tsx
import { LazyCodeEditor } from '@ds/code-editor';
import { useState } from 'react';

const INITIAL = `{
  "loaded": "lazily"
}
`;

export function LazyLoaded() {
  const [value, setValue] = useState(INITIAL);

  return <LazyCodeEditor language='json' value={value} hasHeader height={220} onChange={v => setValue(v ?? '')} />;
}
```

## LazyCodeEditor

```tsx
import { LazyCodeEditor } from '@ds/code-editor';
import { useState } from 'react';

const INITIAL = `{
  "loaded": "lazily"
}
`;

export function LazyLoaded() {
  const [value, setValue] = useState(INITIAL);

  return <LazyCodeEditor language='json' value={value} hasHeader height={220} onChange={v => setValue(v ?? '')} />;
}
```

### Props `LazyCodeEditorProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `beforeMount` | `BeforeMount` | — | Signature: function(monaco: Monaco) => void <br/> An event is emitted before the editor is mounted <br/> It gets the monaco instance as a first argument <br/> Defaults to "noop" |
| `className` | `string` | — | Class name for the editor container |
| `data-test-id` | `string` | — |  |
| `defaultLanguage` | `string` | — | Default language of the current model |
| `defaultPath` | `string` | — | Default path of the current model <br/> Will be passed as the third argument to `.createModel` method <br/> `monaco.editor.createModel(..., ..., monaco.Uri.parse(defaultPath))` |
| `defaultValue` | `string` | — | Default value of the current model |
| `hasBackground` | `boolean` | — | Включение/отключение псевдобекграунда. |
| `hasHeader` | `boolean` | — | Включение/отключение шапки. |
| `height` | `string \| number` | `100%` | Height of the editor wrapper |
| `jsonSchema` | `JsonSchema` | — | Конфигурация JSON-Schema, по которой monaco валидирует контент. |
| `keepCurrentModel` | `boolean` | `false` | Indicator whether to dispose the current model when the Editor is unmounted or not |
| `language` | `string` | — | Language of the current model <br/> Язык контента редактора. Schema-режим работает только для `json` и `yaml`. |
| `line` | `number` | — | The line to jump on it |
| `loading` | `ReactNode` | `Loading...` | The loading screen before the editor will be mounted |
| `onChange` | `OnChange` | — | Signature: function(value: string \| undefined, ev: monaco.editor.IModelContentChangedEvent) => void <br/> An event is emitted when the content of the current model is changed |
| `onCopyClick` | `(() => void)` | — | Клик по кнопке копирования. |
| `onMount` | `OnMount` | — | Signature: function(editor: monaco.editor.IStandaloneCodeEditor, monaco: Monaco) => void <br/> An event is emitted when the editor is mounted <br/> It gets the editor instance as a first argument and the monaco instance as a second <br/> Defaults to "noop" |
| `onValidate` | `OnValidate` | — | Signature: function(markers: monaco.editor.IMarker[]) => void <br/> An event is emitted when the content of the current model is changed <br/> and the current model markers are ready <br/> Defaults to "noop" |
| `options` | `IStandaloneEditorConstructionOptions` | — | IStandaloneEditorConstructionOptions |
| `overrideServices` | `IEditorOverrideServices` | — | IEditorOverrideServices |
| `path` | `string` | — | Path of the current model <br/> Will be passed as the third argument to `.createModel` method <br/> `monaco.editor.createModel(..., ..., monaco.Uri.parse(defaultPath))` <br/> В schema-режиме путь модели управляется внутренне (нужен стабильный `path`, <br/> совпадающий с `fileMatch`), снаружи задать его нельзя. `never` запрещает <br/> передачу `path` на уровне типа — попытка приводит к compile-time ошибке. |
| `saveViewState` | `boolean` | — | Indicator whether to save the models' view states between model changes or not <br/> Defaults to true |
| `showRowNumber` | `boolean` | — | Включение/отключение колонки с номерами строк. |
| `theme` | `string` | — | Имя зарегистрированной monaco-темы из глобального реестра <br/> (`monaco.editor.defineTheme(name, …)`). По умолчанию подбирается <br/> автоматически по DS-теме провайдера: `'snack'` для светлой, `'snackDark'` <br/> для тёмной. Передавай вручную только если регистрируешь свою кастомную <br/> тему — иначе оставляй `undefined`. |
| `themeName` | `string` | — | Используется как trigger в effect deps для перепересчёта theme tokens при смене темы. Уникальное значение на каждую тему. |
| `value` | `string` | — | Value of the current model |
| `width` | `string \| number` | `100%` | Width of the editor wrapper |
| `wrapperProps` | `object` | — | Props applied to the wrapper element |

#### Related types

**JsonSchema**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `fileMatch` | `string` | — | Паттерн match'а пути модели, к которой применяется схема. |
| `schema` | `JSONSchema` | — | Тело JSON-Schema. |
| `uri` | `string \| undefined` | — | Идентификатор схемы. Если не задан — генерится автоматически. |

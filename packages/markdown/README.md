# Markdown

`@ds/markdown` — Просмотр и редактирование markdown — рендер GFM и WYSIWYG-редактор на TipTap.

Пакет `@ds/markdown` даёт две независимые сущности:

- ****Markdown**** — рендер markdown-строки в безопасный HTML: GFM, таблицы, подсветка кода с копированием. Презентационный компонент только для чтения.
- ****MarkdownEditor**** — WYSIWYG-редактор на TipTap с тулбаром, preview-тоглом и загрузкой картинок. Работает в controlled и uncontrolled режимах.

## Установка

```bash
pnpm add @ds/markdown
```

```ts
import { Markdown, MarkdownEditor, TOOLBAR_ITEM } from '@ds/markdown'
```

Редактор использует порталы (тултипы, выпадающие меню) — оборачивайте его в `PortalContextProvider` из `@ds/portal-context`.

## Markdown

Рендер markdown-строки в безопасный HTML — GFM, таблицы, зачёркивание, подсветка кода с кнопкой копирования.

Презентационный компонент: принимает `value` со строкой markdown и рендерит её в безопасный HTML. Поддерживает GitHub Flavored Markdown, подсветку кода и копирование code-блоков. Только для чтения — для ввода используйте **`MarkdownEditor`**.

### Когда использовать

- Отображение пользовательского markdown: описания, комментарии, документация, release notes.
- Показ форматированного текста, сохранённого редактором, в публичной части интерфейса.

Когда **не** нужен:

- Для простого многострочного текста без форматирования:
  - нативный `textarea` или поле ввода из `@ds/fields`.
- Для подсветки изолированного фрагмента кода без markdown:
  - отдельный code-viewer.

### Анатомия

#### View — рендер

Принимает `value` со строкой markdown и рендерит:

- заголовки `h1–h5`, параграфы, списки (маркированные, нумерованные, вложенные);
- цитаты, горизонтальные разделители, ссылки;
- таблицы GFM, зачёркивание, инлайн-код;
- code-блоки с подсветкой синтаксиса, нумерацией строк и кнопкой копирования.

#### skipHtml (default `true`)

Контроль над сырым HTML внутри markdown:

- `true` (по умолчанию) — теги вырезаются, рендерится только markdown-разметка (безопасно для пользовательского ввода).
- `false` — сырой HTML пропускается в вывод. Включайте только для доверенного контента.

#### Расширение рендера

- `components` — override отдельных HTML-элементов своими React-компонентами.
- `remarkPlugins` / `rehypePlugins` — дополнительные плагины пайплайна `react-markdown`.
- `onCodeCopyClick` — колбэк кнопки Copy на code-блоке, получает сырой текст блока.

### Примеры использования

#### Рендер markdown

GFM-таблица, зачёркивание и code-блок с копированием

```tsx
import { Markdown } from '@ds/markdown';

const SOURCE = `# Релиз 2.0

Поддерживается **GFM**: таблицы, ~~зачёркивание~~, списки задач и подсветка кода.

| Сервис   | Статус   |
|----------|----------|
| API      | стабилен |
| Realtime | beta     |

\`\`\`ts
export function greet(name: string) {
  return \`Hello, \${name}!\`
}
\`\`\`
`;

export function Viewer() {
  return <Markdown value={SOURCE} />;
}
```

#### Копирование code-блока

onCodeCopyClick получает сырой текст блока

```tsx
import { Markdown } from '@ds/markdown';
import { useState } from 'react';

const SOURCE = `Нажмите Copy на блоке кода — \`onCodeCopyClick\` получит сырой текст.

\`\`\`bash
pnpm add @ds/markdown
\`\`\`
`;

export function ViewerCodeCopy() {
  const [copied, setCopied] = useState<string | null>(null);

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Markdown value={SOURCE} onCodeCopyClick={setCopied} />
      {copied !== null && <span>Скопировано: {copied}</span>}
    </div>
  );
}
```

### Props

**MarkdownProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | CSS-класс корневого элемента. |
| `components` | `any` | — | Override рендера элементов |
| `data-test-id` | `string` | `markdown` |  |
| `onCodeCopyClick` | `((code: string) => void)` | — | Колбэк кнопки Copy на code-блоке |
| `rehypePlugins` | `PluggableList` | — | Доп. rehype-плагины |
| `remarkPlugins` | `PluggableList` | — | Доп. remark-плагины |
| `skipHtml` | `boolean` | `true` | По умолчанию true — сырой HTML вырезается |
| `value` | `string` | — | Markdown-исходник |

## MarkdownEditor

WYSIWYG-редактор markdown на TipTap — тулбар форматирования, preview-тогл, загрузка картинок, controlled и uncontrolled режимы.

WYSIWYG-редактор на TipTap с тулбаром форматирования и preview-тоглом. Работает в controlled (`value` / `onChange`) и uncontrolled (`defaultValue`) режимах. Готовый результат показывайте через **`Markdown`**.

### Когда использовать

- Поле ввода форматированного текста с тулбаром и предпросмотром: описания, комментарии, заметки.
- Редактирование markdown, который потом сохраняется и рендерится в публичной части.

Когда **не** нужен:

- Для простого многострочного текста без форматирования:
  - нативный `textarea` или поле ввода из `@ds/fields`.
- Для показа готового markdown без редактирования:
  - компонент **`Markdown`**.

### Анатомия

Редактор состоит из:

- `header` — тогл `Preview` слева и подпись (`label`) справа.
- `toolbar` — кнопки форматирования, сгруппированные по смыслу; лишние сворачиваются в меню «Ещё».
- `content` — редактируемая область с кнопкой очистки.

#### Preview (default `false`)

Переключает форму редактирования (обе редактируемы, тулбар работает в обеих):

- `false` (по умолчанию) — редактирование «сырого» markdown-текста в textarea. Кнопки тулбара вставляют markdown-разметку (`**жирный**`, `# заголовок`, `- список`) в исходник.
- `true` — форматированный WYSIWYG-редактор; те же кнопки применяют форматирование к rich-узлам.

Управляется тоглом в шапке либо пропами `preview` / `defaultPreview` / `onPreviewChange`.

#### Toolbar (default — полный набор)

Какие кнопки показать:

- `toolbar={[...]}` — массив значений `TOOLBAR_ITEM` (показываются только перечисленные кнопки).
- `toolbar={false}` — без тулбара.
- не указан — полный набор кнопок.

#### Header (default — виден)

Шапка с тоглом Preview и подписью:

- `label` — подпись справа. `false` — без подписи.
- `previewLabel` — текст тогла Preview.
- `hideHeader` — скрыть шапку целиком.

#### Resizable (default `true`)

Может ли пользователь менять размеры поля перетаскиванием уголка.

### Примеры использования

#### Редактор (uncontrolled)

defaultValue + onChange с дебаунсом

```tsx
import { MarkdownEditor } from '@ds/markdown';
import { PortalContextProvider } from '@ds/portal-context';

const INITIAL = `# Заметка

Печатайте текст и форматируйте его через тулбар. Поддерживается **markdown**.
`;

export function EditorUncontrolled() {
  return (
    <PortalContextProvider>
      <MarkdownEditor defaultValue={INITIAL} placeholder='Начните писать…' />
    </PortalContextProvider>
  );
}
```

#### Редактор (controlled) + Preview

value/onChange и preview/onPreviewChange во внешнем стейте

```tsx
import { MarkdownEditor } from '@ds/markdown';
import { PortalContextProvider } from '@ds/portal-context';
import { useState } from 'react';

export function EditorControlled() {
  const [value, setValue] = useState('# Controlled\n\nЗначение хранится во внешнем `useState`.');
  const [preview, setPreview] = useState(false);

  return (
    <PortalContextProvider>
      <MarkdownEditor
        value={value}
        onChange={setValue}
        preview={preview}
        onPreviewChange={setPreview}
        label='Описание'
      />
    </PortalContextProvider>
  );
}
```

#### Свой набор кнопок тулбара

toolbar={[...]} оставляет только нужные действия

```tsx
import { MarkdownEditor, TOOLBAR_ITEM } from '@ds/markdown';
import { PortalContextProvider } from '@ds/portal-context';

const INITIAL = `Оставьте в тулбаре только нужные кнопки через \`toolbar\`.
`;

export function EditorCustomToolbar() {
  return (
    <PortalContextProvider>
      <MarkdownEditor
        defaultValue={INITIAL}
        label='Комментарий'
        toolbar={[TOOLBAR_ITEM.Bold, TOOLBAR_ITEM.Italic, TOOLBAR_ITEM.Link, TOOLBAR_ITEM.BulletList]}
      />
    </PortalContextProvider>
  );
}
```

### Props

**MarkdownEditorProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | CSS-класс корневого элемента. |
| `data-test-id` | `string` | `markdown-editor` |  |
| `defaultPreview` | `boolean` | — | Uncontrolled |
| `defaultValue` | `string` | — | Uncontrolled |
| `hideHeader` | `boolean` | `false` | Скрыть шапку с тоглом Preview и подписью |
| `label` | `string \| false` | `Markdown field` | Подпись в шапке справа. По умолчанию — `Markdown field`. `false` — без подписи. |
| `onChange` | `((markdown: string) => void)` | — | Колбэк изменения markdown. Вызывается с дебаунсом `ON_CHANGE_DEBOUNCE_MS` после остановки ввода. |
| `onPreviewChange` | `((preview: boolean) => void)` | — | Колбэк переключения Preview-тогла в шапке |
| `placeholder` | `string` | — | Placeholder пустого редактора. |
| `preview` | `boolean` | — | Controlled preview-режим: показывает форматированный WYSIWYG с активным тулбаром. Выключен — редактирование «сырого» markdown-текста в textarea |
| `previewLabel` | `string` | `Preview` | Текст тогла Preview в шапке. По умолчанию `Preview`. |
| `resizable` | `boolean` | `true` | Может ли пользователь менять размеры поля перетаскиванием уголка. По умолчанию `true`. |
| `spellCheck` | `boolean` | `true` | Нативная проверка орфографии (`spellcheck`). По умолчанию `true`. |
| `toolbar` | `ToolbarItemId` | — | Какие кнопки тулбара показать. false — без тулбара |
| `value` | `string` | — | Controlled markdown |

##### Related types

- `ToolbarItemId` = `"block-code"` \| `"block-quote"` \| `"bold"` \| `"bullet-list"` \| `"heading"` \| `"image"` \| `"inline-code"` \| `"italic"` \| `"link"` \| `"ordered-list"` \| `"strikethrough"` \| `"table"`

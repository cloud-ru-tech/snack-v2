# Dropzone

`@ds/dropzone` — Пакет загрузки файлов — видимая зона Dropzone, триггер FileUpload и скрытая оверлей-зона HiddenDropZone над произвольным контентом.

Пакет `@ds/dropzone` предоставляет три компонента для загрузки файлов через drag-n-drop и клик:

- ****Dropzone**** — видимая зона для перетаскивания и клика. Три размера `s/m/l`, режимы `single/multiple`, состояние `disabled`.
- ****FileUpload**** — обёртка над произвольным триггером (например, кнопкой), открывающая нативный диалог выбора файлов. Без визуальной зоны.
- ****HiddenDropZone**** — скрытая оверлей-зона, накрывающая произвольный контент (форму, карточку) при перетаскивании файлов.

## Установка

```bash
pnpm add @ds/dropzone
```

```ts
import { Dropzone, FileUpload, HiddenDropZone } from '@ds/dropzone'
```

## Смотри также

- [Паттерны форм](/patterns/form-patterns) — композиция загрузки файлов внутри форм.

## Dropzone

Видимая зона загрузки файлов с поддержкой drag-n-drop и клика — три размера, режимы single/multiple, состояние disabled.

Видимая зона для загрузки файлов — перетаскиванием или кликом. Подходит, когда загрузка файлов является самостоятельным действием на странице (галерея, форма с вложениями, мастер импорта).

## Демо
<DropzoneDemo client:visible />

## Когда использовать
- Когда загрузка файлов — отдельная область UI, которую пользователь сразу видит.
- Когда нужно подсказать контекст через контент слота (иконка, подпись, список форматов).
- Когда требуется поддержать сразу и drag-n-drop, и клик по зоне.

Когда **не** подходит: если загрузка — вспомогательное действие в форме, используйте [FileUpload](/components/dropzone/file-upload) с обычной кнопкой.

## Анатомия

### Size
Три размера: `s` для плотных форм, `m` — дефолт, `l` — для крупных страниц загрузки.

### Upload mode
`single` — один файл за раз, повторный выбор заменяет предыдущий; `multiple` — батч-загрузка, файлы накапливаются.

## Установка
```bash
pnpm add @ds/dropzone
```

```ts
import { Dropzone } from '@ds/dropzone'
```

## Примеры использования
<Example
  title='Базовая зона'
  description='Multiple-режим, размер M'
  code={DropzoneBasicSrc}
>
  <DropzoneBasic client:visible />
</Example>

<Example
  title='Одно изображение'
  description='Режим single и фильтр accept'
  code={DropzoneSingleImageSrc}
>
  <DropzoneSingleImage client:visible />
</Example>

<Example
  title='Disabled'
  description='Состояние заблокированной загрузки'
  code={DropzoneDisabledSrc}
>
  <DropzoneDisabled client:visible />
</Example>

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `onFilesUpload` | `(files: File[]) => void` | — | Колбек загрузки файла |
| `children` | `ReactNode` | — | Контент dropzone |
| `disabled` | `boolean` | `false` | Деактивирован ли компонент |
| `mode` | `"single"` \| `"multiple"` | `multiple` | Режим загрузки |
| `accept` | `string` | — | Показывает пользователю в открывшемся диалоговом окне файлы типов, которые вы указываете в значении атрибута |
| `size` | `"s"` \| `"m"` \| `"l"` | `m` | Размер компонента |
| `className` | `string` | — | CSS-класс |

## Storybook
<StorybookEmbed storyId='components-dropzone-dropzone--playground' height={420} />

## FileUpload

Обёртка над произвольным триггером — открывает нативный диалог выбора файлов по клику. Без визуальной зоны.

Невизуальная обёртка над произвольным триггером — как правило, кнопкой. Клик по триггеру открывает системный диалог выбора файлов. Используйте, когда загрузка — вспомогательное действие в форме или toolbar, и не нужна отдельная зона перетаскивания.

## Когда использовать
- Кнопка «Загрузить файлы» рядом с другими полями формы.
- Иконка-загрузка в toolbar.
- Скрытый триггер, когда загрузка инициируется программно через клик на дочерний элемент.

Когда **не** подходит: если нужна явная зона drag-n-drop — используйте [Dropzone](/components/dropzone/dropzone) или [HiddenDropZone](/components/dropzone/hidden-drop-zone).

## Анатомия

### Upload mode
`single` — один файл за раз, повторный выбор заменяет предыдущий; `multiple` — батч-загрузка, файлы накапливаются.

## Установка
```bash
pnpm add @ds/dropzone
```

```ts
import { FileUpload } from '@ds/dropzone'
```

## Примеры использования
<Example
  title='Кнопка-триггер'
  description='FileUpload оборачивает Button'
  code={FileUploadBasicSrc}
>
  <FileUploadBasic client:visible />
</Example>

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `onFilesUpload` | `(files: File[]) => void` | — | Колбек загрузки файла |
| `mode` | `"single"` \| `"multiple"` | `multiple` | Режим |
| `accept` | `string` | — | Показывает пользователю в открывшемся диалоговом окне файлы типов, которые вы указываете в значении атрибута |

## Storybook
<StorybookEmbed storyId='components-dropzone-fileupload--playground' height={320} />

## HiddenDropZone

Скрытая зона загрузки файлов, накрывающая оверлеем произвольный контент при перетаскивании файлов — формы, карточки, редакторы.

Скрытая зона загрузки, которая становится видимой только во время перетаскивания файлов. Оверлей рендерится поверх произвольного контента (форма, карточка, редактор) и позволяет прикрепить файлы к существующей сущности без отдельной визуальной области.

## Когда использовать
- Прикрепление файлов к форме, где уже есть другие поля и нет места под явную зону.
- Drop-to-attach поверх карточки задачи, чата, редактора.
- Массовая загрузка поверх полноэкранного списка.

Когда **не** подходит: когда загрузка — первичный сценарий страницы и должна быть видна сразу — используйте [Dropzone](/components/dropzone/dropzone).

## Установка
```bash
pnpm add @ds/dropzone
```

```ts
import { HiddenDropZone } from '@ds/dropzone'
```

## Примеры использования
<Example
  title='Оверлей над формой'
  description='HiddenDropZone накрывает форму при drag'
  code={HiddenDropZoneBasicSrc}
>
  <HiddenDropZoneBasic client:visible />
</Example>

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `onFilesUpload` | `(files: File[]) => void` | — | Колбек загрузки файла |
| `disabled` | `boolean` | — | Деактивирован ли компонент |
| `mode` | `"single"` \| `"multiple"` | `multiple` | Режим загрузки |
| `accept` | `string` | — | Показывает пользователю в открывшемся диалоговом окне файлы типов, которые вы указываете в значении атрибута |
| `size` | `"s"` \| `"m"` \| `"l"` | `m` | Размер компонента |
| `className` | `string` | — | CSS-класс |
| `content` | `ReactNode` | — | Контент dropzone при drag (overlay) |
| `children` | `ReactNode` | — | Дочерний контент, поверх которого отображается dropzone при drag |

## Storybook
<StorybookEmbed storyId='components-dropzone-hiddendropzone--playground' height={420} />

## PrivateDropZone

```tsx
import { PrivateDropZone } from '@ds/dropzone'

export function Example() {
  return <PrivateDropZone mode="multiple">Click me</PrivateDropZone>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `isOver` | `boolean` | — |  |
| `onFilesUpload` | `(files: File[]) => void` | — | Колбек загрузки файла |
| `children` | `ReactNode` | — | Контент dropzone |
| `disabled` | `boolean` | `false` | Деактивирован ли компонент |
| `mode` | `"single"` \| `"multiple"` | `multiple` | Режим |
| `accept` | `string` | — | Показывает пользователю в открывшемся диалоговом окне файлы типов, которые вы указываете в значении атрибута |
| `size` | `"s"` \| `"m"` \| `"l"` | `m` | Размер компонента |
| `className` | `string` | — | CSS-класс |

# Dropzone

Пакет компонентов для загрузки файлов: **Dropzone** (видимая область drag-and-drop), **FileUpload** (кнопка выбора файлов) и **HiddenDropZone** (скрытая дропзона поверх контента). Стили — из design tokens (Figma variables).

## Installation

```bash
npm install @design-system/dropzone
# or
yarn add @design-system/dropzone
# or
pnpm add @design-system/dropzone
```

## Exports

```typescript
import {
  SIZE,
  UPLOAD_MODE,
  type Size,
  type UploadMode
} from '@design-system/dropzone';
```

## Live examples

### Basic usage

```tsx
import { Dropzone } from '@design-system/dropzone';

export function Example() {
  return (
    <Dropzone onFilesUpload={(files) => console.log(files)}>
      <span># slot content</span>
    </Dropzone>
  );
}
```

### Размеры

```tsx
import { Dropzone, SIZE } from '@design-system/dropzone';

export function Example() {
  return (
    <Dropzone size={SIZE.M} onFilesUpload={(files) => console.log(files)}>
      <span># slot content</span>
    </Dropzone>
  );
}
```

### Ограничение типов файлов

```tsx
import { Dropzone } from '@design-system/dropzone';

export function Example() {
  return (
    <Dropzone
      onFilesUpload={(files) => console.log(files)}
      accept="image/*"
    >
      <span>Только изображения</span>
    </Dropzone>
  );
}
```

### Basic usage

```tsx
import { FileUpload } from '@design-system/dropzone';

export function Example() {
  return (
    <FileUpload onFilesUpload={(files) => console.log(files)}>
      <button type="button">Загрузить</button>
    </FileUpload>
  );
}
```

### С кнопкой из design-system

```tsx
import { Button } from '@design-system/button';
import { FileUpload } from '@design-system/dropzone';

export function Example() {
  return (
    <FileUpload onFilesUpload={(files) => console.log(files)}>
      <Button type="button">Загрузить</Button>
    </FileUpload>
  );
}
```

### Режимы и accept

```tsx
import { FileUpload } from '@design-system/dropzone';

export function Example() {
  return (
    <FileUpload
      onFilesUpload={(files) => console.log(files)}
      mode="single"
      accept="image/*"
    >
      <button type="button">Выбрать изображение</button>
    </FileUpload>
  );
}
```

### Basic usage

```tsx
import { HiddenDropZone } from '@design-system/dropzone';

export function Example() {
  return (
    <HiddenDropZone
      onFilesUpload={(files) => console.log(files)}
      content={
        <>
          <h4>Загрузите вложения</h4>
          <div>Перетащите файлы на форму</div>
        </>
      }
    >
      <form>
        <label>Имя</label>
        <input type="text" />
        <label>Фамилия</label>
        <input type="text" />
      </form>
    </HiddenDropZone>
  );
}
```

### Контент overlay

```tsx
<HiddenDropZone
  onFilesUpload={handleFiles}
  content={
    <>
      <h4>Загрузите вложения</h4>
      <div>Перетащите файлы на форму, чтобы прикрепить их</div>
    </>
  }
>
  {children}
</HiddenDropZone>
```


## Usage



## Props

### DropzoneProps
| name | type | default value | description |
|------|------|---------------|-------------|
| onFilesUpload* | `(files: File[]) => void` | - | Колбек загрузки файла |
| children | `ReactNode` | - | Контент dropzone |
| disabled | `boolean` | - | Деактивирован ли компонент |
| mode | enum UploadMode: `"single"`, `"multiple"` | multiple | Режим загрузки |
| accept | `string` | - | Показывает пользователю в открывшемся диалоговом окне файлы типов, которые вы указываете в значении атрибута |
| size | enum Size: `"s"`, `"m"`, `"l"` | m | Размер компонента |
| className | `string` | - | CSS-класс |

### FileUploadProps
| name | type | default value | description |
|------|------|---------------|-------------|
| onFilesUpload* | `(files: File[]) => void` | - | Колбек загрузки файла |
| mode | enum UploadMode: `"single"`, `"multiple"` | multiple | Режим |
| accept | `string` | - | Показывает пользователю в открывшемся диалоговом окне файлы типов, которые вы указываете в значении атрибута |

### HiddenDropZoneProps
| name | type | default value | description |
|------|------|---------------|-------------|
| children* | `ReactNode` | - | Дочерний контент, поверх которого отображается dropzone при drag |
| onFilesUpload* | `(files: File[]) => void` | - | Колбек загрузки файла |
| disabled | `boolean` | - | Деактивирован ли компонент |
| mode | enum UploadMode: `"single"`, `"multiple"` | multiple | Режим загрузки |
| accept | `string` | - | Показывает пользователю в открывшемся диалоговом окне файлы типов, которые вы указываете в значении атрибута |
| size | enum Size: `"s"`, `"m"`, `"l"` | m | Размер компонента |
| className | `string` | - | CSS-класс |
| content | `ReactNode` | - | Контент dropzone при drag (overlay) |

## Best Practices

1. **Понятный контент** — используйте `children` для пояснения: «Перетащите файлы сюда» или «Выберите файлы».
2. **Ограничение типов** — указывайте `accept` для фильтрации (например, `image/*`, `.pdf`).
3. **Режим** — `single` для одного файла; `multiple` для нескольких.

---

## Additional Resources

- **Full Documentation:** [View documentation](./docs/index.mdx)
- **Changelog:** [View changelog](./CHANGELOG.md)
- **Migration Guide:** [View migration guide](./MIGRATION.md)

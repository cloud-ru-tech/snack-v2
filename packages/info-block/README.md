# Info Block

Info Block — компонент для отображения информационных блоков с иконкой, заголовком, описанием и опциональными действиями (кнопками в футере). Поддерживает вертикальную и горизонтальную компоновку, три размера (s, m, l).

## Installation

```bash
npm install @design-system/info-block
# or
yarn add @design-system/info-block
# or
pnpm add @design-system/info-block
```

## Exports



## Live examples

### Basic usage

```tsx
import { InfoBlock } from '@design-system/info-block';

<InfoBlock title='Title text' description='Content text' />
```

### With icon

```tsx
import { InfoBlock } from '@design-system/info-block';

<InfoBlock
  title='Title text'
  description='Content text'
  icon={{ icon: PlaceholderSVG, appearance: 'primary', decor: true }}
/>
```

### Sizes

```tsx
import { InfoBlock, SIZE } from '@design-system/info-block';

<InfoBlock
  title='Title text'
  description='Content text'
  size={SIZE.S}
  icon={{ icon: PlaceholderSVG, appearance: 'primary', decor: true }}
/>
<InfoBlock
  title='Title text'
  description='Content text'
  size={SIZE.M}
  icon={{ icon: PlaceholderSVG, appearance: 'primary', decor: true }}
/>
<InfoBlock
  title='Title text'
  description='Content text'
  size={SIZE.L}
  icon={{ icon: PlaceholderSVG, appearance: 'primary', decor: true }}
/>
```

### Alignments

```tsx
import { InfoBlock } from '@design-system/info-block';

<InfoBlock
  title='Title text'
  description='Content text'
  align={ALIGN.Vertical}
  icon={{ icon: PlaceholderSVG, appearance: 'primary', decor: true }}
/>
<InfoBlock
  title='Title text'
  description='Content text'
  align={ALIGN.Horizontal}
  icon={{ icon: PlaceholderSVG, appearance: 'primary', decor: true }}
/>
```


## Usage

### Basic example

```tsx
import { InfoBlock } from '@design-system/info-block';

export function Example() {
  return <InfoBlock title='Заголовок' description='Описание блока' />;
}
```

### With icon and footer

```tsx
import { ButtonGroup } from '@design-system/button';
import { PlaceholderSVG } from '@design-system/icons';
import { InfoBlock } from '@design-system/info-block';

export function Example() {
  return (
    <InfoBlock
      title='Заголовок'
      description='Описание блока'
      icon={{ icon: PlaceholderSVG, appearance: 'primary', decor: true }}
      footer={
        <ButtonGroup
          size='m'
          primaryAction={{ label: 'Подтвердить', onClick: () => {} }}
          secondaryAction={{ label: 'Отмена', onClick: () => {} }}
        />
      }
    />
  );
}
```

### Horizontal layout

```tsx
import { PlaceholderSVG } from '@design-system/icons';
import { ALIGN, InfoBlock } from '@design-system/info-block';

export function Example() {
  return (
    <InfoBlock
      title='Заголовок'
      description='Описание'
      align={ALIGN.Horizontal}
      icon={{ icon: PlaceholderSVG }}
      size='m'
    />
  );
}
```

## Props

### InfoBlockProps
| name | type | default value | description |
|------|------|---------------|-------------|
| title | `string` | - | Заголовок |
| description | `ReactNode` | - | Подзаголовок |
| icon | `IconPredefinedProps` | - | Иконка |
| size | enum Size: `"s"`, `"m"`, `"l"` | s | Размер |
| align | enum Align: `"vertical"`, `"horizontal"` | vertical | Расположение элементов |
| footer | `ReactNode` | - | Вложенный контент (например ButtonGroup) |
| className | `string` | - | Дополнительный класс |

## Best Practices

1. **Используйте осмысленные заголовки** — заголовок должен кратко описывать суть блока
2. **Ограничьте длину описания** — для horizontal layout длинный текст может ухудшить читаемость
3. **Выбирайте подходящий размер** — s для компактных областей, l для акцентных блоков
4. **Vertical для центрированного контента** — например, пустые состояния, результаты поиска
5. **Horizontal для списков и карточек** — когда нужно экономить вертикальное пространство
6. **Primary action в ButtonGroup** — primaryAction всегда справа, secondaryAction и tertiaryAction — слева

---

## Additional Resources

- **Full Documentation:** [View documentation](./docs/index.mdx)
- **Changelog:** [View changelog](./CHANGELOG.md)
- **Migration Guide:** [View migration guide](./MIGRATION.md)

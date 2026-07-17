# InfoBlock

`@ds/info-block` — Информационный блок — заголовок, описание, опциональные иконка и футер. Базовый строительный элемент для пустых состояний, подсказок и карточек.

Типовой блок информации: заголовок, описание, опциональные иконка и футер с действиями. Используется в пустых состояниях, онбординге, подсказках и хедерах разделов.

## Когда использовать
- Пустое состояние списка/таблицы («Нет данных», «Ничего не найдено»).
- Подсказка внутри формы или карточки.
- Заголовок раздела с подзаголовком и кнопками действия.
- Информационная вставка над списком — например, объяснение статуса.

Когда **не** нужен: если нужен только заголовок без описания — возьмите `Typography`. Если нужна полноценная карточка с рамкой — возьмите компонент-карточку.

## Анатомия

### Size
Три размера: `s` — для плотных мест (карточки, тосты), `m` — дефолт, `l` — для крупных empty-states и лендинг-секций.

### Align
`vertical` — иконка сверху, текст под ней (центрированные empty-states); `horizontal` — иконка слева, текст справа (строки списков, инлайн-подсказки).

## Установка
```bash
pnpm add @ds/info-block
```

```ts
import { InfoBlock } from '@ds/info-block'
```

## Примеры использования
### Базовый блок

Заголовок и описание без иконки.

```tsx
import { InfoBlock } from '@ds/info-block';

export function Basic() {
  return <InfoBlock title='Заголовок' content='Короткое описание под заголовком.' />;
}
```

### Горизонтальное выравнивание

```tsx
import { InfoBlock } from '@ds/info-block';

export function Horizontal() {
  return (
    <InfoBlock
      align='horizontal'
      size='m'
      title='Горизонтальный вариант'
      content='Иконка (если есть) и текст располагаются в строку.'
    />
  );
}
```

### Три размера

```tsx
import { InfoBlock } from '@ds/info-block';

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <InfoBlock size='s' title='Size S' content='Компактный блок' />
      <InfoBlock size='m' title='Size M' content='Средний блок' />
      <InfoBlock size='l' title='Size L' content='Крупный блок для пустых состояний' />
    </div>
  );
}
```

### С иконкой

Иконка через проп icon (IconPredefinedProps).

```tsx
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { InfoBlock } from '@ds/info-block';

export function WithIcon() {
  return (
    <InfoBlock
      title='С иконкой'
      content='Иконка передаётся через проп icon как IconPredefinedProps.'
      icon={{ icon: PlaceholderSVG, appearance: 'primary', decor: true }}
    />
  );
}
```

## Props
**InfoBlockProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `align` | `"horizontal"` \| `"vertical"` | `vertical` | Расположение элементов |
| `className` | `string` | — | Дополнительный класс |
| `content` | `ReactNode` | — | Подзаголовок |
| `data-test-id` | `string` | — |  |
| `footer` | `ReactNode` | — | Вложенный контент (например ButtonGroup) |
| `icon` | `IconPredefinedProps` | — | Иконка |
| `size` | `"l"` \| `"m"` \| `"s"` | `m` | Размер |
| `title` | `string` | — | Заголовок |

#### Related types

- `Align` = `"horizontal"` \| `"vertical"`

- `Size` = `"l"` \| `"m"` \| `"s"`

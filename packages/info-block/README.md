# InfoBlock

`@ds/info-block` — Информационный блок — заголовок, описание, опциональные иконка и футер. Базовый строительный элемент для пустых состояний, подсказок и карточек.

Типовой блок информации: заголовок, описание, опциональные иконка и футер с действиями. Используется в пустых состояниях, онбординге, подсказках и хедерах разделов.

## Демо
<InfoBlockDemo client:visible />

## Когда использовать
- Пустое состояние списка/таблицы («Нет данных», «Ничего не найдено»).
- Подсказка внутри формы или карточки.
- Заголовок раздела с подзаголовком и кнопками действия.
- Информационная вставка над списком — например, объяснение статуса.

Когда **не** нужен: если нужен только заголовок без описания — возьмите `Typography`. Если нужна полноценная карточка с рамкой — возьмите компонент-карточку.

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
<Example title='Базовый блок' description='Заголовок и описание без иконки.' code={BasicSrc}>
  <Basic client:visible />
</Example>

<Example
  title='Горизонтальное выравнивание'
  description='Иконка и текст рядом, а не друг под другом.'
  code={HorizontalSrc}
>
  <Horizontal client:visible />
</Example>

<Example title='Три размера' code={SizesSrc}>
  <Sizes client:visible />
</Example>

<Example title='С иконкой' description='Иконка через проп icon (IconPredefinedProps).' code={WithIconSrc}>
  <WithIcon client:visible />
</Example>

## Props
<PropsTable data={infoBlockDoc.InfoBlock} />

## Storybook
<StorybookEmbed storyId='components-infoblock--playground' height={360} />

## InfoBlock

```tsx
import { InfoBlock } from '@ds/info-block'

export function Example() {
  return <InfoBlock align="vertical">Click me</InfoBlock>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `title` | `string` | — | Заголовок |
| `description` | `ReactNode` | — | Подзаголовок |
| `icon` | `IconPredefinedProps` | — | Иконка |
| `size` | `"s"` \| `"m"` \| `"l"` | `s` | Размер |
| `align` | `"vertical"` \| `"horizontal"` | `vertical` | Расположение элементов |
| `footer` | `ReactNode` | — | Вложенный контент (например ButtonGroup) |
| `className` | `string` | — | Дополнительный класс |

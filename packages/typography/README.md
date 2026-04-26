# Typography

`@ds/typography` — Универсальный текстовый компонент с едиными токенами стиля — variant / size / weight — и автовыбором семантического тега.

`Typography` — единая точка входа для любого текстового стиля. Комбинация `variant` × `size` × `weight` покрывает всю типографическую шкалу дизайн-системы; тег (`h1`/`h2`/`p`/`label`) выбирается автоматически и переопределяется через `as`.

## Когда использовать

- Любой текст в интерфейсе — заголовки, параграфы, подписи, метки.
- Вместо точечных CSS-классов на `font-size`/`font-weight`.

Когда **не** нужен `Typography`: для чистых UI-примитивов, где текст входит в состав компонента (например, `Button` label), — используйте встроенные пропсы компонента.

### Variant — смысловая роль текста

| Variant | Типичное применение | Тег по умолчанию |
|---------|---------------------|------------------|
| `display` | Главный экранный акцент — лендинги, hero | `h1` |
| `headline` | Заголовок раздела страницы | `h1` |
| `title` | Заголовок карточки / блока | `h2` |
| `label` | Метки форм, значений | `label` |
| `body` | Основной текст, параграфы | `p` |

### Size — размер

`s` / `m` / `l` — применяется ко всем вариантам. Выбирается в контексте: `display l` для hero, `body m` для параграфов, `label s` для подписей.

### Weight — начертание

`regular` (по умолчанию) / `thin` / `mono`. `mono` — моноширинный для кода и табличных данных.

### Do / Don't

- ✅ Один `headline` на секцию.
- ❌ Два `display` на одном экране — теряется иерархия.
- ✅ Используйте `as` только если автотег не подходит семантически.
- ❌ `as='div'` на заголовке — скринридеры пропустят его.

### Установка

```bash
pnpm add @ds/typography
```

```ts
import { Typography, VARIANT, SIZE, WEIGHT } from '@ds/typography'
import '@ds/typography/style.css'
```

### Примеры использования

<Example title='Базовое использование'>
  <Typography>Обычный body-текст по умолчанию</Typography>
</Example>

<Example title='Заголовок раздела'>
  <Typography variant='headline' size='l'>Заголовок страницы</Typography>
</Example>

<Example title='Моноширинный'>
  <Typography variant='body' weight='mono'>const answer = 42</Typography>
</Example>

<Example title='Кастомный тег (полиморфизм)'>
  <Typography as='span' variant='body'>Body внутри inline-потока</Typography>
</Example>

### Props

<PropsTable data={typographyDoc.Typography} />

### Storybook

<StorybookEmbed storyId='components-typography--playground' height={300} client:load />

## Доступность

- Автовыбор тега сохраняет правильную семантику: `display`/`headline` → `<h1>`, `title` → `<h2>`, `label` → `<label>`, `body` → `<p>`.
- Переопределяйте `as` только при обоснованной семантике — не ломайте иерархию заголовков на странице.
- Контраст текста на подложке — ответственность контейнера: компонент не задаёт цвет фона.

## Typography

```tsx
import { Typography } from '@ds/typography'

export function Example() {
  return <Typography variant="VARIANT.body" weight="WEIGHT.regular">Click me</Typography>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Дочерние элементы |
| `variant` | `"title"` \| `"display"` \| `"headline"` \| `"label"` \| `"body"` | `VARIANT.body` | Вариант типографики |
| `size` | `"s"` \| `"m"` \| `"l"` | `SIZE.m` | Размер типографики |
| `weight` | `"regular"` \| `"thin"` \| `"mono"` | `WEIGHT.regular` | Начертание шрифта |
| `as` | `ElementType` | — | HTML тег для рендеринга |
| `className` | `string` | — | CSS-класс |

# Avatar

`@ds/avatar` — Аватар пользователя с фото, инициалами, размерами и цветовыми схемами.

Компонент для отображения аватара: изображение по URL с fallback на инициалы из имени, несколько размеров и форм (круг / квадрат), палитра фонов.

## Демо
<AvatarDemo client:visible />

## Когда использовать
- Идентификатор пользователя в хедере, меню, списке участников.
- Автор комментария, сообщения, коммита.
- Плейсхолдер для отсутствующего фото — инициалы из имени.

Когда **не** нужен `Avatar`: если требуется декоративная иконка или логотип бренда — используйте обычный `<img>` или иконку.

### Size
Размерный ряд аватара: `xs`/`s` — для плотных списков и тулбаров, `m` — дефолт в рядах, `l` — карточки пользователей, `3xl`/`6xl`/`10xl` — крупные профили и пустые состояния.

### Shape
Форма контейнера: `round` — круглый (по умолчанию для людей), `square` — со скруглёнными углами (команды, организации, боты).

### Appearance
Цвет фона под инициалами. Помимо нейтральных `neutral`/`primary` есть декоративные `red`, `orange`, `yellow`, `green`, `blue`, `violet`, `pink` — используются для стабильной окраски по id пользователя, не несут семантики.

## Установка
```bash
pnpm add @ds/avatar
```

```ts
import { Avatar, APPEARANCE, SHAPE, SIZE } from '@ds/avatar'
```

## Примеры использования

<Example title='Инициалы из имени' description='Fallback на две первые буквы имени.' code={InitialsSrc}>
  <Initials client:visible />
</Example>

<Example title='С изображением' description='`src` + `name` для alt-текста и fallback.' code={WithImageSrc}>
  <WithImage client:visible />
</Example>

<Example title='Разные размеры' description='Размерный ряд от `xs` до `10xl`.' code={SizesSrc}>
  <Sizes client:visible />
</Example>

## Props
<PropsTable data={avatarDoc.Avatar} />

Принимает вспомогательные атрибуты `data-test-id` и ARIA через тип `WithSupportProps` из `@ds/utils`, а также стандартные атрибуты контейнера `HTMLDivElement`.

## Storybook
<StorybookEmbed storyId='components-avatar--playground' height={360} />

## Avatar

```tsx
import { Avatar } from '@ds/avatar'

export function Example() {
  return <Avatar appearance="neutral" shape="round">Click me</Avatar>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `name` | `string` | — | Имя пользователя для генерации аббревиатуры |
| `src` | `string` | — | URL изображения аватара |
| `appearance` | `"neutral"` \| `"primary"` \| `"red"` \| `"orange"` \| `"yellow"` \| `"green"` \| `"blue"` \| `"violet"` \| `"pink"` | `neutral` | Внешний вид (цвет) |
| `size` | `"xs"` \| `"s"` \| `"m"` \| `"l"` \| `"3xl"` \| `"6xl"` \| `"10xl"` | `s` | Размер |
| `shape` | `"round"` \| `"square"` | `round` | Форма: круглая или квадратная |
| `showTwoSymbols` | `boolean` | `false` | Отображение двух заглавных символов имени вместо одного |
| `className` | `string` | — | CSS-класс |

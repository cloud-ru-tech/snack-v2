# Avatar

`@ds/avatar` — Аватар пользователя с фото, инициалами, размерами и цветовыми схемами.

Компонент для отображения аватара: изображение по URL с fallback на инициалы из имени, несколько размеров и форм (круг / квадрат), палитра фонов.

## Когда использовать
- Идентификатор пользователя в хедере, меню, списке участников.
- Автор комментария, сообщения, коммита.
- Плейсхолдер для отсутствующего фото — инициалы из имени.

Когда **не** нужен `Avatar`: если требуется декоративная иконка или логотип бренда — используйте обычный `<img>` или иконку.

## Анатомия

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

### Инициалы из имени

Fallback на две первые буквы имени.

```tsx
import { Avatar } from '@ds/avatar';

export function Initials() {
  return <Avatar name='Иван Петров' />;
}
```

### С изображением

`src` + `name` для alt-текста и fallback.

```tsx
import { Avatar } from '@ds/avatar';

export function WithImage() {
  return <Avatar src='https://i.pravatar.cc/80?img=12' name='Анна Смирнова' />;
}
```

### Разные размеры

Размерный ряд от `xs` до `10xl`.

```tsx
import { Avatar } from '@ds/avatar';

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Avatar size='s' name='АС' />
      <Avatar size='m' name='АС' />
      <Avatar size='l' name='АС' />
    </div>
  );
}
```

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `appearance` | `"blue"` \| `"green"` \| `"neutral"` \| `"orange"` \| `"pink"` \| `"primary"` \| `"red"` \| `"violet"` \| `"yellow"` | `neutral` | Внешний вид (цвет) |
| `children` | `string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined` | — |  |
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — |  |
| `name` | `string` | — | Имя пользователя для генерации аббревиатуры |
| `shape` | `"round"` \| `"square"` | `round` | Форма: круглая или квадратная |
| `showTwoSymbols` | `boolean` | `false` | Отображение двух заглавных символов имени вместо одного |
| `size` | `"10xl"` \| `"3xl"` \| `"6xl"` \| `"l"` \| `"m"` \| `"s"` \| `"xs"` | `s` | Размер |
| `src` | `string` | — | URL изображения аватара |

Принимает вспомогательные атрибуты `data-test-id` и ARIA через тип `WithSupportProps` из `@ds/utils`, а также стандартные атрибуты контейнера `HTMLDivElement`.

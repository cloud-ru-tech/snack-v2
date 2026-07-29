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
Форма контейнера: `rounded` — круглый (по умолчанию для людей), `squared` — со скруглёнными углами (команды, организации, боты).

### Appearance
Цвет фона под инициалами. Помимо нейтральных `neutral`/`primary` есть декоративные `red`, `orange`, `yellow`, `green`, `blue`, `violet`, `pink` — используются для стабильной окраски по id пользователя, не несут семантики.

### Badge
Слот для микро-индикатора в правом-нижнем углу аватара. Принимает любой `ReactNode`:

- `StatusIndicator` — задаётся коротким пропом `status` (компонент сам подбирает размер).
- `Counter` — счётчик уведомлений.
- Иконка-«verified» / собственный микро-компонент — через `badge={<...>}`.

Для визуальной парности с дефолтным `StatusIndicator` бери размер из публичной карты `AVATAR_TO_STATUS_INDICATOR_SIZE[size]`.

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

### Кастомный badge-слот

Counter, иконка-«verified», `status` и ручной `StatusIndicator` в одном слоте.

```tsx
import { Avatar, AVATAR_TO_STATUS_INDICATOR_SIZE, SIZE } from '@ds/avatar';
import { Counter, SIZE as COUNTER_SIZE } from '@ds/counter';
import { CheckSVG } from '@ds/icons/interface/system';
import { APPEARANCE as STATUS_APPEARANCE, StatusIndicator } from '@ds/status';

import styles from './CustomBadge.module.scss';

export function CustomBadge() {
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
      <Avatar
        name='John Doe'
        size={SIZE['6Xl']}
        src='https://i.pravatar.cc/120?img=12'
        badge={<Counter value={5} size={COUNTER_SIZE.S} />}
      />

      <Avatar
        name='Jane Roe'
        size={SIZE['6Xl']}
        src='https://i.pravatar.cc/120?img=47'
        badge={
          <span className={styles.verified}>
            <CheckSVG size={16} />
          </span>
        }
      />

      <Avatar
        name='Alex Roe'
        size={SIZE['6Xl']}
        src='https://i.pravatar.cc/120?img=8'
        status={STATUS_APPEARANCE.Green}
      />

      <Avatar
        name='Mia Roe'
        size={SIZE['6Xl']}
        src='https://i.pravatar.cc/120?img=20'
        badge={
          <StatusIndicator size={AVATAR_TO_STATUS_INDICATOR_SIZE[SIZE['6Xl']]} appearance={STATUS_APPEARANCE.Red} />
        }
      />
    </div>
  );
}
```

## Props
**AvatarProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `appearance` | `"blue"` \| `"green"` \| `"neutral"` \| `"orange"` \| `"pink"` \| `"red"` \| `"violet"` \| `"yellow"` | `neutral` | Внешний вид (цвет) |
| `badge` | `ReactNode` | — | Произвольный нод в слот значка (правый-нижний угол). Перекрывает `status`. |
| `children` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — |  |
| `innerRef` | `Ref<HTMLDivElement>` | — | Ref на корневой DOM-элемент. <br/> Используем явный проп, чтобы не зависеть от `forwardRef` и не тащить type-assertions на экспорт. |
| `name` | `string` | — | Имя пользователя для генерации аббревиатуры |
| `shape` | `"rounded"` \| `"squared"` | `rounded` | Форма: круглая или квадратная |
| `showTwoSymbols` | `boolean` | `false` | Отображение двух заглавных символов имени вместо одного |
| `size` | `"3xl"` \| `"6xl"` \| `"9xl"` \| `"l"` \| `"m"` \| `"s"` \| `"xs"` | `m` | Размер |
| `src` | `string` | — | URL изображения аватара |
| `status` | `"blue"` \| `"green"` \| `"neutral"` \| `"orange"` \| `"pink"` \| `"red"` \| `"violet"` \| `"yellow"` | — | Appearance дефолтного `StatusIndicator` в правом-нижнем углу. Размер <br/> индикатора подбирается из `size` аватара автоматически. Полностью <br/> настроить значок можно через слот `badge`, который перекрывает `status`. |

#### Related types

- `Appearance` = `"blue"` \| `"green"` \| `"neutral"` \| `"orange"` \| `"pink"` \| `"red"` \| `"violet"` \| `"yellow"`

- `Shape` = `"rounded"` \| `"squared"`

- `Size` = `"3xl"` \| `"6xl"` \| `"9xl"` \| `"l"` \| `"m"` \| `"s"` \| `"xs"`

Принимает вспомогательные атрибуты `data-test-id` и ARIA через тип `WithSupportProps` из `@ds/utils`, а также стандартные атрибуты контейнера `HTMLDivElement`.

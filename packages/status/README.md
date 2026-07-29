# Status

`@ds/status` — Пакет статус-индикаторов — компоненты Status (подпись + маркер) и StatusIndicator (только маркер). Цветовая семантика состояний и поддержка loading/progress.

Пакет `@ds/status` содержит два компонента для отображения состояния сущности:

- ****Status**** — подпись с цветным маркером. Маркер может быть точкой, спиннером (`loading`) или круговым прогресс-баром (`progress`).
- ****StatusIndicator**** — только маркер-точка без текста: для мест, где подпись избыточна (иконка в таблице, badge на иконке).

## Установка

```bash
pnpm add @ds/status
```

```ts
import { Status, StatusIndicator } from '@ds/status'
```

## Status

Цветная метка состояния с подписью и маркером. Поддерживает loading-спиннер и progress-прогрессбар вместо точки.

Метка состояния с цветным маркером и текстовой подписью. Маркер — цветная точка, спиннер (`loading`) или круговой прогресс-бар (`progress`).

### Когда использовать
- Статус записи в списке / таблице: «Active», «Suspended», «Pending».
- Состояние асинхронной операции со спиннером (`loading`).
- Отображение прогресса обработки (`progress=0..100`) в компактном виде.

Когда **не** нужен: динамический чип с удалением — берите `Chip`/`Tag`. Промо-метка без функциональной семантики — берите `PromoTag`.

### Анатомия

#### Size
`xs` — для плотных таблиц и инлайновых меток, `s` — дефолт в карточках и заголовках.

#### Appearance
Семантический цвет: `neutral` — нейтральный, `green` — успех/активно, `red` — ошибка/критично, `orange`/`yellow` — предупреждение, `blue` — информация, `violet`/`pink` — декоративные.

### Примеры использования
#### Активный статус

```tsx
import { Status } from '@ds/status';

export function Active() {
  return <Status label='Active' appearance='green' />;
}
```

#### Loading

Спиннер вместо точки, appearance принудительно neutral.

```tsx
import { Status } from '@ds/status';

export function Loading() {
  return <Status label='Processing' loading />;
}
```

#### С фоном

background — визуально выделяет строку.

```tsx
import { Status } from '@ds/status';

export function WithBackground() {
  return <Status label='Error' appearance='red' background />;
}
```

### Props
**StatusProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `appearance` | `"blue"` \| `"green"` \| `"neutral"` \| `"orange"` \| `"pink"` \| `"red"` \| `"violet"` \| `"yellow"` | `neutral` | Внешний вид (цветовая схема) |
| `background` | `boolean` | `false` | Наличие фона |
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — |  |
| `innerRef` | `Ref<HTMLDivElement>` | — | Ref на корневой DOM-элемент. <br/> Используем явный проп, чтобы не зависеть от `forwardRef` и не тащить type-assertions на экспорт. |
| `label` | `string` | — | Подпись к индикатору (точка с текстом). Если не передано — только точка |
| `loading` | `boolean` | `false` | Состояние загрузки |
| `progress` | `number` | — | Прогресс загрузки (от 0 до 100) |
| `size` | `"s"` \| `"xs"` | `s` | Размер индикатора и подписи |

##### Related types

- `Appearance` = `"blue"` \| `"green"` \| `"neutral"` \| `"orange"` \| `"pink"` \| `"red"` \| `"violet"` \| `"yellow"`

- `StatusSize` = `"s"` \| `"xs"`

## StatusIndicator

Цветной маркер-точка без подписи — для мест, где текст избыточен (иконка в таблице, badge на аватаре).

Минимальный маркер-точка без подписи. Пять размеров (`4xs` → `s`) и восемь цветовых схем. Используется, когда пространства для текста нет — колонка таблицы, badge на иконке, inline-маркер в списке.

### Когда использовать
- Колонка «Статус» в плотной таблице — только цветная точка.
- Badge-индикатор на аватаре или иконке (онлайн, новое событие).
- Inline-маркер перед текстом в самописных лейаутах.

Когда **не** нужен: если пользователю нужно прочитать статус — берите `Status` с подписью. Цвет без текста недоступен дальтоникам и скринридерам.

### Анатомия

#### Size
Набор размеров от `4xs` (точка в плотных списках) до `s` (в заголовках): `4xs`, `3xs`, `2xs`, `xs`, `s`.

#### Appearance
Семантический цвет индикатора: `neutral`, `green` (успех), `red` (ошибка), `orange`/`yellow` (предупреждение), `blue` (инфо), `violet`/`pink` (декоративные).

### Примеры использования
#### Базовый индикатор

```tsx
import { StatusIndicator } from '@ds/status';

export function BasicIndicator() {
  return <StatusIndicator size='xs' appearance='green' />;
}
```

### Props
**StatusIndicatorProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `appearance` | `"blue"` \| `"green"` \| `"neutral"` \| `"orange"` \| `"pink"` \| `"red"` \| `"violet"` \| `"yellow"` | `neutral` | Внешний вид |
| `className` | `string` | — |  |
| `data-test-id` | `string` | — |  |
| `innerRef` | `Ref<HTMLDivElement>` | — | Ref на корневой DOM-элемент. <br/> Используем явный проп, чтобы не зависеть от `forwardRef` и не тащить type-assertions на экспорт. |
| `size` | `"2xs"` \| `"3xs"` \| `"4xs"` \| `"s"` \| `"xs"` | `s` | Размер |

##### Related types

- `Appearance` = `"blue"` \| `"green"` \| `"neutral"` \| `"orange"` \| `"pink"` \| `"red"` \| `"violet"` \| `"yellow"`

- `StatusIndicatorSize` = `"2xs"` \| `"3xs"` \| `"4xs"` \| `"s"` \| `"xs"`

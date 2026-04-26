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

## Демо
<StatusDemo client:visible />

## Когда использовать
- Статус записи в списке / таблице: «Active», «Suspended», «Pending».
- Состояние асинхронной операции со спиннером (`loading`).
- Отображение прогресса обработки (`progress=0..100`) в компактном виде.

Когда **не** нужен: динамический чип с удалением — берите `Chip`/`Tag`. Промо-метка без функциональной семантики — берите `PromoTag`.

## Установка
```bash
pnpm add @ds/status
```

```ts
import { Status } from '@ds/status'
```

## Примеры использования
<Example title='Активный статус' code={ActiveSrc}>
  <Active client:visible />
</Example>

<Example title='Loading' description='Спиннер вместо точки, appearance принудительно neutral.' code={LoadingSrc}>
  <Loading client:visible />
</Example>

<Example title='С фоном' description='hasBackground — визуально выделяет строку.' code={WithBackgroundSrc}>
  <WithBackground client:visible />
</Example>

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `label` | `string` | — | Подпись к индикатору (точка с текстом). Если не передано — только точка |
| `size` | `"xs"` \| `"s"` | `xs` | Размер индикатора и подписи |
| `appearance` | `"neutral"` \| `"red"` \| `"orange"` \| `"yellow"` \| `"green"` \| `"blue"` \| `"violet"` \| `"pink"` | `neutral` | Внешний вид (цветовая схема) |
| `className` | `string` | — | CSS-класс |
| `hasBackground` | `boolean` | `false` | Наличие фона |
| `loading` | `boolean` | `false` | Состояние загрузки |
| `progress` | `number` | — | Прогресс загрузки (от 0 до 100) |

## Storybook
<StorybookEmbed storyId='components-status-status--playground' height={240} />

## Анатомия

### Size
`xs` — для плотных таблиц и инлайновых меток, `s` — дефолт в карточках и заголовках.

### Appearance
Семантический цвет: `neutral` — нейтральный, `green` — успех/активно, `red` — ошибка/критично, `orange`/`yellow` — предупреждение, `blue` — информация, `violet`/`pink` — декоративные.

## StatusIndicator

Цветной маркер-точка без подписи — для мест, где текст избыточен (иконка в таблице, badge на аватаре).

Минимальный маркер-точка без подписи. Пять размеров (`4xs` → `s`) и восемь цветовых схем. Используется, когда пространства для текста нет — колонка таблицы, badge на иконке, inline-маркер в списке.

## Демо
<StatusIndicatorDemo client:visible />

## Когда использовать
- Колонка «Статус» в плотной таблице — только цветная точка.
- Badge-индикатор на аватаре или иконке (онлайн, новое событие).
- Inline-маркер перед текстом в самописных лейаутах.

Когда **не** нужен: если пользователю нужно прочитать статус — берите `Status` с подписью. Цвет без текста недоступен дальтоникам и скринридерам.

## Установка
```bash
pnpm add @ds/status
```

```ts
import { StatusIndicator } from '@ds/status'
```

## Примеры использования
<Example title='Базовый индикатор' code={BasicIndicatorSrc}>
  <BasicIndicator client:visible />
</Example>

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `size` | `"4xs"` \| `"3xs"` \| `"2xs"` \| `"xs"` \| `"s"` | `s` | Размер |
| `appearance` | `"neutral"` \| `"red"` \| `"orange"` \| `"yellow"` \| `"green"` \| `"blue"` \| `"violet"` \| `"pink"` | `neutral` | Внешний вид |
| `className` | `string` | — |  |

## Storybook
<StorybookEmbed storyId='components-status-statusindicator--playground' height={200} />

## Анатомия

### Size
Набор размеров от `4xs` (точка в плотных списках) до `s` (в заголовках): `4xs`, `3xs`, `2xs`, `xs`, `s`.

### Appearance
Семантический цвет индикатора: `neutral`, `green` (успех), `red` (ошибка), `orange`/`yellow` (предупреждение), `blue` (инфо), `violet`/`pink` (декоративные).

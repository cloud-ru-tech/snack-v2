# ProgressBar

`@ds/progress-bar` — Пакет индикаторов прогресса дизайн-системы — линейный ProgressBar, круговой ProgressBarCircle и верхний page-индикатор ProgressBarPage.

Пакет `@ds/progress-bar` предоставляет три компонента для отображения хода длительных операций и загрузки страниц: линейный, круговой и page-индикатор поверх layout'а.

## Состав пакета

- ****ProgressBar**** — линейный детерминированный индикатор. Показывает явный процент от 0 до 100.
- ****ProgressBarCircle**** — круговой детерминированный индикатор. Используется в компактных местах: карточках, таблицах, тулбарах.
- ****ProgressBarPage**** — неопределённый индикатор загрузки поверх страницы. Автоматически растёт, пока `inProgress=true`, и исчезает после завершения.

## Установка

```bash
pnpm add @ds/progress-bar
```

```ts
import { ProgressBar, ProgressBarCircle, ProgressBarPage } from '@ds/progress-bar'
import '@ds/progress-bar/style.css'
```

## Когда какой использовать

| Задача 

## Общие принципы

- **Показывайте число, если знаете его.** `ProgressBar` и `ProgressBarCircle` всегда детерминированные — значение `progress` от 0 до 100.
- **Цвет `appearance` — семантический.** `primary` по умолчанию, `red` для критических операций, `green` для успеха. Не используйте цвет ради декорации.
- **Один page-индикатор на экран.** `ProgressBarPage` живёт на уровне layout — дублировать его внутри страниц не нужно.
- **ARIA из коробки.** Компоненты рендерятся с `role="progressbar"` и `aria-valuenow/min/max`. Скринридеры читают прогресс без доработки.

## ProgressBar

Линейный детерминированный индикатор прогресса — размеры xs/s и девять appearance.

Линейный детерминированный индикатор. Используется для отображения явного хода операции в диапазоне от 0 до 100 процентов.

## Демо

## Когда использовать

- Загрузка файла, экспорт, импорт с известным прогрессом.
- Пошаговые формы и wizard'ы — процент заполнения.
- Длительные операции, где пользователь ждёт явного завершения.

Когда **не** нужен `ProgressBar`: для неопределённой загрузки страницы используйте [`ProgressBarPage`](/components/progress-bar/progress-bar-page); для компактных мест в таблицах и карточках — [`ProgressBarCircle`](/components/progress-bar/progress-bar-circle).

## Для дизайнеров

### Appearance — семантика цвета

| Appearance | Когда использовать |
|-----------|---------------------|
| `primary` | Стандартный прогресс, по умолчанию |
| `green` | Успешное завершение, позитивный прогресс |
| `red` | Ошибка, критическая операция |
| `orange` / `yellow` | Предупреждение, внимание |
| `blue` / `violet` / `pink` | Декоративные темы категорий |
| `neutral` | Нейтральный прогресс без акцента |

<Example
  title='Три appearance в ряд'
  description='Основные семантические роли'
  code={AppearancesSrc}
>
  <Appearances client:load />
</Example>

### Size — плотность

| Size | Высота | Сценарий |
|------|--------|----------|
| `xs` | 2px | Компактно — поверх контента, в карточках |
| `s` | 4px | Основной размер формы или диалога |

<Example title='Два размера' code={SizesSrc}>
  <Sizes client:load />
</Example>

### Do / Don't

- ✅ Показывайте цифру рядом с индикатором, если пользователь её ждёт («42%»).
- ❌ Не используйте `ProgressBar` как декоративную линию — у него семантика прогресса.
- ✅ Меняйте `appearance` только при изменении статуса (`primary` → `green` при успехе).
- ❌ Не мигайте цветом на каждом обновлении — это сбивает восприятие.

## Для разработчиков

### Установка

```bash
pnpm add @ds/progress-bar
```

```ts
import { ProgressBar } from '@ds/progress-bar'
import '@ds/progress-bar/style.css'
```

### Примеры использования

<Example
  title='Статическое значение'
  description='Фиксированный прогресс 40%'
  code={`import { ProgressBar } from '@ds/progress-bar'\n\nexport function Example() {\n  return <ProgressBar progress={40} />\n}`}
>
  <ProgressBar progress={40} />
</Example>

<Example
  title='Анимированный прогресс'
  description='Значение обновляется в useEffect — компонент плавно догоняет'
  code={AnimatedProgressSrc}
>
  <AnimatedProgress client:load />
</Example>

### States

- **0%** — пустой контейнер без заполнителя, индикатор виден как фон.
- **100%** — заполнитель занимает всю ширину, `aria-valuenow=100`.
- Значения вне диапазона (отрицательные, > 100) безопасно clamp'ятся до `[0, 100]`.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `progress` | `number` | — | Процент загрузки от 0 до 100 |
| `size` | `"s"` \| `"xs"` | `xs` | Размер |
| `appearance` | `"neutral"` \| `"primary"` \| `"red"` \| `"orange"` \| `"yellow"` \| `"green"` \| `"blue"` \| `"violet"` \| `"pink"` | — | Внешний вид |
| `className` | `string` | — | CSS-класс |

### Storybook

<StorybookEmbed storyId='components-progressbar-progressbar--playground' height={360} />

## Доступность

- `role="progressbar"` на элементе-заполнителе.
- `aria-valuenow` отражает текущий процент, `aria-valuemin=0`, `aria-valuemax=100`.
- Цвет `appearance` не является единственным носителем смысла — дублируйте статус текстом («Загружено 42%», «Ошибка»).
- Для длительных операций добавляйте live-region со статусом рядом: скринридеры не озвучивают изменения `aria-valuenow` автоматически.

## ProgressBarCircle

Круговой детерминированный индикатор прогресса для компактных мест — карточек, таблиц, тулбаров.

Круговой детерминированный индикатор. Занимает минимум места и хорошо читается в плотных интерфейсах — рядом с аватаром при upload, в ячейке таблицы, в карточке файла.

## Демо

## Когда использовать

- Индикатор загрузки рядом с аватаром или миниатюрой.
- Прогресс в ячейках таблицы или в списке файлов.
- Там, где линейный индикатор слишком широкий.

Когда **не** нужен `ProgressBarCircle`: если есть горизонтальное место и вы хотите показать явный процент рядом — возьмите линейный [`ProgressBar`](/components/progress-bar/progress-bar).

## Для дизайнеров

### Appearance — семантика цвета

Набор `appearance` совпадает с [`ProgressBar`](/components/progress-bar/progress-bar#appearance--семантика-цвета).

<Example
  title='Три appearance'
  description='Primary, успех и ошибка'
  code={CircleAppearancesSrc}
>
  <CircleAppearances client:load />
</Example>

### Size — плотность

| Size | Диаметр | Сценарий |
|------|---------|----------|
| `xs` | 16px | Внутри ячеек таблицы, рядом с меткой |
| `s` | 24px | На карточках файлов, на аватарах |

### Do / Don't

- ✅ Используйте, когда места для линейного индикатора нет.
- ❌ Не используйте как spinner — `ProgressBarCircle` всегда детерминированный.
- ✅ Помещайте индикатор рядом с объектом, к которому он относится (файл, аватар).
- ❌ Не ставьте круговой индикатор в широкий горизонтальный контейнер — возьмите `ProgressBar`.

## Для разработчиков

### Установка

```bash
pnpm add @ds/progress-bar
```

```ts
import { ProgressBarCircle } from '@ds/progress-bar'
import '@ds/progress-bar/style.css'
```

### Примеры использования

<Example
  title='Значение 75%'
  code={`import { ProgressBarCircle } from '@ds/progress-bar'\n\nexport function Example() {\n  return <ProgressBarCircle progress={75} />\n}`}
>
  <ProgressBarCircle progress={75} />
</Example>

### States

- **0%** — кольцо видно полностью как фон, заполнения нет.
- **100%** — кольцо полностью заполнено цветом `appearance`.
- Значения вне диапазона clamp'ятся до `[0, 100]`.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `progress` | `number` | — | Процент загрузки от 0 до 100 |
| `size` | `"s"` \| `"xs"` | `xs` | Размер |
| `appearance` | `"neutral"` \| `"primary"` \| `"red"` \| `"orange"` \| `"yellow"` \| `"green"` \| `"blue"` \| `"violet"` \| `"pink"` | `primary` | Внешний вид |
| `className` | `string` | — | CSS-класс |

### Storybook

<StorybookEmbed storyId='components-progressbar-progressbarcircle--playground' height={360} />

## Доступность

- `role="progressbar"` + `aria-valuenow/min/max` — идентично линейному `ProgressBar`.
- Цвет не единственный носитель статуса — дублируйте текстом рядом или `aria-label`.
- Компонент визуально мелкий — следите за контрастом токенов: `appearance="yellow"` на светлом фоне требует проверки.

## ProgressBarPage

Неопределённый индикатор загрузки страницы — автоматически растёт, пока inProgress=true, и исчезает после завершения.

Тонкая полоска-индикатор в верхней части страницы. Похожа на классический nprogress — не знает настоящего процента, но создаёт ощущение движения для пользователя во время навигации или длительной загрузки.

## Демо

## Когда использовать

- Индикация навигации между страницами (роутинг SPA).
- Длительная загрузка данных без детерминированного прогресса.
- Глобальный busy-индикатор уровня layout'а.

Когда **не** нужен `ProgressBarPage`: если известен реальный процент — используйте детерминированный [`ProgressBar`](/components/progress-bar/progress-bar). Не показывайте `ProgressBarPage` для быстрых операций (< 200 мс) — это отвлекает.

## Для дизайнеров

### Поведение

- После включения (`inProgress=true`) индикатор плавно растёт от `minimum` к 100%.
- После выключения (`inProgress=false`) — доезжает до 100% и исчезает.
- `animationDuration` задаёт скорость анимации, `incrementDuration` — интервал между автошагами прироста.

### Do / Don't

- ✅ Располагайте один `ProgressBarPage` в корневом layout'е.
- ❌ Не дублируйте внутри страниц — получится несколько полос сразу.
- ✅ Включайте на старте роутинга, выключайте после готовности данных.
- ❌ Не показывайте ради операций < 200 мс — вспышка раздражает.

## Для разработчиков

### Установка

```bash
pnpm add @ds/progress-bar
```

```ts
import { ProgressBarPage } from '@ds/progress-bar'
import '@ds/progress-bar/style.css'
```

### Примеры использования

<Example
  title='Переключение inProgress'
  description='Живой сценарий — запустите и остановите загрузку'
  code={PageToggleSrc}
>
  <PageToggle client:load />
</Example>

### States

- `inProgress=false` — компонент скрыт (после анимации завершения).
- `inProgress=true` — индикатор виден и автоматически растёт.
- `minimum` задаёт стартовое значение прогресса (от 0 до 1) — чтобы полоса не начиналась с нуля.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `appearance` | `"neutral"` \| `"primary"` \| `"red"` \| `"orange"` \| `"yellow"` \| `"green"` \| `"blue"` \| `"violet"` \| `"pink"` | — | Внешний вид |
| `className` | `string` | — | CSS-класс |
| `animationDuration` | `number` | `200` | Скорость анимации |
| `inProgress` | `boolean` | — | Включен/выключен |
| `incrementDuration` | `number` | `800` | Время между прогрессом |
| `minimum` | `number` | — | Минимальное значение прогресс бара от 0 до 1 |

### Storybook

<StorybookEmbed storyId='components-progressbar-progressbarpage--playground' height={360} />

## Доступность

- Как и другие компоненты пакета, `ProgressBarPage` рендерит `role="progressbar"`.
- Для неопределённой загрузки скринридеры получают монотонно растущее значение `aria-valuenow` — это соответствует semantic'е «операция идёт».
- Добавляйте live-region с описанием операции («Загрузка страницы…»), если индикатор — единственный признак изменения состояния.

## ProgressBarPrivate

```tsx
import { ProgressBarPrivate } from '@ds/progress-bar'

export function Example() {
  return <ProgressBarPrivate appearance="primary" animationDuration="0">Click me</ProgressBarPrivate>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `progress` | `number` | — | Процент загрузки от 0 до 100 |
| `size` | `"s"` \| `"xs"` | — | Размер |
| `appearance` | `"neutral"` \| `"primary"` \| `"red"` \| `"orange"` \| `"yellow"` \| `"green"` \| `"blue"` \| `"violet"` \| `"pink"` | `primary` | Внешний вид |
| `className` | `string` | — | CSS-класс |
| `animationDuration` | `number` | `0` | Скорость анимации |

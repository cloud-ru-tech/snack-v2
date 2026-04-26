# ProgressBar

`@ds/progress-bar` — Пакет индикаторов прогресса дизайн-системы — линейный ProgressBar, круговой ProgressBarCircle и верхний page-индикатор ProgressBarPage.

Пакет `@ds/progress-bar` предоставляет три компонента для отображения хода длительных операций и загрузки страниц: линейный, круговой и page-индикатор поверх layout'а.

- ****ProgressBar**** — линейный детерминированный индикатор. Показывает явный процент от 0 до 100.
- ****ProgressBarCircle**** — круговой детерминированный индикатор. Используется в компактных местах: карточках, таблицах, тулбарах.
- ****ProgressBarPage**** — неопределённый индикатор загрузки поверх страницы. Автоматически растёт, пока `inProgress=true`, и исчезает после завершения.

## Установка

```bash
pnpm add @ds/progress-bar
```

```ts
import { ProgressBar, ProgressBarCircle, ProgressBarPage } from '@ds/progress-bar'
```

## ProgressBar

Линейный детерминированный индикатор прогресса — размеры xs/s и девять appearance.

Линейный детерминированный индикатор. Используется для отображения явного хода операции в диапазоне от 0 до 100 процентов.

## Демо
<ProgressBarDemo client:visible />

## Когда использовать
- Загрузка файла, экспорт, импорт с известным прогрессом.
- Пошаговые формы и wizard'ы — процент заполнения.
- Длительные операции, где пользователь ждёт явного завершения.

Когда **не** нужен `ProgressBar`: для неопределённой загрузки страницы используйте [`ProgressBarPage`](/components/progress-bar/progress-bar-page); для компактных мест в таблицах и карточках — [`ProgressBarCircle`](/components/progress-bar/progress-bar-circle).

## Анатомия

### Size
`xs` — дефолт, тонкая полоса под контролом или в строке таблицы; `s` — более заметный прогресс в карточках и формах.

## Установка
```bash
pnpm add @ds/progress-bar
```

```ts
import { ProgressBar } from '@ds/progress-bar'
```

## Примеры использования
<Example
  title='Статическое значение'
  description='Фиксированный прогресс 40%'
  code={StaticSrc}
>
  <Static client:visible />
</Example>

<Example
  title='Анимированный прогресс'
  description='Значение обновляется в useEffect — компонент плавно догоняет'
  code={AnimatedProgressSrc}
>
  <AnimatedProgress client:visible />
</Example>

<Example
  title='Три appearance в ряд'
  description='Основные семантические роли'
  code={AppearancesSrc}
>
  <Appearances client:visible />
</Example>

<Example title='Два размера' code={SizesSrc}>
  <Sizes client:visible />
</Example>

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `progress` | `number` | — | Процент загрузки от 0 до 100 |
| `size` | `"s"` \| `"xs"` | `xs` | Размер |
| `appearance` | `"neutral"` \| `"primary"` \| `"red"` \| `"orange"` \| `"yellow"` \| `"green"` \| `"blue"` \| `"violet"` \| `"pink"` | — | Внешний вид |
| `className` | `string` | — | CSS-класс |

## Storybook
<StorybookEmbed storyId='components-progressbar-progressbar--playground' height={360} />

## ProgressBarCircle

Круговой детерминированный индикатор прогресса для компактных мест — карточек, таблиц, тулбаров.

Круговой детерминированный индикатор. Занимает минимум места и хорошо читается в плотных интерфейсах — рядом с аватаром при upload, в ячейке таблицы, в карточке файла.

## Демо
<ProgressBarCircleDemo client:visible />

## Когда использовать
- Индикатор загрузки рядом с аватаром или миниатюрой.
- Прогресс в ячейках таблицы или в списке файлов.
- Там, где линейный индикатор слишком широкий.

Когда **не** нужен `ProgressBarCircle`: если есть горизонтальное место и вы хотите показать явный процент рядом — возьмите линейный [`ProgressBar`](/components/progress-bar/progress-bar).

## Анатомия

### Size
`xs` — дефолт, для ячеек таблиц и плотных списков; `s` — для карточек и более заметных мест.

### Appearance
Семантика цвета заполненной дуги: `primary` — бренд/нейтральный; `red` — ошибка/превышение лимита; `orange`/`yellow` — предупреждение; `green` — успех; `blue`, `violet`, `pink` — декоративные категории.

## Установка
```bash
pnpm add @ds/progress-bar
```

```ts
import { ProgressBarCircle } from '@ds/progress-bar'
```

## Примеры использования
<Example
  title='Значение 75%'
  code={CircleStaticSrc}
>
  <CircleStatic client:visible />
</Example>

<Example
  title='Три appearance'
  description='Primary, успех и ошибка'
  code={CircleAppearancesSrc}
>
  <CircleAppearances client:visible />
</Example>

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `progress` | `number` | — | Процент загрузки от 0 до 100 |
| `size` | `"s"` \| `"xs"` | `xs` | Размер |
| `appearance` | `"neutral"` \| `"primary"` \| `"red"` \| `"orange"` \| `"yellow"` \| `"green"` \| `"blue"` \| `"violet"` \| `"pink"` | `primary` | Внешний вид |
| `className` | `string` | — | CSS-класс |

## Storybook
<StorybookEmbed storyId='components-progressbar-progressbarcircle--playground' height={360} />

## ProgressBarPage

Неопределённый индикатор загрузки страницы — автоматически растёт, пока inProgress=true, и исчезает после завершения.

Тонкая полоска-индикатор в верхней части страницы. Похожа на классический nprogress — не знает настоящего процента, но создаёт ощущение движения для пользователя во время навигации или длительной загрузки.

## Демо
<ProgressBarPageDemo client:visible />

## Когда использовать
- Индикация навигации между страницами (роутинг SPA).
- Длительная загрузка данных без детерминированного прогресса.
- Глобальный busy-индикатор уровня layout'а.

Когда **не** нужен `ProgressBarPage`: если известен реальный процент — используйте детерминированный [`ProgressBar`](/components/progress-bar/progress-bar). Не показывайте `ProgressBarPage` для быстрых операций (< 200 мс) — это отвлекает.

## Установка
```bash
pnpm add @ds/progress-bar
```

```ts
import { ProgressBarPage } from '@ds/progress-bar'
```

## Примеры использования
<Example
  title='Переключение inProgress'
  description='Живой сценарий — запустите и остановите загрузку'
  code={PageToggleSrc}
>
  <PageToggle client:visible />
</Example>

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `appearance` | `"neutral"` \| `"primary"` \| `"red"` \| `"orange"` \| `"yellow"` \| `"green"` \| `"blue"` \| `"violet"` \| `"pink"` | — | Внешний вид |
| `className` | `string` | — | CSS-класс |
| `animationDuration` | `number` | `200` | Скорость анимации |
| `inProgress` | `boolean` | — | Включен/выключен |
| `incrementDuration` | `number` | `800` | Время между прогрессом |
| `minimum` | `number` | — | Минимальное значение прогресс бара от 0 до 1 |

## Storybook
<StorybookEmbed storyId='components-progressbar-progressbarpage--playground' height={360} />

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

# Stepper

`@ds/stepper` — Индикатор прогресса для многошаговых сценариев — desktop, mobile и адаптивный варианты с единым render-prop API.

Пакет `@ds/stepper` предоставляет индикатор прогресса для многошаговых сценариев. Все варианты используют единый render-prop API и общую модель состояний шагов.

- ****Stepper**** — десктопный горизонтальный индикатор шагов.
- ****MobileStepper**** — компактный индикатор для мобильных экранов.
- ****AdaptiveStepper**** — автоматически переключается между desktop и mobile по viewport.

## Установка

```bash
pnpm add @ds/stepper
```

```ts
import { Stepper, MobileStepper, AdaptiveStepper } from '@ds/stepper'
```

## Stepper

Десктопный степпер — горизонтальный ряд шагов с номером, заголовком и описанием.

Десктопный степпер — горизонтальный список шагов с номером, заголовком и (опционально) описанием. Управляется через render-prop, поддерживает controlled и uncontrolled режимы.

## Когда использовать

- Многошаговые desktop-формы, где пользователю важно видеть описание каждого шага.
- Процессы с валидацией между шагами (submit → backend check → next).

## Установка

```bash
pnpm add @ds/stepper
```

```ts
import { Stepper } from '@ds/stepper'
```

## Примеры использования

<Example title='Базовый flow' description='Три шага с Next/Prev' code={BasicFlowSrc}>
  <BasicFlow client:visible />
</Example>

<Example title='С валидатором' description='Первая попытка реджектится, вторая проходит' code={WithValidatorSrc}>
  <WithValidator client:visible />
</Example>

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `steps` | `StepData[]` | — | Массив шагов |
| `defaultCurrentStepIndex` | `number` | `0` | Индекс текущего шага по-дефолту |
| `validator` | `StepsValidator` | — | Валидатор шагов. Выполняется при смене шага. Принимает первым аргументом индекс текущего, вторым — индекс нового шага. Возвращает Promise<boolean>: false → шаг помечается как Rejected. |
| `className` | `string` | — | CSS-класс |
| `children` | `(params: StepperApi) => ReactElement<any, string | JSXElementConstructor<any>>` | — | Render function. Принимает `stepper` — JSX-элемент степпера, а также api:
`goNext`, `goPrev`, `resetValidation`, `setValidator`, `isCompleted`,
`currentStepIndex`, `stepCount`. |
| `onChangeCurrentStep` | `((newValue: number, prevValue: number) => void)` | — | Колбек смены текущего степа |
| `onCompleteChange` | `((isCompleted: boolean) => void)` | — | Колбек изменения завершённости |
| `data-test-id` | `string` | — | data-test-id |

## Storybook

<StorybookEmbed storyId='components-stepper--basicflow' />

## Анатомия

### Step state
Состояние шага: `completed` — пройден, `current` — текущий, `loading` — в процессе, `waiting` — ещё не пройден, `rejected` — отклонён/ошибка.

### Layout type
Раскладка: `desktop` — горизонтальная с подписями, `mobile` — компактная вертикальная.

## MobileStepper

Мобильный степпер — тонкий прогресс-трек с заголовком активного шага.

Мобильный вариант степпера. Занимает меньше по высоте: вместо ряда карточек — прогресс-трек и заголовок активного шага. API идентично `Stepper`, поэтому render-prop и валидатор работают так же.

## Примеры использования

<Example title='Мобильный flow' description='Три шага с заголовками и описаниями' code={MobileFlowSrc}>
  <MobileFlow client:visible />
</Example>

## Когда использовать

- Когда у пользователя заведомо узкий экран (< 640 px).
- В мобильном web-flow и внутри bottom-sheet'ов.
- Когда desktop-вариант конкурирует с остальным контентом за место по высоте.

Для автоматического переключения между desktop и mobile используйте [`AdaptiveStepper`](/components/stepper/adaptive-stepper).

## Установка

```bash
pnpm add @ds/stepper
```

```ts
import { MobileStepper } from '@ds/stepper'
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `steps` | `StepData[]` | — | Массив шагов |
| `defaultCurrentStepIndex` | `number` | `0` | Индекс текущего шага по-дефолту |
| `validator` | `StepsValidator` | — | Валидатор шагов. Выполняется при смене шага. Принимает первым аргументом индекс текущего, вторым — индекс нового шага. |
| `className` | `string` | — | CSS-класс |
| `children` | `(params: StepperApi) => ReactElement<any, string | JSXElementConstructor<any>>` | — | Render function. Принимает `stepper` и api:
`goNext`, `goPrev`, `resetValidation`, `setValidator`, `isCompleted`,
`currentStepIndex`, `stepCount`. |
| `onChangeCurrentStep` | `((newValue: number, prevValue: number) => void)` | — | Колбек смены текущего степа |
| `onCompleteChange` | `((isCompleted: boolean) => void)` | — | Колбек изменения завершённости |
| `data-test-id` | `string` | — | data-test-id |

## Storybook

<StorybookEmbed storyId='components-stepper--mobile' />

## Анатомия

### Step state
Состояние шага: `completed` — пройден, `current` — текущий, `loading` — в процессе, `waiting` — ещё не пройден, `rejected` — отклонён/ошибка.

## AdaptiveStepper

Адаптивный степпер — переключает desktop и mobile варианты через проп layoutType.

Адаптивная обёртка, которая по пропу `layoutType` отрисовывает либо `Stepper`, либо `MobileStepper`. Удобна, когда решение о layout'е принимается выше по дереву — например, через media-query-хук или feature-flag.

## Примеры использования

<Example title='Переключение layout' description='Toggle между desktop и mobile' code={AdaptiveFlowSrc}>
  <AdaptiveFlow client:visible />
</Example>

## Когда использовать

- Когда точка переключения между вариантами известна заранее (например, из хука, читающего viewport).
- Когда вы не хотите дублировать вызов Stepper / MobileStepper по условию в каждом месте использования.

Если адаптив не нужен — используйте [`Stepper`](/components/stepper/stepper) или [`MobileStepper`](/components/stepper/mobile-stepper) напрямую.

## Установка

```bash
pnpm add @ds/stepper
```

```ts
import { AdaptiveStepper } from '@ds/stepper'
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `steps` | `StepData[]` | — | Массив шагов |
| `defaultCurrentStepIndex` | `number` | — | Индекс текущего шага по-дефолту |
| `validator` | `StepsValidator` | — | Валидатор шагов. Выполняется при смене шага. Принимает первым аргументом индекс текущего, вторым — индекс нового шага. Возвращает Promise<boolean>: false → шаг помечается как Rejected. |
| `className` | `string` | — | CSS-класс |
| `children` | `(params: StepperApi) => ReactElement<any, string | JSXElementConstructor<any>>` | — | Render function. Принимает `stepper` — JSX-элемент степпера, а также api:
`goNext`, `goPrev`, `resetValidation`, `setValidator`, `isCompleted`,
`currentStepIndex`, `stepCount`. |
| `onChangeCurrentStep` | `((newValue: number, prevValue: number) => void)` | — | Колбек смены текущего степа |
| `onCompleteChange` | `((isCompleted: boolean) => void)` | — | Колбек изменения завершённости |
| `data-test-id` | `string` | — | data-test-id |
| `layoutType` | `"desktop"` \| `"mobile"` | — | Режим отображения: desktop (по-умолчанию) или mobile |

## Storybook

<StorybookEmbed storyId='components-stepper--adaptive' />

## Анатомия

### Step state
Состояние шага: `completed`, `current`, `loading`, `waiting`, `rejected`. Раскладка (desktop/mobile) выбирается автоматически по ширине контейнера.

## DesktopStep

```tsx
import { DesktopStep } from '@ds/stepper'

export function Example() {
  return <DesktopStep>Click me</DesktopStep>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `hideTailLine` | `boolean` | — | Скрыть хвост (соединительную линию) — для последнего шага |
| `step` | `StepViewData` | — | Данные шага для отображения |
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — | data-test-id |

## MobileStep

```tsx
import { MobileStep } from '@ds/stepper'

export function Example() {
  return <MobileStep>Click me</MobileStep>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `step` | `StepViewData` | — | Данные шага для отображения |
| `data-test-id` | `string` | — | data-test-id |

## StepIcon

```tsx
import { StepIcon } from '@ds/stepper'

export function Example() {
  return <StepIcon>Click me</StepIcon>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `state` | `"completed"` \| `"current"` \| `"loading"` \| `"waiting"` \| `"rejected"` | — | Состояние шага |
| `number` | `number` | — | Порядковый номер шага (1-based) |
| `className` | `string` | — | CSS-класс |

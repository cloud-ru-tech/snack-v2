# Stepper

`@ds/stepper` — Индикатор прогресса для многошаговых сценариев — desktop, mobile и адаптивный варианты с единым render-prop API.

Пакет `@ds/stepper` предоставляет индикатор прогресса для многошаговых сценариев: десктопный `Stepper`, мобильный `MobileStepper` и адаптивный `AdaptiveStepper`. Все три варианта используют единый render-prop API и общую модель состояний шагов.

## Когда использовать

- Мастер / wizard с явно разделёнными шагами (регистрация, оформление заказа, публикация).
- Процесс, где пользователь проходит шаги по порядку и видит прогресс.
- Подтверждение сложного действия с возможной серверной валидацией между шагами.

### Когда НЕ использовать

- Один длинный процесс без логических шагов — лучше обычная форма.
- Навигация между независимыми разделами — используйте `Tabs`.
- Бесконечный прогресс без конкретного числа шагов — `ProgressBar` или `Spinner`.

### Состав пакета

### Состояния шагов

| State | Когда | Визуал |
|-------|-------|--------|
| `waiting` | Шаг ещё не начат | Нейтральный, без заливки |
| `current` | Активный шаг | Выделен акцентным цветом |
| `loading` | Валидация / серверный запрос | Спиннер вместо номера |
| `completed` | Шаг успешно пройден | Галочка, заливка primary |
| `rejected` | Валидация не прошла | Крест, красная заливка |

### Do / Don't

- ✅ Показывайте шаги в порядке выполнения.
- ❌ Не перемешивайте порядок шагов между сессиями — пользователь теряет ориентир.
- ✅ Короткие title (1–2 слова) и информативные description в одну фразу.
- ❌ Не используйте description как основной текст — шаг не должен читаться как параграф.
- ✅ Один `validator` на шаг с понятным сообщением об ошибке.
- ❌ Не прыгайте через несколько шагов без явного действия пользователя.
- ✅ Сохраняйте видимость уже пройденных шагов — это ценность компонента.
- ❌ Не прячьте прошедшие шаги, чтобы «сэкономить место».

### Figma

<FigmaEmbed node={FIGMA_STEPPER} />

### Установка

```bash
pnpm add @ds/stepper
```

```ts
import { Stepper, MobileStepper, AdaptiveStepper } from '@ds/stepper'
import '@ds/stepper/style.css'
```

### Базовый пример

<Example title='Базовый flow' description='Три шага с Next/Prev' code={BasicFlowSrc}>
  <BasicFlow client:load />
</Example>

### Render-prop API

Степпер не управляет своим контейнером — через render-prop вы получаете `stepper` (ReactElement) и набор методов, а layout вокруг рисуете сами:

```tsx
<Stepper steps={[...]}>
  {({ stepper, goNext, goPrev, currentStepIndex, stepCount, isCompleted }) => (
    <>
      {stepper}
      {/* ваши кнопки */}
    </>
  )}
</Stepper>
```

Полный список методов и пропсов — на странице соответствующего компонента.

### Доступ к API из потомков

```tsx
import { useStepperApi } from '@ds/stepper'

function NextButton() {
  const { goNext, isCompleted } = useStepperApi()
  return <Button label='Далее' onClick={() => goNext()} disabled={isCompleted} />
}
```

### Storybook

<StorybookEmbed storyId='components-stepper--playground' />

## Доступность

- Каждый шаг рендерится как `<button>` — доступен через клавиатуру и скринридер.
- Невыполнимые шаги получают атрибут `disabled`.
- Состояние шага экспонируется через `data-state` — машиночитаемый контракт для E2E и кастомных стилей.
- Иконки состояний (✓, ✗) дополняют цвет — критерий «цвет не единственный носитель смысла» соблюдается.

## Stepper

Десктопный степпер — горизонтальный ряд шагов с номером, заголовком и описанием.

Десктопный степпер — горизонтальный список шагов с номером, заголовком и (опционально) описанием. Управляется через render-prop, поддерживает controlled и uncontrolled режимы.

## Примеры

<Example title='Базовый flow' description='Три шага с Next/Prev' code={BasicFlowSrc}>
  <BasicFlow client:load />
</Example>

<Example title='С валидатором' description='Первая попытка реджектится, вторая проходит' code={WithValidatorSrc}>
  <WithValidator client:load />
</Example>

## Валидатор

`validator(prevIndex, newIndex) => Promise<boolean>`. Пока промис резолвится — шаг в `loading`. При `false` — `rejected`; `resetValidation()` возвращает шаг в `current`. Валидатор вызывается перед каждой попыткой `goNext` / `goPrev`.

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

## MobileStepper

Мобильный степпер — тонкий прогресс-трек с заголовком активного шага.

Мобильный вариант степпера. Занимает меньше по высоте: вместо ряда карточек — прогресс-трек и заголовок активного шага. API идентично `Stepper`, поэтому render-prop и валидатор работают так же.

## Пример

<Example title='Мобильный flow' description='Три шага с заголовками и описаниями' code={MobileFlowSrc}>
  <MobileFlow client:load />
</Example>

## Когда использовать

- Когда у пользователя заведомо узкий экран (< 640 px).
- В мобильном web-flow и внутри bottom-sheet'ов.
- Когда desktop-вариант конкурирует с остальным контентом за место по высоте.

Для автоматического переключения между desktop и mobile используйте [`AdaptiveStepper`](/components/stepper/adaptive-stepper).

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

## AdaptiveStepper

Адаптивный степпер — переключает desktop и mobile варианты через проп layoutType.

Адаптивная обёртка, которая по пропу `layoutType` отрисовывает либо `Stepper`, либо `MobileStepper`. Удобна, когда решение о layout'е принимается выше по дереву — например, через media-query-хук или feature-flag.

## Пример

<Example title='Переключение layout' description='Toggle между desktop и mobile' code={AdaptiveFlowSrc}>
  <AdaptiveFlow client:load />
</Example>

## Когда использовать

- Когда точка переключения между вариантами известна заранее (например, из хука, читающего viewport).
- Когда вы не хотите дублировать вызов Stepper / MobileStepper по условию в каждом месте использования.

Если адаптив не нужен — используйте [`Stepper`](/components/stepper/stepper) или [`MobileStepper`](/components/stepper/mobile-stepper) напрямую.

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

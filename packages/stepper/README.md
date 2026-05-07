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

### Когда использовать

- Многошаговые desktop-формы, где пользователю важно видеть описание каждого шага.
- Процессы с валидацией между шагами (submit → backend check → next).

### Анатомия

#### Step state
Состояние шага: `completed` — пройден, `current` — текущий, `loading` — в процессе, `waiting` — ещё не пройден, `rejected` — отклонён/ошибка.

#### Layout type
Раскладка: `desktop` — горизонтальная с подписями, `mobile` — компактная вертикальная.

### Примеры использования

#### Базовый flow

Три шага с Next/Prev

```tsx
import { Button } from '@ds/button';
import { Stepper } from '@ds/stepper';

export function BasicFlow() {
  return (
    <Stepper steps={[{ title: 'Данные' }, { title: 'Проверка' }, { title: 'Готово' }]}>
      {({ stepper, goNext, goPrev, currentStepIndex, stepCount, isCompleted }) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {stepper}
          <div style={{ display: 'flex', gap: 8 }}>
            <Button
              label='Назад'
              view='outline'
              appearance='neutral'
              size='s'
              onClick={() => goPrev()}
              disabled={currentStepIndex === 0}
            />
            <Button
              label={currentStepIndex === stepCount - 1 ? 'Завершить' : 'Далее'}
              appearance='primary'
              size='s'
              onClick={() => goNext()}
              disabled={isCompleted}
            />
          </div>
        </div>
      )}
    </Stepper>
  );
}
```

#### С валидатором

Первая попытка реджектится, вторая проходит

```tsx
import { Button } from '@ds/button';
import { Stepper, StepsValidator } from '@ds/stepper';
import { useRef } from 'react';

export function WithValidator() {
  const attempts = useRef(0);
  const validator: StepsValidator = async () => {
    attempts.current += 1;
    return attempts.current >= 2;
  };

  return (
    <Stepper steps={[{ title: 'Данные' }, { title: 'Проверка' }, { title: 'Готово' }]} validator={validator}>
      {({ stepper, goNext, resetValidation }) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {stepper}
          <div style={{ display: 'flex', gap: 8 }}>
            <Button label='Сброс' view='outline' appearance='neutral' size='s' onClick={resetValidation} />
            <Button label='Далее' appearance='primary' size='s' onClick={() => goNext()} />
          </div>
        </div>
      )}
    </Stepper>
  );
}
```

### Props

**StepperProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `StepperApi` | — | Render function. Принимает `stepper` — JSX-элемент степпера, а также api: <br/> `goNext`, `goPrev`, `resetValidation`, `setValidator`, `isCompleted`, <br/> `currentStepIndex`, `stepCount`. |
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — | data-test-id |
| `defaultCurrentStepIndex` | `number` | `0` | Индекс текущего шага по-дефолту |
| `onChangeCurrentStep` | `((newValue: number, prevValue: number) => void)` | — | Колбек смены текущего степа |
| `onCompleteChange` | `((isCompleted: boolean) => void)` | — | Колбек изменения завершённости |
| `steps` | `StepData` | — | Массив шагов |
| `validator` | `StepsValidator` | — | Валидатор шагов. Выполняется при смене шага. Принимает первым аргументом индекс текущего, вторым — индекс нового шага. Возвращает Promise<boolean>: false → шаг помечается как Rejected. |

##### Related types

**StepData**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `description` | `string \| undefined` | — |  |
| `title` | `string` | — |  |

**StepperApi**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `currentStepIndex` | `number` | — |  |
| `goNext` | `(stepIndex?: number) => void` | — |  |
| `goPrev` | `(stepIndex?: number) => void` | — |  |
| `isCompleted` | `boolean` | — |  |
| `resetValidation` | `() => void` | — |  |
| `setValidator` | `StepsValidator` | — |  |
| `stepCount` | `number` | — |  |
| `stepper` | `ReactElement<any, string \| JSXElementConstructor<any>>` | — |  |

- `StepsValidator` = `(prevStepIndex: number, newStepIndex: number) => Promise<boolean>`

## MobileStepper

Мобильный степпер — тонкий прогресс-трек с заголовком активного шага.

Мобильный вариант степпера. Занимает меньше по высоте: вместо ряда карточек — прогресс-трек и заголовок активного шага. API идентично `Stepper`, поэтому render-prop и валидатор работают так же.

### Когда использовать

- Когда у пользователя заведомо узкий экран (< 640 px).
- В мобильном web-flow и внутри bottom-sheet'ов.
- Когда desktop-вариант конкурирует с остальным контентом за место по высоте.

Для автоматического переключения между desktop и mobile используйте **`AdaptiveStepper`**.

### Анатомия

#### Step state
Состояние шага: `completed` — пройден, `current` — текущий, `loading` — в процессе, `waiting` — ещё не пройден, `rejected` — отклонён/ошибка.

### Примеры использования

#### Мобильный flow

Три шага с заголовками и описаниями

```tsx
import { Button } from '@ds/button';
import { MobileStepper } from '@ds/stepper';

export function MobileFlow() {
  return (
    <MobileStepper
      steps={[
        { title: 'Заполните данные', description: 'Имя и фамилия' },
        { title: 'Подтвердите', description: 'Проверьте данные' },
        { title: 'Готово' },
      ]}
    >
      {({ stepper, goNext, goPrev, currentStepIndex, stepCount, isCompleted }) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {stepper}
          <div style={{ display: 'flex', gap: 8 }}>
            <Button
              label='Назад'
              view='outline'
              appearance='neutral'
              size='s'
              onClick={() => goPrev()}
              disabled={currentStepIndex === 0}
            />
            <Button
              label={currentStepIndex === stepCount - 1 ? 'Завершить' : 'Далее'}
              appearance='primary'
              size='s'
              onClick={() => goNext()}
              disabled={isCompleted}
            />
          </div>
        </div>
      )}
    </MobileStepper>
  );
}
```

### Props

**MobileStepperProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `StepperApi` | — | Render function. Принимает `stepper` и api: <br/> `goNext`, `goPrev`, `resetValidation`, `setValidator`, `isCompleted`, <br/> `currentStepIndex`, `stepCount`. |
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — | data-test-id |
| `defaultCurrentStepIndex` | `number` | `0` | Индекс текущего шага по-дефолту |
| `onChangeCurrentStep` | `((newValue: number, prevValue: number) => void)` | — | Колбек смены текущего степа |
| `onCompleteChange` | `((isCompleted: boolean) => void)` | — | Колбек изменения завершённости |
| `steps` | `StepData` | — | Массив шагов |
| `validator` | `StepsValidator` | — | Валидатор шагов. Выполняется при смене шага. Принимает первым аргументом индекс текущего, вторым — индекс нового шага. |

##### Related types

**StepData**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `description` | `string \| undefined` | — |  |
| `title` | `string` | — |  |

**StepperApi**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `currentStepIndex` | `number` | — |  |
| `goNext` | `(stepIndex?: number) => void` | — |  |
| `goPrev` | `(stepIndex?: number) => void` | — |  |
| `isCompleted` | `boolean` | — |  |
| `resetValidation` | `() => void` | — |  |
| `setValidator` | `StepsValidator` | — |  |
| `stepCount` | `number` | — |  |
| `stepper` | `ReactElement<any, string \| JSXElementConstructor<any>>` | — |  |

- `StepsValidator` = `(prevStepIndex: number, newStepIndex: number) => Promise<boolean>`

## AdaptiveStepper

Адаптивный степпер — переключает desktop и mobile варианты через проп layoutType.

Адаптивная обёртка, которая по пропу `layoutType` отрисовывает либо `Stepper`, либо `MobileStepper`. Удобна, когда решение о layout'е принимается выше по дереву — например, через media-query-хук или feature-flag.

### Когда использовать

- Когда точка переключения между вариантами известна заранее (например, из хука, читающего viewport).
- Когда вы не хотите дублировать вызов Stepper / MobileStepper по условию в каждом месте использования.

Если адаптив не нужен — используйте **`Stepper`** или **`MobileStepper`** напрямую.

### Анатомия

#### Step state
Состояние шага: `completed`, `current`, `loading`, `waiting`, `rejected`. Раскладка (desktop/mobile) выбирается автоматически по ширине контейнера.

### Примеры использования

#### Переключение layout

Toggle между desktop и mobile

```tsx
import { Button } from '@ds/button';
import { AdaptiveStepper } from '@ds/stepper';
import { useState } from 'react';

export function AdaptiveFlow() {
  const [isMobile, setIsMobile] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Button
        label={isMobile ? 'Показать desktop' : 'Показать mobile'}
        view='outline'
        appearance='neutral'
        size='s'
        onClick={() => setIsMobile(v => !v)}
      />
      <AdaptiveStepper
        layoutType={isMobile ? 'mobile' : 'desktop'}
        steps={[{ title: 'Данные' }, { title: 'Проверка' }, { title: 'Готово' }]}
      >
        {({ stepper, goNext, goPrev, currentStepIndex, stepCount, isCompleted }) => (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {stepper}
            <div style={{ display: 'flex', gap: 8 }}>
              <Button
                label='Назад'
                view='outline'
                appearance='neutral'
                size='s'
                onClick={() => goPrev()}
                disabled={currentStepIndex === 0}
              />
              <Button
                label={currentStepIndex === stepCount - 1 ? 'Завершить' : 'Далее'}
                appearance='primary'
                size='s'
                onClick={() => goNext()}
                disabled={isCompleted}
              />
            </div>
          </div>
        )}
      </AdaptiveStepper>
    </div>
  );
}
```

### Props

**AdaptiveStepperProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `StepperApi` | — | Render function. Принимает `stepper` — JSX-элемент степпера, а также api: <br/> `goNext`, `goPrev`, `resetValidation`, `setValidator`, `isCompleted`, <br/> `currentStepIndex`, `stepCount`. |
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — | data-test-id |
| `defaultCurrentStepIndex` | `number` | — | Индекс текущего шага по-дефолту |
| `layoutType` | `"desktop"` \| `"mobile"` | — | Режим отображения: desktop (по-умолчанию) или mobile |
| `onChangeCurrentStep` | `((newValue: number, prevValue: number) => void)` | — | Колбек смены текущего степа |
| `onCompleteChange` | `((isCompleted: boolean) => void)` | — | Колбек изменения завершённости |
| `steps` | `StepData` | — | Массив шагов |
| `validator` | `StepsValidator` | — | Валидатор шагов. Выполняется при смене шага. Принимает первым аргументом индекс текущего, вторым — индекс нового шага. Возвращает Promise<boolean>: false → шаг помечается как Rejected. |

##### Related types

- `LayoutType` = `"desktop"` \| `"mobile"`

**StepData**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `description` | `string \| undefined` | — |  |
| `title` | `string` | — |  |

**StepperApi**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `currentStepIndex` | `number` | — |  |
| `goNext` | `(stepIndex?: number) => void` | — |  |
| `goPrev` | `(stepIndex?: number) => void` | — |  |
| `isCompleted` | `boolean` | — |  |
| `resetValidation` | `() => void` | — |  |
| `setValidator` | `StepsValidator` | — |  |
| `stepCount` | `number` | — |  |
| `stepper` | `ReactElement<any, string \| JSXElementConstructor<any>>` | — |  |

- `StepsValidator` = `(prevStepIndex: number, newStepIndex: number) => Promise<boolean>`

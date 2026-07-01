# Stepper

`@ds/stepper` — Адаптивный индикатор прогресса для многошаговых сценариев — единый render-prop API, раскладка из AdaptiveProvider.

Индикатор прогресса для многошаговых сценариев — список шагов с номером, заголовком и (опционально) описанием. Управляется через render-prop, поддерживает controlled и uncontrolled режимы. `Stepper` адаптивен: раскладку берёт из `AdaptiveProvider` (`@ds/adaptive`) — на desktop горизонтальный ряд шагов, на `mobile` компактный.

## Когда использовать

- Многошаговые формы, где пользователю важно видеть прогресс и (на desktop) описание каждого шага.
- Процессы с валидацией между шагами (submit → backend check → next).

## Анатомия

### Step state
Состояние шага: `completed` — пройден, `current` — текущий, `loading` — в процессе, `waiting` — ещё не пройден, `rejected` — отклонён/ошибка.

### Layout type
Раскладка: `desktop` — горизонтальная с подписями, `mobile` — компактная вертикальная.

## Установка

```bash
pnpm add @ds/stepper
```

```ts
import { Stepper } from '@ds/stepper'
```

## Примеры использования

### Базовый flow

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

### С валидатором

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

## Props

**StepperProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `allowFreeNavigation` | `boolean` | — | Позволяет свободно переключаться между разными шагами без валидации |
| `children` | `StepperApi` | — | Render function. Принимает `stepper` — JSX-элемент степпера, а также api: <br/> `goNext`, `goPrev`, `resetValidation`, `setValidator`, `isCompleted`, <br/> `currentStepIndex`, `stepCount`. |
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — | data-test-id |
| `defaultCurrentStepIndex` | `number` | — | Индекс текущего шага по-дефолту |
| `onChangeCurrentStep` | `((newValue: number, prevValue: number) => void)` | — | Колбек смены текущего степа |
| `onCompleteChange` | `((isCompleted: boolean) => void)` | — | Колбек изменения завершённости |
| `steps` | `StepData` | — | Массив шагов |
| `validator` | `StepsValidator` | — | Валидатор шагов. Выполняется при смене шага. Принимает первым аргументом индекс текущего, вторым — индекс нового шага. Возвращает Promise<boolean>: false → шаг помечается как Rejected. |

#### Related types

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

## Адаптивность

`Stepper` — адаптивный компонент с переключением поверхности (surface-swap). Раскладку он берёт из `AdaptiveProvider` (контекст `@ds/adaptive`); публичный API единый для обеих платформ:

- **desktop** (по умолчанию) — горизонтальный ряд шагов с номером, заголовком и описанием.
- **mobile** — компактный вертикальный индикатор: номер текущего шага и прогресс без полного ряда подписей.

Верстайте под desktop и поставьте один `<AdaptiveProvider>` в корне приложения — mobile-поверхность включается автоматически (desktop-first). Пропа `layoutType` у компонента нет: источник раскладки — только контекст.

### Как форсировать платформу

Форс — только контекстом, не пропом:

- Поддерево — вложенный провайдер:
  ```tsx
  import { AdaptiveProvider } from '@ds/adaptive'

  <AdaptiveProvider layoutType='mobile'>
    <Stepper steps={steps}>{renderStep}</Stepper>
  </AdaptiveProvider>
  ```
- Отдельный компонент — `withLayoutType` (module-scope, сахар над провайдером):
  ```tsx
  import { withLayoutType } from '@ds/adaptive'
  import { Stepper } from '@ds/stepper'

  const MobileStepper = withLayoutType(Stepper, 'mobile')
  ```

Платформенных пропов у `Stepper` нет — обе поверхности используют один набор пропсов.

### Mobile — компактный индикатор

Раскладка форсирована в mobile: вместо горизонтального ряда — компактный вертикальный индикатор шага.

```tsx
import { AdaptiveProvider, LAYOUT_TYPE } from '@ds/adaptive';
import { Button } from '@ds/button';
import { Stepper } from '@ds/stepper';

export function MobileLayout() {
  return (
    <AdaptiveProvider layoutType={LAYOUT_TYPE.Mobile}>
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
    </AdaptiveProvider>
  );
}
```

Подробнее о модели адаптивности — [Адаптивность — паттерн](/patterns/adaptive).

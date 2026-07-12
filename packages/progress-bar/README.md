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

### Когда использовать
- Загрузка файла, экспорт, импорт с известным прогрессом.
- Пошаговые формы и wizard'ы — процент заполнения.
- Длительные операции, где пользователь ждёт явного завершения.

Когда **не** нужен `ProgressBar`: для неопределённой загрузки страницы используйте **`ProgressBarPage`**; для компактных мест в таблицах и карточках — **`ProgressBarCircle`**.

### Анатомия

#### Size
`xs` — дефолт, тонкая полоса под контролом или в строке таблицы; `s` — более заметный прогресс в карточках и формах.

### Примеры использования
#### Статическое значение

Фиксированный прогресс 40%

```tsx
import { ProgressBar } from '@ds/progress-bar';

export function Static() {
  return <ProgressBar progress={40} />;
}
```

#### Анимированный прогресс

Значение обновляется в useEffect — компонент плавно догоняет

```tsx
import { ProgressBar } from '@ds/progress-bar';
import { useEffect, useState } from 'react';

export function AnimatedProgress() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setValue(prev => (prev >= 100 ? 0 : prev + 5));
    }, 400);
    return () => clearInterval(id);
  }, []);

  return <ProgressBar progress={value} />;
}
```

#### Три appearance в ряд

Основные семантические роли

```tsx
import { APPEARANCE, ProgressBar } from '@ds/progress-bar';

export function Appearances() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <ProgressBar progress={60} appearance={APPEARANCE.Primary} />
      <ProgressBar progress={60} appearance={APPEARANCE.Green} />
      <ProgressBar progress={60} appearance={APPEARANCE.Red} />
    </div>
  );
}
```

#### Два размера

```tsx
import { PROGRESS_BAR_SIZE, ProgressBar } from '@ds/progress-bar';

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <ProgressBar progress={40} size={PROGRESS_BAR_SIZE.XS} />
      <ProgressBar progress={40} size={PROGRESS_BAR_SIZE.S} />
    </div>
  );
}
```

### Props
**ProgressBarProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `appearance` | `"blue"` \| `"green"` \| `"neutral"` \| `"orange"` \| `"pink"` \| `"primary"` \| `"red"` \| `"violet"` \| `"yellow"` | — | Внешний вид |
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — |  |
| `progress` | `number` | — | Процент загрузки от 0 до 100 |
| `size` | `"s"` \| `"xs"` | `s` | Размер |

##### Related types

- `Appearance` = `"blue"` \| `"green"` \| `"neutral"` \| `"orange"` \| `"pink"` \| `"primary"` \| `"red"` \| `"violet"` \| `"yellow"`

- `ProgressBarSize` = `"s"` \| `"xs"`

## ProgressBarCircle

Круговой детерминированный индикатор прогресса для компактных мест — карточек, таблиц, тулбаров.

Круговой детерминированный индикатор. Занимает минимум места и хорошо читается в плотных интерфейсах — рядом с аватаром при upload, в ячейке таблицы, в карточке файла.

### Когда использовать
- Индикатор загрузки рядом с аватаром или миниатюрой.
- Прогресс в ячейках таблицы или в списке файлов.
- Там, где линейный индикатор слишком широкий.

Когда **не** нужен `ProgressBarCircle`: если есть горизонтальное место и вы хотите показать явный процент рядом — возьмите линейный **`ProgressBar`**.

### Анатомия

#### Size
`xs` — дефолт, для ячеек таблиц и плотных списков; `s` — для карточек и более заметных мест.

#### Appearance
Семантика цвета заполненной дуги: `primary` — бренд/нейтральный; `red` — ошибка/превышение лимита; `orange`/`yellow` — предупреждение; `green` — успех; `blue`, `violet`, `pink` — декоративные категории.

### Примеры использования
#### Значение 75%

```tsx
import { ProgressBarCircle } from '@ds/progress-bar';

export function CircleStatic() {
  return <ProgressBarCircle progress={75} />;
}
```

#### Три appearance

Primary, успех и ошибка

```tsx
import { APPEARANCE, ProgressBarCircle } from '@ds/progress-bar';

export function CircleAppearances() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <ProgressBarCircle progress={60} appearance={APPEARANCE.Primary} />
      <ProgressBarCircle progress={60} appearance={APPEARANCE.Green} />
      <ProgressBarCircle progress={60} appearance={APPEARANCE.Red} />
    </div>
  );
}
```

### Props
**ProgressBarCircleProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `appearance` | `"blue"` \| `"green"` \| `"neutral"` \| `"orange"` \| `"pink"` \| `"primary"` \| `"red"` \| `"violet"` \| `"yellow"` | `primary` | Внешний вид |
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — |  |
| `progress` | `number` | — | Процент загрузки от 0 до 100 |
| `size` | `"s"` \| `"xs"` | `s` | Размер |

##### Related types

- `Appearance` = `"blue"` \| `"green"` \| `"neutral"` \| `"orange"` \| `"pink"` \| `"primary"` \| `"red"` \| `"violet"` \| `"yellow"`

- `ProgressBarCircleSize` = `"s"` \| `"xs"`

## ProgressBarPage

Неопределённый индикатор загрузки страницы — автоматически растёт, пока inProgress=true, и исчезает после завершения.

Тонкая полоска-индикатор в верхней части страницы. Похожа на классический nprogress — не знает настоящего процента, но создаёт ощущение движения для пользователя во время навигации или длительной загрузки.

### Когда использовать
- Индикация навигации между страницами (роутинг SPA).
- Длительная загрузка данных без детерминированного прогресса.
- Глобальный busy-индикатор уровня layout'а.

Когда **не** нужен `ProgressBarPage`: если известен реальный процент — используйте детерминированный **`ProgressBar`**. Не показывайте `ProgressBarPage` для быстрых операций (< 200 мс) — это отвлекает.

### Примеры использования
#### Переключение inProgress

Живой сценарий — запустите и остановите загрузку

```tsx
import { ProgressBarPage } from '@ds/progress-bar';
import { useState } from 'react';

export function PageToggle() {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <ProgressBarPage inProgress={loading} />
      <button type='button' onClick={() => setLoading(v => !v)}>
        {loading ? 'Stop' : 'Start'} loading
      </button>
    </>
  );
}
```

### Props
**ProgressBarPageProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `animationDuration` | `number` | `200` | Скорость анимации |
| `appearance` | `"blue"` \| `"green"` \| `"neutral"` \| `"orange"` \| `"pink"` \| `"primary"` \| `"red"` \| `"violet"` \| `"yellow"` | — | Внешний вид |
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — |  |
| `inProgress` | `boolean` | — | Включен/выключен |
| `incrementDuration` | `number` | `800` | Время между прогрессом |
| `minimum` | `number` | — | Минимальное значение прогресс бара от 0 до 1 |

##### Related types

- `Appearance` = `"blue"` \| `"green"` \| `"neutral"` \| `"orange"` \| `"pink"` \| `"primary"` \| `"red"` \| `"violet"` \| `"yellow"`

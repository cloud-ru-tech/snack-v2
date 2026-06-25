# Quota

`@ds/uikit-product-quota` — Виджеты квот проекта — выпадающий QuotaWidget, аккордеон QuotaWidgetMini и карточка квоты QuotaWidgetCard с прогрессом и состояниями loading/error.

Пакет `@ds/uikit-product-quota` предоставляет три компонента для отображения квот проекта. Все три используют общую модель данных `QuotaItem` (`name`, `limit`, `usage`, `remains`, `unitDisplayName`) и общие состояния загрузки и ошибки.

- ****QuotaWidget**** — кнопка-триггер с выпадающим списком карточек квот, для шапки продуктовых страниц.
- ****QuotaWidgetMini**** — компактный аккордеон со списком квот, для сайдбаров и узких layout'ов.
- ****QuotaWidgetCard**** — карточка одной квоты с прогресс-баром, tooltip-расшифровкой и состояниями `loading` / `noData`.

Карточки внутри `QuotaWidget` и `QuotaWidgetMini` — те же `QuotaWidgetCard`; исчерпанные квоты (`remains <= 0`) поднимаются в начало списка и подсчитываются в counter триггера.

## Установка

```bash
pnpm add @ds/uikit-product-quota
```

```ts
import { QuotaWidget, QuotaWidgetMini, QuotaWidgetCard } from '@ds/uikit-product-quota'
```

## Figma

Все три компонента живут на одной странице `Quota` файла Product UI Kit. Ссылки на конкретные узлы — на страницах компонентов.

## QuotaWidget

Кнопка-триггер с выпадающим списком карточек квот проекта — counter исчерпанных квот, ссылка на страницу квот и кнопка увеличения.

Кнопка «Квоты» с counter'ом исчерпанных квот, по клику открывающая **`Dropdown`** с шапкой проекта и сеткой карточек **`QuotaWidgetCard`**. Шапка содержит название проекта, ссылку на страницу квот (`quotasUrl`) и кнопку «Увеличить квоты» (при `canEditQuota`).

### Когда использовать

- Шапка продуктовой страницы или toolbar, где квоты — вторичная информация и раскрываются по требованию.
- Нужен индикатор исчерпанных квот без постоянного места под список.
- Узкий сайдбар, где список квот должен быть виден без портала:
  - используйте **`QuotaWidgetMini`**.
- Одна конкретная квота на странице ресурса:
  - используйте **`QuotaWidgetCard`**.

- ✅ Оборачивайте страницу в `PortalContextProvider` — контент рендерится в портал `Dropdown`.
- ❌ Рендерить виджет без portal-контекста — выпадающий список не появится.

- ✅ Переключайте `isError` обратно после успешного `onRefresh` — кнопка повтора в состоянии ошибки.
- ❌ Оставлять `isError` без рабочего `onRefresh` — пользователь не сможет восстановить список.

### Анатомия

#### Триггер

`Button view='function'` с label «Квоты» и chevron-иконкой; counter показывает число исчерпанных квот (`remains <= 0`). Внешний вид настраивается через `buttonProps` (`size`, `appearance`, `label`, `fullWidth`, `disabled`, `className`).

#### Шапка проекта

- `projectName` — название проекта.
- `quotasUrl` + `onQuotasUrlClick` — ссылка на страницу квот.
- `canEditQuota` + `onIncreaseQuotaClick` — кнопка «Увеличить квоты»; скрывается `hideIncreaseQuotaButton`.

#### Список квот

Сетка карточек `QuotaWidgetCard`. Исчерпанные квоты поднимаются в начало (отключается `disableSorting`). Состояния:

- `isLoading` — skeleton-карточки.
- `isError` — блок ошибки с кнопкой повтора (`onRefresh`).

### Примеры использования

#### Базовый случай

Counter исчерпанных квот на триггере, сетка карточек в dropdown

```tsx
import { QuotaItem, QuotaWidget } from '@ds/uikit-product-quota';
import { useState } from 'react';

const QUOTAS: QuotaItem[] = [
  { name: 'vCPU', limit: 100, usage: 42, remains: 58, unitDisplayName: 'cores' },
  { name: 'RAM', limit: 256, usage: 230, remains: 26, unitDisplayName: 'GB' },
  { name: 'SSD', limit: 1000, usage: 1000, remains: 0, unitDisplayName: 'GB' },
  { name: 'Public IP', limit: 10, usage: 9, remains: 1, unitDisplayName: 'pcs' },
];

export function QuotaWidgetBasic() {
  const [isLoading, setIsLoading] = useState(false);

  const reload = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 800);
  };

  return (
    // В продукте виджет живёт у правого края страницы — dropdown прижат к правому краю триггера
    <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
      <QuotaWidget
        quotas={QUOTAS}
        projectName='ml-platform-production'
        quotasUrl='#'
        canEditQuota={false}
        isLoading={isLoading}
        isError={false}
        onRefresh={reload}
      />
    </div>
  );
}
```

#### Ошибка загрузки и повтор

isError показывает блок ошибки; onRefresh переключает в loading и восстанавливает список

```tsx
import { QuotaItem, QuotaWidget } from '@ds/uikit-product-quota';
import { useState } from 'react';

const QUOTAS: QuotaItem[] = [
  { name: 'vCPU', limit: 100, usage: 42, remains: 58, unitDisplayName: 'cores' },
  { name: 'RAM', limit: 256, usage: 230, remains: 26, unitDisplayName: 'GB' },
];

export function QuotaWidgetError() {
  const [isError, setIsError] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsError(false);
    }, 800);
  };

  return (
    // В продукте виджет живёт у правого края страницы — dropdown прижат к правому краю триггера
    <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
      <QuotaWidget
        quotas={QUOTAS}
        projectName='ml-platform-production'
        quotasUrl='#'
        canEditQuota={false}
        isLoading={isLoading}
        isError={isError}
        onRefresh={handleRefresh}
      />
    </div>
  );
}
```

### Props

**QuotaWidgetProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `buttonProps` | `ButtonProps` | — | Свойства кнопки открытия виджета |
| `canEditQuota` | `boolean` | — | Флаг наличия прав на редактирование квот |
| `data-test-id` | `string` | — |  |
| `disableSorting` | `boolean` | — | Флаг отключения сортировки квот |
| `hideIncreaseQuotaButton` | `boolean` | — | Флаг скрытия кнопки увеличения квоты |
| `isError` | `boolean` | — | Флаг ошибки при загрузке квот |
| `isLoading` | `boolean` | — | Флаг загрузки квот |
| `onIncreaseQuotaClick` | `(() => void)` | — | Колбек нажатия на кнопку увеличения квот |
| `onQuotasUrlClick` | `(() => void)` | — | Колбек клика по ссылке на страницу квот по проекту |
| `onRefresh` | `() => void` | — | Колбек на обновление списка квот при ошибке |
| `onWidgetOpen` | `(() => void)` | — | Колбек открытия виджета квот |
| `projectName` | `string` | — | Название проекта, по которому отображаются квоты |
| `quotas` | `QuotaItem` | — | Список квот для отображения |
| `quotasUrl` | `string` | — | Ссылка на страницу квот по проекту |

##### Related types

**QuotaItem**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `limit` | `number` | — | Лимит квоты |
| `name` | `string` | — | Название квоты |
| `remains` | `number` | — | Остаток квоты |
| `unitDisplayName` | `string` | — | Единица измерения квоты |
| `usage` | `number` | — | Потребление квоты |

### Смотри также

- **QuotaWidgetMini** — тот же список в аккордеоне без портала.
- **QuotaWidgetCard** — карточка одной квоты.
- **Dropdown** — нижележащий портальный примитив.

## QuotaWidgetMini

Компактный аккордеон со списком квот проекта — counter исчерпанных квот в заголовке и кнопка увеличения квот.

Сворачиваемый блок на базе **`Accordion`**: заголовок «Квоты» с counter'ом исчерпанных квот и названием проекта в подзаголовке, внутри — вертикальный список карточек **`QuotaWidgetCard`** и кнопка «Увеличить квоты». Портал не используется — контент раскрывается в потоке документа.

### Когда использовать

- Сайдбары и узкие панели, где список квот должен раскрываться на месте, без overlay.
- Mobile / adaptive layout'ы — аккордеон не требует позиционирования портала.
- Шапка широкой страницы с раскрытием по клику:
  - используйте **`QuotaWidget`**.

- ✅ Используйте `isExpandedDefault`, если квоты — ключевой контент экрана и должны быть видны сразу.
- ❌ Контролировать раскрытие снаружи — аккордеон uncontrolled, публичного controlled-API нет.

### Анатомия

#### Заголовок

`Accordion.CollapseBlockSecondary`: title «Квоты», после него `Counter appearance='critical'` с числом исчерпанных квот (скрыт при `isLoading` / `isError`), в подзаголовке — `projectName` с truncate.

#### Содержимое

- Вертикальный список `QuotaWidgetCard`; исчерпанные квоты поднимаются в начало (`disableSorting` отключает).
- `isLoading` — skeleton-карточки; `isError` — блок ошибки с кнопкой повтора (`onRefresh`).
- Кнопка «Увеличить квоты» (`canEditQuota`, `onIncreaseQuotaClick`, скрывается `hideIncreaseQuotaButton`).

### Примеры использования

#### Раскрыт по умолчанию

isExpandedDefault + counter исчерпанной квоты в заголовке

```tsx
import { QuotaItem, QuotaWidgetMini } from '@ds/uikit-product-quota';
import { useState } from 'react';

const QUOTAS: QuotaItem[] = [
  { name: 'SSD', limit: 1000, usage: 1000, remains: 0, unitDisplayName: 'GB' },
  { name: 'RAM', limit: 256, usage: 230, remains: 26, unitDisplayName: 'GB' },
  { name: 'vCPU', limit: 100, usage: 42, remains: 58, unitDisplayName: 'cores' },
];

export function QuotaWidgetMiniExpanded() {
  const [isLoading, setIsLoading] = useState(false);

  const reload = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 800);
  };

  return (
    <QuotaWidgetMini
      quotas={QUOTAS}
      projectName='ml-platform-production'
      canEditQuota={false}
      isExpandedDefault
      isLoading={isLoading}
      isError={false}
      onRefresh={reload}
    />
  );
}
```

### Props

**QuotaWidgetMiniProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `canEditQuota` | `boolean` | — | Флаг наличия прав на редактирование квот |
| `data-test-id` | `string` | — |  |
| `disableSorting` | `boolean` | — | Флаг отключения сортировки квот |
| `hideIncreaseQuotaButton` | `boolean` | — | Флаг скрытия кнопки увеличения квоты |
| `isError` | `boolean` | — | Флаг ошибки при загрузке квот |
| `isExpandedDefault` | `boolean` | — | Флаг раскрытия аккордиона по умолчанию |
| `isLoading` | `boolean` | — | Флаг загрузки квот |
| `onIncreaseQuotaClick` | `(() => void)` | — | Колбек нажатия на кнопку увеличения квот |
| `onRefresh` | `() => void` | — | Колбек на обновление списка квот при ошибке |
| `onWidgetOpen` | `(() => void)` | — | Колбек открытия виджета квот |
| `projectName` | `string` | — | Название проекта, по которому отображаются квоты |
| `quotas` | `QuotaItem` | — | Список квот для отображения |

##### Related types

**QuotaItem**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `limit` | `number` | — | Лимит квоты |
| `name` | `string` | — | Название квоты |
| `remains` | `number` | — | Остаток квоты |
| `unitDisplayName` | `string` | — | Единица измерения квоты |
| `usage` | `number` | — | Потребление квоты |

### Смотри также

- **QuotaWidget** — выпадающий вариант для шапки страницы.
- **QuotaWidgetCard** — карточка одной квоты.
- **Accordion** — нижележащий примитив раскрытия.

## QuotaWidgetCard

Карточка одной квоты — прогресс-бар потребления с цветовыми порогами, tooltip-расшифровка и состояния loading/noData.

Карточка одной квоты `QuotaItem`: название, остаток в единицах измерения, **`ProgressBar`** потребления и **`Tooltip`** с расшифровкой «лимит / потреблено / остаток». Используется внутри **`QuotaWidget`** и **`QuotaWidgetMini`**, но доступна и отдельно.

### Когда использовать

- Страница ресурса или дашборд, где нужно показать одну конкретную квоту.
- Собственная раскладка квот, не покрываемая `QuotaWidget` / `QuotaWidgetMini`.
- Список квот проекта целиком:
  - используйте **`QuotaWidget`** или **`QuotaWidgetMini`**.

- ✅ Оборачивайте карточку в `PortalContextProvider` — tooltip рендерится в портал.
- ❌ Передавать `noData` без `onRefresh` — состояние ошибки останется без кнопки восстановления.

### Анатомия

#### Прогресс потребления

Цвет `ProgressBar` зависит от процента потребления (`usage / limit`):

- `< 70%` — зелёный.
- `70–90%` — жёлтый.
- `>= 90%` — красный; при `remains <= 0` квота считается исчерпанной.

#### Состояния

- `loading` — skeleton вместо значений.
- `noData` — `InfoBlock` с текстом ошибки и кнопкой «Обновить» (`onRefresh`).

### Примеры использования

#### Уровни потребления

Зелёный, жёлтый, красный пороги и исчерпанная квота

```tsx
import { QuotaWidgetCard } from '@ds/uikit-product-quota';

export function QuotaCardLevels() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <QuotaWidgetCard quota={{ name: 'Network', limit: 100, usage: 30, remains: 70, unitDisplayName: 'GB' }} />
      <QuotaWidgetCard quota={{ name: 'RAM', limit: 100, usage: 75, remains: 25, unitDisplayName: 'GB' }} />
      <QuotaWidgetCard quota={{ name: 'vCPU', limit: 100, usage: 95, remains: 5, unitDisplayName: 'cores' }} />
      <QuotaWidgetCard quota={{ name: 'SSD', limit: 100, usage: 100, remains: 0, unitDisplayName: 'GB' }} />
    </div>
  );
}
```

#### Loading

```tsx
import { QuotaWidgetCard } from '@ds/uikit-product-quota';

export function QuotaCardLoading() {
  return (
    <QuotaWidgetCard loading quota={{ name: 'Network', limit: 100, usage: 30, remains: 70, unitDisplayName: 'GB' }} />
  );
}
```

#### Нет данных и повтор

noData показывает InfoBlock; onRefresh возвращает карточку к данным

```tsx
import { QuotaWidgetCard } from '@ds/uikit-product-quota';
import { useState } from 'react';

const QUOTA = { name: 'Network', limit: 100, usage: 30, remains: 70, unitDisplayName: 'GB' };

export function QuotaCardNoData() {
  const [noData, setNoData] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    setLoading(true);
    setNoData(false);
    setTimeout(() => setLoading(false), 800);
  };

  return <QuotaWidgetCard quota={QUOTA} noData={noData} loading={loading} onRefresh={handleRefresh} />;
}
```

### Props

**QuotaWidgetCardProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `loading` | `boolean` | `false` | Состояние загрузки (Figma: loading=true) |
| `noData` | `boolean` | `false` | Состояние «не удалось загрузить данные» (Figma: noData=true) |
| `onRefresh` | `(() => void)` | — | Колбек кнопки «Обновить» в состоянии noData |
| `quota` | `QuotaItem` | — | Отображаемая квота |

##### Related types

**QuotaItem**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `limit` | `number` | — | Лимит квоты |
| `name` | `string` | — | Название квоты |
| `remains` | `number` | — | Остаток квоты |
| `unitDisplayName` | `string` | — | Единица измерения квоты |
| `usage` | `number` | — | Потребление квоты |

### Смотри также

- **QuotaWidget** — выпадающий список карточек.
- **QuotaWidgetMini** — аккордеон с карточками.
- **ProgressBar** — нижележащий индикатор потребления.

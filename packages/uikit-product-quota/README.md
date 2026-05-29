# Quota

`@ds/uikit-product-quota` — Виджеты квот проекта — dropdown, accordion и карточка с прогрессом, loading/error и tooltip.

Пакет виджетов квот для продуктовых экранов: выпадающий виджет (`QuotaWidget`), компактный аккордеон (`QuotaWidgetMini`) и карточка одной квоты (`QuotaWidgetCard`).

## Установка

```bash
pnpm add @ds/uikit-product-quota
```

```ts
import { QuotaWidget, QuotaWidgetMini, QuotaWidgetCard } from '@ds/uikit-product-quota'
```
## Компоненты

### QuotaWidget

**QuotaWidgetProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `buttonProps` | `BaseButtonProps` \| `ButtonProps` | — | Свойства кнопки открытия виджета |
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

#### Related types

**QuotaItem**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `limit` | `number` | — | Лимит квоты |
| `name` | `string` | — | Название квоты |
| `remains` | `number` | — | Остаток квоты |
| `unitDisplayName` | `string` | — | Единица измерения квоты |
| `usage` | `number` | — | Потребление квоты |

### QuotaWidgetMini

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

#### Related types

**QuotaItem**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `limit` | `number` | — | Лимит квоты |
| `name` | `string` | — | Название квоты |
| `remains` | `number` | — | Остаток квоты |
| `unitDisplayName` | `string` | — | Единица измерения квоты |
| `usage` | `number` | — | Потребление квоты |

### QuotaWidgetCard

**QuotaWidgetCardProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `loading` | `boolean` | `false` | Состояние загрузки (Figma: loading=true) |
| `noData` | `boolean` | `false` | Состояние «не удалось загрузить данные» (Figma: noData=true) |
| `onRefresh` | `(() => void)` | — | Колбек кнопки «Обновить» в состоянии noData |
| `quota` | `QuotaItem` | — | Отображаемая квота |

#### Related types

**QuotaItem**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `limit` | `number` | — | Лимит квоты |
| `name` | `string` | — | Название квоты |
| `remains` | `number` | — | Остаток квоты |
| `unitDisplayName` | `string` | — | Единица измерения квоты |
| `usage` | `number` | — | Потребление квоты |

## Grid

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `disableSorting` | `boolean` | `false` | Флаг отключения сортировки квот |
| `isAccordion` | `boolean` | `false` |  |
| `isLoading` | `boolean` | — | Флаг загрузки квот |
| `quotas` | `QuotaItem[]` | — | Список квот для отображения |

## ProjectHeader

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `canEditQuota` | `boolean` | — | Флаг наличия прав на редактирование квот |
| `hideIncreaseQuotaButton` | `boolean` | — | Флаг скрытия кнопки увеличения квоты |
| `isError` | `boolean` | — | Флаг ошибки при загрузке квот |
| `onIncreaseQuotaClick` | `(() => void)` | — | Колбек нажатия на кнопку увеличения квот |
| `onQuotasUrlClick` | `(() => void)` | — |  |
| `projectName` | `string` | — | Название проекта, по которому отображаются квоты |
| `quotasUrl` | `string` | — |  |

## QuotaCardsGrid

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `disableSorting` | `boolean` | `false` | Флаг отключения сортировки квот |
| `isAccordion` | `boolean` | `false` |  |
| `isError` | `boolean` | — | Флаг ошибки при загрузке квот |
| `isLoading` | `boolean` | — | Флаг загрузки квот |
| `onRefresh` | `() => void` | — | Колбек на обновление списка квот при ошибке |
| `quotas` | `QuotaItem[]` | — | Список квот для отображения |

## QuotaError

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onRefresh` | `() => void` | — |  |

## QuotaTooltip

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `quota` | `QuotaItem` | — |  |

## QuotaWidgetCardsSkeleton

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isLoading` | `boolean` | — |  |

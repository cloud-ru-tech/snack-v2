# Actions

`@ds/uikit-product-actions` — Адаптивная панель действий с меню переполнения.

Общая панель действий для блоков и страничных раскладок.

## Когда использовать

Используйте панель, если действия должны переходить в меню при нехватке места. Массив `items` задаёт приоритет: первое действие остаётся видимым дольше остальных и находится ближе к меню. Для переставляемых действий задавайте уникальный `id`. Без `id` ключом служит исходная позиция в `items`, поэтому скрытие соседей не меняет ключ.

## Установка

```bash
pnpm add @ds/uikit-product-actions
```

## Примеры использования

### Панель действий

```tsx
import { Actions } from '@ds/uikit-product-actions';
import { useState } from 'react';

export function BasicActions() {
  const [message, setMessage] = useState('Выберите действие');
  const handleAdd = () => setMessage('Выбрано: Добавить');
  const handleExport = () => setMessage('Выбрано: Экспортировать');
  return (
    <div>
      <Actions
        items={[
          { id: 'add', label: 'Добавить', onClick: handleAdd },
          { id: 'export', label: 'Экспортировать', variant: 'outline', onClick: handleExport },
        ]}
      />
      <p role='status'>{message}</p>
    </div>
  );
}
```

`maxVisibleItems={1}` оставляет одну кнопку в панели. Остальные действия доступны в меню с тремя точками, даже если ширины контейнера достаточно для всех кнопок.

### Ограничение числа видимых действий

```tsx
import { Actions } from '@ds/uikit-product-actions';
import { useState } from 'react';

export function LimitedActions() {
  const [message, setMessage] = useState('Откройте меню дополнительных действий');
  const handleAdd = () => setMessage('Выбрано: Добавить');
  const handleExport = () => setMessage('Выбрано: Экспортировать');
  const handleRefresh = () => setMessage('Выбрано: Обновить');

  return (
    <div>
      <Actions
        maxVisibleItems={1}
        items={[
          { id: 'add', label: 'Добавить', onClick: handleAdd },
          { id: 'export', variant: 'outline', label: 'Экспортировать', onClick: handleExport },
          { id: 'refresh', variant: 'function', label: 'Обновить', onClick: handleRefresh },
        ]}
      />
      <p role='status'>{message}</p>
    </div>
  );
}
```

`variant` задаёт тип действия. `dropdown`, `droplist` и `kebab` открывают меню, `quota` — виджет квот. Для `custom` задаются отдельные представления в панели и в меню. В примере `collapse={false}` сохраняет каждое действие в панели на desktop.

### Все типы действий

```tsx
import { Button } from '@ds/button';
import { Action, Actions } from '@ds/uikit-product-actions';
import { useState } from 'react';

import styles from './styles.module.scss';

export function ActionTypes() {
  const [message, setMessage] = useState('Выберите действие или откройте меню');
  const handleSelect = (variant: string) => () => setMessage(`Выбрано: ${variant}`);
  const menuItems = (variant: string) => [{ content: { label: 'Выбрать действие' }, onClick: handleSelect(variant) }];
  const items: Action[] = [
    { variant: 'filled', label: 'Создать', onClick: handleSelect('filled') },
    { variant: 'outline', label: 'Экспортировать', onClick: handleSelect('outline') },
    { variant: 'tonal', label: 'Обновить', onClick: handleSelect('tonal') },
    { variant: 'function', label: 'Настроить', onClick: handleSelect('function') },
    { variant: 'simple', label: 'Подробнее', onClick: handleSelect('simple') },
    {
      variant: 'dropdown',
      label: 'Выбрать',
      items: menuItems('dropdown'),
      closeDroplistOnItemClick: true,
    },
    {
      variant: 'droplist',
      button: { label: 'Действия' },
      list: { items: menuItems('droplist'), closeDroplistOnItemClick: true },
    },
    {
      variant: 'kebab',
      button: { 'aria-label': 'Другие действия' },
      list: { items: menuItems('kebab'), closeDroplistOnItemClick: true },
    },
    {
      variant: 'quota',
      quotas: [{ name: 'vCPU', limit: 10, usage: 3, remains: 7, unitDisplayName: 'шт.' }],
      loading: false,
      error: false,
      onRefresh: handleSelect('Обновление квот'),
      onWidgetOpen: handleSelect('quota'),
      projectName: 'Тестовый проект',
      quotasUrl: '#quota',
      canEditQuota: false,
    },
    {
      variant: 'custom',
      render: () => ({
        default: <Button label='Проверить' onClick={handleSelect('custom')} />,
        asListItem: { content: { label: 'Проверить' }, onClick: handleSelect('custom') },
      }),
    },
  ];

  return (
    <div className={styles.example}>
      <div className={styles.variants}>
        {items.map(item => (
          <div key={item.variant} className={styles.variant} id={item.variant}>
            <code>{item.variant}</code>
            <Actions className={styles.actions} collapse={false} items={[item]} />
          </div>
        ))}
      </div>
      <p role='status'>{message}</p>
    </div>
  );
}
```

## Props

**ActionsProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Класс контейнера действий. |
| `collapse` | `boolean` | `true` | Только desktop: сворачивать действия при нехватке ширины. |
| `data-test-id` | `string` | — | Тестовый идентификатор панели. |
| `groupDividers` | `boolean` | `true` | Разделять группы пунктов меню. |
| `items` | `Action` \| `ButtonDropdownDroplistConfig` \| `ButtonDroplistProps` \| `ButtonKebabProps` \| `CustomAction` \| `QuotaWidgetPropsBase` | — | Действия в порядке приоритета: первое остаётся видимым дольше остальных. |
| `maxVisibleItems` | `number` | — | Максимальное число видимых действий. Остальные доступны в меню. |
| `moreButtonProps` | `ButtonProps` | — | Подпись и тестовый идентификатор кнопки дополнительных действий. |

#### Related types

- `Action` = `(CustomAction | StandardAction) & { id?: string; }`

**ButtonDroplistProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `button` | `ButtonProps` | — |  |
| `list` | `DroplistAdaptiveProps` \| `DroplistListProps` \| `DroplistMobileSlots` \| `DroplistProps` \| `EmptyState` \| `PublicListContextType` \| `ScrollProps` \| `SelectionState` | — |  |

**ButtonKebabProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `button` | `ButtonProps` | — |  |
| `list` | `DroplistAdaptiveProps` \| `DroplistListProps` \| `DroplistMobileSlots` \| `DroplistProps` \| `EmptyState` \| `PublicListContextType` \| `ScrollProps` \| `SelectionState` | — |  |

**CustomAction**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `hidden` | `boolean \| undefined` | — |  |
| `render` | `() => { default: ReactNode; asListItem: Item; }` | — | Вызывается при рендеринге; React hooks следует использовать внутри компонента default. |
| `tooltip` | `TooltipProps` | — |  |
| `variant` | `"custom"` | — |  |

## Адаптивность

Панель учитывает ширину контейнера и ограничение `maxVisibleItems`. На desktop дополнительные действия открываются в popover, на mobile — в bottom-sheet. Мобильные текстовые кнопки делят доступную ширину. `collapse={false}` отключает сворачивание только на desktop и сохраняет поведение панели PageLayout.

Для `variant: 'custom'` передайте `render`, возвращающий `default` (кнопка) и `asListItem` (пункт меню). React hooks вызывайте внутри компонента из `default`.

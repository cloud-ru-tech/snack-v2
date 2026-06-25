# Widget

`@ds/uikit-product-widget` — Карточка продуктового виджета с кликабельным заголовком, SegmentControl, действиями и состояниями loading/error.

`Widget` — контейнер продуктовой карточки: **`TitleClickable`** в шапке, опциональный **`SegmentControl`**, слот управления, массив действий (`Button`, kebab/droplist) и body с состояниями `default` / `loading` / `error`.

## Когда использовать

- Компактные блоки на dashboard и overview-страницах: заголовок-ссылка, переключатель вкладок, действия и контент в одной карточке.
- Нужны единые состояния загрузки и ошибки с `InfoBlock` и кнопкой повтора без ручной вёрстки.
- Действия должны адаптироваться по ширине: primary в шапке (wide desktop), overflow в kebab, на узком layout — кнопки в footer.

Когда **не** нужен `Widget`:

- Простая карточка без шапки и действий:
  - используйте **`@ds/block`** или **`@ds/card`**.
- Только кликабельный заголовок без оболочки:
  - используйте **`TitleClickable`**.
- Сложная таблица или список с сортировкой и пагинацией:
  - используйте отдельный data-компонент, не оборачивайте в виджет.

- ✅ Передавайте `errorState.onClickUpdate` и переключайте `state` обратно в `default` после успешного retry.
- ❌ Оставлять `state='error'` без обработчика повтора — кнопка в `InfoBlock` не сможет восстановить контент.

- ✅ На desktop с несколькими действиями включайте `wide`, чтобы primary и kebab жили в шапке.
- ❌ Ожидать wide-layout на `layoutType='mobile'` — флаг принудительно отключается.

- ✅ Оборачивайте демо и страницу с kebab/droplist в `PortalContextProvider`, если порталы рендерятся вне корня приложения.
- ❌ Полагаться на глобальный portal-context из layout docs-сайта — каждый `client:visible`-островок изолирован.

- ✅ Скрывайте лишние действия через `hidden: true`, не удаляя элемент из массива.
- ❌ Дублировать один и тот же primary CTA в `actions` и в `children` — достаточно одного места.

## Анатомия

### State (default `default`)

Состояние из `WIDGET_STATE`:

- `default` — рендерит `children` в body.
- `loading` — skeleton в шапке; body — `loadingState.loadingContent` или skeleton при `loadingState.showSkeleton`.
- `error` — `InfoBlock` с `errorState` и кнопкой `onClickUpdate`; видимые `actions` остаются в шапке для retry/навигации.

### Wide (default `false`)

- `false` — legacy layout: overflow-действия в kebab шапки, primary-кнопки на всю ширину под контентом (кроме `error`).
- `true` — primary и kebab в одной строке шапки рядом с `SegmentControl` / `actionsChildren`. На `layoutType='mobile'` игнорируется.

### LayoutType (default `desktop`)

- `desktop` — учитывает `wide` и динамическое схлопывание действий в kebab по ширине контейнера.
- `mobile` — принудительно узкий режим: `wide` выключен, footer-кнопки для primary.

### Action variant

Элемент `actions[i]` — discriminated union по `variant` (default — filled `Button`):

- `filled` / `outline` / `tonal` / `function` / `simple` — пропсы `@ds/button` + опциональный `tooltip`.
- `kebab` — `ButtonKebab` + `list.items` (группы и пункты меню).
- `droplist` — кнопка-триггер + выпадающий `ActionList`.

Общие поля: `hidden`, `tooltip`. Для списков: `closeDroplistOnItemClick`, controlled `open` / `onOpenChange`.

### Slots

- `header` — пропсы **`TitleClickable`**: `title`, `href`, `icon`, `avatar`, `onClick`, …
- `children` — основной контент body.
- `segmentControl` — пропсы **`SegmentControl`** в шапке (часто `width: full` на desktop).
- `actionsChildren` — произвольный узел слева от кнопок (фильтр, badge, …).
- `loadingState` / `errorState` — настройки соответствующих состояний.

## Установка

```bash
pnpm add @ds/uikit-product-widget
```

```ts
import { Widget, BUTTON_TYPE, WIDGET_STATE } from '@ds/uikit-product-widget'
```

## Примеры использования

### Контент и SegmentControl

Uncontrolled сегменты через defaultValue

```tsx
import { WIDTH } from '@ds/segment-control';
import { Widget } from '@ds/uikit-product-widget';

export function DefaultContent() {
  return (
    <Widget
      header={{ title: 'Cloud servers', href: '#' }}
      segmentControl={{
        width: WIDTH.Full,
        defaultValue: 'overview',
        items: [
          { value: 'overview', label: 'Overview' },
          { value: 'events', label: 'Events' },
        ],
      }}
    >
      Keep product metrics, shortcuts, and status details in one compact card.
    </Widget>
  );
}
```

### Wide desktop и действия

Primary в шапке, overflow в kebab; PortalContextProvider для dropdown

```tsx
import { WIDTH } from '@ds/segment-control';
import { BUTTON_TYPE, Widget } from '@ds/uikit-product-widget';
import { useState } from 'react';

export function WithActions() {
  const [lastAction, setLastAction] = useState<string | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Widget
        wide
        header={{ title: 'Managed databases', href: '#' }}
        segmentControl={{
          width: WIDTH.Auto,
          defaultValue: 'overview',
          items: [
            { value: 'overview', label: 'Overview' },
            { value: 'events', label: 'Events' },
          ],
        }}
        actions={[
          { label: 'Create', onClick: () => setLastAction('Create') },
          {
            variant: BUTTON_TYPE.Outline,
            label: 'Settings',
            onClick: () => setLastAction('Settings'),
          },
          {
            variant: BUTTON_TYPE.Kebab,
            list: {
              items: [
                { content: { option: 'Export' }, onClick: () => setLastAction('Export') },
                { content: { option: 'Archive' }, onClick: () => setLastAction('Archive') },
              ],
            },
          },
        ]}
      >
        Actions are shown in the header for wide desktop widgets.
      </Widget>
      {lastAction ? <span>Last action: {lastAction}</span> : null}
    </div>
  );
}
```

### Mobile layout

wide игнорируется, primary уезжает в footer

```tsx
import { BUTTON_TYPE, Widget } from '@ds/uikit-product-widget';
import { useState } from 'react';

export function MobileLayout() {
  const [lastAction, setLastAction] = useState<string | null>(null);

  return (
    <div style={{ maxWidth: 360, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Widget
        layoutType='mobile'
        wide
        header={{ title: 'Object storage', href: '#' }}
        actions={[
          { label: 'Upload', onClick: () => setLastAction('Upload') },
          {
            variant: BUTTON_TYPE.Kebab,
            list: {
              items: [
                {
                  content: { option: 'Delete bucket' },
                  onClick: () => setLastAction('Delete bucket'),
                },
              ],
            },
          },
        ]}
      >
        On mobile, wide is ignored: primary actions move to the footer, overflow goes to kebab.
      </Widget>
      {lastAction ? <span>Last action: {lastAction}</span> : null}
    </div>
  );
}
```

### Loading

```tsx
import { Widget } from '@ds/uikit-product-widget';

export function LoadingState() {
  return (
    <Widget
      header={{ title: 'Billing', href: '#' }}
      state='loading'
      loadingState={{ showSkeleton: true }}
      actions={[{ label: 'Refresh' }]}
    >
      Billing summary
    </Widget>
  );
}
```

### Error и повтор

onClickUpdate переключает state обратно в default

```tsx
import { Widget } from '@ds/uikit-product-widget';
import { useState } from 'react';

export function ErrorState() {
  const [state, setState] = useState<'default' | 'error'>('error');

  return (
    <Widget
      header={{ title: 'Monitoring', href: '#' }}
      state={state}
      errorState={{
        errorTitle: 'Metrics are unavailable',
        errorDescription: 'Try reloading the widget.',
        updateButtonLabel: 'Reload',
        onClickUpdate: () => setState('default'),
      }}
    >
      {state === 'error' ? 'Metrics' : 'Metrics loaded successfully.'}
    </Widget>
  );
}
```

## Props

**WidgetProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `actions` | `Action` \| `BaseAction` \| `ButtonDroplistProps` \| `ButtonKebabProps` | — | Действия в шапке/footer. |
| `actionsChildren` | `ReactNode` | — | Дополнительный слот рядом с действиями. |
| `children` | `ReactNode` | — | Контент виджета. |
| `className` | `string` | — | Дополнительный CSS-класс. |
| `data-test-id` | `string` | — |  |
| `errorState` | `WidgetErrorStateProps` | — | Настройки error-состояния. |
| `header` | `WidgetHeaderProps` | — | Пропсы кликабельного заголовка. |
| `layoutType` | `"desktop"` \| `"mobile"` | — |  |
| `loadingState` | `WidgetLoadingStateProps` | — | Настройки loading-состояния. |
| `segmentControl` | `SegmentControlProps` | — | Пропсы SegmentControl в шапке. |
| `state` | `"default"` \| `"error"` \| `"loading"` | — | Состояние виджета. |
| `wide` | `boolean` | — | Desktop wide-layout. На mobile принудительно выключается. |

#### Related types

- `Action` = `ButtonAction | OutlineAction | TonalAction | FunctionAction | SimpleAction | KebabAction | DroplistAction`

**BaseAction**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `hidden` | `boolean \| undefined` | — | Скрыть действие без удаления из массива. |
| `tooltip` | `TooltipProps` | — | Tooltip вокруг кнопки действия. |

**ButtonDroplistProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `button` | `ButtonProps` | — |  |
| `list` | `WidgetActionListProps` | — |  |

**ButtonKebabProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `button` | `ButtonProps` | — |  |
| `list` | `WidgetActionListProps` | — |  |

**WidgetActionListProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string \| undefined` | — |  |
| `closeDroplistOnItemClick` | `boolean \| undefined` | — |  |
| `items` | `WidgetActionListEntry` \| `WidgetActionListGroup` \| `WidgetActionListItem` | — |  |
| `onOpenChange` | `((open: boolean) => void) \| undefined` | — |  |
| `open` | `boolean \| undefined` | — |  |

**WidgetErrorStateProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `errorDescription` | `string \| undefined` | — | Описание ошибки. |
| `errorIcon` | `InfoBlockProps` | — | Иконка InfoBlock. |
| `errorTitle` | `string \| undefined` | — | Заголовок ошибки. |
| `onClickUpdate` | `(event: MouseEvent<HTMLElement, MouseEvent>) => void` | — | Клик по кнопке повтора. |
| `updateButtonLabel` | `string \| undefined` | — | Текст кнопки повтора. |

**WidgetHeaderProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `avatar` | `AvatarProps` | — |  |
| `children` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — | Кастомное содержимое вместо title/before |
| `className` | `string \| undefined` | — | CSS-класс |
| `fullWidth` | `boolean \| undefined` | — | Занимает ли всю ширину |
| `icon` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `title` | `string \| undefined` | — | Заголовок |
| `titleTag` | `ElementType \| undefined` | — | Тег заголовка для семантики (например `'h2'`, `'h3'`, `'span'`) |

- `WidgetLayoutType` = `"desktop"` \| `"mobile"`

**WidgetLoadingStateProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `loadingContent` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — | Кастомный контент для состояния загрузки. |
| `showSkeleton` | `boolean \| undefined` | — | Показывать skeleton-заглушку в body. |

- `WidgetState` = `"default"` \| `"error"` \| `"loading"`

## Смотри также

- **`TitleClickable`** — заголовок-ссылка в шапке виджета.
- **`SegmentControl`** — переключатель вкладок в шапке.
- **`InfoBlock`** — блок ошибки внутри `state='error'`.

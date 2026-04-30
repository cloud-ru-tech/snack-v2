# PortalContext

`@ds/portal-context` — React Context, который задаёт DOM-узел для портальных компонентов (Tooltip, Popover, Dropdown, Modal, Drawer).

`@ds/portal-context` — служебный пакет: задаёт через React Context корневой DOM-узел, в который компоненты дизайн-системы рендерят порталы (`Tooltip`, `Popover`, `Dropdown`, `Modal`, `Drawer` и др.). По умолчанию портал монтируется в `document.body`; контекст нужен, когда DS работает внутри shadow DOM, iframe или встроенного приложения с собственным rooted DOM.

## Когда использовать

- DS встраивается в micro-frontend / shadow DOM — `document.body` недоступен или принадлежит host-приложению.
- Необходимо поднимать stacking-контекст всех порталов в один контейнер (например, ради scoped CSS).
- E2E или Storybook-тесты — портал нужно монтировать в фиксированный узел `iframe`.

В обычном SPA-приложении провайдер не требуется — компоненты по умолчанию используют `document.body`.

## Установка

```bash
pnpm add @ds/portal-context
```

```ts
import { PortalContextProvider } from '@ds/portal-context'
```

## Примеры использования

### Кастомный root через PortalContext

Портал монтируется в указанный ref, а не в `document.body`.

```tsx
import { useRef } from 'react';
import { createPortal } from 'react-dom';

import { PortalContextProvider, usePortalContext } from '@ds/portal-context';

function PortalChild() {
  const root = usePortalContext();

  if (!root.current) return null;

  return createPortal(<span>Я отрендерен в кастомном root-узле через PortalContext</span>, root.current);
}

export function CustomRoot() {
  const root = useRef<HTMLDivElement>(null);

  return (
    <div style={{ display: 'flex', gap: 12, flexDirection: 'column' }}>
      <PortalContextProvider root={root}>
        <span>Хост-компонент</span>
        <PortalChild />
      </PortalContextProvider>
      <div ref={root} data-test-id='portal-root' />
    </div>
  );
}
```

## Props

**PortalContextProviderProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `root` | `T` | — |  |

## Смотри также

- **Tooltip**, **Popover**, **Dropdown**, **Modal**, **Drawer** — потребители контекста.

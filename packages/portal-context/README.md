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
import { PortalContextProvider, usePortalContext } from '@ds/portal-context';
import { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

function PortalChild() {
  const root = usePortalContext();

  if (!root.current) return null;

  return createPortal(<span>Я отрендерен в кастомном root-узле через PortalContext</span>, root.current);
}

export function CustomRoot() {
  const [node, setNode] = useState<HTMLDivElement | null>(null);
  const root = useMemo(() => ({ current: node }), [node]);

  return (
    <div style={{ display: 'flex', gap: 12, flexDirection: 'column' }}>
      <PortalContextProvider root={root}>
        <span>Хост-компонент</span>
        <PortalChild />
      </PortalContextProvider>
      <div ref={setNode} data-test-id='portal-root' />
    </div>
  );
}
```

### Каскад тем: разные корни порталов

Два блока со своей темой и своим корнем порталов. Тултип и поповер из тёмного блока рендерятся в тёмной теме, из светлого — в светлой, потому что каждый монтируется в DOM-узел своего блока.

```tsx
import { Button } from '@ds/button';
import { Popover } from '@ds/popover';
import { PortalContextProvider } from '@ds/portal-context';
import { COLOR_SCHEME, ColorScheme, useThemeClassnames } from '@ds/theme';
import { Tooltip } from '@ds/tooltip';
import { useRef } from 'react';

import styles from './CascadingThemes.module.scss';

// Тематический блок: useThemeClassnames форсит colorScheme и эмитит полный набор sn-* на свой div.
// Этот же div — корень порталов блока (PortalContextProvider root={paneRef}), поэтому тултип и
// поповер монтируются ВНУТРЬ него и наследуют тему блока через CSS-каскад токенов.
function ThemedPane({ scheme, title }: { scheme: ColorScheme; title: string }) {
  const themeClassName = useThemeClassnames({ colorScheme: scheme });
  const paneRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={paneRef} className={`${styles.pane} ${themeClassName}`}>
      <PortalContextProvider root={paneRef}>
        <p className={styles.paneTitle}>{title}</p>
        <Tooltip tip='Тултип рендерится в теме своего блока' placement='top'>
          <Button label='Навести — тултип' appearance='primary' view='filled' />
        </Tooltip>
        <Popover content='Поповер — тоже в теме блока' placement='bottom' trigger='click'>
          <Button label='Кликнуть — поповер' appearance='neutral' view='outline' />
        </Popover>
      </PortalContextProvider>
    </div>
  );
}

export function CascadingThemes() {
  return (
    <div className={styles.grid}>
      <ThemedPane scheme={COLOR_SCHEME.Dark} title='Тёмный блок' />
      <ThemedPane scheme={COLOR_SCHEME.Light} title='Светлый блок' />
    </div>
  );
}
```

## Props

**PortalContextProviderProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `root` | `RefObject<HTMLElement \| null>` | — |  |

## Смотри также

- **Tooltip**, **Popover**, **Dropdown**, **Modal**, **Drawer** — потребители контекста.

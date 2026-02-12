# Portal Context

Контекст задаёт корневой DOM-узел, в который компоненты (Tooltip, Popover и др.) рендерят порталы. По умолчанию используется `document.body`. Через проп `root` можно указать другой контейнер — например, область внутри iframe или изолированный блок для тестов и изоляции стилей.

## Installation

```bash
npm install @design-system/portal-context
# or
yarn add @design-system/portal-context
# or
pnpm add @design-system/portal-context
```

## Exports





## Usage

### Базовое использование

```tsx
import { PortalContextProvider } from '@design-system/portal-context';

export function App() {
  return (
    <PortalContextProvider>
      <YourApp />
    </PortalContextProvider>
  );
}
```

### Кастомный контейнер для порталов

```tsx
import { useRef } from 'react';
import { PortalContextProvider } from '@design-system/portal-context';

export function App() {
  const portalRootRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={portalRootRef} className="portal-container">
      <PortalContextProvider root={portalRootRef}>
        <YourApp />
      </PortalContextProvider>
    </div>
  );
}
```

### Использование в компонентах с порталами

```tsx
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { usePortalContext } from '@design-system/portal-context';

function PortalContent() {
  const portalRoot = usePortalContext();
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const el = portalRoot?.current ?? null;
      if (el) setTarget(el);
    });
    return () => cancelAnimationFrame(id);
  }, [portalRoot]);

  if (!target) return null;
  return createPortal(<div>Контент портала</div>, target);
}
```

## Props

### PortalContextProviderProps
| name | type | default value | description |
|------|------|---------------|-------------|
| root | `RefObject<HTMLElement>` | - |  |

## Best Practices

1. **Один провайдер на приложение** — оборачивайте корень приложения в один `PortalContextProvider`; вложенные провайдеры переопределяют корень для своего поддерева.
2. **Кастомный root для iframe и изоляции** — при встраивании в iframe или нужде изолировать порталы передавайте `root` на контейнер внутри нужной области.
3. **Тесты** — в тестах передавайте `root` на контейнер внутри тестового DOM, чтобы порталы не уходили в общий `document.body` и не мешали другим тестам.

---

## Additional Resources

- **Full Documentation:** [View documentation](./docs/index.mdx)
- **Changelog:** [View changelog](./CHANGELOG.md)
- **Migration Guide:** [View migration guide](./MIGRATION.md)

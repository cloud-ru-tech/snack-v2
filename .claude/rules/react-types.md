# Типы React

**Scope:** `**/*.{ts,tsx}`.

Не обращайся к типам через `React.*`. Импортируй именованные типы из `'react'` напрямую и используй по имени (`ReactNode`, `CSSProperties`, `ComponentType`, `ElementType`, `HTMLAttributes<T>`, `ComponentPropsWithoutRef<T>`, `MouseEvent<T>`, …).

```ts
// ❌ children: React.ReactNode;  } & React.HTMLAttributes<HTMLDivElement>;  as?: React.ElementType;
// ✅ import { ReactNode, HTMLAttributes, ElementType } from 'react'
//    children: ReactNode;  } & HTMLAttributes<HTMLDivElement>;  as?: ElementType;
```

- То же в комментариях и доках: «ReactNode из `react`», не `React.ReactNode`.
- `React.FC` / `React.FunctionComponent` — не использовать; типизируй пропсы явным объектным типом.
- Импорт типов — без `type`, одним импортом со значениями. См. [imports-exports.md](./imports-exports.md).

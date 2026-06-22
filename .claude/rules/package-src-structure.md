# Файловая структура пакета — `src/`

**Область действия:** все пакеты в `packages/*`.

## Принцип

Структура `src/` каждого пакета **сохраняется как есть** при портировании и не пере-раскладывается в «плоский» вид. Исторический источник — дизайн-система `@design-system/*`; там приняты две формы раскладки в зависимости от количества компонентов.

> При миграции компонентного пакета из `storybook/packages/<pkg>/src` в `packages/<pkg>/src` **не уплощай** вложенность. Перенос — 1:1 по файлам. Меняется только скоуп импортов (`@design-system/*` → `@ds/*`) и путь Figma-переменных (`@sbercloud/...` → `@cloud-ru/...`).

## Две допустимые формы

### 1. Flat — один компонент, ≤ 5 файлов

Используется, если пакет экспортирует один компонент без внутренних под-компонентов или приватных хелперов.

```text
packages/link/src/
├── Link.tsx
├── constants.ts
├── index.ts           ← export { Link } from './Link'; export { ... } from './constants'; export * from './types'
├── styles.module.scss
└── types.ts
```

Эталон: `link`, `counter`, `avatar`.

### 2. Nested — несколько компонентов или приватные хелперы

Используется, если пакет экспортирует несколько компонентов, имеет внутренние под-компоненты или приватную логику, которую не хочется поднимать в корень `src/`.

```text
packages/tabs/src/
├── components/
│   ├── ScrollButton/
│   │   ├── ScrollButton.tsx
│   │   ├── index.ts            ← export * from './ScrollButton'
│   │   └── styles.module.scss
│   ├── Tab/
│   │   ├── Tab.tsx
│   │   ├── index.ts
│   │   └── styles.module.scss
│   ├── TabBar/
│   │   ├── TabBar.tsx
│   │   ├── hooks.ts            ← приватные хуки компонента
│   │   ├── index.ts
│   │   └── styles.module.scss
│   ├── TabContent/
│   │   ├── TabContent.tsx
│   │   └── index.ts
│   ├── Tabs/
│   │   ├── Tabs.tsx
│   │   ├── index.ts
│   │   └── styles.module.scss
│   └── index.ts                ← export * из каждой папки компонента
├── constants.ts
├── context.tsx                 ← общий React context пакета
├── index.ts                    ← export * по секциям
├── types.ts
└── utils.ts
```

Эталоны: `tabs`, `tooltip`, `progress-bar`, `popover`.

## Правила внутри `components/<Name>/`

- Файл компонента — `<Name>.tsx` (`Tabs.tsx`, `TabBar.tsx`, `Popover.tsx`).
- `index.ts` — исключительно `export * from './<Name>'`. Никаких других символов.
- Стили — `styles.module.scss` рядом с `<Name>.tsx`.
- Приватные хуки компонента — `hooks.ts` в той же папке.
- Приватные типы компонента — `types.ts` в той же папке (если существенно расходятся с глобальными типами пакета, которые живут в `src/types.ts`).
- Приватные утилиты — `utils.ts` в той же папке.

Не создавай `Name.constants.ts`, `Name.types.ts`, `Name.utils.ts` (dot-prefix) — это был «flat»-вариант трансформации, он **не применяется**.

## Корневой `src/index.ts` пакета

Реэкспорт по секциям через `export *` (см. [imports-exports.md](./imports-exports.md)):

```ts
export * from './components'
export * from './constants'
export * from './context'
export * from './types'
export * from './utils'
```

Если `export *` слишком широк и тянет приватное наружу — пиши явный список без `type` (см. примеры в imports-exports).

## Стили

- `styles.module.scss` — рядом с файлом компонента.
- Shared-токены и миксины пакета — `src/shared/styles.module.scss` или `src/mixins.scss` (если появляется такая необходимость, но это редкий случай).
- Никаких глобальных CSS без `.module.` — все стили scoped по CSS-modules.

## Типы и константы уровня пакета

- `src/constants.ts` — константы, доступные на уровне всего пакета (APPEARANCE, SIZE, POSITION, …).
- `src/types.ts` — типы уровня пакета, прокидываемые как публичный API.
- Если требуется контекст — `src/context.tsx` (React Context + провайдер).

## Выбор формы при создании нового пакета

| Условие | Форма |
|---------|-------|
| Один публичный компонент, нет внутренних под-компонентов | Flat |
| Два и более публичных компонента | Nested |
| Один компонент, но с приватными под-компонентами / большой внутренней структурой | Nested |
| Исторически мигрируется из `storybook/packages/` | Сохраняем исходную форму 1:1 |

## Что нельзя

- **Не** создавай файлы с точкой-префиксом: `Button.constants.ts`, `Button.types.ts`, `Button.utils.ts`. Это уплощённая нотация, она здесь не применяется.
- **Не** перемещай файлы из `src/components/<Name>/` в корень `src/` при миграции. Даже если кажется, что компонент «маленький».
- **Не** сливай `styles.module.scss` нескольких компонентов в один общий файл ради «упрощения».
- **Не** выноси внутренние хелперы `<Name>/hooks.ts` в корень `src/` без необходимости.

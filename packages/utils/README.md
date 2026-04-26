# Utils

`@ds/utils` — Хуки и хелперы для React-компонентов — темы, controlled/uncontrolled, дебаунс, свайпы, модалки, персист данных, пропы и SSR.

Пакет с хуками и хелперами для разработки React-компонентов: темы, controlled/uncontrolled состояние, дебаунс, свайпы, модалки, персист данных, работа с пропами и SSR.

## Установка

```bash
pnpm add @ds/utils
```

## useThemeConfig

Возвращает текущую тему, CSS-класс из `themeMap` и функцию переключения `changeTheme`.

```tsx
import { useThemeConfig } from '@ds/utils';

const themeMap = { light: 'sn-light', dark: 'sn-dark' };

function Example() {
  const theme = useThemeConfig({ themeMap, defaultTheme: 'light' });
  return (
    <div className={theme.themeClassName}>
      <button type="button" onClick={() => theme.changeTheme('dark')}>
        Тёмная тема
      </button>
    </div>
  );
}
```

## ThemeProvider и useThemeContext

**ThemeProvider** — провайдер темы по `themeMap` и `defaultTheme`. **useThemeContext** — доступ к текущей теме и `changeTheme` из контекста.

```tsx
import { ThemeProvider, useThemeContext } from '@ds/utils';

const themeMap = { light: 'sn-light', dark: 'sn-dark' };

function ThemedContent() {
  const { theme, themeClassName, changeTheme } = useThemeContext();
  return <div className={themeClassName}>Тема: {theme}</div>;
}

function App() {
  return (
    <ThemeProvider themeMap={themeMap} defaultTheme="light">
      <ThemedContent />
    </ThemeProvider>
  );
}
```

## useValueControl

Поддержка controlled/uncontrolled: один интерфейс для `value`/`defaultValue` и `onChange`.

```tsx
import { useValueControl } from '@ds/utils';

function Toggle({ value, defaultValue, onChange }) {
  const [open, setOpen] = useValueControl({ value, defaultValue, onChange });
  return (
    <button type="button" onClick={() => setOpen(!open)}>
      {open ? 'Закрыть' : 'Открыть'}
    </button>
  );
}
```

## useDebounce

Возвращает стабильный коллбек, который вызывается с задержкой после последнего вызова.

```tsx
import { useDebounce } from '@ds/utils';

function Search() {
  const handleSearch = useDebounce(() => {
    console.log('Поиск по запросу...');
  }, 300);
  return <input onChange={handleSearch} />;
}
```

## useEventHandler

Возвращает обработчик с неизменной ссылкой: внутри всегда вызывается актуальная функция, без лишних ре-рендеров дочерних компонентов.

```tsx
import { useEventHandler } from '@ds/utils';

function List({ items, onItemClick }) {
  const handleClick = useEventHandler(onItemClick);
  return items.map((item) => (
    <div key={item.id} onClick={handleClick} role="presentation">
      {item.name}
    </div>
  ));
}
```

## useLayoutEffect (SSR-безопасный)

Из пакета экспортируется `useLayoutEffect`: в браузере это обычный useLayoutEffect, в SSR — useEffect.

```tsx
import { useRef } from 'react';
import { useLayoutEffect } from '@ds/utils';

function Measure() {
  const ref = useRef(null);
  useLayoutEffect(() => {
    if (ref.current) console.log(ref.current.getBoundingClientRect());
  }, []);
  return <div ref={ref}>...</div>;
}
```

## useDynamicList

Делит список на видимые и скрытые элементы по ширине контейнера.

```tsx
import { useRef } from 'react';
import { useDynamicList } from '@ds/utils';

function Tabs({ items }) {
  const containerRef = useRef(null);
  const { visibleItems, hiddenItems } = useDynamicList({
    items,
    parentContainerRef: containerRef,
    maxVisibleItems: 5,
  });
  return (
    <div ref={containerRef}>
      {visibleItems.map((item) => (
        <span key={item.id}>{item.label}</span>
      ))}
      {hiddenItems.length > 0 && <span>…</span>}
    </div>
  );
}
```

## useSwipeable

Обработка свайпов (на базе react-swipeable).

```tsx
import { useSwipeable } from '@ds/utils';

function SwipeCard() {
  const handlers = useSwipeable({
    onSwipedLeft: () => console.log('свайп влево'),
    onSwipedRight: () => console.log('свайп вправо'),
    availableDirections: ['LEFT', 'RIGHT'],
  });
  return <div {...handlers}>Свайпни меня</div>;
}
```

## useModalOpenState

Подключает к модалке закрытие по кнопке «Назад» (popstate) и по CloseWatcher.

```tsx
import { useModalOpenState } from '@ds/utils';

function Modal({ open, onClose }) {
  useModalOpenState(open, onClose, {
    closeOnPopstate: true,
    closeByCloseWatcher: true,
  });
  return open ? <div role="dialog">...</div> : null;
}
```

## usePopstateSubscription

Подписка на событие `popstate`.

```tsx
import { usePopstateSubscription } from '@ds/utils';

function SyncWithHistory() {
  usePopstateSubscription((e) => {
    console.log('Навигация назад/вперёд', e.state);
  }, true);
  return null;
}
```

## useDataPersist

Чтение и запись состояния в localStorage и в query-параметрах URL.

```tsx
import { useState } from 'react';
import { useDataPersist } from '@ds/utils';

const options = {
  queryKey: 'filter',
  localStorageKey: 'my-filter',
  validateData: (v): v is { query: string } => typeof v?.query === 'string',
};

function FilterState() {
  const { getDefaultData, setDataToStorages } = useDataPersist({ options });
  const [filter, setFilter] = useState(getDefaultData ?? { query: '' });
  const save = () => setDataToStorages(filter);
  return <input value={filter.query} onChange={(e) => setFilter({ query: e.target.value })} onBlur={save} />;
}
```

## excludeSupportProps, extractSupportProps, extractDataTestProps

```tsx
import { excludeSupportProps, extractSupportProps, extractDataTestProps } from '@ds/utils';

const props = {
  'data-test-id': 'submit-btn',
  'aria-label': 'Отправить',
  onClick: () => {},
  className: 'btn',
};

const restProps = excludeSupportProps(props);
const supportProps = extractSupportProps(props);
const dataTestProps = extractDataTestProps(props);
```

## isBrowser

```tsx
import { isBrowser } from '@ds/utils';

if (isBrowser()) {
  window.addEventListener('resize', handler);
}
```

## Типы: ValueOf, WithSupportProps

```tsx
import type { ValueOf, WithSupportProps } from '@ds/utils';

const sizes = { sm: 'small', md: 'medium', lg: 'large' } as const;
type Size = ValueOf<typeof sizes>;

type ButtonProps = WithSupportProps<{
  label: string;
  variant: 'primary' | 'secondary';
}>;
```

## Storybook

Интерактивные примеры: **Utils / Theme Config** в локальном Storybook (`pnpm dev:storybook`).

## Практики

1. **useIsomorphicLayoutEffect** вместо useLayoutEffect для SSR.
2. **excludeSupportProps** — перед передачей пропов в DOM; **extractSupportProps** — для обёртки (data-test-id, aria-*).
3. **useValueControl** — для компонентов с controlled/uncontrolled режимом.
4. **useModalOpenState** — закрытие по истории (popstate) и CloseWatcher.

## ThemeProvider

```tsx
import { ThemeProvider } from '@ds/utils'

export function Example() {
  return <ThemeProvider>Click me</ThemeProvider>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Дети, которые будут обёрнуты в провайдер |
| `themeMap` | `Record<string, string>` | — | Объект с указанием соответсвия темы и css-класса |
| `defaultTheme` | `string` | — | Значение темы по умолчанию |

## useThemeConfig

```tsx
import { useThemeConfig } from '@ds/utils'

// Используйте хук внутри React-компонента (см. разделы выше в этом README).
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `themeMap` | `Record<T, string>` | — | Объект с указанием соответсвия темы и css-класса |

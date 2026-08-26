# CardVacancy

`@ds/site-card-vacancy` — Карточка-ссылка вакансии с заголовком и описанием, нейтральным или акцентным фоном, hover/pressed-состояниями и фокусом.

Карточка вакансии — интерактивный блок (по умолчанию нативный `<a>`) с заголовком и описанием. Используется в списках вакансий HR-портала: клик ведёт на детальную страницу. Заголовок и описание усекаются многоточием, фон задаётся через `appearance`, состояния hover/pressed реализованы через state-layer, фокус — через `:focus-visible`.

## Когда использовать
- Элемент списка вакансий, ведущий на детальную страницу.
- Промо-блок вакансии с акцентным фоном (`appearance='primary'`).
- Компактная карточка в мобильной раскладке (`mobile`).

Когда **не** нужен:

- Inline-ссылка в тексте:
  - используйте **`@ds/link`**.
- Кнопка-действие без перехода:
  - используйте **`@ds/button`**.
- Строка списка «лейбл — значение»:
  - используйте **`@ds/uikit-product-info-row`**.

## Анатомия

Карточка собрана слоями (как в `@ds/button`):

- `background` — фон по `appearance`.
- `stateLayer` — overlay hover/pressed на токенах `material/stateLayer`.
- `content` — колонка с заголовком сверху и описанием снизу.

### Appearance (default `neutral`)

- `neutral` — нейтральный полупрозрачный фон (`neutral/decorTransparent`), тёмный заголовок и приглушённое описание.
- `primary` — акцентный фон `primary/accent` с декоративным паттерном концентрических колец, заголовок и описание цветом `onAccent`.

### Mobile (default `false`)

Компактная мобильная версия. Меняются высота и типографика:

- высота — 160 (desktop) → 120 (mobile);
- заголовок — `title/l` (desktop) → `title/m` (mobile);
- описание — `body/m` (desktop) → `body/s` (mobile).

Внутренний отступ фиксированный — `primitive/dimension/24` (24px).

### Slots

- `title` — заголовок вакансии (`Typography variant='title'`), однострочное усечение.
- `description` — описание под заголовком (`Typography variant='body'`), однострочное усечение.

### Полиморфизм

Корень полиморфен через `as` (default `'a'`):

- `as='a'` — карточка-ссылка; при `target='_blank'` автоматически проставляется `rel='noopener noreferrer'`.
- `as='button'` — карточка-кнопка для онклик-сценариев.
- `as={Link}` — роутерный компонент (react-router и т.п.).

Ref пробрасывается через `innerRef`.

## Установка
```bash
pnpm add @ds/site-card-vacancy
```

```ts
import { CardVacancy } from '@ds/site-card-vacancy'
```

## Примеры использования
### Нейтральная карточка

```tsx
import { CardVacancy } from '@ds/site-card-vacancy';

export function Neutral() {
  return <CardVacancy href='#frontend' title='Frontend Developer' description='Remote · Full-time' />;
}
```

### Акцентная карточка

```tsx
import { APPEARANCE, CardVacancy } from '@ds/site-card-vacancy';

export function Primary() {
  return (
    <CardVacancy
      href='#lead'
      appearance={APPEARANCE.Primary}
      title='Lead Product Designer'
      content='Hybrid · Full-time'
    />
  );
}
```

### Мобильная версия

```tsx
import { APPEARANCE, CardVacancy } from '@ds/site-card-vacancy';

export function Mobile() {
  return (
    <CardVacancy
      href='#mobile'
      mobile
      appearance={APPEARANCE.Primary}
      title='Backend Engineer'
      content='Remote · Contract'
    />
  );
}
```

### Внешняя ссылка

```tsx
import { CardVacancy } from '@ds/site-card-vacancy';

export function External() {
  return (
    <CardVacancy
      href='https://example.com/careers/devops'
      target='_blank'
      title='DevOps Engineer'
      description='Remote · Full-time'
    />
  );
}
```

### Как кнопка (полиморфизм)

```tsx
import { CardVacancy } from '@ds/site-card-vacancy';
import { useState } from 'react';

export function Polymorphic() {
  const [opened, setOpened] = useState(0);

  return (
    <CardVacancy
      as='button'
      type='button'
      title='Data Analyst'
      description={opened ? `Opened ${opened} time(s)` : 'Click to open'}
      onClick={() => setOpened(count => count + 1)}
    />
  );
}
```

## Props
**CardVacancyProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `appearance` | `"neutral"` \| `"primary"` | `neutral` | Визуальный вид карточки: <br/> - `neutral` — нейтральный полупрозрачный фон, тёмный заголовок. <br/> - `primary` — акцентный фон `primary` с декоративным паттерном, текст `onAccent`. |
| `as` | `ElementType` | — | Полиморфный тег корня — `'a'` по умолчанию (карточка-ссылка), либо роутерный `Link` / `'button'` / `'div'`. |
| `className` | `string` | — | CSS-класс корневого элемента. |
| `data-test-id` | `string` | — |  |
| `description` | `string` | — | Описание под заголовком. Обрезается многоточием, если не помещается в одну строку. |
| `innerRef` | `PolymorphicRef` | — | Ref на корневой элемент. |
| `mobile` | `boolean` | `false` | Компактная мобильная версия — меньшая высота и более мелкая типографика. |
| `title` | `string` | — | Заголовок вакансии. Обрезается многоточием, если не помещается в одну строку. |

#### Related types

- `Appearance` = `"neutral"` \| `"primary"`

- `PolymorphicRef` = `ComponentPropsWithRef<T>["ref"]`

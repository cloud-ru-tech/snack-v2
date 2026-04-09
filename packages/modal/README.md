# Modal

Модальное окно для подтверждений, форм и важных сообщений. Компонент **Modal** собирает шапку (изображение, заголовок, подзаголовок, кнопка «назад», слот рядом с заголовком), прокручиваемое тело и опциональный футер. Полный контроль над разметкой — через **ModalCustom** и `ModalCustom.Header` / `Body` / `Footer`.

## Installation

```bash
npm install @design-system/modal
# or
yarn add @design-system/modal
# or
pnpm add @design-system/modal
```

## Exports

```typescript
import {
  MODE,
  WIDTH,
  TEST_IDS,
  Modal,
  ModalCustom,
  type ModalCustomProps,
  type ModalProps,
  type ModalHeaderImage,
  type ModalMode,
  type ModalWidth
} from '@design-system/modal';
```

## Live examples

### Базовое использование

```tsx
import { Button, ButtonGroup } from '@design-system/button';
import { Modal } from '@design-system/modal';
import { useState } from 'react';

export function Example() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <Button appearance='primary' label='Открыть модальное окно' view='filled' onClick={() => setOpen(true)} />
      <Modal
        open={open}
        onClose={close}
        title='Заголовок'
        subtitle='Краткое описание действия или контекста'
        media={
          <img
            alt='Иллюстрация в шапке'
            className={styles.image}
            src={imageSrc(exampleHeaderImage as string | { src: string })}
          />
        }
        content={<p>Основной контент: форма, предупреждение или поясняющий текст.</p>}
        footer={
          <ButtonGroup
            primaryAction={{ label: 'Продолжить', view: 'filled', onClick: close }}
            secondaryAction={{ label: 'Отмена', appearance: 'neutral', view: 'outline', onClick: close }}
          />
        }
      />
    </>
  );
}
```


## Usage

### Базовый пример

```tsx
import { Modal } from '@design-system/modal';
import { useState } from 'react';

export function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type='button' onClick={() => setOpen(true)}>
        Открыть
      </button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title='Заголовок'
        content={<p>Контент</p>}
      />
    </>
  );
}
```

### С футером и кнопкой «назад»

```tsx
import { Modal } from '@design-system/modal';
import { useState } from 'react';

export function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type='button' onClick={() => setOpen(true)}>
        Открыть
      </button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title='Редактирование'
        onBackButtonClick={() => setOpen(false)}
        content={<form>{/* поля */}</form>}
        footer={<div className='actions'>{/* подтверждение / отмена */}</div>}
      />
    </>
  );
}
```

### Режимы `regular`, `aggressive`, `forced`

```tsx
import { Modal, MODE } from '@design-system/modal';
import { useState } from 'react';

export function ForcedNotice() {
  const [open, setOpen] = useState(true);

  return (
    <Modal
      mode={MODE.Forced}
      open={open}
      title='Требуется действие'
      content={<p>Закрытие только после выполнения сценария в контенте.</p>}
      onClose={() => setOpen(false)}
    />
  );
}
```

## Props

### ModalProps
| name | type | default value | description |
|------|------|---------------|-------------|
| onClose* | `() => void` | - | Колбэк закрытия |
| content* | `ReactNode` | - | Основной контент |
| onBackButtonClick | `() => void` | - | Действие при клике по кнопке «назад». Отсутствие скрывает кнопку |
| title | `string` | - | Заголовок |
| slotAfterHeadline | `ReactNode` | - | Слот после заголовка |
| subtitle | `ReactNode` | - | Подзаголовок |
| truncate | `{ title?: number; subtitle?: number; }` | title: 1; subtitle (string): 2 | Максимальное число строк перед обрезкой (`TruncateString`). Для `subtitle` типа `string` — по умолчанию 2 строки; для произвольного `ReactNode` не применяется. |
| open | `boolean` | - | Управление состоянием показан/не показан |
| mode | enum ModalMode: `"regular"`, `"aggressive"`, `"forced"` | regular | Режим закрытия: Regular — overlay, Esc и кнопка; Aggressive — только кнопка; Forced — без кнопки и без overlay/Esc. blur подложки — только у Aggressive и Forced. |
| rootClassName | `string` | - | CSS-класс корневого слоя портала |
| width | enum ModalWidth: `"s"`, `"m"`, `"l"` | s | Размер окна |
| heightAuto | `boolean` | true | Растягивать по высоте в пределах контейнера |
| container | `ModalContainer` | - | Явный DOM-контейнер для `createPortal`. Если не задан — используется `usePortalContext()` (например `PortalContextProvider` из `@design-system/portal-context`), иначе `document.body`. |
| closeOnPopstate | `boolean` | - | Закрытие при навигации по истории |
| media | `ReactNode` | - | Медиа-контент |
| footer | `ReactNode` | - | Контент футера |
| className | `string` | - | CSS-класс для окна |
| loading | `boolean` | - | Состояние загрузки: в теле показывается спиннер или `loadingState`, футер скрыт |
| loadingState | `ReactNode` | - | Контент тела вместо спиннера при `loading` |
### ModalCustomProps
| name | type | default value | description |
|------|------|---------------|-------------|
| children* | `ReactNode` | - | Содержимое окна (композиция Header/Body/Footer) |
| onClose* | `() => void` | - | Колбэк закрытия |
| open | `boolean` | - | Управление состоянием показан/не показан |
| mode | enum ModalMode: `"regular"`, `"aggressive"`, `"forced"` | regular | Режим закрытия: Regular — overlay, Esc и кнопка; Aggressive — только кнопка; Forced — без кнопки и без overlay/Esc. blur подложки — только у Aggressive и Forced. |
| className | `string` | - | CSS-класс окна |
| rootClassName | `string` | - | CSS-класс корневого слоя портала |
| width | enum ModalWidth: `"s"`, `"m"`, `"l"` | s | Размер окна |
| heightAuto | `boolean` | true | Растягивать по высоте в пределах контейнера |
| container | `ModalContainer` | - | Явный DOM-контейнер для `createPortal`. Если не задан — используется `usePortalContext()` (например `PortalContextProvider` из `@design-system/portal-context`), иначе `document.body`. |
| closeOnPopstate | `boolean` | - | Закрытие при навигации по истории |

## Best Practices

1. **Держите `open` и `onClose` снаружи** — единый источник правды (URL, store, родитель) предотвращает «залипание» окна и рассинхрон с анимациями.
2. **Режим `forced` — осознанно** — без кнопки закрытия и без Escape пользователь должен явно завершить сценарий в контенте; не злоупотребляйте для обычных диалогов.
3. **`closeOnPopstate`** — включайте, если модалка должна закрываться при навигации «назад», в одном стиле с Drawer и другими оверлеями.
4. **Футер для главных действий** — подтверждение и отмена удобно держать в `footer`, чтобы они не уезжали при прокрутке длинного тела.
5. **Тесты** — для стабильных селекторов можно использовать `TEST_IDS` из пакета.

---

## Additional Resources

- **Full Documentation:** [View documentation](./docs/index.mdx)
- **Changelog:** [View changelog](./CHANGELOG.md)
- **Migration Guide:** [View migration guide](./MIGRATION.md)

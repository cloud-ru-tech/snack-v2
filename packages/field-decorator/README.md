# FieldDecorator

`@ds/field-decorator` — Структурная обёртка label/caption/hint/error/length для нестандартных input'ов и сложных композиций.

Низкоуровневый каркас для полей: рендерит блоки label, caption, hint, error, счётчик length и звёздочку required, а в `children` подставляется любой input или композиция (`@ds/input-private`, дата-пикеры, селекты).

Пакет отдаёт три публичных компонента:

- `Label` — строка заголовка: текст, звёздочка required, question-tooltip и подпись caption.
- `Hint` — подвал поля: подсказка/ошибка со статус-иконкой по валидации и счётчик length.
- `FieldDecorator` — композиция `Label` + `children` + `Hint` в единой сетке.

## Когда использовать

- Когда нужно обернуть нестандартный input в типовую разметку поля.
- Когда `FieldText` / `FieldSecure` не подходят:
  - отдельный date-picker;
  - masked input;
  - кастомная композиция со счётчиком `length` или валидационной подсказкой.

## Анатомия

### Size (default `m`)

| Значение | Когда |
|----------|-------|
| `s` | Плотные таблицы, inline-редактирование |
| `m` | Стандартные формы (по умолчанию) |
| `l` | Лендинги, primary-формы |

### ValidationState (default `default`)

Управляет цветом подсказки и иконкой `showHintIcon`. Проп `error` форсит `error` поверх любого `validationState`. На неактивном поле (`disabled` / `readonly`) иконка валидации не выводится — подсказка нейтральна.

| Значение | Когда |
|----------|-------|
| `default` | Нет валидации |
| `valid` | Нейтральный baseline: подсказка нейтрального цвета (`textTertiary`), без иконки и без зелёной заливки. Поле прошло валидацию, но не требует акцента. Зелёный — только `success` |
| `error` | Не прошло валидацию |
| `warning` | Предупреждение |
| `success` | Подтверждение |

### Состояния (`disabled` / `readonly`)

Оси неактивного поля. Не комбинируются с цветом валидации: на неактивном поле иконка валидации не выводится, счётчик `length` скрыт.

| Значение | Поведение |
|----------|-----------|
| `disabled` | Поле выключено: счётчик скрыт, подсказка нейтральна |
| `readonly` | Только для чтения: то же поведение подвала, что у `disabled` |

### Заголовок (`Label`)

Шапка поля складывается из слотов:

- `label` — текст заголовка; `labelFor` связывает его с input через HTML-атрибут `for`.
- `required` — звёздочка `*` рядом с заголовком, маркирует обязательное поле.
- `labelTooltip` — иконка вопроса с подсказкой (`QuestionTooltip`) после заголовка. Требует `PortalContextProvider` в дереве.
- `caption` — вспомогательная подпись справа в шапке.

### Подвал (`Hint`)

Под содержимым выводится:

- `hint` / `error` — текст подсказки. `error` имеет приоритет над `hint` и форсит `validationState='error'`.
- `length` — счётчик длины `current/max`. Когда `current` превышает `max`, счётчик подсвечивается (`data-limit-exceeded`). На `disabled` / `readonly` счётчик скрыт.

## Установка

```bash
pnpm add @ds/field-decorator
```

```ts
import { FieldDecorator, Label, Hint } from '@ds/field-decorator'
```

## Примеры использования

### Базовая обёртка

FieldDecorator оборачивает InputPrivate в типовую разметку label/hint.

```tsx
import { FieldDecorator } from '@ds/field-decorator';
import { InputPrivate } from '@ds/input-private';
import { useState } from 'react';

export function DecoratorBasic() {
  const [value, setValue] = useState('');
  return (
    <FieldDecorator label='Custom field' hint='FieldDecorator оборачивает любой input' showHintIcon>
      <InputPrivate value={value} onChange={setValue} placeholder='Type here' />
    </FieldDecorator>
  );
}
```

### Счётчик длины

Length показывает «текущая/максимум», обновляется по изменению значения.

```tsx
import { FieldDecorator } from '@ds/field-decorator';
import { InputPrivate } from '@ds/input-private';
import { useState } from 'react';

export function DecoratorLength() {
  const [value, setValue] = useState('');
  return (
    <FieldDecorator
      label='Bio'
      caption='Опционально'
      hint='Кратко расскажите о себе'
      length={{ current: value.length, max: 120 }}
    >
      <InputPrivate value={value} onChange={setValue} maxLength={120} placeholder='Hi there' />
    </FieldDecorator>
  );
}
```

### Превышение лимита

Когда current больше max, счётчик подсвечивается (data-limit-exceeded).

```tsx
import { FieldDecorator } from '@ds/field-decorator';
import { InputPrivate } from '@ds/input-private';
import { useState } from 'react';

export function DecoratorLimitExceeded() {
  const [value, setValue] = useState('Слишком длинное значение, которое превышает лимит');
  return (
    <FieldDecorator
      label='Заголовок'
      hint='Счётчик подсвечивается, когда current превышает max'
      length={{ current: value.length, max: 20 }}
    >
      <InputPrivate value={value} onChange={setValue} placeholder='Введите текст' />
    </FieldDecorator>
  );
}
```

### Подсказка к заголовку

labelTooltip добавляет иконку вопроса после label; required рисует звёздочку. Требует PortalContextProvider.

```tsx
import { FieldDecorator } from '@ds/field-decorator';
import { InputPrivate } from '@ds/input-private';
import { useState } from 'react';

export function DecoratorLabelTooltip() {
  const [value, setValue] = useState('');
  return (
    <FieldDecorator
      label='Идентификатор'
      required
      labelTooltip={{ tip: 'Уникальный идентификатор ресурса. Наведите на иконку рядом с заголовком.' }}
      hint='Подсказка к заголовку выводится через иконку вопроса'
    >
      <InputPrivate value={value} onChange={setValue} placeholder='res-id' />
    </FieldDecorator>
  );
}
```

### Disabled и Readonly

На неактивном поле счётчик скрыт, а иконка валидации не выводится — подсказка нейтральна.

```tsx
import { FieldDecorator } from '@ds/field-decorator';
import { InputPrivate } from '@ds/input-private';

export function DecoratorDisabledReadonly() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <FieldDecorator
        label='Disabled'
        hint='На неактивном поле счётчик скрыт, подсказка нейтральна'
        validationState='error'
        showHintIcon
        disabled
        length={{ current: 5, max: 20 }}
      >
        <InputPrivate value='value' onChange={() => undefined} disabled />
      </FieldDecorator>
      <FieldDecorator
        label='Readonly'
        hint='Readonly также нейтрализует подсказку и прячет счётчик'
        validationState='warning'
        showHintIcon
        readonly
        length={{ current: 5, max: 20 }}
      >
        <InputPrivate value='value' onChange={() => undefined} readonly />
      </FieldDecorator>
    </div>
  );
}
```

### Label отдельно

Строку заголовка можно рендерить самостоятельно — например, над кастомной композицией.

```tsx
import { Label } from '@ds/field-decorator';

export function LabelStandalone() {
  return (
    <Label
      label='Заголовок поля'
      caption='Опционально'
      required
      labelTooltip={{ tip: 'Пояснение к заголовку через иконку вопроса' }}
    />
  );
}
```

### Hint по состояниям валидации

Подсказка меняет цвет и статус-иконку по validationState.

```tsx
import { Hint } from '@ds/field-decorator';

export function HintStandalone() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Hint hint='Нейтральная подсказка под полем' length={{ current: 12, max: 100 }} />
      <Hint hint='Ошибка валидации' validationState='error' showHintIcon />
      <Hint hint='Предупреждение' validationState='warning' showHintIcon />
      <Hint hint='Проверка пройдена' validationState='success' showHintIcon />
    </div>
  );
}
```

## Props

### FieldDecorator

**FieldDecoratorProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `caption` | `string` | — | Вторичная подпись справа |
| `children` | `ReactNode` | — | Содержимое (декорируемое поле) |
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — |  |
| `disabled` | `boolean` | — | Поле выключено |
| `error` | `string` | — | Ошибка (приоритетнее `hint`; форсит `validationState=error`) |
| `hint` | `string` | — | Подсказка |
| `innerRef` | `Ref<HTMLDivElement>` | — | Ref на корневой DOM-элемент |
| `label` | `string` | — | Заголовок |
| `labelFor` | `string` | — | HTML-атрибут `for` для `<label>` |
| `labelTooltip` | `QuestionTooltipProps` | — | Подсказка (question-tooltip) у заголовка |
| `length` | `FieldLength` | — | Счётчик длины `current/max` |
| `readonly` | `boolean` | — | Только для чтения |
| `required` | `boolean` | — | Показать знак обязательности `*` |
| `showHintIcon` | `boolean` | — | Отображение статус-иконки у подсказки |
| `size` | `"l"` \| `"m"` \| `"s"` | `m` | Размер |
| `validationState` | `"default"` \| `"error"` \| `"success"` \| `"valid"` \| `"warning"` | `default` | Состояние валидации |

#### Related types

**FieldLength**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `current` | `number` | — | Текущая длина текста |
| `max` | `number \| undefined` | — | Максимально допустимая длина |

- `Size` = `"l"` \| `"m"` \| `"s"`

- `ValidationState` = `"default"` \| `"error"` \| `"success"` \| `"valid"` \| `"warning"`

### Label

**LabelProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `caption` | `string` | — | Вторичная подпись справа |
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — |  |
| `disabled` | `boolean` | — | Поле выключено |
| `innerRef` | `Ref<HTMLDivElement>` | — | Ref на корневой DOM-элемент |
| `label` | `string` | — | Заголовок |
| `labelFor` | `string` | — | HTML-атрибут `for` для `<label>` |
| `labelTooltip` | `QuestionTooltipProps` | — | Подсказка (question-tooltip) у заголовка |
| `required` | `boolean` | — | Показать знак обязательности `*` |
| `size` | `"l"` \| `"m"` \| `"s"` | `m` | Размер |

#### Related types

- `Size` = `"l"` \| `"m"` \| `"s"`

### Hint

**HintProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — |  |
| `disabled` | `boolean` | — | Поле выключено |
| `error` | `string` | — | Ошибка (приоритетнее `hint`; форсит `validationState=error`) |
| `hint` | `string` | — | Подсказка |
| `innerRef` | `Ref<HTMLDivElement>` | — | Ref на корневой DOM-элемент |
| `length` | `FieldLength` | — | Счётчик длины `current/max` |
| `maxLines` | `number` | — | Обрезать подсказку до N строк многоточием (через `TruncateString`, с тултипом <br/> полного текста на ховере). Без значения подсказка переносится без ограничения <br/> (дефолт поля). Нужно для карточек фиксированной высоты (`@ds/attachment`), где <br/> длинный текст ошибки иначе выходит за границы. |
| `readonly` | `boolean` | — | Только для чтения |
| `showHintIcon` | `boolean` | — | Отображение статус-иконки у подсказки |
| `size` | `"l"` \| `"m"` \| `"s"` | `m` | Размер |
| `validationState` | `"default"` \| `"error"` \| `"success"` \| `"valid"` \| `"warning"` | `default` | Состояние валидации |

#### Related types

**FieldLength**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `current` | `number` | — | Текущая длина текста |
| `max` | `number \| undefined` | — | Максимально допустимая длина |

- `Size` = `"l"` \| `"m"` \| `"s"`

- `ValidationState` = `"default"` \| `"error"` \| `"success"` \| `"valid"` \| `"warning"`

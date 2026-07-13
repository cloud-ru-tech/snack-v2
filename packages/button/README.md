# Button

`@ds/button` — Пакет кнопок дизайн-системы — компоненты Button и ButtonGroup с едиными токенами размеров, appearance и view.

Пакет `@ds/button` предоставляет два компонента для действий и навигации: одиночную кнопку `Button` и контейнер связанных действий `ButtonGroup`. Оба компонента используют общие токены — размеры `s/m/l`, appearance `primary/neutral/critical` и view `filled/outline/tonal/simple/elevated/function` — и пересекаются по типам пропсов.

- ****Button**** — одиночная кнопка для действий и навигации с полным набором view/appearance/size и полиморфизмом через `as`.
- ****ButtonGroup**** — контейнер связанных действий с едиными токенами и согласованным layout'ом по горизонтали и вертикали.

## Установка

```bash
pnpm add @ds/button
```

```ts
import { Button, ButtonGroup } from '@ds/button'
```

## Figma

Оба компонента следуют одному мастер-файлу Figma. Cсылки на конкретные узлы — на страницах компонентов.

## Смотри также

- [Паттерны форм](/patterns/form-patterns) — типовые футеры с `ButtonGroup`.
- [Паттерны композиции](/patterns/composition-patterns) — Button внутри карточек и toolbar'ов.

## Button

Полиморфная кнопка дизайн-системы — шесть видов оформления, три семантических appearance, три размера, icon/counter/loading/disabled и рендер как button / a / произвольный компонент.

Основной инструмент для действий и навигации. Рендерится как `<button>` (по умолчанию), `<a>` или произвольный компонент через проп `as` — без потери типизации пропсов целевого элемента.

### Когда использовать
- Для инициации действий (сохранить, удалить, применить).
- Для навигации, оформленной как кнопка — через `as="a"`.
- Для toolbar-иконок без текста — `icon` без `label` + обязательный `aria-label`.

Когда **не** нужен `Button`: для обычных inline-ссылок используйте `<a>` или навигационный компонент, а не `as="a"` с `view="function"`.

### Анатомия

#### Appearance
Семантическая роль действия: `primary` — основное действие на экране (максимум одно), `neutral` — вторичные действия, `critical` — деструктивные (удаление, отмена подписки).

#### View
Визуальная подача: `filled` — сплошная заливка (ключевое CTA), `tonal` — мягкая заливка токеном appearance, `outline` — с границей, `simple` — плоский фон, `elevated` — с тенью, `function` — максимально ненавязчивая подача (тулбары, инлайны).

#### Size
Размерный ряд: `s` — для плотных поверхностей (тулбары, таблицы), `m` — дефолт, `l` — для крупных форм и CTA.

#### Icon position
Положение иконки относительно лейбла: `before` — слева, `after` — справа. Для icon-only варианта `label` не задаётся.

### Примеры использования
Минимум, который покрывает 80% реальных случаев. Каждый пример — отдельный файл в `packages/button/demos/examples/`, который можно скопировать целиком.

#### Три appearance в ряд

Сравнение семантических ролей на одном размере и view

```tsx
import { Button } from '@ds/button';

export function Appearances() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button appearance='primary' label='Primary' />
      <Button appearance='neutral' label='Neutral' />
      <Button appearance='critical' label='Critical' />
    </div>
  );
}
```

#### Все шесть view

appearance=primary, size=m

```tsx
import { Button } from '@ds/button';

export function Views() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button view='filled' label='Filled' />
      <Button view='outline' label='Outline' />
      <Button view='tonal' label='Tonal' />
      <Button view='simple' label='Simple' />
      <Button view='elevated' label='Elevated' />
      <Button view='function' label='Function' />
    </div>
  );
}
```

#### Три размера в ряд

```tsx
import { Button } from '@ds/button';

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button size='s' label='Small' />
      <Button size='m' label='Medium' />
      <Button size='l' label='Large' />
    </div>
  );
}
```

#### 1. Пара главное + вторичное

Типичный футер формы: filled primary + simple neutral

```tsx
import { Button } from '@ds/button';

export function Actions() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button appearance='primary' view='filled' label='Сохранить' />
      <Button appearance='neutral' view='simple' label='Отмена' />
    </div>
  );
}
```

#### 2. Деструктивное действие

Critical + иконка — визуально подкрепляет риск

```tsx
import { Button } from '@ds/button'
import { TrashSVG } from '@ds/icons'

export function Destructive() {
  return <Button appearance='critical' view='filled' icon={<TrashSVG />} label='Удалить' />
}
```

#### 3. Icon-only в toolbar

Без label, но с aria-label для скринридеров

```tsx
import { Button } from '@ds/button'
import { SettingsSVG } from '@ds/icons'

export function IconOnly() {
  return <Button view='function' icon={<SettingsSVG />} aria-label='Настройки' />
}
```

#### 4. Кнопка-ссылка

as='a' + target='_blank' → rel='noopener noreferrer' добавляется автоматически

```tsx
import { Button } from '@ds/button'

export function LinkButton() {
  return <Button as='a' href='https://example.com' target='_blank' label='Документация' />
}
```

#### 5. Кнопка с бейджем-счётчиком

iconPosition='after' + counter → счётчик превращается в badge над иконкой

```tsx
import { Button } from '@ds/button'
import { EmailSVG } from '@ds/icons'

export function CounterBadge() {
  return (
    <Button
      icon={<EmailSVG />}
      iconPosition='after'
      label='Сообщения'
      counter={{ value: 12 }}
    />
  )
}
```

#### 6. Загрузка

loading заменяет лейбл спиннером и проставляет aria-busy='true'

```tsx
import { Button } from '@ds/button'
import { DownloadSVG } from '@ds/icons'

export function Loading() {
  return (
    <Button
      appearance='primary'
      view='filled'
      icon={<DownloadSVG />}
      label='Скачать отчёт'
      loading
    />
  )
}
```

### Props
**ButtonProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `appearance` | `"critical"` \| `"neutral"` \| `"primary"` | `primary` | Вариант оформления |
| `as` | `T` | — | Элемент или компонент для рендера: 'button' \| 'a' \| ComponentType (например Link из react-router-dom) |
| `className` | `string` | — | Дополнительный класс |
| `counter` | `CounterProps` | — | Пропсы для counter |
| `data-test-id` | `string` | — |  |
| `disabled` | `boolean` | `false` | Отключена |
| `fullWidth` | `boolean` | `false` | На всю ширину |
| `icon` | `ReactNode` | — | Иконка |
| `iconPosition` | `"after"` \| `"before"` | `before` | Позиция иконки относительно текста |
| `innerRef` | `PolymorphicRef` \| `T` | — | Ref на реальный DOM-элемент/инстанс, который рендерится через `as`. <br/> Используем явный проп, чтобы не зависеть от `forwardRef` и не тащить type-assertions на экспорт. |
| `label` | `string` | — | Текст кнопки |
| `loading` | `boolean` | `false` | Состояние загрузки |
| `size` | `"l"` \| `"m"` \| `"s"` | `m` | Размер |
| `view` | `"elevated"` \| `"filled"` \| `"function"` \| `"outline"` \| `"simple"` \| `"tonal"` | `filled` | Вариант кнопки (Figma: filled, outline, function, simple, elevated) |

##### Related types

- `Appearance` = `"critical"` \| `"neutral"` \| `"primary"`

- `IconPosition` = `"after"` \| `"before"`

- `PolymorphicRef` = `ComponentPropsWithRef<T>["ref"]`

- `Size` = `"l"` \| `"m"` \| `"s"`

- `Variant` = `"icon-after"` \| `"icon-before"` \| `"icon-only"` \| `"label-only"`

- `View` = `"elevated"` \| `"filled"` \| `"function"` \| `"outline"` \| `"simple"` \| `"tonal"`

### Смотри также
- [Паттерны форм](/patterns/form-patterns)
- [Паттерны композиции](/patterns/composition-patterns)

Здесь — что импортировать, как собрать типовые сценарии и какие пропсы доступны.

## ButtonGroup

Контейнер для связанных действий формы — primary / secondary / tertiary, с модификаторами vertical, centered, break и filled.

Группирует связанные действия формы или диалога: основное (`primary`), вторичное (`secondary`) и третичное (`tertiary`). Задаёт единый размер, расстояние между кнопками и отвечает за порядок, выравнивание и перенос при нехватке места.

### Когда использовать
- В футере формы или диалога: «Сохранить / Отмена», «Продолжить / Назад».
- Для toolbar-действий одного уровня, которые нужно визуально связать.
- Когда нужно одинаково растянуть все кнопки на ширину контейнера (`filled`).

Когда **не** подходит: если действий больше трёх — используйте меню или split-button. Если действия разного приоритета и логики (напр. «Удалить» + «Настройки») — оставляйте их как независимые `Button`.

### Анатомия

#### Size
Единый размер всех кнопок в группе — задаётся на корне: `s` — для плотных поверхностей, `m` — дефолт, `l` — для крупных форм. Отдельные кнопки не могут переопределить размер.

### Примеры использования
#### 1. Пара главное + вторичное

Типичный футер формы

```tsx
import { ButtonGroup } from '@ds/button';

export function ButtonGroupPrimarySecondary() {
  return (
    <ButtonGroup
      primaryAction={{ label: 'Сохранить', appearance: 'primary', view: 'filled' }}
      secondaryAction={{ label: 'Отмена', appearance: 'neutral', view: 'outline' }}
    />
  );
}
```

#### 2. Три действия

tertiary / secondary / primary — порядок слева направо зафиксирован

```tsx
import { ButtonGroup } from '@ds/button';

export function ButtonGroupThreeActions() {
  return (
    <ButtonGroup
      primaryAction={{ label: 'Сохранить', appearance: 'primary', view: 'filled' }}
      secondaryAction={{ label: 'Отмена', appearance: 'neutral', view: 'outline' }}
      tertiaryAction={{ label: 'Помощь', appearance: 'neutral', view: 'simple' }}
    />
  );
}
```

#### 3. Вертикальная группа

primary снизу — ближе к большому пальцу на мобильных

```tsx
import { ButtonGroup } from '@ds/button';

export function ButtonGroupVertical() {
  return (
    <ButtonGroup
      vertical
      primaryAction={{ label: 'Сохранить', appearance: 'primary', view: 'filled' }}
      secondaryAction={{ label: 'Отмена', appearance: 'neutral', view: 'outline' }}
      tertiaryAction={{ label: 'Помощь', appearance: 'neutral', view: 'simple' }}
    />
  );
}
```

#### 4. Заливка (filled)

Кнопки растягиваются на всю ширину контейнера

```tsx
import { ButtonGroup } from '@ds/button';

export function ButtonGroupFilled() {
  return (
    <div style={{ width: 320 }}>
      <ButtonGroup
        filled
        primaryAction={{ label: 'Применить', appearance: 'primary', view: 'filled' }}
        secondaryAction={{ label: 'Сбросить', appearance: 'neutral', view: 'outline' }}
      />
    </div>
  );
}
```

#### 5. Распорка через break

tertiary слева, primary справа — wizard-футер

```tsx
import { ButtonGroup } from '@ds/button';

export function ButtonGroupBreak() {
  return (
    <div style={{ width: 480 }}>
      <ButtonGroup
        break
        tertiaryAction={{ label: 'Назад', appearance: 'neutral', view: 'simple' }}
        primaryAction={{ label: 'Продолжить', appearance: 'primary', view: 'filled' }}
      />
    </div>
  );
}
```

### Props
**ButtonGroupProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `break` | `boolean` | `false` | Перенос на новую строку при нехватке места |
| `centered` | `boolean` | `false` | Центрирование по горизонтали |
| `className` | `string` | — | Дополнительный класс |
| `data-test-id` | `string` | — |  |
| `filled` | `boolean` | `false` | Заливка контейнера |
| `primaryAction` | `ActionProps` | — | Основное действие (filled) |
| `renderAction` | `((button: ReactNode, slot: ButtonGroupActionSlot) => ReactNode)` | — | Обёртка каждой кнопки. Получает готовый `<Button>` и слот действия (`primary`/`secondary`/`tertiary`) <br/> и возвращает узел, который встанет на место кнопки. Позволяет обернуть кнопку в `Tooltip` на стороне <br/> потребителя (сам `@ds/button` не зависит от `@ds/tooltip`). Чтобы не ломать раскладку `filled`, обёртка <br/> не должна добавлять лишний DOM-узел между группой и кнопкой (`Tooltip` — с `disableSpanWrapper`). |
| `secondaryAction` | `ActionProps` | — | Вторичное действие (outline), опционально |
| `size` | `"l"` \| `"m"` \| `"s"` | `m` | Размер кнопок |
| `tertiaryAction` | `ActionProps` | — | Третичное действие (simple/text-only), опционально |
| `vertical` | `boolean` | `false` | Вертикальное расположение |

##### Related types

**ActionProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `appearance` | `"critical"` \| `"neutral"` \| `"primary"` | — | Вариант оформления |
| `as` | `"button"` | — | Элемент или компонент для рендера: 'button' \| 'a' \| ComponentType (например Link из react-router-dom) |
| `className` | `string \| undefined` | — | Дополнительный класс |
| `counter` | `CounterProps` | — | Пропсы для counter |
| `data-test-id` | `string \| undefined` | — |  |
| `disabled` | `boolean \| undefined` | — | Отключена |
| `fullWidth` | `boolean \| undefined` | — | На всю ширину |
| `icon` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — | Иконка |
| `iconPosition` | `"after"` \| `"before"` | — | Позиция иконки относительно текста |
| `innerRef` | `PolymorphicRef` \| `T` | — | Ref на реальный DOM-элемент/инстанс, который рендерится через `as`. <br/> Используем явный проп, чтобы не зависеть от `forwardRef` и не тащить type-assertions на экспорт. |
| `label` | `string \| undefined` | — | Текст кнопки |
| `loading` | `boolean \| undefined` | — | Состояние загрузки |
| `view` | `"elevated"` \| `"filled"` \| `"function"` \| `"outline"` \| `"simple"` \| `"tonal"` | — | Вариант кнопки (Figma: filled, outline, function, simple, elevated) |

- `Appearance` = `"critical"` \| `"neutral"` \| `"primary"`

- `IconPosition` = `"after"` \| `"before"`

- `PolymorphicRef` = `ComponentPropsWithRef<T>["ref"]`

- `Size` = `"l"` \| `"m"` \| `"s"`

- `View` = `"elevated"` \| `"filled"` \| `"function"` \| `"outline"` \| `"simple"` \| `"tonal"`

### Смотри также
- **Button** — сам элемент действия.
- [Паттерны форм](/patterns/form-patterns) — футеры с ButtonGroup.

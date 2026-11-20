# Kbd

`@ds/uikit-product-kbd` — Подсказка клавиши в теге kbd — клавиша или сочетание клавиш, модификаторы с отображением по ОС.

Показывает клавишу или сочетание клавиш. Используется в подсказках горячих клавиш, рядом с действием и в инструкциях по навигации с клавиатуры: `/` — открыть поиск, `↑` и `↓` — выбрать результат, `↵` — перейти, `Esc` — закрыть.

## Когда использовать

- В интерфейсах с физической клавиатурой.
- Рядом с действием, которое доступно в текущем контексте.

Когда **не** нужен `Kbd`:

- На мобильном экране без клавиатуры:
  - подсказки горячих клавиш там обычно не нужны; решение принимает экран, сам компонент не скрывается.
- Нужно нажатие, фильтр или статус:
  - `Kbd` не интерактивен — у него нет нажатия, hover и фокуса. Обработчик клавиши регистрируется в интерфейсе отдельно, компонент горячую клавишу не включает.

## Анатомия

Тег `<kbd>` с подписью клавиши. Высота и минимальная ширина — 16 px, дальше ширина растёт по содержимому; подпись не переносится и не обрезается, короткие символы центрируются. Размер один, цвета и геометрия задаются токенами компонента и не переопределяются для отдельных подсказок.

### KeyName

Предопределённые клавиши: символ и название для скринридера берутся из карты, `children` игнорируется.

| `keyName` | macOS | Windows / Linux | Название для скринридера |
|-----------|-------|-----------------|--------------------------|
| `mod` | `⌘` | `Ctrl` | Command / Control |
| `ctrl` | `⌃` | `Ctrl` | Control |
| `alt` | `⌥` | `Alt` | Option / Alt |
| `meta` | `⌘` | `Win` | Command / Windows |
| `shift` | `Shift` | `Shift` | Shift |
| `up` · `down` · `left` · `right` | `↑` `↓` `←` `→` | `↑` `↓` `←` `→` | Стрелка вверх, вниз, влево, вправо |
| `enter` | `↵` | `↵` | Enter |
| `esc` | `Esc` | `Esc` | Escape |

`mod` — основной модификатор сочетаний: `⌘` на macOS и `Ctrl` на остальных системах. `meta` — физическая клавиша `⌘` / `Win`, для сочетаний с клавишей `Win` на Windows.

`Shift` и `Esc` подписаны текстом на всех системах.

Символов `⌘ ⌃ ⌥ ↵` нет в SB Sans Interface, их отрисовывает системный шрифт, поэтому начертание зависит от ОС. Стрелки входят в шрифт.

### KbdShortcut

Сочетание клавиш: каждая клавиша — отдельный `Kbd`, между ними `+`. Значения `keyName` в `keys` (`mod`, `shift`, `enter`, …) зависят от ОС, остальные выводятся текстом:

- `['mod', 'K']` — `⌘ + K` на macOS, `Ctrl + K` на остальных;
- `['mod', 'shift', 'P']` — `⌘ + Shift + P` и `Ctrl + Shift + P`.

Скринридер читает одно название сочетания («Command + K»), а не отдельные клавиши и разделители. Альтернативы и последовательности («↑ или ↓», «G, затем H») собираются из `Kbd` вручную.

Хук `useKbdShortcut(keys)` возвращает то же сочетание строкой — для мест, где компонент использовать нельзя: текст `Tooltip`, атрибуты `title` и `placeholder`.

### Platform (default auto)

ОС для `keyName` в `Kbd`, `KbdShortcut` и `useKbdShortcut` определяется по user-agent. На сервере и при гидрации используется `other`, после гидрации на macOS символы меняются. В SSR-приложении платформу передают явно: `platform='mac'` или `platform='other'` по user-agent запроса.

### Доступное название

Символ без контекста скринридер прочитает буквально (`⌘` — «place of interest sign»). Название задаётся пропом `aria-label` или берётся из `keyName`. Оно выводится скрытым текстом внутри `<kbd>`, а видимый символ скрывается от скринридера: атрибут `aria-label` на `<kbd>` скринридеры не читают.

## Установка

```bash
pnpm add @ds/uikit-product-kbd
```

```ts
import { Kbd, KbdShortcut, useKbdShortcut } from '@ds/uikit-product-kbd'
```

## Примеры использования

### Клавиша текстом

```tsx
import { Kbd } from '@ds/uikit-product-kbd';

export function SingleKey() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Kbd>K</Kbd>
      <Kbd>/</Kbd>
      <Kbd>Esc</Kbd>
      <Kbd>Backspace</Kbd>
      <Kbd>F12</Kbd>
    </div>
  );
}
```

### Предопределённые клавиши

Символ модификаторов зависит от ОС.

```tsx
import { Kbd } from '@ds/uikit-product-kbd';

export function KeyName() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Kbd keyName='mod' />
      <Kbd keyName='ctrl' />
      <Kbd keyName='alt' />
      <Kbd keyName='meta' />
      <Kbd keyName='shift' />
      <Kbd keyName='up' />
      <Kbd keyName='down' />
      <Kbd keyName='enter' />
      <Kbd keyName='esc' />
    </div>
  );
}
```

### Сочетание клавиш

KbdShortcut: клавиши отдельными Kbd, «+» между ними, модификатор зависит от ОС.

```tsx
import { KbdShortcut } from '@ds/uikit-product-kbd';

export function Combination() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <KbdShortcut keys={['mod', 'K']} />
      <KbdShortcut keys={['mod', 'shift', 'P']} />
      <KbdShortcut keys={['ctrl', 'alt', 'Delete']} />
    </div>
  );
}
```

### Подсказки поиска

```tsx
import { Kbd, KbdShortcut } from '@ds/uikit-product-kbd';

export function SearchHints() {
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
      <span>
        <KbdShortcut keys={['mod', '/']} /> открыть поиск
      </span>
      <span>
        <Kbd keyName='up' /> <Kbd keyName='down' /> выбрать результат
      </span>
      <span>
        <Kbd keyName='enter' /> перейти
      </span>
      <span>
        <Kbd keyName='esc' /> закрыть
      </span>
    </div>
  );
}
```

### Название для скринридера

```tsx
import { Kbd } from '@ds/uikit-product-kbd';

export function WithAriaLabel() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Kbd aria-label='Слэш'>/</Kbd>
      <Kbd aria-label='Пробел'>Space</Kbd>
    </div>
  );
}
```

### Сочетание строкой

useKbdShortcut — для текста, где компонент использовать нельзя.

```tsx
import { useKbdShortcut } from '@ds/uikit-product-kbd';

export function ShortcutText() {
  const shortcut = useKbdShortcut(['mod', 'C']);

  return <span title={`Копировать (${shortcut})`}>Копировать — {shortcut}</span>;
}
```

## Props

### Kbd

**KbdProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `aria-label` | `string` | — | Название клавиши для скринридера, если видимый символ его не передаёт (`↵` → `Enter`). |
| `children` | `ReactNode` | — | Клавиша: текст или unicode-символ (`K`, `/`, `F1`). Игнорируется, если задан `keyName`. |
| `className` | `string` | — | Дополнительный CSS-класс |
| `data-test-id` | `string` | — |  |
| `innerRef` | `Ref<HTMLElement>` | — | Ref на корневой `<kbd>` |
| `keyName` | `"alt"` \| `"ctrl"` \| `"down"` \| `"enter"` \| `"esc"` \| `"left"` \| `"meta"` \| `"mod"` \| `"right"` \| `"shift"` \| `"up"` | — | Предопределённая клавиша: символ и доступное название берутся из карты. <br/> Модификаторы зависят от ОС: `mod` — `⌘` на macOS и `Ctrl` на остальных. |
| `platform` | `"mac"` \| `"other"` | — | Платформа для `keyName`. По умолчанию определяется по user-agent. |

#### Related types

- `KbdKeyName` = `"alt"` \| `"ctrl"` \| `"down"` \| `"enter"` \| `"esc"` \| `"left"` \| `"meta"` \| `"mod"` \| `"right"` \| `"shift"` \| `"up"`

- `KbdPlatform` = `"mac"` \| `"other"`

### KbdShortcut

**KbdShortcutProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `aria-label` | `string` | — | Название сочетания для скринридера. По умолчанию собирается из названий клавиш: «Command + K». |
| `className` | `string` | — | Дополнительный CSS-класс |
| `data-test-id` | `string` | — |  |
| `innerRef` | `Ref<HTMLElement>` | — | Ref на корневой `<kbd>` |
| `keys` | `KbdShortcutKey` | — | Клавиши сочетания по порядку. Значение `keyName` (`mod`, `shift`, `enter`, …) резолвится по ОС, <br/> остальное выводится текстом (`K`, `/`, `F1`). |
| `platform` | `"mac"` \| `"other"` | — | Платформа для клавиш из `keyName`. По умолчанию определяется по user-agent. |

#### Related types

- `KbdPlatform` = `"mac"` \| `"other"`

- `KbdShortcutKey` = `KbdKeyName | (string & Record<never, never>)`

## Do / Don't

- ✅ Одна клавиша — один `Kbd`, сочетание — `KbdShortcut`.
- ❌ Несколько клавиш в одном `Kbd` (`Ctrl+K`).
- ✅ Разделитель `+` между клавишами: `Ctrl + K`, на macOS — `⌘ + K`. `KbdShortcut` ставит его сам.
- ❌ Разделитель внутри `Kbd`.
- ✅ Подпись действия рядом, за пределами `Kbd`.
- ❌ Длинное описание внутри `Kbd`.
- ✅ Модификаторы и `↵` — через `keyName`; остальные символы — те, что есть в шрифте, иначе текстовое название клавиши.
- ❌ Эмодзи и произвольные иконки.
- ✅ Альтернативы и последовательности — текстом: «↑ или ↓», «G, затем H».
- ❌ Разные обозначения одной клавиши в разных местах интерфейса.

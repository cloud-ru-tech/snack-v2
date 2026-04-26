# Search

`@ds/search` — Компонент поискового поля — три размера, фон, разделитель, состояния loading и disabled, опциональный слот для действия.

Поисковое поле дизайн-системы: `<input type='search'>` с иконкой, опциональной кнопкой очистки, состоянием `loading` и слотом `buttonField` справа для дополнительной кнопки-действия («Найти», «Фильтр»).

## Когда использовать

- Основной поиск по списку / каталогу / таблице.
- Header-поиск с моментальной отдачей (live search).
- Форма поиска с явной кнопкой «Найти» (`buttonField`).

Когда **не** подходит: для выбора из фиксированного списка используйте `Combobox`, для фильтра с префиксом — `Input` + `Chip`.

### Size

| Size | Высота | Применение |
|------|--------|------------|
| `s` | 24px | Таблицы, компактные сетки |
| `m` | 32px | Значение по умолчанию — формы, header |
| `l` | 40px | Hero, лендинг, глобальный поиск |

### Background и Outline

- `background=true` *(по умолчанию)* — серый фон, выделяет поле на светлой подложке.
- `background=false` — прозрачный фон, для контрастных подложек и header'а.
- `outline=true` *(по умолчанию)* — разделитель между полем и `buttonField`.
- `outline=false` — визуально слитный блок.

### Do / Don't

- ✅ Один primary-поиск на экран. Header-поиск + list-поиск рядом — пользователь путается.
- ❌ Маленький `s`-поиск в hero — теряется в масштабе.
- ✅ `loading` сразу после отправки — не оставляйте без сигнала.
- ❌ `disabled` вместо пустого состояния — покажите список «нет данных» отдельно.
- ✅ `buttonField` для операций, которые пользователь запускает явно («Найти», «Сбросить»).
- ❌ Ставить `buttonField` для дефолтного search — поиск должен реагировать на Enter.

### Установка

```bash
pnpm add @ds/search
```

```ts
import { Search } from '@ds/search'
import '@ds/search/style.css'
```

### Примеры использования

<Example title='Базовое поле'>
  <Search placeholder='Поиск' />
</Example>

<Example title='Размер l для hero'>
  <Search size='l' placeholder='Поиск по каталогу' />
</Example>

<Example title='Loading'>
  <Search placeholder='Поиск' loading />
</Example>

<Example title='Disabled'>
  <Search placeholder='Поиск' disabled />
</Example>

<Example title='Без фона'>
  <Search placeholder='Прозрачный фон' background={false} />
</Example>

### States

- **`loading`** — иконка поиска заменяется спиннером, поле остаётся доступным для ввода.
- **`disabled`** — поле неактивно, тап / фокус игнорируются.
- **С buttonField** — кнопка справа от поля, разделена линией при `outline=true`.

### Props

<PropsTable data={searchDoc.Search} />

### Storybook

<StorybookEmbed storyId='components-search--playground' height={240} client:load />

## Доступность

- Корень — `<input type='search'>` с ролью `searchbox`; скринридер проговаривает «search» и плейсхолдер.
- Native Enter — отправляет форму; обработчик `onSubmit` получает текущее значение.
- Кнопка очистки появляется при непустом значении, снабжена `aria-label='Clear'`.
- `loading` не блокирует ввод — пользователь может продолжить печатать; дублируйте состояние `aria-busy` на окружении при необходимости.
- `disabled` → `aria-disabled='true'` и выключен `tab order`.

## ButtonField

```tsx
import { ButtonField } from '@ds/search'

export function Example() {
  return <ButtonField variant="after">Click me</ButtonField>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"before"` \| `"after"` | `after` | Вариант (положение) кнопки |
| `size` | `"s"` \| `"m"` \| `"l"` | `s` | Размер кнопки |
| `loading` | `boolean` | `false` | Состояние загрузки |
| `disabled` | `boolean` | `false` | Деактивирован ли компонент |
| `action` | `ReactNode` | — | Слот для кнопки/иконки/аватара |
| `withDropdownList` | `boolean` | — | Отображение шеврона |
| `onClick` | `() => void` | — | Действие при клике |

## Search

```tsx
import { Search } from '@ds/search'

export function Example() {
  return <Search showClearButton background outline>Click me</Search>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | Значение input |
| `onChange` | `((value: string, e?: ChangeEvent<HTMLInputElement>) => void)` | — | Колбек смены значения |
| `placeholder` | `string` | — | Значение плейсхолдера |
| `onFocus` | `FocusEventHandler<HTMLInputElement>` | — | Колбек обработки получения фокуса |
| `onBlur` | `FocusEventHandler<HTMLInputElement>` | — | Колбек обработки потери фокуса |
| `inputMode` | `"text"` \| `"decimal"` \| `"numeric"` \| `"tel"` \| `"search"` \| `"email"` \| `"url"` \| `"none"` | — | Режим работы экранной клавиатуры |
| `data-test-id` | `string` | — |  |
| `className` | `string` | — | CSS-класс |
| `disabled` | `boolean` | — | Деактивирован ли компонент |
| `tabIndex` | `number` | — |  |
| `size` | `"s"` \| `"m"` \| `"l"` | `s` | Размер |
| `loading` | `boolean` | — | Состояние загрузки |
| `onSubmit` | `((value: string) => void)` | — | Колбек на подтверждение поиска по строке |
| `showClearButton` | `boolean` | `true` | Отображение кнопки Очистки поля |
| `background` | `boolean` | `true` | Наличие фона |
| `buttonField` | `Omit<ButtonFieldProps, "variant">` | — | Дополнительный слот справа от поля |
| `outline` | `boolean` | `true` | Наличие разделителя между input и buttonField |

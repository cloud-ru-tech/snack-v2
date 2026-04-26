# Button

`@ds/button` — Пакет кнопок дизайн-системы — компоненты Button и ButtonGroup с едиными токенами размеров, appearance и view.

Пакет `@ds/button` предоставляет два компонента для действий и навигации: одиночную кнопку `Button` и контейнер связанных действий `ButtonGroup`. Оба компонента используют общие токены — размеры `s/m/l`, appearance `primary/neutral/critical` и view `filled/outline/tonal/simple/elevated/function` — и пересекаются по типам пропсов.

## Состав пакета

- ****Button**** — полиморфная кнопка: рендерится как `<button>`, `<a>` или произвольный компонент через `as`. Поддерживает icon, counter, loading, disabled.
- ****ButtonGroup**** — layout-контейнер для связанных действий: primary / secondary / tertiary. Задаёт единый размер и управляет раскладкой (vertical, centered, break, filled).

## Установка

```bash
pnpm add @ds/button
```

```ts
import { Button, ButtonGroup } from '@ds/button'
import '@ds/button/style.css'
```

## Когда какой использовать

| Задача 

## Общие принципы

- **Один `primary` на группу или экран.** В форме — один `filled primary`. В `ButtonGroup` порядок визуально подсказывает иерархию: primary справа (или сверху в vertical).
- **Единый размер внутри одной группы.** Микс `size=m` и `size=l` рядом — признак неправильной декомпозиции.
- **Цвет — не единственный носитель смысла.** `critical`-действия дублируйте текстом («Удалить», «Отозвать») и подтверждающим диалогом.
- **Клавиатура и скринридеры из коробки.** Компоненты рендерятся нативным `<button>` — Enter / Space и focus работают без доработки.

## Figma

Оба компонента следуют одному мастер-файлу Figma. Cсылки на конкретные узлы — на страницах компонентов.

## Смотри также

- [Паттерны форм](/patterns/form-patterns) — типовые футеры с `ButtonGroup`.
- [Паттерны композиции](/patterns/composition-patterns) — Button внутри карточек и toolbar'ов.

## Button

Полиморфная кнопка дизайн-системы — шесть видов оформления, три семантических appearance, три размера, icon/counter/loading/disabled и рендер как button / a / произвольный компонент.

Основной инструмент для действий и навигации. Рендерится как `<button>` (по умолчанию), `<a>` или произвольный компонент через проп `as` — без потери типизации пропсов целевого элемента.

## Демо

## Когда использовать

- Для инициации действий (сохранить, удалить, применить).
- Для навигации, оформленной как кнопка — через `as="a"`.
- Для toolbar-иконок без текста — `icon` без `label` + обязательный `aria-label`.

Когда **не** нужен `Button`: для обычных inline-ссылок используйте `<a>` или навигационный компонент, а не `as="a"` с `view="function"`.

## Для дизайнеров

Секция описывает семантику, внешний вид и поведение кнопки в макетах. Здесь же — источник истины в Figma и правила композиции.

### Appearance — семантическая роль

| Appearance | Когда использовать |
|-----------|---------------------|
| `primary` | Главное действие экрана — один раз на форме/диалоге |
| `neutral` | Вторичные действия: «Назад», «Закрыть», «Отмена» |
| `critical` | Деструктивные операции: удаление, отзыв, блокировка |

<Example
  title='Три appearance в ряд'
  description='Сравнение семантических ролей на одном размере и view'
  code={AppearancesSrc}
>
  <Appearances client:load />
</Example>

### View — оформление

| View | Типичный сценарий |
|------|--------------------|
| `filled` | Главный CTA, максимальный акцент |
| `tonal` | Secondary-акцент в группе с `filled` |
| `outline` | На контрастном фоне или в композиции с карточками |
| `simple` | Действие без фона — плотная сетка, таблицы |
| `elevated` | Плавающая кнопка с тенью — над контентом |
| `function` | Текстовая кнопка без горизонтального padding — toolbar, inline-действия |

<Example
  title='Все шесть view'
  description='appearance=primary, size=m'
  code={ViewsSrc}
>
  <Views client:load />
</Example>

### Size

| Size | Высота | Применение |
|------|--------|------------|
| `s` | 24px | Таблицы, теги, чипы, плотные сетки |
| `m` | 32px | Значение по умолчанию — формы, диалоги, карточки |
| `l` | 40px | Hero, онбординг, CTA на лендинге |

Размеры зафиксированы в Figma и совпадают с токенами `@cloud-ru/figma-variables`.

<Example title='Три размера в ряд' code={SizesSrc}>
  <Sizes client:load />
</Example>

### Do / Don't

- ✅ Один `primary` на экран. Остальные действия — `neutral` / `tonal`.
- ❌ Два `primary` рядом — пользователю непонятно, что главное.
- ✅ `critical` для удаления, всегда с подтверждающим диалогом.
- ❌ `critical` для «Отмена» — это нейтральное действие.
- ✅ `loading` сразу после отправки формы — не оставляйте юзера без сигнала.
- ❌ `disabled` без причины — используйте tooltip или подсказку, почему недоступно.
- ✅ `fullWidth` в мобильных формах — увеличивает тап-зону.
- ❌ `fullWidth` в горизонтальной композиции с другими элементами управления.

### Figma

<FigmaEmbed node={FIGMA_BUTTON} height={480} title='Button в Figma (Snack UI Kit)' client:load />

### Смотри также

- [Паттерны форм](/patterns/form-patterns)
- [Паттерны композиции](/patterns/composition-patterns)

## Для разработчиков

Здесь — что импортировать, как собрать типовые сценарии и какие пропсы доступны.

### Установка

```bash
pnpm add @ds/button
```

```ts
import { Button } from '@ds/button'
import '@ds/button/style.css'
```

### Примеры использования

Минимум, который покрывает 80% реальных случаев. Каждый пример — отдельный файл в `packages/button/demos/examples/`, который можно скопировать целиком.

<Example
  title='1. Пара главное + вторичное'
  description='Типичный футер формы: filled primary + simple neutral'
  code={ActionsSrc}
>
  <Actions client:load />
</Example>

<Example
  title='2. Деструктивное действие'
  description='Critical + иконка — визуально подкрепляет риск'
  code={DestructiveSrc}
>
  <Destructive client:load />
</Example>

<Example
  title='3. Icon-only в toolbar'
  description='Без label, но с aria-label для скринридеров'
  code={IconOnlySrc}
>
  <IconOnly client:load />
</Example>

<Example
  title='4. Кнопка-ссылка'
  description="as='a' + target='_blank' → rel='noopener noreferrer' добавляется автоматически"
  code={LinkButtonSrc}
>
  <LinkButton client:load />
</Example>

<Example
  title='5. Кнопка с бейджем-счётчиком'
  description="iconPosition='after' + counter → счётчик превращается в badge над иконкой"
  code={CounterBadgeSrc}
>
  <CounterBadge client:load />
</Example>

<Example
  title='6. Загрузка'
  description="loading заменяет лейбл спиннером и проставляет aria-busy='true'"
  code={LoadingSrc}
>
  <Loading client:load />
</Example>

### Живой сценарий: отправка формы

Интерактивная композиция с primary-actions и loading-состоянием — кликните «Подписаться», чтобы увидеть переход `idle → submitting → success`.

<ButtonFormScenario client:load />

```tsx
function SubscribeForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('submitting')
    setTimeout(() => setStatus('success'), 1200)
  }

  return (
    <form onSubmit={submit}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <Button
        type='submit'
        appearance='primary'
        label={status === 'success' ? 'Отправлено' : 'Подписаться'}
        loading={status === 'submitting'}
        disabled={!email && status === 'idle'}
      />
    </form>
  )
}
```

### Полиморфизм

- `as="button"` *(по умолчанию)* — нативная кнопка, корректная клавиатура из коробки.
- `as="a" href="..." target="_blank"` — ссылка, `rel="noopener noreferrer"` проставляется автоматически.
- `as={Link}` — любой компонент-роутер (react-router, Next.js); специфичные пропсы передаются насквозь.

Ref на DOM-элемент пробрасывается через `innerRef`, а не стандартный `ref`, чтобы типы оставались полиморфными без `forwardRef`.

### States

- **`loading`** — внутри рендерится `Sun` из `@ds/loader`, выставляется `aria-busy="true"`, клик блокируется. Для `label-only` спиннер заменяет текст — ширина сохраняется.
- **`disabled`** — кнопка неактивна. Для `as="a"` дополнительно ставится `aria-disabled="true"` и `onClick` гасится `preventDefault`.
- **`loading + disabled`** — `loading` имеет приоритет: `aria-busy`, без `disabled`-атрибута на DOM.

### Иконки и counter

- `icon` + `iconPosition="before"` *(по умолчанию)* — иконка слева от лейбла.
- `icon` + `iconPosition="after"` — иконка справа (переходы, раскрытия).
- `icon` без `label` — **icon-only**, нужен `aria-label` для скринридеров.
- `counter={{ value: 12 }}` — встроенный счётчик из `@ds/counter`, инлайн после лейбла.
- С `iconPosition="after"` счётчик превращается в badge над иконкой (`data-absolute`).
- В `loading`-состоянии счётчик не рендерится — фокус на процессе.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Текст кнопки |
| `icon` | `ReactNode` | — | Иконка |
| `iconPosition` | `"before"` \| `"after"` | `before` | Позиция иконки относительно текста |
| `appearance` | `"primary"` \| `"neutral"` \| `"critical"` | `primary` | Вариант оформления |
| `size` | `"s"` \| `"m"` \| `"l"` | `m` | Размер |
| `disabled` | `boolean` | `false` | Отключена |
| `loading` | `boolean` | `false` | Состояние загрузки |
| `fullWidth` | `boolean` | `false` | На всю ширину |
| `className` | `string` | — | Дополнительный класс |
| `view` | `"function"` \| `"filled"` \| `"outline"` \| `"simple"` \| `"tonal"` \| `"elevated"` | `elevated` | Вариант кнопки (Figma: filled, outline, function, simple, elevated) |
| `counter` | `Omit<CounterProps, "size" | "appearance">` | — | Пропсы для counter |
| `as` | `ElementType` | — | Элемент или компонент для рендера: 'button' | 'a' | ComponentType (например Link из react-router-dom) |
| `innerRef` | `any` | — | Ref на реальный DOM-элемент/инстанс, который рендерится через `as`.
Используем явный проп, чтобы не зависеть от `forwardRef` и не тащить type-assertions на экспорт. |

### Storybook

<StorybookEmbed storyId='components-button--playground' height={360} client:load />

## Доступность

- Нативный `<button>` по умолчанию — клавиатура (Enter / Space) и screen-reader работают без доработки.
- `aria-busy` при `loading`, `aria-disabled` для `as="a"` + `disabled`.
- Видимый focus-ring только при навигации с клавиатуры (`focus-visible`).
- Для icon-only кнопок **обязателен** `aria-label` или `aria-labelledby`.
- Цвет не единственный носитель смысла: `critical` дублируется текстом («Удалить», «Отозвать»), иконкой или подтверждением.

## ButtonGroup

Контейнер для связанных действий формы — primary / secondary / tertiary, с модификаторами vertical, centered, break и filled.

Группирует связанные действия формы или диалога: основное (`primary`), вторичное (`secondary`) и третичное (`tertiary`). Задаёт единый размер, расстояние между кнопками и отвечает за порядок, выравнивание и перенос при нехватке места.

## Демо

## Когда использовать

- В футере формы или диалога: «Сохранить / Отмена», «Продолжить / Назад».
- Для toolbar-действий одного уровня, которые нужно визуально связать.
- Когда нужно одинаково растянуть все кнопки на ширину контейнера (`filled`).

Когда **не** подходит: если действий больше трёх — используйте меню или split-button. Если действия разного приоритета и логики (напр. «Удалить» + «Настройки») — оставляйте их как независимые `Button`.

## Для дизайнеров

### Порядок действий

Внутри группы порядок фиксированный: `tertiary → secondary → primary` слева направо. При `vertical` раскладка использует `flex-direction: column-reverse` — primary оказывается сверху, tertiary снизу.

| Слот | Роль | Типичный `view` |
|------|------|-----------------|
| `primaryAction` | Главное действие — подтверждение, submit | `filled` |
| `secondaryAction` | Альтернатива / отмена | `outline` |
| `tertiaryAction` | Вспомогательное — помощь, ссылки | `simple` |

### Модификаторы

| Проп | Эффект |
|------|--------|
| `vertical` | Вертикальный стек (column-reverse: primary сверху). Также включает `filled`-поведение для растягивания. |
| `centered` | Группа центрируется по горизонтали в своём контейнере. |
| `break` | `justify-content: space-between` — tertiary прижат слева, primary справа. |
| `filled` | Кнопки растягиваются, занимая равную долю ширины контейнера. |

### Do / Don't

- ✅ Один `primary` на группу — как и в одиночном `Button`.
- ❌ Два `filled`-`primary` в одной группе — нарушение иерархии.
- ✅ На мобильных — `vertical` c растягиванием на всю ширину (включается автоматически).
- ❌ Горизонтальная группа на узком экране без `break` или `vertical` — кнопки схлопываются.
- ✅ `break` для wizard-футера: «Назад» слева, «Продолжить» справа.
- ❌ `break` без третьего действия — он теряет смысл (двум кнопкам достаточно обычного gap).
- ✅ Единый `size` на всю группу — задаётся пропом `size`, не на каждой кнопке.
- ❌ Смешивать размеры внутри одной группы через `size` на `primaryAction` — пропы слота не позволяют задать `size`, и это осознанно.

### Смотри также

- [Button](/components/button/button) — сам элемент действия.
- [Паттерны форм](/patterns/form-patterns) — футеры с ButtonGroup.

## Для разработчиков

### Установка

```bash
pnpm add @ds/button
```

```ts
import { ButtonGroup } from '@ds/button'
import '@ds/button/style.css'
```

### Примеры использования

<Example
  title='1. Пара главное + вторичное'
  description='Типичный футер формы'
  code={ButtonGroupPrimarySecondarySrc}
>
  <ButtonGroupPrimarySecondary client:load />
</Example>

<Example
  title='2. Три действия'
  description='tertiary / secondary / primary — порядок слева направо зафиксирован'
  code={ButtonGroupThreeActionsSrc}
>
  <ButtonGroupThreeActions client:load />
</Example>

<Example
  title='3. Вертикальная группа'
  description='primary снизу — ближе к большому пальцу на мобильных'
  code={ButtonGroupVerticalSrc}
>
  <ButtonGroupVertical client:load />
</Example>

<Example
  title='4. Заливка (filled)'
  description='Кнопки растягиваются на всю ширину контейнера'
  code={ButtonGroupFilledSrc}
>
  <ButtonGroupFilled client:load />
</Example>

<Example
  title='5. Распорка через break'
  description='tertiary слева, primary справа — wizard-футер'
  code={ButtonGroupBreakSrc}
>
  <ButtonGroupBreak client:load />
</Example>

### Слоты и пропсы кнопок

Каждый слот (`primaryAction`, `secondaryAction`, `tertiaryAction`) принимает все пропсы `Button`, **кроме `size`** — размер задаётся на уровне группы. Это гарантирует единый масштаб внутри футера.

```tsx
<ButtonGroup
  size='l'
  primaryAction={{
    label: 'Сохранить',
    appearance: 'primary',
    view: 'filled',
    icon: <CheckSVG />,
    loading: isSubmitting,
  }}
  secondaryAction={{
    label: 'Отмена',
    appearance: 'neutral',
    view: 'outline',
    onClick: onCancel,
  }}
/>
```

### Тестирование

`ButtonGroup` пробрасывает support-пропсы (`data-test-id`, `aria-*`) на корневой контейнер. Каждый слот (`primaryAction`, `secondaryAction`, `tertiaryAction`) тоже принимает `data-test-id`, что позволяет адресовать конкретные кнопки из E2E-тестов.

```tsx
<ButtonGroup
  data-test-id='footer-actions'
  primaryAction={{ label: 'Save', 'data-test-id': 'footer-save' }}
  secondaryAction={{ label: 'Cancel', 'data-test-id': 'footer-cancel' }}
/>
```

### Известные ограничения

- `tooltip` на отдельном действии пока не поддерживается — оборачивайте `Button` в `Tooltip` вручную, когда пакет `@ds/tooltip` появится в репозитории.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `primaryAction` | `ActionProps` | — | Основное действие (filled) |
| `secondaryAction` | `ActionProps` | — | Вторичное действие (outline), опционально |
| `tertiaryAction` | `ActionProps` | — | Третичное действие (simple/text-only), опционально |
| `size` | `"s"` \| `"m"` \| `"l"` | `m` | Размер кнопок |
| `vertical` | `boolean` | `false` | Вертикальное расположение |
| `centered` | `boolean` | `false` | Центрирование по горизонтали |
| `break` | `boolean` | `false` | Перенос на новую строку при нехватке места |
| `filled` | `boolean` | `false` | Заливка контейнера |
| `className` | `string` | — | Дополнительный класс |

### Storybook

<StorybookEmbed storyId='components-button-group--playground' height={360} client:load />

## Доступность

- `ButtonGroup` — чистый layout-контейнер, семантика и клавиатура наследуются от вложенных `Button`.
- Tab-порядок идёт в порядке DOM: `tertiary → secondary → primary`. При `vertical` визуальный порядок меняется на обратный через `flex-direction: column-reverse`, DOM-порядок сохраняется — скринридер и Tab обходят кнопки от tertiary к primary.
- Цвет — не единственный носитель смысла: роль действия дублируется текстом лейбла и порядком слотов.

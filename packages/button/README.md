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

## Демо
<ButtonDemo client:visible />

## Когда использовать
- Для инициации действий (сохранить, удалить, применить).
- Для навигации, оформленной как кнопка — через `as="a"`.
- Для toolbar-иконок без текста — `icon` без `label` + обязательный `aria-label`.

Когда **не** нужен `Button`: для обычных inline-ссылок используйте `<a>` или навигационный компонент, а не `as="a"` с `view="function"`.

## Figma
<FigmaEmbed node={FIGMA_BUTTON} height={480} title='Button в Figma (Snack UI Kit)' />

## Смотри также
- [Паттерны форм](/patterns/form-patterns)
- [Паттерны композиции](/patterns/composition-patterns)

Здесь — что импортировать, как собрать типовые сценарии и какие пропсы доступны.

## Анатомия

### Appearance
Семантическая роль действия: `primary` — основное действие на экране (максимум одно), `neutral` — вторичные действия, `critical` — деструктивные (удаление, отмена подписки).

### View
Визуальная подача: `filled` — сплошная заливка (ключевое CTA), `tonal` — мягкая заливка токеном appearance, `outline` — с границей, `simple` — плоский фон, `elevated` — с тенью, `function` — максимально ненавязчивая подача (тулбары, инлайны).

### Size
Размерный ряд: `s` — для плотных поверхностей (тулбары, таблицы), `m` — дефолт, `l` — для крупных форм и CTA.

### Icon position
Положение иконки относительно лейбла: `before` — слева, `after` — справа. Для icon-only варианта `label` не задаётся.

## Установка
```bash
pnpm add @ds/button
```

```ts
import { Button } from '@ds/button'
```

## Примеры использования
Минимум, который покрывает 80% реальных случаев. Каждый пример — отдельный файл в `packages/button/demos/examples/`, который можно скопировать целиком.

<Example
  title='Три appearance в ряд'
  description='Сравнение семантических ролей на одном размере и view'
  code={AppearancesSrc}
>
  <Appearances client:visible />
</Example>

<Example
  title='Все шесть view'
  description='appearance=primary, size=m'
  code={ViewsSrc}
>
  <Views client:visible />
</Example>

<Example title='Три размера в ряд' code={SizesSrc}>
  <Sizes client:visible />
</Example>

<Example
  title='1. Пара главное + вторичное'
  description='Типичный футер формы: filled primary + simple neutral'
  code={ActionsSrc}
>
  <Actions client:visible />
</Example>

<Example
  title='2. Деструктивное действие'
  description='Critical + иконка — визуально подкрепляет риск'
  code={DestructiveSrc}
>
  <Destructive client:visible />
</Example>

<Example
  title='3. Icon-only в toolbar'
  description='Без label, но с aria-label для скринридеров'
  code={IconOnlySrc}
>
  <IconOnly client:visible />
</Example>

<Example
  title='4. Кнопка-ссылка'
  description="as='a' + target='_blank' → rel='noopener noreferrer' добавляется автоматически"
  code={LinkButtonSrc}
>
  <LinkButton client:visible />
</Example>

<Example
  title='5. Кнопка с бейджем-счётчиком'
  description="iconPosition='after' + counter → счётчик превращается в badge над иконкой"
  code={CounterBadgeSrc}
>
  <CounterBadge client:visible />
</Example>

<Example
  title='6. Загрузка'
  description="loading заменяет лейбл спиннером и проставляет aria-busy='true'"
  code={LoadingSrc}
>
  <Loading client:visible />
</Example>

## Props
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

## Storybook
<StorybookEmbed storyId='components-button-button--playground' height={360} />

## ButtonGroup

Контейнер для связанных действий формы — primary / secondary / tertiary, с модификаторами vertical, centered, break и filled.

Группирует связанные действия формы или диалога: основное (`primary`), вторичное (`secondary`) и третичное (`tertiary`). Задаёт единый размер, расстояние между кнопками и отвечает за порядок, выравнивание и перенос при нехватке места.

## Демо
<ButtonGroupDemo client:visible />

## Когда использовать
- В футере формы или диалога: «Сохранить / Отмена», «Продолжить / Назад».
- Для toolbar-действий одного уровня, которые нужно визуально связать.
- Когда нужно одинаково растянуть все кнопки на ширину контейнера (`filled`).

Когда **не** подходит: если действий больше трёх — используйте меню или split-button. Если действия разного приоритета и логики (напр. «Удалить» + «Настройки») — оставляйте их как независимые `Button`.

## Смотри также
- [Button](/components/button/button) — сам элемент действия.
- [Паттерны форм](/patterns/form-patterns) — футеры с ButtonGroup.

## Анатомия

### Size
Единый размер всех кнопок в группе — задаётся на корне: `s` — для плотных поверхностей, `m` — дефолт, `l` — для крупных форм. Отдельные кнопки не могут переопределить размер.

## Установка
```bash
pnpm add @ds/button
```

```ts
import { ButtonGroup } from '@ds/button'
```

## Примеры использования
<Example
  title='1. Пара главное + вторичное'
  description='Типичный футер формы'
  code={ButtonGroupPrimarySecondarySrc}
>
  <ButtonGroupPrimarySecondary client:visible />
</Example>

<Example
  title='2. Три действия'
  description='tertiary / secondary / primary — порядок слева направо зафиксирован'
  code={ButtonGroupThreeActionsSrc}
>
  <ButtonGroupThreeActions client:visible />
</Example>

<Example
  title='3. Вертикальная группа'
  description='primary снизу — ближе к большому пальцу на мобильных'
  code={ButtonGroupVerticalSrc}
>
  <ButtonGroupVertical client:visible />
</Example>

<Example
  title='4. Заливка (filled)'
  description='Кнопки растягиваются на всю ширину контейнера'
  code={ButtonGroupFilledSrc}
>
  <ButtonGroupFilled client:visible />
</Example>

<Example
  title='5. Распорка через break'
  description='tertiary слева, primary справа — wizard-футер'
  code={ButtonGroupBreakSrc}
>
  <ButtonGroupBreak client:visible />
</Example>

## Props
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

## Storybook
<StorybookEmbed storyId='components-button-buttongroup--playground' height={360} />

# Link

`@ds/link` — Семантическая ссылка дизайн-системы — 10 appearance, полиморфный рендер (a / button / кастомный компонент), inline-режим в тексте и интеграция с TruncateString.

Компонент для навигации — как внутри экрана (якорь), так и во внешних ресурсах. Полиморфен: по умолчанию рендерится как `<a>`, но поддерживает `<button>` и кастомные компоненты-роутеры через `as`. Внутри используется `TruncateString` — длинные ссылки обрезаются и раскрывают полный текст в тултипе.

## Демо
<LinkDemo client:only="react" />

## Когда использовать
- Для переходов между страницами и разделами.
- Для ссылок внутри текста (`insideText`) — компонент не ломает перенос строк.
- Для действий, которые семантически являются навигацией, но физически — кнопкой (`as='button'`).

Когда **не** нужен: для кнопки-действия (сохранить, удалить) используйте `@ds/button` с `view='function'`, а не `Link as='button'`.

### Appearance
Семантика цвета: `neutral` — основной текстовый линк, `invertNeutral` — на тёмных фонах, `primary` — брендовый акцент; `red` для деструктивных, `orange`/`yellow` — предупреждения, `green` — успех; `blue`, `violet`, `pink` — декоративные категории.

### Role
`regular` — линк на обычной поверхности; `onAccent` — линк поверх цветных акцентных подложек (кнопка-бэйдж, баннер).

### Target
HTML-атрибут `target`: `_self` (дефолт, в той же вкладке), `_blank` (новая вкладка), `_parent`, `_top` — для iframe-сценариев.

## Установка
```bash
pnpm add @ds/link
```

```ts
import { Link } from '@ds/link'
```

## Примеры использования
<Example
  title='1. Простая ссылка'
  description='Рендер как нативный a href target'
  code={BasicSrc}
>
  <Basic client:only="react" />
</Example>

<Example
  title='2. Внутри текста'
  description="insideText=true: строка может переноситься, TruncateString не применяется"
  code={InsideTextSrc}
>
  <InsideText client:only="react" />
</Example>

<Example
  title='3. Полиморфизм: кнопка'
  description="as='button' — действие, семантически оформленное как ссылка"
  code={PolymorphicSrc}
>
  <Polymorphic client:only="react" />
</Example>

<Example
  title='4. Внешняя ссылка'
  description="target='_blank' → rel='noopener noreferrer' автоматически"
  code={ExternalSrc}
>
  <External client:only="react" />
</Example>

## Props
<PropsTable data={linkDoc.Link} />

## Storybook
<StorybookEmbed storyId='components-link--playground' height={320} />

## Link

```tsx
import { Link } from '@ds/link'

export function Example() {
  return <Link text="" role="regular" appearance="primary" as="'a'">Click me</Link>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `text` | `string` | `` | Текст ссылки |
| `role` | `"regular"` \| `"onAccent"` | `regular` | Роль |
| `appearance` | `"neutral"` \| `"invertNeutral"` \| `"primary"` \| `"red"` \| `"orange"` \| `"yellow"` \| `"green"` \| `"blue"` \| `"violet"` \| `"pink"` | `primary` | Стилизует ссылку для размещения на цветном фоне |
| `insideText` | `boolean` | `false` | Находится ли ссылка внутри текста (и можно ли её переносить) |
| `truncateVariant` | `"end"` \| `"middle"` | — | Вариант обрезания строки:
<br/> - `end` - с конца;
<br/> - `middle` - посередине |
| `underlined` | `boolean` | `false` | Наличие нижнего подчеркивания |
| `as` | `ComponentType | ElementType` | `'a'` | Полиморфный компонент.

Оформить переданный компонент или html элемент в стиль ссылки.

Список атрибутов, которые переданный компонент должен принять:
<br/> - `className`
<br/> - `data-size`
<br/> - `data-text-mode`
<br/> - `data-appearance`
<br/> - `data-inside-text` |

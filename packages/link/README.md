# Link

`@ds/link` — Семантическая ссылка дизайн-системы — 10 appearance, полиморфный рендер (a / button / кастомный компонент), inline-режим в тексте и интеграция с TruncateString.

Компонент для навигации — как внутри экрана (якорь), так и во внешних ресурсах. Полиморфен: по умолчанию рендерится как `<a>`, но поддерживает `<button>` и кастомные компоненты-роутеры через `as`. Внутри используется `TruncateString` — длинные ссылки обрезаются и раскрывают полный текст в тултипе.

## Когда использовать
- Для переходов между страницами и разделами.
- Для ссылок внутри текста (`insideText`) — компонент не ломает перенос строк.
- Для действий, которые семантически являются навигацией, но физически — кнопкой (`as='button'`).

Когда **не** нужен: для кнопки-действия (сохранить, удалить) используйте `@ds/button` с `view='function'`, а не `Link as='button'`.

## Анатомия

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
### 1. Простая ссылка

Рендер как нативный a href target

```tsx
import { Link } from '@ds/link';

export function Basic() {
  return <Link text='Документация API' href='https://example.com/docs' />;
}
```

### 2. Внутри текста

insideText=true: строка может переноситься, TruncateString не применяется

```tsx
import { Link } from '@ds/link';

export function InsideText() {
  return (
    <p>
      Подробнее читайте <Link insideText text='в документации' href='https://example.com' />, а также ознакомьтесь с{' '}
      <Link insideText underlined text='условиями' href='https://example.com/terms' />.
    </p>
  );
}
```

### 3. Полиморфизм: кнопка

as='button' — действие, семантически оформленное как ссылка

```tsx
import { Link } from '@ds/link';

export function Polymorphic() {
  return <Link as='button' type='button' text='Открыть диалог' onClick={() => alert('clicked')} />;
}
```

### 4. Внешняя ссылка

target='_blank' → rel='noopener noreferrer' автоматически

```tsx
import { Link } from '@ds/link';

export function External() {
  return <Link text='Открыть в новой вкладке' href='https://example.com' target='_blank' />;
}
```

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `appearance` | `"blue"` \| `"green"` \| `"invertNeutral"` \| `"neutral"` \| `"orange"` \| `"pink"` \| `"primary"` \| `"red"` \| `"violet"` \| `"yellow"` | `primary` | Стилизует ссылку для размещения на цветном фоне |
| `as` | `ComponentType | ElementType` | `'a'` | Полиморфный компонент.

Оформить переданный компонент или html элемент в стиль ссылки.

Список атрибутов, которые переданный компонент должен принять:
<br/> - `className`
<br/> - `data-size`
<br/> - `data-text-mode`
<br/> - `data-appearance`
<br/> - `data-inside-text` |
| `data-test-id` | `string` | — |  |
| `insideText` | `boolean` | `false` | Находится ли ссылка внутри текста (и можно ли её переносить) |
| `role` | `"onAccent"` \| `"regular"` | `regular` | Роль |
| `text` | `string` | `` | Текст ссылки |
| `truncateVariant` | `"end"` \| `"middle"` | — | Вариант обрезания строки:
<br/> - `end` - с конца;
<br/> - `middle` - посередине |
| `underlined` | `boolean` | `false` | Наличие нижнего подчеркивания |

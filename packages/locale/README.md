# Locale

`@ds/locale` — Рантайм локализации — строки живут в самих пакетах (defineLocale/defineMessages), провайдер несёт только язык.

`@ds/locale` — рантайм локализации дизайн-системы. **Строк он не содержит**: каждый пакет
объявляет свой словарь рядом с компонентом через `defineLocale`/`defineMessages`, а `@ds/locale`
несёт только текущий язык, fallback и реестр сервисных оверрайдов. Это держит пакет стабильным
(контракт не растёт с числом компонентов) и безопасным для SSR и микрофронтов.

Полное руководство по модели — в паттерне [Локализация — строки в пакетах](/patterns/localization).

## Когда использовать

- Компонент-пакет объявляет свои тексты: `defineMessages({ 'en-GB', 'ru-RU' })` + `defineLocale('NS', …)`.
- Хост-приложение задаёт язык: `LocaleProvider lang={…}` (или `store` для MFE через `getGlobalLocaleStore`).
- Сервис переопределяет строки или **добавляет язык** (например `de-DE`) через `<locale>.extend(lang, …)` либо тип `LocaleOverride`.

## Установка

```bash
pnpm add @ds/locale
```

```tsx
import { defineLocale, defineMessages, LocaleProvider, LocaleOverride, useLang, getGlobalLocaleStore } from '@ds/locale'
```

## Примеры использования

### Переключение языка на лету

Словарь компонента через `defineMessages`/`defineLocale`; `LocaleProvider` задаёт язык, `useTranslations` читает строку.

```tsx
import { Button } from '@ds/button';
import { defineLocale, defineMessages, LocaleProvider } from '@ds/locale';
import { SegmentControl } from '@ds/segment-control';
import { Tag } from '@ds/tag';
import { Typography } from '@ds/typography';
import { Flex } from '@ds/uikit-product-flex';
import { useState } from 'react';

// Словарь компонента co-located: defineMessages требует одинаковый набор ключей во всех языках.
const DEMO_MESSAGES = defineMessages({
  'en-GB': { action: 'Save', status: 'Ready', greeting: 'Hello' },
  'ru-RU': { action: 'Сохранить', status: 'Готово', greeting: 'Привет' },
});

const demoLocale = defineLocale('LocaleDemo', DEMO_MESSAGES);

// Консьюмер читает строки из ближайшего LocaleProvider — текст компонентов меняется вслед за языком.
function LocalizedSurface() {
  const { t, lang } = demoLocale.useTranslations();

  return (
    <Flex gap='2m' align='center' wrap>
      <Button appearance='primary' label={t('action')} />
      <Tag appearance='green' label={t('status')} />
      <Typography variant='body' size='s'>
        {t('greeting')} · {lang}
      </Typography>
    </Flex>
  );
}

const LANG_ITEMS = [
  { value: 'ru-RU', label: 'Русский' },
  { value: 'en-GB', label: 'English' },
];

export function LanguageToggle() {
  const [lang, setLang] = useState('ru-RU');

  return (
    <Flex direction='column' gap='2m' align='flex-start'>
      <SegmentControl items={LANG_ITEMS} value={lang} onChange={value => setLang(String(value))} />
      <LocaleProvider lang={lang} fallbackLang='en-GB'>
        <LocalizedSurface />
      </LocaleProvider>
    </Flex>
  );
}
```

### Интерполяция

Плейсхолдеры `{{name}}` в строке подставляются вторым аргументом `t`. Тип аргумента выводится из самой
строки: `t` требует ровно те ключи, что есть в переводе — опечатка или пропуск ловятся компилятором.
Значения — `string | number`; дату или число форматируйте на месте вызова. Плюрализации/ICU нет.

```tsx
// словарь → greeting: 'Привет, {{name}}!'
t('greeting', { name: 'Ada' })            // ок
t('greeting', { naem: 'Ada' })            // ошибка компиляции: нет ключа name
t('greeting')                              // ошибка компиляции: интерполяция обязательна
t('apply')                                 // без плейсхолдеров — второй аргумент запрещён
```

### Спецсимволы

Частые типографские символы — зарезервированными токенами, движок подставляет их сам. В аргументах
`t` они не требуются, а в словаре читаются явно — `{{nbsp}}` вместо невидимого символа, поэтому
строка остаётся читаемой в diff.

```tsx
// словарь — токены видны в исходнике, символ появляется при выводе
const ru = {
  price: 'Цена:{{nbsp}}{{value}}{{nnbsp}}₽',        // 100 ₽ — число не отрывается от валюты
  limit: 'Лимит: 10{{thinsp}}000 запросов',         // 10 000 — тонкий пробел между разрядами
  hours: 'Часы работы: Пн{{ndash}}Пт',              // Пн–Пт — диапазон через среднее тире
  plan: 'Тариф{{nbsp}}{{mdash}}{{nbsp}}Бизнес',     // Тариф — Бизнес — длинное тире с неразрывными
  word: 'мак{{shy}}си{{shy}}маль{{shy}}ный',        // мягкие переносы: слово рвётся только при нехватке места
  saved: 'Сохранение{{hellip}}',                    // Сохранение… — многоточие одним символом
  done: 'Готово{{newline}}Можно закрыть окно',      // перенос строки (нужен white-space: pre-line)
}
```

```tsx
t('price', { value: 100 })   // → Цена: 100 ₽
t('limit')                   // → Лимит: 10 000 запросов
t('plan')                    // → Тариф — Бизнес
```

Полный набор — в константе `SPECIAL_CHARS` (`@ds/locale`).

## Props

### LocaleProvider

**LocaleProviderProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `fallbackLang` | `Lang` | — | Язык, на который откатываемся при отсутствии перевода. По умолчанию `en-GB`. |
| `lang` | `Lang` | — | Статический язык (одно-корневой app/SSR). Игнорируется, если задан `store`. |
| `overrides` | `OverrideEntry` | — | Оверрайды/новые языки — собираются через `<locale>.extend(lang, ...)`, app-static. |
| `store` | `LangStore` | — | Реактивный источник языка для MFE: `getGlobalLocaleStore().store`. |

#### Related types

- `Lang` = `string`

**LangStore**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `getServerSnapshot` | `(() => LangSnapshot) \| undefined` | — | Значение для SSR/гидрации. Если не задан — используется `getSnapshot`. |
| `getSnapshot` | `() => LangSnapshot` | — | Текущее значение. Обязан возвращать стабильную (по `Object.is`) ссылку, пока значение не менялось. |
| `subscribe` | `(onStoreChange: () => void) => () => void` | — | Подписка на изменения; возвращает функцию отписки. |

- `MessageTree` = `{ [key: string]: string | MessageTree; }`

**OverrideEntry**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `lang` | `Lang` | — |  |
| `messages` | `MessageTree` \| `PartialDeep` \| `PartialObjectDeep` | — |  |
| `namespace` | `string` | — |  |

- `PartialDeep` = `T extends BuiltIns | ((...arguments_: unknown[]) => unknown) | (new (...arguments_: unknown[]) => unknown) ? T : T extends Map<infer KeyType, infer ValueType> ? Map<PartialDeep<KeyType>, PartialDeep<ValueType>> : T extends Set<infer ItemType> ? Set<PartialDeep<ItemType>> : T extends ReadonlyMap<infer KeyType, infer ValueType> ? ReadonlyMap<PartialDeep<KeyType>, PartialDeep<ValueType>> : T extends ReadonlySet<infer ItemType> ? ReadonlySet<PartialDeep<ItemType>> : T extends object ? PartialObjectDeep<T> : unknown`

- `PartialObjectDeep` = `{ [KeyType in keyof ObjectType]?: PartialDeep<ObjectType[KeyType]> | undefined; }`

## Смотри также

- [Локализация — строки в пакетах](/patterns/localization) — полная модель: словари в пакетах, оверрайды, новые языки.
## Оверрайды строк и новые языки

Провайдер хранит реестр оверрайдов, но не словари. Оверрайд переопределяет строку или добавляет язык,
которого нет в пакете из коробки. Источник строки — namespace пакета; язык — тег
[BCP-47](https://www.rfc-editor.org/info/bcp47) (`en-GB`, `ru-RU`, `de-DE`).

Namespace — это имя пакета в реестре оверрайдов: `@ds/calendar`, `@ds/uikit-product-quota`. Один пакет —
один словарь и один namespace; под-области пакета (например `container`/`upload`/`systemEvent` у тостера)
живут вложенными ключами словаря, а не отдельными namespace'ами.

Имена пакетов уникальны, поэтому namespace'ы не пересекаются между пакетами. Соответствие правилу
проверяет `pnpm check:locale-namespaces` (завершается ошибкой на чужом или дублирующемся namespace).

Путь зависит от того, рендерит ли приложение сам компонент.

### Приложение уже использует компонент

Когда пакет компонента — обычная зависимость, оверрайд собирается его locale-объектом. `extend`
типизирован по форме словаря: опечатка в ключе — ошибка компиляции.

```tsx
import { calendarLocale } from '@ds/calendar'
import { LocaleProvider } from '@ds/locale'

const calendarDe = calendarLocale.extend('de-DE', {
  apply: 'Anwenden',
  current: 'Jetzt',
})

function Shell({ children }) {
  return (
    <LocaleProvider lang='de-DE' overrides={[calendarDe]}>
      {children}
    </LocaleProvider>
  )
}
```

### Корень держит пакеты в devDependencies

Корневое приложение, которое добавляет язык сразу для всех микрофронтов, компоненты не рендерит —
ему нужны только типы словарей. Пакеты компонентов остаются в `devDependencies`, а locale-объект
импортируется через `import type` из под-пути `@ds/<pkg>/locale` и стирается при компиляции. В
сборку корня не попадают ни React-дерево компонента, ни его стили, ни строки.

- `@ds/locale` — обычная зависимость: в нём провайдер, который объединяет оверрайды по namespace.
- `@ds/<pkg>` — `devDependency`: из него берутся только типы.

`LocaleOverride<typeof <pkg>Locale>` выводит из типа и литерал namespace, и форму словаря. Строка
namespace и ключи сообщений проверяются компилятором.

```tsx
import { composeOverrides, getGlobalLocaleStore, LocaleOverride, LocaleProvider } from '@ds/locale'
import type { calendarLocale } from '@ds/calendar/locale'
import type { uploadFilesLocale } from '@ds/uikit-product-upload-files/locale'
import type { quotaLocale } from '@ds/uikit-product-quota/locale'

// Немецкий сразу для нескольких пакетов: одна запись на namespace.
const calendarDe: LocaleOverride<typeof calendarLocale> = {
  namespace: '@ds/calendar', // сверяется с литералом из типа пакета
  lang: 'de-DE',
  messages: {
    apply: 'Anwenden',
    current: 'Jetzt',
    defaultPresets: { lastWeek: 'Letzte 7 Tage' },
  },
}

const quotaDe: LocaleOverride<typeof quotaLocale> = {
  namespace: '@ds/uikit-product-quota',
  lang: 'de-DE',
  messages: {
    increaseQuota: 'Kontingent erhöhen',
    widgetTitle: { withoutProject: 'Projektkontingente' },
  },
}

const uploadFilesDe: LocaleOverride<typeof uploadFilesLocale> = {
  namespace: '@ds/uikit-product-upload-files',
  lang: 'de-DE',
  messages: {
    dropzoneButton: 'Datei auswählen',
    errorRequired: 'Pflichtfeld',
  },
}

// composeOverrides сводит записи (и массивы записей) в один список для провайдера.
const overrides = composeOverrides(calendarDe, quotaDe, uploadFilesDe)

function Shell({ children }) {
  return (
    <LocaleProvider store={getGlobalLocaleStore().store} overrides={overrides}>
      {children}
    </LocaleProvider>
  )
}
```

Под-путь `@ds/<pkg>/locale` отдаёт только locale-слой пакета: locale-объект и тип формы словаря
(например `CalendarMessages`). Для оверрайдов на корне этого достаточно — компонент импортировать не нужно.

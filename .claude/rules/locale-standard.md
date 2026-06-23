# Локализация — стандарт

**Область действия:** `packages/*/src/locale/**` и `defineLocale`/`defineMessages`-словари компонентов.

## Принцип

Строки живут в пакете рядом с компонентом, а не в центральном словаре. `@ds/locale` несёт только рантайм: текущий язык, fallback и реестр оверрайдов. Locale-слой заводится **только если пакет показывает пользователю текст** — у чисто визуальных пакетов его нет.

## Раскладка

Один файл — `packages/<pkg>/src/locale/index.ts`:

```ts
import { defineLocale, defineMessages } from '@ds/locale'

// Словарь — локальная const, наружу НЕ экспортируется (VALUE приватный).
const CALENDAR_MESSAGES = defineMessages({
  'en-GB': { apply: 'Apply', current: 'Current' },
  'ru-RU': { apply: 'Применить', current: 'Сейчас' },
})

/** Форма словаря — для типизации сервисных оверрайдов/новых языков. */
export type CalendarMessages = (typeof CALENDAR_MESSAGES)['en-GB']

/** locale компонента Calendar: `calendarLocale.useTranslations()` в коде, `calendarLocale.extend(...)` в сервисе. */
export const calendarLocale = defineLocale('@ds/calendar', CALENDAR_MESSAGES)
```

Наружу пакет отдаёт **только** `<pkg>Locale` и тип `<Pkg>Messages`. Сам словарь (VALUE `<PKG>_MESSAGES`) — приватная const файла: его никто не импортирует, а рантайм компонента и так несёт строки. Отдельного `messages.ts` и `export * from './messages'` больше нет — всё в одном `index.ts`.

Без generic-комментариев про механику `defineMessages`/`defineLocale` (она задокументирована один раз на самих функциях). Комментарий уместен лишь под специфику пакета (например структура вложенных под-областей).

## Namespace === имя пакета

- Один словарь на пакет, namespace равен имени пакета: `defineLocale('@ds/calendar', …)`.
- Под-области пакета — **вложенные ключи** словаря (`container`/`upload`/`systemEvent` у тостера), а не отдельные namespace'ы и не несколько `defineLocale`.
- Имена пакетов уникальны, поэтому namespace'ы не пересекаются. Соответствие проверяет `pnpm check:locale-namespaces` (падает на чужом, дублирующемся или множественном namespace).

Namespace из имени компонента (`Card`, `Button`) запрещён — он не уникален и молча сольёт строки двух пакетов в один слот реестра.

## Словарь — `defineMessages`

`defineMessages` проверяет полноту ключей на уровне типов: все языки обязаны иметь одинаковый набор ключей с одинаковой вложенностью. Значения листьев между языками разные. Форма словаря экспортируется типом `<Pkg>Messages` (`(typeof <PKG>_MESSAGES)['en-GB']`), где `<PKG>_MESSAGES` — локальная const файла.

## Компонент — `useTranslations` / `useLang`

```tsx
import { calendarLocale } from '../../locale'

const { t } = calendarLocale.useTranslations()
t('apply')                          // плоский ключ
t('container.closeAll')             // вложенный — dotted-путь
t('curDate', { date: formatted })   // интерполяция {{date}}
```

Интерполяция — типобезопасная: `t` выводит имена `{{placeholder}}` из строки и требует ровно их (опечатка/пропуск — ошибка компиляции). Значения — `string | number`; `Date`/числа форматируются на месте вызова. Плюрализации/ICU нет — это отдельные ключи или подготовленная строка.

Спецсимволы — зарезервированными токенами `{{nbsp}}`, `{{nnbsp}}`, `{{thinsp}}`, `{{shy}}`, `{{ndash}}`, `{{mdash}}`, `{{hellip}}`, `{{newline}}` (полный набор — `SPECIAL_CHARS`). Движок подставляет их сам, в аргументах `t` они **не** требуются. В словаре пиши `'Цена:{{nbsp}}100{{nnbsp}}₽'`, а не невидимый символ или ` ` — так видно в diff. `{{newline}}` вставляет `\n`; для визуального переноса контейнеру нужен `white-space: pre-line`.

Если нужен только язык (без перевода) — `useLang()` из `@ds/locale`. Старый API `useLocale('NS')` удалён.

## Публичный экспорт + `./locale` subpath

- `src/index.ts`: `export * from './locale'` — `<pkg>Locale` и тип доступны из корня пакета.
- `package.json` `exports`: добавить под-путь `"./locale"` (`source`/`types`/`import`/`require` на `dist/.../locale`), чтобы потребитель тянул только locale-слой без компонента.
- `tsconfig` (корневой и storybook): алиас `@ds/*/locale` → `packages/*/src/locale`.

## Оверрайды строк и новые языки

- Приложение **использует компонент**: `<pkg>Locale.extend('de-DE', { … })` — пакет обычная зависимость.
- Корень держит пакеты в **devDependencies** (нужны только типы): `import type { <pkg>Locale } from '@ds/<pkg>/locale'` + `LocaleOverride<typeof <pkg>Locale>`; несколько записей сводит `composeOverrides`. `import type` стирается — рантайма из пакета нет.

Подробности и примеры — в `packages/locale/docs/index.mdx`.

## Запреты

- Старый API: `useLocale('NS')`, `defineI18n`, каталог `src/i18n/`, центральный `src/locales/`, типы `LocaleLang`/`Dictionary`/`DottedTranslationKey` — удалены, не возвращать.
- Namespace не из имени пакета; несколько `defineLocale` в пакете; под-области отдельными namespace'ами.
- Отдельный `messages.ts` + `export * from './messages'` — старая форма, не возвращать: словарь живёт локальной const в `index.ts`.
- Экспортировать VALUE словаря (`export const <PKG>_MESSAGES`) наружу — он приватный; публичны только `<pkg>Locale` и тип `<Pkg>Messages`.
- Дублировать generic-объяснение `defineMessages`/`defineLocale` в файле — оно живёт на самих функциях.

## Связанное

- [package-src-structure](./package-src-structure.md) — где лежит `src/locale/`.
- [reference-package-anatomy](./reference-package-anatomy.md) — анатомия пакета.
- [writing-style](./writing-style.md) — текст строк и комментариев.

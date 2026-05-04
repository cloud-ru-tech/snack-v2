# Locale

`@ds/locale` — LocaleProvider и useLocale — словари ru-RU/en-GB и точка расширения переводов для компонентов дизайн-системы.

`@ds/locale` — общий слой локализации дизайн-системы. Каждый пакет, у которого есть видимые пользователю строки (плейсхолдеры `Search`, кнопки `Pagination`, тексты `Dropzone` и т.п.), читает их через `useLocale()`. `LocaleProvider` оборачивает приложение и задаёт текущий язык; `createLocaleContext` используется внутри пакета для объявления собственного словаря.

## Когда использовать

- Хост-приложение хочет переключить язык DS-компонентов на лету.
- Нужно переопределить отдельные строки (`overrideLocales`) — например, доменно-специфичные термины.
- Пакет дизайн-системы добавляет новые тексты — он создаёт собственный контекст через `createLocaleContext` и потребляет его через `useLocale`.

## Установка

```bash
pnpm add @ds/locale
```

```tsx
import { LocaleProvider, useLocale, createLocaleContext } from '@ds/locale'
```

## Примеры использования

### Переключение языка на лету

`LocaleProvider` + `useLocale` — строка обновляется при смене `lang`.

```tsx
import { LocaleProvider, useLocale } from '@ds/locale';
import { useState } from 'react';

function NotFoundLabel() {
  const { t } = useLocale();

  return <span>{t('Dropdown.states.notFound.title')}</span>;
}

export function LanguageToggle() {
  const [lang, setLang] = useState<'ru-RU' | 'en-GB'>('ru-RU');

  return (
    <LocaleProvider lang={lang} fallbackLang='en-GB'>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <button type='button' onClick={() => setLang(lang === 'ru-RU' ? 'en-GB' : 'ru-RU')}>
          Lang: {lang}
        </button>
        <NotFoundLabel />
      </div>
    </LocaleProvider>
  );
}
```

## Props

### LocaleProvider

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `fallbackLang` | `"en-GB"` \| `"ru-RU"` | — |  |
| `lang` | `string` | — |  |
| `overrideLocales` | `PartialObjectDeep<Record<"en-GB" \| "ru-RU", LocaleDictionary<Dictionary>>>` | — |  |

### useLocale

| Prop | Type | Default | Description |
|------|------|---------|-------------|

### createLocaleContext

**ContextOptions**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultLanguage` | `"en-GB"` \| `"ru-RU"` | `en-GB` |  |
| `extendedDictionary` | `D` \| `ExtendedDictionary` | — |  |

#### Related types

**ExtendedDictionary**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `en-GB` | `any` | — |  |
| `ru-RU` | `any` | — |  |

- `LocaleLang` = `"en-GB"` \| `"ru-RU"`

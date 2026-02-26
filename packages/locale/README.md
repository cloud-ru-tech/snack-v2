# Locale

Пакет предоставляет контекст локализации для приложения: `LocaleProvider`, хук `useLocale` и фабрику `createLocaleContext`. Поддерживаются вложенные ключи вида `Component.key.subkey`, интерполяция плейсхолдеров `{{name}}` и расширение словарей. В комплекте идут локали `en-GB` и `ru-RU` с базовым набором строк.

## Installation

```bash
npm install @design-system/locale
# or
yarn add @design-system/locale
# or
pnpm add @design-system/locale
```

## Exports





## Usage

### Базовое использование

```tsx
import { LocaleProvider, useLocale } from '@design-system/locale';

function TranslatedButton() {
  const { t, lang } = useLocale();
  return (
    <button>
      {t('Common.apply')} ({lang})
    </button>
  );
}

export function App() {
  return (
    <LocaleProvider lang="en-GB">
      <TranslatedButton />
    </LocaleProvider>
  );
}
```

### Смена языка и fallback

```tsx
import { LocaleProvider } from '@design-system/locale';

function App() {
  return (
    <LocaleProvider lang="ru-RU" fallbackLang="en-GB">
      <Content />
    </LocaleProvider>
  );
}
```

### Интерполяция в переводах

```tsx
const { t } = useLocale();
// При строке в локали: "Hello, {{who}}!"
t('Some.greeting', { who: 'World' }); // "Hello, World!"
```

## Props

### LocaleProviderProps
| name | type | default value | description |
|------|------|---------------|-------------|
| lang* | `string` | - |  |
| fallbackLang | "en-GB" \| "ru-RU" | - |  |
| overrideLocales | `PartialObjectDeep<Record<"en-GB" \| "ru-RU", LocaleDictionary<Dictionary>>>` | - |  |

### createLocaleContextProps
| name | type | default value | description |
|------|------|---------------|-------------|
| extendedDictionary | `ExtendedDictionary<D>` | - |  |
| defaultLanguage | "en-GB" \| "ru-RU" | en-GB |  |

## Best Practices

1. **Один провайдер на дерево** — оборачивайте корень приложения или нужную область в один `LocaleProvider`; при смене языка обновляйте проп `lang`.
2. **Fallback** — задавайте `fallbackLang` при поддержке не всех языков из `LOCALES`, чтобы при ошибочном `lang` интерфейс оставался на читаемом языке.
3. **Расширение словарей** — для больших приложений используйте `createLocaleContext` с `extendedDictionary`, чтобы сохранить типизацию и не смешивать базовые и продуктовые ключи.
4. **Интерполяция** — используйте плейсхолдеры `{{key}}` в строках локалей и передавайте значения вторым аргументом `t(key, object)` для динамических подстановок.

---

## Additional Resources

- **Full Documentation:** [View documentation](./docs/index.mdx)
- **Changelog:** [View changelog](./CHANGELOG.md)
- **Migration Guide:** [View migration guide](./MIGRATION.md)

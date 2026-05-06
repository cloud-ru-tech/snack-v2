# Skill: scss-styles-audit

**Триггеры:** «проверь scss», «приведи стили к стандарту», «убери хардкод из стилей», «сверни data-size в цикл», «scss-аудит пакета».

Скилл проверяет `packages/<pkg>/src/**/*.module.scss` на соответствие [scss-styles-standard.md](../rules/scss-styles-standard.md), правит найденное и возвращает diff.

## Ввод

- Путь к пакету `packages/<name>` или конкретному `*.module.scss`.

## Шаги

1. **Собрать список файлов**:
   ```bash
   find packages/<pkg>/src -name '*.module.scss'
   ```

2. **Найти хардкод числовых литералов** в каждом файле:
   - Регэксп для пиксельных литералов в значениях свойств: `:\s*[^;]*\b\d+(\.\d+)?px\b`. Исключить: внутри `var(...)`, внутри `calc(...)` где это часть формулы со спейсингом-токеном.
   - Регэксп для hex/rgba: `#[0-9a-fA-F]{3,8}\b`, `rgba?\(`. Допустимо только `transparent`.
   - Литеральный `opacity:\s*0?\.\d+` для disabled.
   - Литеральные `border-radius:\s*\d+px`.

   На каждый матч предложить замену:

   | Хардкод | Замена |
   |---------|--------|
   | `1px` (border/outline) | `base.$sn-primitive-strokeWeight-strokeRegular` |
   | `0.5px` | `base.$sn-primitive-strokeWeight-strokeThin` |
   | `1.5px` | `base.$sn-primitive-strokeWeight-strokeMedium` |
   | `2px` (border) | `base.$sn-primitive-strokeWeight-strokeSemiBold` |
   | `3px` | `base.$sn-primitive-strokeWeight-strokeBold` |
   | hex/rgba | `base.$sn-theme-color-*` (через `get_variable_defs` Figma либо ручной поиск в `node_modules/@sbercloud/figma-variables/build/scss/styles/styles.module.scss`) |
   | `border-radius: <px>` | `base.simple-var(<component>.$<component>, 'anatomy', …, 'border-radius')` или `base.$sn-brand-anatomy-radius-*` |
   | `opacity: 0.4` (disabled) | `base.$sn-theme-effect-opacity-disabled` |

   Допустимые литералы оставить: `0`, `100%`, `inherit`, `transparent`, durations/timings, `z-index: 0|1`.

3. **Найти копипаст по `data-<axis>`**:
   - Сгруппировать селекторы вида `&[data-<axis>='<value>'] { … }` внутри одного блока.
   - Если 2+ селектора одной оси имеют **одинаковую форму** (одни и те же CSS-свойства, отличается только токен по значению оси) — кандидат на сворачивание в `@each`.
   - Для каждой такой группы:
     - Сверить набор значений с `packages/<pkg>/src/constants.ts` (ось → `as const`-объект). Если карта в SCSS должна включать алиас (`xs → s`, `critical → red` и т.п.) — взять имена токенов из `node_modules/@sbercloud/figma-variables/build/scss/components/<component>.module.scss`.
     - Решить форму карты:
       - список `$sizes: 's', 'm', 'l'` — если все значения совпадают с именами токенов;
       - map `$sizes: ('xs': 's', 's': 's', 'm': 'm', 'l': 'l')` — если есть алиасы.
     - Развернуть свойства через `base.simple-var(...)` / `base.composite-var(...)`. Пути в `simple-var` сверять по `node_modules/@sbercloud/figma-variables/build/scss/components/<component>.module.scss`.

4. **Решить, когда цикл не нужен** (см. [scss-styles-standard.md](../rules/scss-styles-standard.md) раздел «Когда копипаст оправдан»):
   - Ось имеет одно значение.
   - Каждое значение даёт существенно различающийся набор свойств — не одно свойство с разным токеном.
   В этом случае оставить как есть, отметить в отчёте.

5. **Применить правки** — точечными `Edit`, не переписывать файл целиком, чтобы diff читался.

6. **Проверить сборку**:
   ```bash
   pnpm exec stylelint --fix "packages/<pkg>/**/*.scss" 2>&1 | tail -20
   pnpm build:pkg <pkg>                                  2>&1 | tail -20
   ```

## Вывод

Markdown-отчёт:

```markdown
# SCSS audit: @ds/<name>

## ✅ Исправлено
- `components/X/styles.module.scss`:
  - `1px solid` → `base.$sn-primitive-strokeWeight-strokeRegular solid`
  - 4 блока `&[data-size='…']` свёрнуты в `@each` по карте `('s':'s','m':'m','l':'l','xs':'s')`
- `components/Y/styles.module.scss`:
  - `opacity: 0.4` → `base.$sn-theme-effect-opacity-disabled`

## ⚠️ Оставлено как есть (с обоснованием)
- `Z.module.scss::&[data-appearance='critical']` — меняет `color` + `background`, тогда как `primary` меняет только `background`. Различная специфика — цикл не подходит.

## ❓ Нужна помощь человека
- `border: 2px dashed #c0c0c0;` в `Q.module.scss` — нет очевидного токена для dashed-border палитры. Уточнить у дизайнера.
```

## Что **не** делает

- Не трогает `*.tsx` / `*.ts` — только SCSS.
- Не выдумывает токены: если эквивалент не находится в `figma-variables`, помечает в отчёт раздел «Нужна помощь человека».
- Не запускает `pnpm test:e2e` — этого мало для проверки стилей. Достаточно `stylelint --fix` + `build:pkg`.

## Связанное

- [scss-styles-standard.md](../rules/scss-styles-standard.md) — сам стандарт.
- [figma-to-code.md](../rules/figma-to-code.md) — мапинг Figma-типов на токены.
- [fast-build-commands.md](../rules/fast-build-commands.md) — селективные команды сборки/линтера.

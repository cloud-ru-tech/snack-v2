# Skill: pre-mr-audit

**Триггеры:** «проверь пакет перед MR», «прогони pre-mr аудит», «сканируй <pkg> на ревью-ниты», «что зацепит ревьюер», финал миграции/имплементации `packages/<pkg>` перед открытием MR.

Скилл — **механический греп-скан** пакета `packages/<pkg>` на повторяющиеся замечания код-ревью, которые исторически ловят руками (миграция `@snack-uikit/*` → `@ds/*` приносит легаси-паттерны). Не переписывает артефакты — выдаёт **список находок** с файлами/строками, чтобы агент починил их до того, как ревьюер оставит коммент. Каждая находка маппится на нарушенный рул.

## Когда использовать

- Перед открытием/обновлением MR на новый или мигрированный компонентный пакет.
- После прохода `component-validation-loop` — как финальный «взгляд ревьюера».
- Когда просят «проверь, не осталось ли нитов» по конкретному пакету.

Не используй для генерации stories/tests/docs (для этого профильные скиллы) и для функциональной проверки (это live-прогон Storybook/Playwright).

## Как запускать

Подставь `PKG=<pkg>` (имя папки в `packages/`). Прогоняй блоки по очереди, для каждой находки — чини по соответствующему рулу, затем повторяй скан до пустого вывода.

### A. Инлайн JSX-обработчики с логикой ([component-internals.md](../rules/component-internals.md) §1)

```bash
PKG=<pkg>
# обработчики с инлайн-замыканием в JSX (кандидаты на вынос)
grep -rnE "on[A-Z][a-zA-Z]*=\{\([a-zA-Z]*\) =>|on[A-Z][a-zA-Z]*=\{\(\) =>" packages/$PKG/src --include="*.tsx"
```

Тривиальный проброс одного аргумента без логики (`onChange={e => onChange?.(e.target.value)}`) — оставляй. Всё с условием/несколькими выражениями/повтором — выноси в `const handle*`. Проверь единообразие: если в файле часть уже вынесена, остальные тоже выноси.

### B. Чистые функции в `.tsx` ([component-internals.md](../rules/component-internals.md) §2)

```bash
# стрелки/функции, объявленные в .tsx — глазами отбери те, что не используют хуки/пропсы/state
grep -rnE "const [a-zA-Z]+ = \(.*\) =>|function [a-zA-Z]+\(" packages/$PKG/src --include="*.tsx" | grep -v "use[A-Z]\|handle\|=> \(<\|return <\)"
```

Кандидат в `utils.ts` — если функцию можно объявить вне компонента без потери смысла (`clamp`, `parseMask`, `extractLabel`). Завязанные на render-scope — оставляй (`useCallback`).

### C. Импорт внутренностей из соседнего компонента-пира ([component-internals.md](../rules/component-internals.md) §3)

```bash
# импорты из ../<OtherComponent> (PascalCase-сосед), кроме ../shared
grep -rnE "from '\.\./[A-Z][a-zA-Z]+'" packages/$PKG/src/components --include="*.ts" --include="*.tsx" | grep -v "/shared'"
```

Если `B` тянет утилиты/стили/типы/хелперы из пира `A` — выноси общее в `src/components/shared/` (или `src/shared/`), импортят оба.

### D. `helpers.ts` на `src`-уровне ([component-internals.md](../rules/component-internals.md) §4)

```bash
find packages/$PKG/src -name "helpers.ts"   # ожидаемо пусто; helpers.ts допустим только в __test__/
```

`src`-уровневый `helpers.ts` сливаем в `utils.ts` (или разворачиваем в `utils/`).

### E. Инлайн string-union осей вместо `constants.ts` ([component-api-surface.md](../rules/component-api-surface.md))

```bash
# литералы размеров/режимов прямо в типах — кандидаты на вынос в SIZE/MODE/... + ValueOf
grep -rnE "'(s|m|l|xs)'( ?\| ?'(s|m|l|xs)')+|'(none|single|multiple)'( ?\| ?'(none|single|multiple)')+" packages/$PKG/src --include="*.ts"
```

Перечисление-ось → `export const SIZE = {...} as const` в `constants.ts` + `type Size = ValueOf<typeof SIZE>` в `types.ts`, и использование типа.

### F. Хардкод массивов значений в сторях ([storybook-args-conventions.md](../rules/storybook-args-conventions.md))

```bash
grep -rnE "\['s', ?'m', ?'l'\]|options: \['" packages/$PKG/stories --include="*.tsx"
```

Массив значений оси в `argTypes.options`/`render` — через `Object.values(CONST)` из той же const'ы пакета, не хардкод.

### G. Playground-гигиена ([storybook-args-conventions.md](../rules/storybook-args-conventions.md), [trigger-based-stories.md](../rules/trigger-based-stories.md))

Открой `*.Playground.stories.tsx` и проверь по списку:
- Каждый **технический** проп (refs, `*Render`, `on*` низкоуровневые колбэки, `*Ref`, `scrollContainer*`) скрыт через `argTypes.<prop>.table.disable`.
- Каждый **видимый** контрол имеет осмысленный дефолт в `args` (иначе контрол «пустой»).
- Для **stateful-фич и слотов** (selection / virtualized / noData / errorState / loading) есть `[Story]: show*`-контролы и демо-контент, чтобы переключение **визуально влияло** на рендер.

```bash
# быстрый сигнал «контрол ни на что не влияет»: пропсы в типе, но без args и без table.disable
grep -nE "table: \{ disable|args:" packages/$PKG/stories/**/*.Playground.stories.tsx | head
```

### H. Легаси-TODO ([dont-do-that.md](../rules/dont-do-that.md), [component-internals.md](../rules/component-internals.md) §6)

```bash
grep -rnE "TODO|FIXME|TO DO" packages/$PKG/src
```

Голый `// TODO` без тикета — разрешить или заменить осмысленным комментом. Задокументированный cross-package блокер с маркером фазы (`// TODO Phase 5 token missing: …`) — оставить.

### I. Дублирование типа вместо переиспользования ([component-internals.md](../rules/component-internals.md) §5)

Глазами по `*/types.ts`: продублированные `Size`/`value`-типы, которые уже есть в `FieldDecorator`/соседнем `types.ts` — заменить на импорт существующего типа.

### J. Опечатки в JSDoc → расходятся в README/props.json ([writing-style.md](../rules/writing-style.md))

```bash
# словарь известных опечаток (расширяй по мере находок)
grep -rniE "пекреход|преставление|отбражени|колбэка?к|занчени|дефолтн ое" packages/$PKG/src --include="*.ts" --include="*.tsx"
```

JSDoc читается react-docgen'ом в Storybook-контролах и попадает в `props.json`/`README.md` → опечатка расползается по всем пакетам-потребителям. Чини в **исходном** JSDoc, затем `pnpm gen:props && pnpm gen:readme`.

### K. Колбэк-проп стрелкой вместо method-signature ([component-api-surface.md](../rules/component-api-surface.md))

```bash
# onX?: (...) => ... в типах пропсов — должно быть onX?(...): ...
grep -rnE "on[A-Z][A-Za-z]*\??:\s*\(.*\)\s*=>" packages/$PKG/src --include="*.ts" --include="*.tsx"
```

Разворачивай в method-signature: `onChange?(v: string): void`. Готовый тип-алиас (`onClick?: MouseEventHandler<…>`) — оставляй, это исключение.

### L. Стейл-рефы после rename/remove публичного API ([docs-structure.md](../rules/docs-structure.md), [figma-integration.md](../rules/figma-integration.md))

Переименование/удаление публичного компонента или пропа оставляет хвосты в нескольких слоях сразу. Подставь `OLD=<старое имя>` (компонент / проп / TEST_ID / figma-ключ) и прогони по всем местам:

```bash
OLD='<OldNameOrProp>'
grep -rn "$OLD" packages/$PKG/{src,stories,demos,docs,__test__} apps/docs/src/lib/figma.ts
```

Чек-лист мест, где обычно остаётся ссылка (проверь каждое):

- `demos/examples/*.tsx` — удалённый проп в примере (`error={...}` после удаления `error`).
- `docs/*.mdx` — текст Анатомии, `### <Component>` + `<PropsTable data={…Doc.<Component>}>` (краш билда, см. [docs-structure.md](../rules/docs-structure.md)), `figmaNode(pkg, '<sub>')` (молча пустой эмбед при рассинхроне ключа), `storyId='…'` в `<StorybookEmbed>`.
- `README.md` — перегенерить `pnpm gen:readme` (не править руками).
- `apps/docs/src/lib/figma.ts` — sub-ключ должен совпадать со строкой в `figmaNode(...)` MDX.
- `stories/testIds.ts` — стейл-строки test-id (`…-drawer__trigger` после rename в popover).
- `src/constants.ts` — мёртвые ключи в `TEST_IDS` для удалённых слотов.
- `__test__/**/rendering.spec.ts` — тест на удалённый проп/слот или селектор по съехавшему `data-test-id`/`aria-*`.

После правок: `pnpm gen:props && pnpm gen:readme`, затем `pnpm build:docs:fast` (ловит MDX-краши, которые `build:storybook` пропускает) и `pnpm test:e2e:chrome packages/$PKG`.

## После аудита

1. Почини находки по соответствующим рулам.
2. Повтори скан до пустого вывода по A–L.
3. Если правил JSDoc/пропсы — `pnpm gen:props && pnpm gen:readme`.
4. Селективная сверка: `pnpm exec eslint --fix packages/$PKG`, `pnpm build:pkg $PKG`, `pnpm typecheck`.

## Anti-patterns скилла

- ❌ Чинить «вслепую» по греп-сигналу без проверки контекста (тривиальный проброс — не нит; cross-package TODO с маркером — легитимен).
- ❌ Выносить функцию в `utils.ts`, если она реально завязана на render-scope (хуки/пропсы) — это сломает замыкание.
- ❌ Менять рантайм-логику при «приведении формы» обработчиков — только форма.

## Связанное

- [component-internals.md](../rules/component-internals.md) — тело компонента (источник §A–E, I).
- [component-api-surface.md](../rules/component-api-surface.md) — оси через constants/types.
- [storybook-args-conventions.md](../rules/storybook-args-conventions.md) — args/argTypes/Playground.
- [writing-style.md](../rules/writing-style.md) — JSDoc и текст.
- [component-validation-loop.md](./component-validation-loop.md) — общий цикл сверки готовности.

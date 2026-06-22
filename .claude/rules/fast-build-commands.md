# Быстрые и селективные команды

**Область действия:** любой запуск build / lint / typecheck / тестов из агента.

## Принцип

По умолчанию агент работает над **одним пакетом**. Запускать команды по всему монорепо — медленно, шумит логом и грузит контекст. Используй селективные/инкрементальные варианты; полные прогоны — только когда правки явно затрагивают несколько пакетов или wire-точки.

## Таблица: что запускать вместо полной команды

| Цель | ❌ Полная (медленная) | ✅ Селективная (быстрая) |
|------|----------------------|--------------------------|
| Сборка пакета | `pnpm build:packages` | `pnpm build:pkg <pkg>[,<pkg2>]` |
| TS-сборка ESM (только) | `pnpm build:packages` | `pnpm build:packages:esm` |
| Lint | `pnpm lint` | `pnpm exec eslint --fix packages/<pkg>` |
| Stylelint | `pnpm stylelint` | `pnpm exec stylelint --fix "packages/<pkg>/**/*.scss"` |
| Stories play-tests | `pnpm test:stories` | `pnpm test:stories -- -t "<TitleSubstring>"` (jest `-t` по имени теста/title) |
| E2E Playwright | `pnpm test:e2e` | `pnpm test:e2e:chrome packages/<pkg>` |
| Visual baselines | `pnpm test:e2e:update-snapshots` | `pnpm test:e2e:update-snapshots packages/<pkg>` |
| Docs-сайт build (smoke) | `pnpm build:docs` | `pnpm build:docs:fast` |
| Сборка пакетов + docs (без Storybook static) | `pnpm build` | `pnpm build:fast` (`build:packages` + `build:docs:fast`) |

Важное про lint/stylelint: скрипты `pnpm lint` / `pnpm stylelint` определены с глобами по всему репо. Если вызвать `pnpm lint packages/<pkg>` — pnpm **добавит** аргумент к существующим глобам, область не сузится. Чтобы реально прогнать линтер только по пакету, используй `pnpm exec eslint ...` / `pnpm exec stylelint ...` с явной целью.

`pnpm build:pkg` — обёртка `scripts/build-pkg.mts`. Делает `tsc -b` (project references → транзитивные deps пересоберутся, если устарели), плюс CSS и cjs-css-modules только для указанного пакета. На порядки быстрее, чем `build:packages`.

## Typecheck

`pnpm typecheck` (`tsc -b tsconfig.json`) — инкрементальный по `.tsbuildinfo`, поэтому повторный запуск дёшев. Запускай его **в конце** работы (после серии правок), а не после каждого файла.

Если хочется проверить только один пакет:

```bash
pnpm exec tspc -b packages/<pkg>/tsconfig.esm.json
```

## Playwright — фильтры

```bash
# один пакет, один проект
pnpm test:e2e:chrome packages/<pkg>

# конкретный spec
pnpm test:e2e:chrome packages/<pkg>/__test__/<Component>/rendering.spec.ts

# по grep'у имени теста
pnpm test:e2e:chrome -g "props propagation"

# обновить baselines одного пакета
pnpm test:e2e:update-snapshots packages/<pkg>
```

Для baselines всегда `:chrome` — visual baselines chrome-only (см. [visual-regression-standard.md](./visual-regression-standard.md)).

## Стандартный selective-блок для одного пакета

После правок в `packages/<pkg>` минимальный прогон перед коммитом:

```bash
pnpm exec eslint --fix packages/<pkg>                2>&1 | tail -20
pnpm exec stylelint --fix "packages/<pkg>/**/*.scss" 2>&1 | tail -20
pnpm build:pkg <pkg>                                 2>&1 | tail -20
pnpm typecheck                                       2>&1 | tail -20
pnpm test:e2e:chrome packages/<pkg>                  2>&1 | tail -20
```

`pnpm gen:props` / `pnpm gen:readme` — только если менялись пропсы или `docs/`.

## Когда нужен полный прогон

- Затронуты wire-точки `tsconfig.*.json`, `apps/storybook/.storybook/main.ts`, `apps/docs/astro.config.mjs`.
- Меняли `@ds/utils` / `@design-system/materials` / другие пакеты, от которых зависят многие — тогда `pnpm build:packages`.
- Перед PR — один раз `pnpm build:packages && pnpm test:e2e:chrome` для финальной сверки.
- CI — всегда полный, агент его не имитирует.

## Запреты

- Не запускай `pnpm build` / `pnpm build:all` в цикле итераций — он включает Storybook static + docs build (минуты). Только финал.
- Не запускай `pnpm test:e2e` без проекта — это chrome+firefox+safari+mobile. Используй `:chrome`.
- Не делай `pnpm test:stories` после каждой мелкой правки story — этот прогон поднимает Storybook и ждёт. Запускай в конце фазы stories.
- Не пиши `cd packages/<pkg> && pnpm ...` — все скрипты живут в корне.
- Не вычищай `.tsbuildinfo` (`pnpm clean:buildinfo`) ради «чистого билда» — теряется инкрементальность. Только если TS реально сошёл с ума.

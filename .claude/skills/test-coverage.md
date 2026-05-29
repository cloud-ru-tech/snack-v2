# Skill: test-coverage

**Триггеры:** `/test-coverage`, «отчёт по coverage», «метрики тестирования», «проверь E2E стандарт».

Формирует отчёт по метрикам coverage ([coverage-standard.md](../rules/coverage-standard.md)) и соответствию E2E ([e2e-testing-standard.md](../rules/e2e-testing-standard.md)).

## Ввод

- **`<pkg>`** (опционально) — имя пакета без префикса `@ds/` (`button`, `uikit-product-info-row`).
- Без аргумента — все компонентные пакеты (`packages/*` с `src/`).

## Шаги

### 1. Нормализовать аргумент

```text
/test-coverage button     → pkg = button
/test-coverage            → all packages
packages/button           → pkg = button
@ds/button                → pkg = button
```

### 2. Coverage — проверить данные

Проверь наличие `coverage/report/coverage-summary.json`.

Если файла нет или для запрошенного пакета нет записей в summary — **не запускай сбор автоматически**. Выведи инструкцию:

```bash
# Storybook с инструментацией:
pnpm --filter @ds/storybook dev:coverage

pnpm test:coverage:pkg <pkg>                       # playwright + harvester (coverage-pkg.mts)
pnpm exec vitest run packages/<pkg> --coverage     # если есть packages/<pkg>/__tests__/*.test.ts
pnpm coverage:merge                                # пересобрать после vitest
```

Для режима «все пакеты» без свежих данных — предупреди, что summary может быть неполным. Полный прогон: `pnpm test:coverage:all` (долго).

### 3. Coverage — отчёт

```bash
# один пакет:
pnpm exec tsx scripts/coverage-gate.mts --format=markdown <pkg>

# все пакеты:
pnpm exec tsx scripts/coverage-gate.mts --format=markdown --compact
```

Скрипт выводит таблицу:

| Метрика | Описание | Минимум | Соответствие |

Пороги: lines **80%**, statements **80%**, functions **75%**, branches **70%**.

Исключения из gate (`utils`, `locale`, `fonts`, `materials`, `portal-context`, `icon-predefined`, `scroll`, `icons`) — в колонке «Соответствие»: `— (исключён из gate)`.

### 4. E2E — автоматический аудит

```bash
# один пакет:
pnpm exec tsx scripts/e2e-standard-audit.mts <pkg>

# все пакеты:
pnpm exec tsx scripts/e2e-standard-audit.mts
```

Скрипт проверяет (e2e-testing-standard.md):

- E1: запрещённые spec-файлы (`url-args`, `states`, `dimensions`)
- E2/E3: `gotoStory` только через `buildStoryOptions`, без хардкод id
- E4/E6: импорты только `#playwright-tooling/*`
- E5: axis-per-test loop в `rendering.spec.ts`
- E7: flat `packages/<pkg>/__snapshots__/`
- E8: обязательные `helpers.ts`, `rendering.spec.ts`, `visual.spec.ts` в `__test__/<Component>/`
- E9: локаторы только `getByTestId`

### 5. E2E — ручная проверка (skill)

Дополни автоматический аудит по чеклисту e2e-standard §«Чеклист перед коммитом»:

- behavioral assertion'ы (`click`, `keyboard`, `focus`, `onChange`) — в `InteractionTest::play`, не в Playwright
- `interaction.spec.ts` / `keyboard.spec.ts` — только под закрытые списки browser-specific / kbd-сценариев
- одна папка `__test__/<Parent>/` на parent-компонент
- `helpers.ts` — StoryRef-объекты, не хардкод id

Если находишь нарушения вручную — добавь в отчёт с путём и инструкцией по исправлению.

### 6. Итоговый вывод

Склей markdown: coverage-таблица + E2E-секция.

**Если E2E нарушений нет** (автоматических и ручных) — выведи дословно:

```text
E2E тесты соответсвуют стандартам ˶ᵔ ᵕ ᵔ˶
```

**Если есть нарушения** — список:

```markdown
### @ds/toggles

- `packages/toggles/__test__/Switch/rendering.spec.ts:30` — axis-per-test loop. **Исправление:** параметризуй через KEY_COMBOS — e2e §«Запрещённые паттерны» п.1.
```

## Пример (один пакет)

```markdown
# Test coverage: @ds/button

## Метрики coverage

| Метрика | Описание | Минимум | Соответствие |
|---------|----------|---------|--------------|
| lines | Покрытие строк runtime-кода `packages/*/src/**` | 80% | ✅ 91.3% |
| statements | Покрытие statement'ов | 80% | ✅ 90.8% |
| functions | Покрытие функций | 75% | ✅ 88.0% |
| branches | Покрытие ветвлений | 70% | ✅ 76.5% |

## E2E standard

E2E тесты соответсвуют стандартам ˶ᵔ ᵕ ᵔ˶
```

## Что **не** делает

- Не вносит изменения в код.
- Не запускает coverage-пайплайн без явной просьбы пользователя.
- Не запускает `pnpm test:stories` / `pnpm test:e2e:chrome` — только упоминает как рекомендацию.

## Связанное

- [coverage-standard.md](../rules/coverage-standard.md)
- [e2e-testing-standard.md](../rules/e2e-testing-standard.md)
- [scripts/coverage-pkg.mts](../../scripts/coverage-pkg.mts) — сбор coverage
- [scripts/coverage-gate.mts](../../scripts/coverage-gate.mts) — gate + markdown-отчёт
- [scripts/e2e-standard-audit.mts](../../scripts/e2e-standard-audit.mts) — статический E2E-аудит

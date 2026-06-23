# snack-v2 — навигация по правилам

Правила лежат в `.claude/rules/*` и **привязаны к путям**. Не применяй весь свод как равнозначный — сверяйся с файлом(ами) под то, что реально редактируешь.

| Что редактируешь | Рулы (источник истины) |
|---|---|
| `packages/*/stories/**` | [stories-standard](.claude/rules/stories-standard.md) · [storybook-args-conventions](.claude/rules/storybook-args-conventions.md) · [trigger-based-stories](.claude/rules/trigger-based-stories.md) (modal/drawer/popover) · [visual-regression-standard](.claude/rules/visual-regression-standard.md) (VisualMatrix) |
| `packages/*/__test__/**/*.spec.ts` | [e2e-testing-standard](.claude/rules/e2e-testing-standard.md) · [visual-regression-standard](.claude/rules/visual-regression-standard.md) · [test-environment-pitfalls](.claude/rules/test-environment-pitfalls.md) |
| `packages/*/src/**/*.module.scss` | [scss-styles-standard](.claude/rules/scss-styles-standard.md) · [figma-to-code](.claude/rules/figma-to-code.md) |
| `packages/*/src/**/*.{ts,tsx}` | [component-api-surface](.claude/rules/component-api-surface.md) · [component-internals](.claude/rules/component-internals.md) · [package-src-structure](.claude/rules/package-src-structure.md) · [react-types](.claude/rules/react-types.md) · [imports-exports](.claude/rules/imports-exports.md) |
| `packages/*/src/locale/**` (строки/i18n) | [locale-standard](.claude/rules/locale-standard.md) |
| `packages/*/docs/*.mdx` | [docs-structure](.claude/rules/docs-structure.md) · [writing-style](.claude/rules/writing-style.md) · [figma-integration](.claude/rules/figma-integration.md) |
| `packages/*/package.json` | [packages-deps](.claude/rules/packages-deps.md) |
| Coverage / unit-тесты | [coverage-standard](.claude/rules/coverage-standard.md) |
| Новый пакет / анатомия / tier | [reference-package-anatomy](.claude/rules/reference-package-anatomy.md) · [complexity-tiers](.claude/rules/complexity-tiers.md) |
| Перенос из Figma | [figma-to-code](.claude/rules/figma-to-code.md) · [figma-integration](.claude/rules/figma-integration.md) |

**Действуют всегда (любая правка):** [dont-do-that](.claude/rules/dont-do-that.md) (запреты, безопасность) · [writing-style](.claude/rules/writing-style.md) (любой текст для людей) · [complexity-tiers](.claude/rules/complexity-tiers.md) (объём артефактов = поверхность API, «Критерий обоснованности»).

**Финальный gate перед MR:** [`pre-mr-audit`](.claude/skills/pre-mr-audit.md) — греп-скан легаси-нитов A–L + консолидированные чек-листы по доменам (раньше дублировались в теле каждого рула).

Запуск команд — селективно по одному пакету (см. [fast-build-commands](.claude/rules/fast-build-commands.md)); полные прогоны только перед PR.

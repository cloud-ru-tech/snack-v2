import { join } from 'path'
import { fileURLToPath } from 'url'
import { collectOptions } from './add-package/prompts.mts'
import { scaffold } from './add-package/scaffold.mts'
import { wireTsconfig, wireStorybookAlias, wireDocsAlias, wireStorybookDep } from './add-package/wire.mts'
import { toKebab } from './add-package/validate.mts'

const __filename = fileURLToPath(import.meta.url)
const ROOT = join(__filename, '..')

const dryRun = process.argv.includes('--dry-run')

console.log('\n  add-package — интерактивный скаффолдер пакетов\n')

if (dryRun) {
  console.log('  DRY RUN — файлы не будут записаны\n')
}

const options = await collectOptions()
const componentKebab = toKebab(options.componentName)

console.log('\nСоздаю пакет...\n')

const { packageDir, e2eSpecPath } = await scaffold({
  ...options,
  componentKebab,
  dryRun,
})

console.log('\nПрописываю пакет в конфигах монорепо...\n')

wireTsconfig(options.pkgName, dryRun)
wireStorybookAlias(options.pkgName, dryRun)
wireDocsAlias(options.pkgName, dryRun)
wireStorybookDep(options.pkgName, dryRun)

if (!dryRun) {
  console.log(`
  ✓  packages/${options.pkgName}/       создан
  ✓  tsconfig.json               обновлён
  ✓  apps/storybook/.storybook/main.ts  обновлён
  ✓  apps/docs/astro.config.mjs  обновлён
  ✓  apps/storybook/package.json обновлён${e2eSpecPath ? `\n  ✓  packages/${options.pkgName}/__tests__/${componentKebab}.rendering.spec.ts  создан` : ''}

  Следующие шаги:

    1. pnpm install
    2. pnpm gen
    3. pnpm dev:storybook    # localhost:6006
    4. pnpm dev:docs         # localhost:4321
`)
} else {
  console.log(`\n  [dry-run] packageDir would be: ${packageDir}`)
}

import { collectOptions } from './add-package/prompts.mts'
import { scaffold } from './add-package/scaffold.mts'
import { toKebab } from './add-package/validate.mts'
import { wireStorybookDep,wireTsconfig } from './add-package/wire.mts'

const dryRun = process.argv.includes('--dry-run')

console.info('\n  add-package — интерактивный скаффолдер пакетов\n')

if (dryRun) {
  console.info('  DRY RUN — файлы не будут записаны\n')
}

const options = await collectOptions()
const componentKebab = toKebab(options.componentName)

console.info('\nСоздаю пакет...\n')

const { packageDir, e2eSpecPath } = await scaffold({
  ...options,
  componentKebab,
  dryRun,
})

console.info('\nПрописываю пакет в конфигах монорепо...\n')

wireTsconfig(options.pkgName, dryRun)
wireStorybookDep(options.pkgName, dryRun)

if (!dryRun) {
  console.info(`
  ✓  packages/${options.pkgName}/       создан
  ✓  tsconfig.json               обновлён
  ✓  apps/storybook/package.json обновлён  (алиас @ds/${options.pkgName} подхватится автоматически)${e2eSpecPath ? `\n  ✓  packages/${options.pkgName}/__test__/${options.componentName}/rendering.spec.ts  создан` : ''}

  (алиасы @ds/* для apps/docs берутся из packages/*/package.json + src/index.ts — см. astro.config.mjs)

  Следующие шаги:

    1. pnpm deps
    2. pnpm gen
    3. pnpm dev:storybook    # localhost:6006
    4. pnpm dev:docs         # localhost:4321
`)
} else {
  console.info(`\n  [dry-run] packageDir would be: ${packageDir}`)
}

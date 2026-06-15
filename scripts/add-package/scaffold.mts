import { existsSync, mkdirSync, readFileSync, renameSync, rmSync,writeFileSync } from 'fs'
import { dirname,join } from 'path'
import { fileURLToPath } from 'url'

import { render, type TokenMap } from './render.mts'

const __filename = fileURLToPath(import.meta.url)
const ROOT = join(__filename, '..', '..', '..')
const TEMPLATES = join(__filename, '..', '..', 'templates', 'package')
const TMP_DIR = join(ROOT, 'scripts', '.add-package-tmp')

export type ScaffoldOptions = {
  pkgName: string
  componentName: string
  componentKebab: string
  displayTitle: string
  description: string
  includeDemo: boolean
  includeE2E: boolean
  dryRun?: boolean
}

export type ScaffoldResult = {
  packageDir: string
  e2eSpecPath: string | null
}

function writeRendered(src: string, dest: string, vars: TokenMap, dryRun: boolean): void {
  const content = render(readFileSync(src, 'utf8'), vars)
  if (dryRun) {
    console.info(`  [dry-run] write ${dest.replace(ROOT + '/', '')}`)
    return
  }
  mkdirSync(dirname(dest), { recursive: true })
  writeFileSync(dest, content, 'utf8')
}

function copyVerbatim(src: string, dest: string, dryRun: boolean): void {
  if (dryRun) {
    console.info(`  [dry-run] copy  ${dest.replace(ROOT + '/', '')}`)
    return
  }
  mkdirSync(dirname(dest), { recursive: true })
  writeFileSync(dest, readFileSync(src, 'utf8'), 'utf8')
}

function toScreamingSnake(name: string): string {
  return name
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/[-\s]+/g, '_')
    .toUpperCase()
}

export async function scaffold(opts: ScaffoldOptions): Promise<ScaffoldResult> {
  const packageDir = join(ROOT, 'packages', opts.pkgName)

  if (existsSync(packageDir)) {
    throw new Error(`Package already exists: packages/${opts.pkgName}`)
  }

  const tmpBase = join(TMP_DIR, `${opts.pkgName}-${Date.now()}`)
  const tpl = (name: string) => join(TEMPLATES, name)
  const out = (name: string) => join(tmpBase, name)

  const demoImport = opts.includeDemo
    ? `import { ${opts.componentName}Demo } from '../demos/${opts.componentName}Demo'`
    : ''
  const demoUsage = opts.includeDemo
    ? `<${opts.componentName}Demo client:visible />`
    : '<!-- TODO: добавить демо или удалить секцию «## Демо», если компонент не props-driven -->'

  const vars: TokenMap = {
    PKG_NAME: opts.pkgName,
    COMPONENT_NAME: opts.componentName,
    COMPONENT_CONST: toScreamingSnake(opts.componentName),
    COMPONENT_KEBAB: opts.componentKebab,
    DISPLAY_TITLE: opts.displayTitle,
    DESCRIPTION: opts.description || `${opts.displayTitle} component.`,
    DEMO_IMPORT: demoImport,
    DEMO_USAGE: demoUsage,
  }

  try {
    // package metadata + tsconfigs
    writeRendered(tpl('package.json'), out('package.json'), vars, opts.dryRun ?? false)
    copyVerbatim(tpl('tsconfig.esm.json'), out('tsconfig.esm.json'), opts.dryRun ?? false)
    copyVerbatim(tpl('tsconfig.cjs.json'), out('tsconfig.cjs.json'), opts.dryRun ?? false)

    // src/
    writeRendered(tpl('src/Component.tsx'), out(`src/${opts.componentName}.tsx`), vars, opts.dryRun ?? false)
    writeRendered(tpl('src/constants.ts'), out('src/constants.ts'), vars, opts.dryRun ?? false)
    writeRendered(tpl('src/types.ts'), out('src/types.ts'), vars, opts.dryRun ?? false)
    writeRendered(tpl('src/index.ts'), out('src/index.ts'), vars, opts.dryRun ?? false)
    writeRendered(tpl('src/styles.module.scss'), out('src/styles.module.scss'), vars, opts.dryRun ?? false)

    // stories/<Component>/
    const storyDir = `stories/${opts.componentName}`
    writeRendered(tpl('stories/Component/testIds.ts'), out(`${storyDir}/testIds.ts`), vars, opts.dryRun ?? false)
    writeRendered(
      tpl('stories/Component/Component.Playground.stories.tsx'),
      out(`${storyDir}/${opts.componentName}.Playground.stories.tsx`),
      vars,
      opts.dryRun ?? false,
    )
    writeRendered(
      tpl('stories/Component/Component.VisualMatrix.stories.tsx'),
      out(`${storyDir}/${opts.componentName}.VisualMatrix.stories.tsx`),
      vars,
      opts.dryRun ?? false,
    )

    // demos/
    if (opts.includeDemo) {
      writeRendered(tpl('demos/ComponentDemo.tsx'), out(`demos/${opts.componentName}Demo.tsx`), vars, opts.dryRun ?? false)
    }

    // docs/index.mdx — единый файл, без single/multi разделения
    writeRendered(tpl('docs/index.mdx'), out('docs/index.mdx'), vars, opts.dryRun ?? false)

    if (!opts.dryRun) {
      renameSync(tmpBase, packageDir)
    }

    // __test__/<Component>/ — пишется уже в финальный пакетный путь
    let e2eSpecPath: string | null = null
    if (opts.includeE2E) {
      const testDir = join(packageDir, '__test__', opts.componentName)
      writeRendered(tpl('__test__/Component/helpers.ts'), join(testDir, 'helpers.ts'), vars, opts.dryRun ?? false)
      writeRendered(tpl('__test__/Component/rendering.spec.ts'), join(testDir, 'rendering.spec.ts'), vars, opts.dryRun ?? false)
      writeRendered(tpl('__test__/Component/visual.spec.ts'), join(testDir, 'visual.spec.ts'), vars, opts.dryRun ?? false)
      e2eSpecPath = join(testDir, 'rendering.spec.ts')
    }

    return { packageDir, e2eSpecPath }
  } catch (error) {
    if (!opts.dryRun && existsSync(tmpBase)) {
      rmSync(tmpBase, { recursive: true })
    }
    throw error
  }
}

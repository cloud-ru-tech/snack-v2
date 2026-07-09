import { execSync } from 'child_process'

import { input, confirm } from '@inquirer/prompts'
import { validatePackageName, validateComponentName, packageExists, toPascal } from './validate.mts'
 
export interface PackageOptions {
  readonly pkgName: string
  readonly componentName: string
  readonly displayTitle: string
  readonly description: string
  readonly author: string
  readonly includeDemo: boolean
  readonly includeE2E: boolean
}

function gitConfig(key: string): string {
  try {
    return execSync(`git config ${key}`, { encoding: 'utf8' }).trim()
  } catch {
    return ''
  }
}

function gitAuthor(): string {
  const name = gitConfig('user.name')
  const email = gitConfig('user.email')
  if (name && email) return `${name} <${email}>`
  return name || email
}

export async function collectOptions(): Promise<PackageOptions> {
  if (!process.stdout.isTTY) {
    process.stderr.write(
      '[add-package] Non-interactive terminal detected.\n' +
        'This script requires an interactive TTY.\n' +
        'See the contribution guide for the manual flow.\n',
    )
    process.exit(1)
  }

  const pkgName = await input({
    message: 'Package name (kebab-case, without @ds/ prefix)',
    validate: (value) => {
      const trimmed = value.trim()
      const result = validatePackageName(trimmed)
      if (!result.ok) return result.message
      if (packageExists(trimmed)) return `Package "@ds/${trimmed}" already exists.`
      return true
    },
    transformer: (value) => value.trim().toLowerCase(),
  })

  const defaultComponent = toPascal(pkgName)
  const componentName = await input({
    message: 'Main component name (PascalCase)',
    default: defaultComponent,
    validate: (value) => {
      const result = validateComponentName(value.trim())
      return result.ok ? true : result.message
    },
    transformer: (value) => value.trim(),
  })

  const description = await input({
    message: 'One-line description (used in docs frontmatter)',
    default: '',
  })

  const includeDemo = await confirm({
    message: 'Include Canvas demo in docs?',
    default: true,
  })

  const includeE2E = await confirm({
    message: 'Scaffold Playwright e2e spec?',
    default: true,
  })

  return Object.freeze({
    pkgName: pkgName.trim(),
    componentName: componentName.trim(),
    displayTitle: componentName.trim(),
    description: description.trim(),
    author: gitAuthor(),
    includeDemo,
    includeE2E,
  })
}

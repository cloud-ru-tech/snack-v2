import fs from 'fs'
import path from 'path'

import { getBuildablePackageFoldersFromSolution } from './utils/getBuildablePackageFolders'

const PACKAGES_DIR = path.resolve(__dirname, '..', 'packages')

/**
 * Node treats `.js` under `"type":"module"` packages as ESM. Mark `dist/cjs` as CommonJS
 * so relative `require("./Foo")` resolves to emitted `.js` correctly.
 */
for (const folder of getBuildablePackageFoldersFromSolution()) {
  const cjsDir = path.join(PACKAGES_DIR, folder, 'dist', 'cjs')
  if (!fs.existsSync(cjsDir)) continue
  const metaPath = path.join(cjsDir, 'package.json')
  fs.writeFileSync(metaPath, JSON.stringify({ type: 'commonjs' }, null, 2) + '\n', 'utf8')
  console.info(`[writeDistCjsPackageJson] ${folder}/dist/cjs/package.json`)
}

import fs from 'fs'
import path from 'path'

import sass from 'sass'

import { ensureParentDirectory } from '../utils/ensureDirectory'
import { postProcessCss } from './post-process-css'

const repoRoot = path.resolve(__dirname, '..', '..')

export function writeScss({ src, distESM, distCJS }: { src: string; distCJS: string; distESM: string }) {
  return async (file: string) => {
    const { css } = await sass.compileAsync(file, {
      loadPaths: [path.join(repoRoot, 'node_modules')],
    })

    const relativePathToSrcFile = path.relative(src, file)
    const dirname = path.dirname(relativePathToSrcFile)
    const basename = path.basename(relativePathToSrcFile, '.scss')
    const filename = path.join(dirname, `${basename}.css`)

    const srcOutFile = path.resolve(src, filename)
    const cjsOutFile = path.resolve(distCJS, filename)
    const esmOutFile = path.resolve(distESM, filename)

    ensureParentDirectory(cjsOutFile)
    ensureParentDirectory(esmOutFile)

    const { css: processedCss } = await postProcessCss({ from: srcOutFile, css })

    fs.writeFileSync(cjsOutFile, processedCss)
    fs.writeFileSync(esmOutFile, processedCss)
  }
}

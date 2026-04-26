/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require('path')
const sass = require('sass')

const repoRoot = resolve(__dirname, '..', '..')

function sassRenderer(css, { fileName, logger }) {
  try {
    const result = sass.compile(fileName, {
      loadPaths: [resolve(repoRoot, 'node_modules')],
    })
    return result.css
  } catch (error) {
    logger.error(error.message)
  }
}

module.exports = sassRenderer

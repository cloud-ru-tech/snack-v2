import autoprefixer from 'autoprefixer'
import postcss from 'postcss'
import postcssDiscardComments from 'postcss-discard-comments'

export async function postProcessCss({ css, from }: { css: string; from: string }) {
  const postCssPlugins = [autoprefixer(), postcssDiscardComments()]
  return postcss(postCssPlugins).process(css, { from })
}

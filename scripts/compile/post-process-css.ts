import autoprefixer from 'autoprefixer';
import postcss from 'postcss';
import postcssDiscardComments from 'postcss-discard-comments';

import { normalizeCssModulesGlobal } from './normalize-css-modules-global';

export async function postProcessCss({ css, from }: { css: string; from: string }) {
  const postCssPlugins = [autoprefixer(), postcssDiscardComments(), normalizeCssModulesGlobal()];
  return postcss(postCssPlugins).process(css, { from });
}

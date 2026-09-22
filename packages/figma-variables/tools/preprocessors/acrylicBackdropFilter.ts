import type { PreprocessedTokens, Preprocessor } from 'style-dictionary/types';

import { PreprocessorName } from '../types.js';

const BLUR_PREFIX = 'blurBackground';
const FILTER_PREFIX = 'backdropFilter';

type TokenNode = Record<string, unknown> & { $value?: unknown };

function isZero(value: unknown): boolean {
  return value === 0 || value === '0' || value === '0px';
}

/**
 * Для каждого `sn.acrylic.blurBackground*` добавляет `sn.acrylic.backdropFilter*` — готовое значение
 * `backdrop-filter`: `none` при нулевом размытии (акрил выключен), иначе половина размытия.
 * Даже `blur(0px)` делает элемент контейнером для `position: fixed`, поэтому ноль превращается в `none`.
 */
export const AcrylicBackdropFilterPreprocessor: Preprocessor = {
  name: PreprocessorName.AcrylicBackdropFilter,
  preprocessor: (dictionary: PreprocessedTokens) => {
    const acrylic = (dictionary.sn as Record<string, unknown> | undefined)?.acrylic as
      | Record<string, TokenNode>
      | undefined;

    if (!acrylic) {
      return dictionary;
    }

    for (const [key, token] of Object.entries(acrylic)) {
      if (!key.startsWith(BLUR_PREFIX) || !token || token.$value === undefined) {
        continue;
      }

      // filePath/isSource переносим с исходного токена: по ним токен попадает в файл своего режима.
      acrylic[`${FILTER_PREFIX}${key.slice(BLUR_PREFIX.length)}`] = {
        ...token,
        $type: 'other',
        $value: isZero(token.$value) ? 'none' : `blur(calc({sn.acrylic.${key}} / 2))`,
      };
    }

    return dictionary;
  },
};

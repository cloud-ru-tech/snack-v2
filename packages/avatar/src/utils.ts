import { STATUS_INDICATOR_SIZE, StatusIndicatorSize } from '@ds/status';

import { SIZE } from './constants';
import { Size } from './types';

const SPACE = ' ';

/**
 * Соответствие размера аватара → размеру `StatusIndicator` из дефолтного
 * `slotBadge` Figma-варианта (узлы 4672:* в Snack-Ui-Kit). Используется
 * компонентом, когда задан проп `status`, и доступен наружу для случаев,
 * когда потребитель сам рендерит `StatusIndicator` через слот `badge`.
 */
export const AVATAR_TO_STATUS_INDICATOR_SIZE: Record<Size, StatusIndicatorSize> = {
  [SIZE.Xs]: STATUS_INDICATOR_SIZE.XXXXS,
  [SIZE.S]: STATUS_INDICATOR_SIZE.XXXS,
  [SIZE.M]: STATUS_INDICATOR_SIZE.XXXS,
  [SIZE.L]: STATUS_INDICATOR_SIZE.XXS,
  [SIZE['3Xl']]: STATUS_INDICATOR_SIZE.XS,
  [SIZE['6Xl']]: STATUS_INDICATOR_SIZE.S,
  [SIZE['9Xl']]: STATUS_INDICATOR_SIZE.S,
};

/**
 * Генерирует аббревиатуру из строки
 * @param str - исходная строка
 * @param abbreviationLength - количество символов в аббревиатуре (1 или 2)
 * @returns аббревиатура в верхнем регистре
 */
export const getAbbreviation = (str: string, abbreviationLength: 1 | 2): string => {
  const trimStr = str.replace(/[^a-zа-яё\d\s]/gi, '').trim();

  if (!trimStr || trimStr.length < abbreviationLength) {
    return trimStr.toUpperCase();
  }

  const strParts = trimStr.split(SPACE);
  let abbreviation = trimStr;

  if (strParts.length > 1) {
    const firstLetter = (strParts[0] ?? '').charAt(0);
    const lastWord = strParts[strParts.length - 1] ?? '';
    const secondLetter = lastWord.charAt(0);
    abbreviation = `${firstLetter}${secondLetter}`.toUpperCase();
  }

  return abbreviation.slice(0, abbreviationLength).toUpperCase();
};

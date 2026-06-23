import { SPECIAL_CHARS } from '../constants/specialChars';
import { InterpolationObject } from '../types/locale';

export function interpolateTranslation(text: string, interpolation?: InterpolationObject) {
  if (!text.includes('{{')) {
    return text;
  }

  return text.replace(/{{(.*?)}}/g, (match, name: string) => {
    if (Object.prototype.hasOwnProperty.call(SPECIAL_CHARS, name)) {
      return SPECIAL_CHARS[name as keyof typeof SPECIAL_CHARS];
    }

    const value = interpolation?.[name];

    return value !== undefined && value !== '' ? String(value) : match;
  });
}

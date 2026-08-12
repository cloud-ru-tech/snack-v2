import { enToRuMap, ruToEnMap } from '../searchConstants';

export function matchSearchString(value: string, search: string) {
  return value.trim().toLowerCase().includes(search.trim().toLowerCase());
}

function convertLayout(text: string, direction: 'en-ru' | 'ru-en' = 'en-ru') {
  const map = direction === 'en-ru' ? enToRuMap : ruToEnMap;

  return text
    .split('')
    .map(ch => map[ch] ?? ch)
    .join('');
}

function isCyrillic(text: string): boolean {
  return /[а-яё]/i.test(text);
}

function isLatin(text: string): boolean {
  return /[a-z]/i.test(text);
}

export function toggleLayout(text: string): string {
  const lowercaseValue = text.toLowerCase();

  if (isCyrillic(lowercaseValue)) {
    return convertLayout(lowercaseValue, 'ru-en');
  }

  if (isLatin(lowercaseValue)) {
    return convertLayout(lowercaseValue, 'en-ru');
  }

  return text;
}

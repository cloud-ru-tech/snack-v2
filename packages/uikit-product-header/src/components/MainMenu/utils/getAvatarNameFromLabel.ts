/**
 * Формирует двухбуквенный текст для пропа `name` компонента Avatar в MainMenu.
 *
 * - Одно слово — первые две буквы в верхнем регистре (`Маркетплейс` → `МА`).
 * - Два и более слов — первая буква первых двух слов (`Партнерский кабинет` → `ПК`).
 *
 * @param label — подпись карточки (`InnerLink.label`).
 * @returns Строка из двух символов для отображения в аватаре.
 *
 * @example
 * getAvatarNameFromLabel('Маркетплейс'); // 'МА'
 * getAvatarNameFromLabel('Партнерский кабинет'); // 'ПК'
 */
export function getAvatarNameFromLabel(label: string): string {
  const words = label.trim().split(/\s+/).filter(Boolean);

  if (words.length >= 2) {
    return `${words[0][0] ?? ''}${words[1][0] ?? ''}`.toUpperCase();
  }

  const word = words[0] ?? '';

  return word.slice(0, 2).toUpperCase();
}

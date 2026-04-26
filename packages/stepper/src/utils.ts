/**
 * Собирает data-test-id для вложенных элементов: `${root}${postfix}`.
 * Возвращает undefined если либо postfix, либо testId пустые — так родитель
 * может передать атрибут только когда сам получил тест-ид.
 */
export const getTestIdBuilder =
  (postfix?: string) =>
  (testId?: string): string | undefined =>
    postfix && testId ? `${testId}${postfix}` : undefined;

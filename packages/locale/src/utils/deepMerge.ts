type PlainObject = Record<string, unknown>;

function isPlainObject(value: unknown): value is PlainObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Рекурсивно сливает словари сообщений: ключи правого источника побеждают, вложенные
 * объекты сливаются по уровням. Результат — новый объект, источники не мутируются и не
 * шарят вложенные ссылки (иначе оверрайд одного namespace протёк бы в соседний).
 *
 * Листья словарей — строки, массивов в дереве сообщений нет, поэтому массивы копируются как есть.
 */
export function deepMerge<TResult extends object>(...sources: (object | undefined)[]): TResult {
  const result: PlainObject = {};

  for (const source of sources) {
    if (!isPlainObject(source)) {
      continue;
    }

    for (const [key, value] of Object.entries(source)) {
      if (value === undefined) {
        continue;
      }

      if (!isPlainObject(value)) {
        result[key] = value;
        continue;
      }

      const current = result[key];
      result[key] = isPlainObject(current) ? deepMerge(current, value) : deepMerge(value);
    }
  }

  return result as TResult;
}

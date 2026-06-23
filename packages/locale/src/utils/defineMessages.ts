import { LangMessages } from '../types/locale';

type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

/** Скелет ключей: сохраняет структуру, заменяет листья на `string`, делает все ключи обязательными. */
type DeepKeySkeleton<T> = T extends string ? string : { [K in keyof T]-?: DeepKeySkeleton<T[K]> };

/** Расширяет литералы листьев до `string`, сохраняя структуру. */
type WidenLeavesDeep<T> = T extends string ? string : { [K in keyof T]: WidenLeavesDeep<T[K]> };

/**
 * Полный набор ключей по всем языкам словаря: union форм языков → расширение листьев до `string`
 * (иначе при `const` пересечение разных литералов одного ключа даёт `never` и ломает проверку) →
 * intersection (даёт ВСЕ ключи) → скелет с обязательными ключами. Каждый язык обязан быть assignable
 * к этому — иначе у него не хватает ключа, который есть у другого языка.
 */
type AllKeysSkeleton<T> = DeepKeySkeleton<UnionToIntersection<WidenLeavesDeep<T[keyof T]>>>;

/**
 * Объявляет словарь компонента с проверкой полноты на уровне типов: **все языки обязаны иметь
 * одинаковый набор ключей с одинаковой вложенностью**. Если ключ добавлен в один язык и забыт в
 * другом (на любом уровне вложенности) — TS падает с ошибкой прямо на языке, где ключа не хватает.
 *
 * ```ts
 * export const CALENDAR_MESSAGES = defineMessages({
 *   'en-GB': { apply: 'Apply', current: 'Current' },
 *   'ru-RU': { apply: 'Применить', current: 'Сейчас' },
 * });
 * // добавили в en-GB `newKey` и забыли в ru-RU → ошибка компиляции на 'ru-RU'.
 * ```
 *
 * Значения листьев между языками, естественно, разные — проверяются только ключи и структура.
 *
 * Параметр `const`: сохраняет строки листьев как литералы (`'Привет, {{name}}!'`, а не `string`), чтобы
 * `t` мог вывести имена `{{placeholder}}` в тип аргумента интерполяции.
 */
export function defineMessages<const T extends LangMessages>(messages: T & Record<keyof T, AllKeysSkeleton<T>>): T {
  return messages as unknown as T;
}

import { SpecialCharName } from '../constants/specialChars';

type Primitive = null | undefined | string | number | boolean | symbol | bigint;

type BuiltIns = Primitive | void | Date | RegExp;

export type PartialDeep<T> = T extends
  | BuiltIns
  | ((...arguments_: unknown[]) => unknown)
  | (new (...arguments_: unknown[]) => unknown)
  ? T
  : T extends Map<infer KeyType, infer ValueType>
    ? PartialMapDeep<KeyType, ValueType>
    : T extends Set<infer ItemType>
      ? PartialSetDeep<ItemType>
      : T extends ReadonlyMap<infer KeyType, infer ValueType>
        ? PartialReadonlyMapDeep<KeyType, ValueType>
        : T extends ReadonlySet<infer ItemType>
          ? PartialReadonlySetDeep<ItemType>
          : T extends object
            ? PartialObjectDeep<T>
            : unknown;

/**
 Same as `PartialDeep`, but accepts only `Map`s and as inputs. Internal helper for `PartialDeep`.
 */
type PartialMapDeep<KeyType, ValueType> = unknown & Map<PartialDeep<KeyType>, PartialDeep<ValueType>>;

/**
 Same as `PartialDeep`, but accepts only `Set`s as inputs. Internal helper for `PartialDeep`.
 */
type PartialSetDeep<T> = unknown & Set<PartialDeep<T>>;

/**
 Same as `PartialDeep`, but accepts only `ReadonlyMap`s as inputs. Internal helper for `PartialDeep`.
 */
type PartialReadonlyMapDeep<KeyType, ValueType> = unknown & ReadonlyMap<PartialDeep<KeyType>, PartialDeep<ValueType>>;

/**
 Same as `PartialDeep`, but accepts only `ReadonlySet`s as inputs. Internal helper for `PartialDeep`.
 */
type PartialReadonlySetDeep<T> = unknown & ReadonlySet<PartialDeep<T>>;

/**
 Same as `PartialDeep`, but accepts only `object`s as inputs. Internal helper for `PartialDeep`.
 */
type PartialObjectDeep<ObjectType extends object> = {
  [KeyType in keyof ObjectType]?: PartialDeep<ObjectType[KeyType]>;
};

/**
 * https://stackoverflow.com/a/73179989
 */
type Dot<T extends string, U extends string> = '' extends U ? T : `${T}.${U}`;

export type PathsToProps<T, V> = T extends V
  ? ''
  : {
      [K in Extract<keyof T, string>]: Dot<K, PathsToProps<T[K], V>>;
    }[Extract<keyof T, string>];

/** Все имена `{{placeholder}}` внутри строки-литерала, включая зарезервированные спецсимволы. */
type RawPlaceholders<S> = S extends string
  ? S extends `${string}{{${infer Name}}}${infer Rest}`
    ? Name | RawPlaceholders<Rest>
    : never
  : never;

/**
 * Имена `{{placeholder}}`, которые потребитель обязан передать в `t` (union; пустой набор → `never`).
 * Зарезервированные токены спецсимволов (`SPECIAL_CHARS`) исключены — их подставляет движок.
 */
export type Placeholders<S> = Exclude<RawPlaceholders<S>, SpecialCharName>;

/** Литерал значения словаря по dotted-пути ключа (`'a.b.c'`). */
export type ValueAtPath<T, K extends string> = K extends `${infer Head}.${infer Tail}`
  ? Head extends keyof T
    ? ValueAtPath<T[Head], Tail>
    : never
  : K extends keyof T
    ? T[K]
    : never;

/**
 * Аргумент интерполяции `t` для значения `V`: если в строке нет `{{placeholder}}` — аргумента нет;
 * иначе обязательный объект ровно с этими ключами. Для union-ключа `V` — объединение плейсхолдеров.
 */
export type InterpolationArgs<V> = [Placeholders<V>] extends [never]
  ? []
  : [interpolation: { [P in Placeholders<V>]: string | number }];

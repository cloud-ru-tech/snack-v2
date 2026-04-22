export const isNil = (value: unknown): value is undefined | null => value === undefined || value === null;

export const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean';

export const isString = (value: unknown): value is string => typeof value === 'string';

export const isArray = <T>(value: unknown): value is Array<T> => Array.isArray(value);

export const isObject = (value: unknown): value is object => typeof value === 'object' && !isArray(value);

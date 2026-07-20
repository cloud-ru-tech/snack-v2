import { camelCase } from 'change-case';

export function toCamelCase(key: string): string {
  return camelCase(key);
}

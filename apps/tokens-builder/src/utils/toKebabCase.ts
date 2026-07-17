import { kebabCase } from 'change-case';

export function toKebabCase(key: string): string {
  return kebabCase(key);
}

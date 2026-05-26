import { ReactNode } from 'react';

export function isStringOrNumber(content: ReactNode): content is string | number {
  return typeof content === 'string' || typeof content === 'number';
}

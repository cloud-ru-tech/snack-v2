import { ReactNode } from 'react';

export function isSlotFilled(node: ReactNode): boolean {
  return node != null && typeof node !== 'boolean' && node !== '';
}

import { ReactNode } from 'react';

type MarkObject = { label: ReactNode };

export function isMarkObject(mark: unknown): mark is MarkObject {
  return Boolean(mark && typeof mark === 'object' && 'label' in (mark as Record<string, unknown>));
}

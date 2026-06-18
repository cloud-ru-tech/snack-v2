import { isBrowser } from '@ds/utils';

import { tryParseLocalStorage } from '../../../helpers';

const RESIZED_KEY = 'RESIZED_COLUMN_KEY';

type ResizeState = { resizeState?: Record<string, string> } | null;

type GetSavedStateFromLocalStorageProps = {
  id: string;
  columnId: string;
};

export function getInitColumnSizeFromLocalStorage({
  id,
  columnId,
}: GetSavedStateFromLocalStorageProps): string | undefined {
  if (isBrowser()) {
    const savedStateFromStorage = tryParseLocalStorage(id || '') as ResizeState;

    if (!savedStateFromStorage) {
      return;
    }

    return savedStateFromStorage.resizeState?.[`${RESIZED_KEY}-${columnId}`];
  }
}

type SaveStateToLocalStorageProps = {
  id: string;
  columnId: string;
  size: string;
};

export function saveStateToLocalStorage({ id, columnId, size }: SaveStateToLocalStorageProps): void {
  if (isBrowser()) {
    const savedStateFromStorage = tryParseLocalStorage(id) as ResizeState;
    const newResizeState = savedStateFromStorage?.resizeState || {};

    newResizeState[`${RESIZED_KEY}-${columnId}`] = size;

    localStorage.setItem(id, JSON.stringify({ ...(savedStateFromStorage || {}), resizeState: newResizeState }));
  }
}

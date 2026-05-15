import { isBrowser } from '@ds/utils';

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- interface merging required for `Window`
  interface Window {
    '__snack-monaco-editor-loader__'?: { loadMonaco: () => Promise<unknown> };
  }
}

export const loadMonacoEditor = async () => {
  if (!isBrowser()) return null;
  if (window['__snack-monaco-editor-loader__']?.loadMonaco) {
    const monaco = await window['__snack-monaco-editor-loader__'].loadMonaco();
    return monaco;
  }
  return null;
};

/** Подгрузить `monaco-editor`. */
export const preloadMonacoEditor = async () => loadMonacoEditor();

import { ComponentType } from 'react';

import { loadMonacoEditor } from '../../loader';
import { withMonaco } from '../../withMonaco';
import { CodeEditorProps } from '../CodeEditor';

/**
 * `CodeEditor` с предзагруженным `monaco-editor`.
 *
 * @example
 * ```tsx
 * import { Suspense, lazy } from 'react'
 * import { AsyncCodeEditor } from '@ds/code-editor'
 *
 * const Editor = lazy(() => AsyncCodeEditor())
 *
 * const MyComponent = () => (
 *   <Suspense fallback='loading...'>
 *     <Editor language='json' value='' />
 *   </Suspense>
 * )
 * ```
 */
export const AsyncCodeEditor: () => Promise<{ default: ComponentType<CodeEditorProps> }> = async () => {
  const monaco = await loadMonacoEditor();
  // loadMonacoEditor возвращает `unknown` от внешнего loader'а; минимально
  // проверяем, что это объект с editor namespace'ом, иначе откатываемся
  // на дефолтный CDN-loader (@monaco-editor/react).
  if (monaco && typeof monaco === 'object' && 'editor' in monaco) {
    return { default: withMonaco(monaco as typeof import('monaco-editor')).CodeEditor };
  }
  return { default: withMonaco().CodeEditor };
};

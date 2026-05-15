import { Spinner } from '@ds/loader';
import { lazy, Suspense } from 'react';

import { AsyncCodeEditor } from '../AsyncCodeEditor';
import { CodeEditorProps } from '../CodeEditor';
import styles from './styles.module.scss';

const CodeEditor = lazy(() => AsyncCodeEditor());

export type LazyCodeEditorProps = CodeEditorProps;

function Loader({ width, height }: { width?: number | string; height?: number | string }) {
  // Прокидываем width/height из пропсов потребителя в fallback, чтобы при
  // <LazyCodeEditor height='100%' /> внутри fixed-height контейнера спиннер
  // не «схлопывался» в min-height и не было layout-прыжка при появлении monaco.
  return (
    <div className={styles.fallback} style={{ width, height }}>
      <Spinner />
    </div>
  );
}

/**
 * Готовый preset на базе `AsyncCodeEditor` + `Suspense`.
 *
 * @example
 * ```tsx
 * import { LazyCodeEditor } from '@ds/code-editor'
 *
 * const MyComponent = () => <LazyCodeEditor language='json' value='' />
 * ```
 */
export function LazyCodeEditor(props: LazyCodeEditorProps) {
  return (
    <Suspense fallback={<Loader width={props.width} height={props.height} />}>
      <CodeEditor {...props} />
    </Suspense>
  );
}

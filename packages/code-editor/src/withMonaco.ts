import { loader } from '@monaco-editor/react';

import { CodeEditor } from './components/CodeEditor';

type MonacoNamespace = typeof import('monaco-editor');

export const withMonaco = (monaco?: MonacoNamespace) => {
  if (monaco) {
    loader.config({ monaco });
  }
  return {
    CodeEditor,
  };
};

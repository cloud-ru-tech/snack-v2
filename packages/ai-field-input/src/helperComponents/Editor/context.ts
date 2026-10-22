import { createContext, ReactNode, useContext } from 'react';

export type ChipMeta = {
  icon?: ReactNode;
  tooltip?: ReactNode;
};

export type EditorViewContextValue = {
  chips: Map<string, ChipMeta>;
  removeLabel: string;
};

export const EditorViewContext = createContext<EditorViewContextValue>({
  chips: new Map(),
  removeLabel: '',
});

export function useEditorViewContext(): EditorViewContextValue {
  return useContext(EditorViewContext);
}

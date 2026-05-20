import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';

type AiSuggestionParentGroupContextValue = {
  expandedKey: string | null;
  requestExpand(key: string): void;
  collapseKey(key: string): void;
};

const AiSuggestionParentGroupContext = createContext<AiSuggestionParentGroupContextValue | null>(null);

export type AiSuggestionParentGroupProviderProps = {
  children: ReactNode;
  initialExpandedKey?: string | null;
};

export function AiSuggestionParentGroupProvider({
  children,
  initialExpandedKey = null,
}: AiSuggestionParentGroupProviderProps) {
  const [expandedKey, setExpandedKey] = useState<string | null>(initialExpandedKey);

  const requestExpand = useCallback((key: string) => {
    setExpandedKey(prev => (prev === key ? null : key));
  }, []);

  const collapseKey = useCallback((key: string) => {
    setExpandedKey(prev => (prev === key ? null : prev));
  }, []);

  const value = useMemo(
    () => ({
      expandedKey,
      requestExpand,
      collapseKey,
    }),
    [collapseKey, expandedKey, requestExpand],
  );

  return <AiSuggestionParentGroupContext.Provider value={value}>{children}</AiSuggestionParentGroupContext.Provider>;
}

export function useAiSuggestionParentGroup() {
  return useContext(AiSuggestionParentGroupContext);
}

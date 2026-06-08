import { createContext, useContext } from 'react';

export type AiToolContentFormat = {
  mono?: boolean;
  error?: boolean;
};

export const AiToolContentContext = createContext<AiToolContentFormat>({});

export function useAiToolContentFormat(): AiToolContentFormat {
  return useContext(AiToolContentContext);
}

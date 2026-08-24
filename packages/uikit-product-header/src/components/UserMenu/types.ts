import { MouseEvent, ReactNode } from 'react';

export type UserProfileProps = {
  fullName?: string;
  email?: string;
  inviteCount?: number;
  onClick?(e: MouseEvent<HTMLElement>): void;
  itemWrapRender?(node: ReactNode): ReactNode;
};

type ValueOf<T> = T[keyof T];

export const THEME_MODE = {
  Light: 'light',
  Dark: 'dark',
  System: 'system',
} as const;

export type ThemeMode = ValueOf<typeof THEME_MODE>;

export type ThemeProps = {
  value?: ThemeMode;
  onChange?(themeMode: ThemeMode): void;
};

import { MouseEvent, ReactNode } from 'react';

export type UserProfileProps = {
  /** Полное имя пользователя. Отображается в аватаре (первые буквы) и в пункте профиля меню. */
  fullName?: string;
  /** Email пользователя. */
  email?: string;
  /** Число активных приглашений — отображается счётчиком на кнопке-триггере меню. */
  inviteCount?: number;
  /** Колбэк клика по пункту профиля. */
  onClick?(e: MouseEvent<HTMLElement>): void;
  /** Оборачивает содержимое пункта профиля — например, ссылкой или дополнительной разметкой. */
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
  /** Текущий режим темы. Без пропа переключатель темы в меню не отображается. */
  value?: ThemeMode;
  /** Колбэк изменения режима темы. */
  onChange?(themeMode: ThemeMode): void;
};

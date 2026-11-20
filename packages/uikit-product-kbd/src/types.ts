import { ValueOf, WithSupportProps } from '@ds/utils';
import { ReactNode, Ref } from 'react';

import { KBD_KEY_NAME, KBD_PLATFORM } from './constants';

export type KbdKeyName = ValueOf<typeof KBD_KEY_NAME>;
export type KbdPlatform = ValueOf<typeof KBD_PLATFORM>;

// `aria-label` из `AriaAttributes` переопределён: он рендерится скрытым текстом, а не атрибутом.
export type KbdProps = Omit<WithSupportProps<KbdOwnProps>, 'aria-label'> & {
  /** Название клавиши для скринридера, если видимый символ его не передаёт (`↵` → `Enter`). */
  'aria-label'?: string;
};

type KbdOwnProps = {
  /** Клавиша: текст или unicode-символ (`K`, `/`, `F1`). Игнорируется, если задан `keyName`. */
  children?: ReactNode;
  /**
   * Предопределённая клавиша: символ и доступное название берутся из карты.
   * Модификаторы зависят от ОС: `mod` — `⌘` на macOS и `Ctrl` на остальных.
   */
  keyName?: KbdKeyName;
  /** Платформа для `keyName`. По умолчанию определяется по user-agent. */
  platform?: KbdPlatform;
  /** Дополнительный CSS-класс */
  className?: string;
  /** Ref на корневой `<kbd>` */
  innerRef?: Ref<HTMLElement>;
};

/** Клавиша сочетания: `keyName` резолвится по ОС, любая другая строка выводится как есть. */
export type KbdShortcutKey = KbdKeyName | (string & Record<never, never>);

// `aria-label` из `AriaAttributes` переопределён: он рендерится скрытым текстом, а не атрибутом.
export type KbdShortcutProps = Omit<WithSupportProps<KbdShortcutOwnProps>, 'aria-label'> & {
  /** Название сочетания для скринридера. По умолчанию собирается из названий клавиш: «Command + K». */
  'aria-label'?: string;
};

type KbdShortcutOwnProps = {
  /**
   * Клавиши сочетания по порядку. Значение `keyName` (`mod`, `shift`, `enter`, …) резолвится по ОС,
   * остальное выводится текстом (`K`, `/`, `F1`).
   */
  keys: KbdShortcutKey[];
  /** Платформа для клавиш из `keyName`. По умолчанию определяется по user-agent. */
  platform?: KbdPlatform;
  /** Дополнительный CSS-класс */
  className?: string;
  /** Ref на корневой `<kbd>` */
  innerRef?: Ref<HTMLElement>;
};

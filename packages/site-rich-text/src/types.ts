import { ValueOf, WithSupportProps } from '@ds/utils';
import { ReactNode } from 'react';

import { RICH_TEXT_TAG } from './constants';

export type RichTextTag = ValueOf<typeof RICH_TEXT_TAG>;

export type RichTextProps = WithSupportProps<{
  /**
   * Содержимое блока.
   *
   * - `string` — HTML-разметка. Перед вставкой очищается DOMPurify: удаляются скрипты, обработчики `on*`,
   *   ссылки `javascript:`, стили, элементы форм, SVG и MathML.
   * - `ReactNode` — рендерится как дочерние элементы.
   */
  content?: string | ReactNode;
  /**
   * Тег корневого элемента. Задаёт только семантику: стили заголовков браузера по умолчанию сброшены,
   * типографику задаёт родитель или `className`.
   *
   * В строчный элемент и заголовок передавайте только строчную разметку (`a`, `strong`, `em`, `br`):
   * абзацы и списки внутри них недопустимы по HTML.
   */
  tag?: RichTextTag;
  /** CSS-класс корневого элемента. */
  className?: string;
}>;

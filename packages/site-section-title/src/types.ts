import { ValueOf, WithSupportProps } from '@ds/utils';

import { SECTION_TITLE_TAG, SECTION_TITLE_TYPE } from './constants';

export type SectionTitleType = ValueOf<typeof SECTION_TITLE_TYPE>;

export type SectionTitleTag = ValueOf<typeof SECTION_TITLE_TAG>;

export type SectionTitleProps = WithSupportProps<{
  /** Заголовок. Строка может содержать строчную HTML-разметку (`a`, `strong`, `em`, `br`). */
  title?: string;
  /** Описание. Строка может содержать HTML-разметку. */
  description?: string;
  /** Раскладка блока. */
  type?: SectionTitleType;
  /** Тег заголовка. */
  titleTag?: SectionTitleTag;
  /** CSS-класс корня. */
  className?: string;
}>;

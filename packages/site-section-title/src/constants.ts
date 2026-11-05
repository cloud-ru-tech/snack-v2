const PREFIX = 'section-title';

/** Раскладка заголовочного блока. */
export const SECTION_TITLE_TYPE = {
  /** Описание справа от заголовка на desktop, под заголовком на tablet и mobile. */
  DescriptionRight: 'descriptionRight',
  /** Описание под заголовком. */
  DescriptionUnderTitle: 'descriptionUnderTitle',
  /** Описание под заголовком, текст по центру. */
  Centered: 'centered',
  /** Уменьшенная типографика, описание под заголовком. */
  Small: 'small',
} as const;

/** Теги заголовка. */
export const SECTION_TITLE_TAG = {
  H1: 'h1',
  H2: 'h2',
  H3: 'h3',
  H4: 'h4',
} as const;

export const TEST_IDS = {
  root: PREFIX,
  title: `${PREFIX}__title`,
  description: `${PREFIX}__description`,
} as const;

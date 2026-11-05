import { BACKGROUND_PREDEFINED_FILL } from '@ds/materials';

const PREFIX = 'section-basic';

/**
 * Ширина и отступы секции. Временная настройка на период редизайна: задаётся явно в каждом месте использования.
 */
export const CONTAINER = {
  /** Целевой вид: секция шире, отступы меньше. */
  New: 'new',
  /** Визуальная совместимость со страницами до редизайна. */
  Old: 'old',
} as const;

/**
 * Подложка фона секции (Figma `sectionBackground.appearance`): набор `BACKGROUND_PREDEFINED_FILL` из `@ds/materials`
 * и `neutralBackground` — подложка секции по умолчанию.
 */
export const SECTION_BACKGROUND_FILL = {
  ...BACKGROUND_PREDEFINED_FILL,
  NeutralBackground: 'neutralBackground',
} as const;

/** Тип фона блока по ширине `container` (Figma `bgLocal.type`). */
export const SECTION_CONTAINER_BACKGROUND_TYPE = {
  /** Подложка из `SECTION_BACKGROUND_FILL`. */
  Bg: 'bg',
  /** Картинка во весь блок. */
  Image: 'image',
  /** Акцентный цвет бренда. */
  Accent: 'accent',
} as const;

export const TEST_IDS = {
  root: PREFIX,
  sectionTitle: `${PREFIX}__section-title`,
  tabs: `${PREFIX}__tabs`,
  filters: `${PREFIX}__filters`,
  containerBackground: `${PREFIX}__container-background`,
  footer: `${PREFIX}__footer`,
  pagination: `${PREFIX}__pagination`,
  moreButton: `${PREFIX}__more-button`,
} as const;

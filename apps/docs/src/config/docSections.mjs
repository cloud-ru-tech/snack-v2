/**
 * Canonical order + titles of H2 sections on component/pattern doc pages.
 *
 * Authors write sections in any order in MDX. The `remark-section-order`
 * plugin reshuffles them to match this list at build time. Changing the order
 * here changes it across all doc pages.
 *
 * Sections are matched by heading text (case-insensitive, quotes normalised)
 * against the `title` column. Non-canonical H2s (component-specific axes like
 * `## Appearance — семантика`) keep their original position among themselves.
 *
 * @type {ReadonlyArray<{ id: string, title: string }>}
 */
export const DOC_SECTIONS = [
  { id: 'demo', title: 'Демо' },
  { id: 'when', title: 'Когда использовать' },
  { id: 'anatomy', title: 'Анатомия' },
  { id: 'install', title: 'Установка' },
  { id: 'examples', title: 'Примеры использования' },
  { id: 'props', title: 'Props' },
  { id: 'storybook', title: 'Storybook' },
  { id: 'figma', title: 'Figma' },
  { id: 'see-also', title: 'Смотри также' },
]

/** @type {Record<string, number>} */
export const DOC_SECTION_ORDER = Object.fromEntries(
  DOC_SECTIONS.map((s, i) => [s.id, i]),
)

export const TEST_IDS = {
  catalog: 'icons-catalog',
  searchInput: 'icons-search-input',
  row: (sectionName: string) => `icons-row-${sectionName}`,
  card: (iconName: string) => `icon-card-${iconName}`,
} as const;

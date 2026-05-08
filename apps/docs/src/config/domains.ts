/**
 * Domain configuration: maps package-name prefixes to high-level domain groups.
 * Used by the docs site (home tabs + sidebar) and by Storybook story-title helpers.
 *
 * Order in this list = order in tabs and sidebar.
 * First match wins; the entry with `isDefault: true` catches everything that
 * didn't match any prefix.
 */
export type Domain = {
  id: string;
  label: string;
  storybookLabel: string;
  description?: string;
  prefix?: string;
  isDefault?: boolean;
};

export const DOMAINS: readonly Domain[] = [
  {
    id: 'components',
    label: 'Components',
    storybookLabel: 'Components',
    description:
      'Базовые UI-кирпичики дизайн-системы: кнопки, поля, навигация, оверлеи. Подходят для любого продукта поверх @ds.',
    isDefault: true,
  },
  {
    id: 'uikit-product',
    label: 'Uikit Product',
    storybookLabel: 'Uikit Product',
    description:
      'Продуктовые компоненты поверх базовых: композиции для типовых сценариев продуктовых интерфейсов (карточки, копирование, info-row).',
    prefix: 'uikit-product-',
  },
  {
    id: 'ai',
    label: 'AI',
    storybookLabel: 'AI',
    description: 'Компоненты, специфичные для AI-сценариев: подсказки, превью генераций, агентные интерфейсы.',
    prefix: 'ai-',
  },
  {
    id: 'admin',
    label: 'Admin',
    storybookLabel: 'Admin',
    description: 'Компоненты для админских/служебных интерфейсов. Не для пользовательских продуктов.',
    prefix: 'admin-',
  },
];

// Validate prefixes at module load: order in DOMAINS is significant because
// resolveDomain returns the first match. If two prefixes overlap (one is a
// prefix of another, e.g. 'admin-' vs 'admin-internal-'), the longer one must
// come first or it will never match — fail loudly instead of silently routing
// packages to the wrong domain.
for (let i = 0; i < DOMAINS.length; i++) {
  const a = DOMAINS[i].prefix;
  if (!a) continue;
  for (let j = i + 1; j < DOMAINS.length; j++) {
    const b = DOMAINS[j].prefix;
    if (b && b.startsWith(a)) {
      throw new Error(
        `DOMAINS prefix order is broken: "${b}" (id="${DOMAINS[j].id}") is shadowed by "${a}" (id="${DOMAINS[i].id}"). Move the more specific prefix earlier.`,
      );
    }
  }
}

const DEFAULT_DOMAIN = DOMAINS.find(d => d.isDefault) ?? DOMAINS[0];

export function resolveDomain(pkg: string): Domain {
  for (const d of DOMAINS) {
    if (d.prefix && pkg.startsWith(d.prefix)) return d;
  }
  return DEFAULT_DOMAIN;
}

export function resolveDomainId(pkg: string): string {
  return resolveDomain(pkg).id;
}

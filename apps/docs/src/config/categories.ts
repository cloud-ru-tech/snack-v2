/**
 * Splits each domain block (config/domains.ts) into category sub-groups for the
 * sidebar, home page and /llms.txt. Domains absent here render their packages flat.
 * Categories are presentation-only — routing stays at /components/<pkg>; a package
 * missing from its domain's categories falls into "Other" with a build-time warning.
 */
export type Category = {
  id: string;
  label: string;
  description: string;
  /** Package names without the @ds/ scope. */
  packages: readonly string[];
};

export const CATEGORIES_BY_DOMAIN: Readonly<Record<string, readonly Category[]>> = {
  components: [
    {
      id: 'actions',
      label: 'Actions',
      description: 'Триггеры действий по клику: кнопки, ссылки, панели инструментов.',
      packages: ['button', 'button-combo', 'link', 'toolbar'],
    },
    {
      id: 'inputs',
      label: 'Inputs & Forms',
      description:
        'Ввод и редактирование значений: поля, переключатели, чипы-фильтры, выбор значений (цвет, дата, рейтинг), сегментный контрол, загрузка файлов, редакторы кода и markdown.',
      packages: [
        'fields',
        'toggles',
        'search',
        'slider',
        'color-picker',
        'calendar',
        'rating',
        'segment-control',
        'chips',
        'dropzone',
        'code-editor',
        'markdown',
      ],
    },
    {
      id: 'navigation',
      label: 'Navigation',
      description: 'Перемещение по интерфейсу и переключение разделов/шагов: табы, хлебные крошки, пагинация, степпер.',
      packages: ['tabs', 'breadcrumbs', 'pagination', 'stepper'],
    },
    {
      id: 'data-display',
      label: 'Data display',
      description:
        'Отображение данных и сущностей (read-only): таблицы, списки, дерево, аватары, теги, счётчики, статусы, таймлайн, прикреплённые файлы.',
      packages: [
        'table',
        'list',
        'tree',
        'avatar',
        'tag',
        'promo-tag',
        'counter',
        'status',
        'timeline',
        'info-block',
        'attachment',
      ],
    },
    {
      id: 'overlays',
      label: 'Overlays',
      description:
        'Всплывающие/плавающие поверхности поверх контента: модалки, drawer, popover, dropdown, tooltip, тостеры.',
      packages: ['modal', 'drawer', 'popover', 'dropdown', 'tooltip', 'toaster', 'bottom-sheet'],
    },
    {
      id: 'layout',
      label: 'Layout & containers',
      description:
        'Структурирование пространства и поверхности-контейнеры: блоки, карточки, аккордеон, разделители, карусель, скролл-контейнер.',
      packages: ['block', 'card', 'accordion', 'divider', 'carousel', 'scroll'],
    },
    {
      id: 'feedback',
      label: 'Feedback',
      description: 'Сигналы состояния, загрузки и внимания: алерты, скелетоны, лоадеры, прогресс-бары, hot-spot.',
      packages: ['alert', 'skeleton', 'loader', 'progress-bar', 'hot-spot'],
    },
    {
      id: 'typography',
      label: 'Typography',
      description: 'Текстовые примитивы: типографика и обрезка строк.',
      packages: ['typography', 'truncate-string'],
    },
    {
      id: 'foundation',
      label: 'Foundation & utilities',
      description:
        'Инфраструктура поверх которой строятся компоненты: провайдеры, темы, локализация, шрифты, иконки, утилиты и внутренние пакеты.',
      packages: [
        'adaptive',
        'theme',
        'context-kit',
        'portal-context',
        'locale',
        'fonts',
        'materials',
        'icons',
        'icon-predefined',
        'utils',
        'input-private',
        'search-private',
        'popover-private',
      ],
    },
  ],
  'uikit-product': [
    {
      id: 'actions',
      label: 'Actions',
      description: 'Продуктовые действия: предопределённые кнопки, кликабельные заголовки, копирование.',
      packages: ['uikit-product-button-predefined', 'uikit-product-title-clickable', 'uikit-product-copy'],
    },
    {
      id: 'inputs',
      label: 'Inputs & Forms',
      description:
        'Продуктовый ввод: загрузка файлов, строки-настройки, карточки выбора (ToggleCard / ToggleGroup), chip-переключатели конфигурации, предопределённые поля.',
      packages: [
        'uikit-product-upload-files',
        'uikit-product-switch-row',
        'uikit-product-toggles-predefined',
        'uikit-product-config-selector',
        'uikit-product-fields-predefined',
      ],
    },
    {
      id: 'data-display',
      label: 'Data display',
      description: 'Продуктовые блоки данных и виджеты: инфо-строки, цена, квоты, виджеты, промо-теги.',
      packages: [
        'uikit-product-avatar-detail',
        'uikit-product-card-predefined',
        'uikit-product-info-row',
        'uikit-product-price-summary',
        'uikit-product-quota',
        'uikit-product-widget',
        'uikit-product-promo-tag-predefined',
      ],
    },
    {
      id: 'overlays',
      label: 'Overlays',
      description:
        'Продуктовые всплывающие поверхности: предопределённые модальные окна (удаление, отзыв, release notes).',
      packages: ['uikit-product-modal-predefined'],
    },
    {
      id: 'feedback',
      label: 'Feedback',
      description:
        'Статусы и уведомления: строка статуса загрузки, карточки и ленты уведомлений, полноэкранные error-страницы.',
      packages: ['uikit-product-load-status', 'uikit-product-notification', 'uikit-product-error-pages'],
    },
    {
      id: 'layout',
      label: 'Layout',
      description: 'Раскладка продуктовых интерфейсов.',
      packages: ['uikit-product-flex', 'uikit-product-layout', 'uikit-product-page-layout'],
    },
  ],
  ai: [
    {
      id: 'ai-surfaces',
      label: 'Surfaces',
      description: 'AI-поверхности для взаимодействия: карточки, подсказки, баннеры полей.',
      packages: ['ai-card', 'ai-suggestion', 'ai-field-banner', 'ai-field-notice', 'ai-queue'],
    },
    {
      id: 'ai-process',
      label: 'Process & motion',
      description: 'Отображение AI-процесса: reasoning-цепочки и анимации генерации.',
      packages: ['ai-reasoning', 'ai-shimmer', 'ai-chain-of-thoughts'],
    },
    {
      id: 'ai-primitives',
      label: 'Primitives',
      description: 'Базовые презентационные элементы для сборки AI-компонентов.',
      packages: ['ai-tool', 'ai-button-chevron', 'ai-icon-giga'],
    },
  ],
};

/** Catch-all for packages missing from their domain's categories. */
export const OTHER_CATEGORY = {
  id: 'other',
  label: 'Other',
  description: 'Пакеты, ещё не отнесённые к категории.',
} as const;

// A duplicate would let the reverse map silently pick the last claim — fail loudly.
const pkgToCategoryByDomain = new Map<string, Map<string, string>>();
for (const [domainId, cats] of Object.entries(CATEGORIES_BY_DOMAIN)) {
  const map = new Map<string, string>();
  for (const cat of cats) {
    for (const pkg of cat.packages) {
      const existing = map.get(pkg);
      if (existing) {
        throw new Error(
          `CATEGORIES_BY_DOMAIN[${domainId}]: package "${pkg}" is listed in both "${existing}" and "${cat.id}". A package must belong to exactly one category.`,
        );
      }
      map.set(pkg, cat.id);
    }
  }
  pkgToCategoryByDomain.set(domainId, map);
}

export function domainHasCategories(domainId: string): boolean {
  return domainId in CATEGORIES_BY_DOMAIN;
}

/** Categories in render order, plus a trailing "Other"; empty for flat domains. */
export function categoriesForDomain(domainId: string): readonly { id: string; label: string; description: string }[] {
  const cats = CATEGORIES_BY_DOMAIN[domainId];
  return cats ? [...cats, { ...OTHER_CATEGORY }] : [];
}

/** Category id, or OTHER for an unlisted package; undefined for flat domains. */
export function resolveCategoryId(domainId: string, pkg: string): string | undefined {
  const map = pkgToCategoryByDomain.get(domainId);
  if (!map) return undefined;
  return map.get(pkg) ?? OTHER_CATEGORY.id;
}

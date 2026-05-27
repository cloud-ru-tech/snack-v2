// Импорт из исходников пакета, не из entry `@ds/<pkg>` — entry тянет CSS-модули
// и SVG-импорты из транзитивных deps (@ds/icons), что ломает playwright-compile
// helpers'ов, импортирующих этот файл. Stories грузятся через storybook-бандлер
// и обрабатывают эти импорты сами.
import { TEST_IDS as PKG_TEST_IDS } from '../src/constants';

export const TEST_IDS = {
  attachment: {
    root: PKG_TEST_IDS.root,
    title: PKG_TEST_IDS.title,
    description: PKG_TEST_IDS.description,
    error: PKG_TEST_IDS.error,
    icon: PKG_TEST_IDS.icon,
    image: PKG_TEST_IDS.image,
    loading: PKG_TEST_IDS.loading,
    downloadAction: PKG_TEST_IDS.downloadAction,
    deleteAction: PKG_TEST_IDS.deleteAction,
    retryAction: PKG_TEST_IDS.retryAction,
  },
  attachmentSquare: {
    root: PKG_TEST_IDS.rootSquare,
    loading: PKG_TEST_IDS.loadingSquare,
    downloadAction: PKG_TEST_IDS.downloadAction,
    deleteAction: PKG_TEST_IDS.deleteAction,
    retryAction: PKG_TEST_IDS.retryAction,
  },
} as const;

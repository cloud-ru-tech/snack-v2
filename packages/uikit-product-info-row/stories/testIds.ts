import { TEST_IDS as PACKAGE_TEST_IDS } from '../src/constants';

/**
 * Единый source-of-truth для test-id'ов всех 4 компонентов пакета.
 * Корневые id берутся из публичного `src/constants::TEST_IDS`,
 * остальные — stories-level (slot'ы actions, кейсы Figma/Matrix, div-wrapper'ы).
 */
export const TEST_IDS = {
  infoGroup: {
    root: PACKAGE_TEST_IDS.infoGroup,
    matrix: (columns: number | string, width: string) => `info-group-matrix-${columns}-${width}`,
  },
  infoRow: {
    root: PACKAGE_TEST_IDS.infoRow,
    actionFirst: 'info-row-action-first',
    actionSecond: 'info-row-action-second',
    actionSecondColFirst: 'info-row-action-second-col-first',
    figma: (column: string, maxWidth: string) => `info-row-figma-${column}-${maxWidth}`,
    matrix: (width: string, loading: string) => `info-row-matrix-${width}-${loading}`,
    divBoth: 'info-row-div-both',
    divTop: 'info-row-div-top',
    divBottom: 'info-row-div-bottom',
  },
  mobileInfoRow: {
    root: PACKAGE_TEST_IDS.mobileInfoRow,
    position: (position: string, hasActions: string | boolean) => `mobile-info-row-position-${position}-${hasActions}`,
    loading: (position: string, loading: string | boolean) => `mobile-info-row-loading-${position}-${loading}`,
  },
  adaptiveInfoRow: {
    root: PACKAGE_TEST_IDS.adaptiveInfoRow,
    layout: (layoutType: string, position: string) => `adaptive-info-row-${layoutType}-${position}`,
    loading: (layoutType: string, loading: string | boolean) => `adaptive-info-row-loading-${layoutType}-${loading}`,
  },
} as const;

import { TEST_IDS as PACKAGE_TEST_IDS } from '../src/constants';

/**
 * Единый source-of-truth для test-id'ов публичных компонентов пакета (`InfoRow`, `InfoGroup`).
 * Корневые id берутся из публичного `src/constants::TEST_IDS`, остальные — stories-level
 * (кейсы Matrix по осям layout/loading).
 */
export const TEST_IDS = {
  infoGroup: {
    root: PACKAGE_TEST_IDS.infoGroup,
    matrix: (columns: number | string, width: string) => `info-group-matrix-${columns}-${width}`,
  },
  infoRow: {
    root: PACKAGE_TEST_IDS.infoRow,
    layout: (layoutType: string, position: string) => `info-row-${layoutType}-${position}`,
    loading: (layoutType: string, loading: string | boolean) => `info-row-loading-${layoutType}-${loading}`,
  },
} as const;

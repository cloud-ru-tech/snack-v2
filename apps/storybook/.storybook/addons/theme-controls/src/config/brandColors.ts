import type { Brand } from '../constants';

/**
 * Цвета брендов (--sn-brand-color-primary-50) из @ds/figma-variables.
 * В manager iframe бренд-классы `.sn-*` недоступны — используем захардкоженные значения.
 */
export const BRAND_COLOR: Record<Brand, string> = {
  cloudConsole: '#389f74',
  'giga-id': '#393a45',
  gitverse: '#5558fa',
  snackUI: '#794ed3',
  hrBlue: '#c0e0fc',
  hrGraphite: '#222222',
  hrGreen: '#26d07c',
  hrPurple: '#a068ff',
  hrYellow: '#cff500',
  siteBlue: '#c0e0fc',
  siteGraphite: '#222222',
  siteGreen: '#26d07c',
  sitePurple: '#a068ff',
  siteYellow: '#cff500',
};

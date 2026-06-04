/**
 * Цвета бренда (--sn-brand-color-primary-55) из @sbercloud/figma-variables.
 * В manager iframe переменные .sn-brandA/.sn-brandB/.sn-brandC могут быть недоступны — используем fallback.
 */
export const BRAND_COLOR: Record<'brandA' | 'brandB' | 'brandC', string> = {
  brandA: '#389f74',
  brandB: '#794ed3',
  brandC: '#a068ff',
};

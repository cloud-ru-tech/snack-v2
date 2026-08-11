/**
 * Цвета бренда (--sn-brand-color-primary-55) из @ds/figma-variables.
 * В manager iframe переменные .sn-brandA/.sn-brandB/.sn-brandC/.sn-brandD могут быть недоступны — используем fallback.
 */
export const BRAND_COLOR: Record<'brandA' | 'brandB' | 'brandC' | 'brandD', string> = {
  brandA: '#389f74',
  brandB: '#794ed3',
  brandC: '#26d07c',
  brandD: '#26d07c',
};

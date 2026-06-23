export const TEST_IDS = {
  root: 'ai-icon-giga',
} as const;

export const VARIANT = {
  Neutral: 'neutral',
  LogoDark: 'logoDark',
  LogoLight: 'logoLight',
} as const;

/**
 * Path логотипа GigaChat (viewBox `0 0 60 60`, общий для всех вариантов).
 * Источник — Figma AI-COMPONENTS, node 7404:40178 (экспортированный `d`-атрибут).
 * Это геометрия фигуры (числа и команды path), а не разметка: рендерится через
 * `<path d={...}>`, без `dangerouslySetInnerHTML` — внедрение скриптов невозможно.
 */
export const GIGA_PATH =
  'M30 0C13.4301 0 0 13.4323 0 30C0 46.5677 13.4323 60 30 60C46.5677 60 60 46.5677 60 30C60 13.4323 46.5677 0 30 0ZM8.48807 24.5597C8.08633 23.285 8.03248 21.8261 8.32648 20.2327C8.83819 17.6158 10.1646 14.9473 12.162 12.5166L12.1912 12.4807C16.8078 6.3784 24.8403 2.73584 33.6785 2.73584C35.5009 2.73584 37.2941 2.89071 39.0402 3.19593C32.5271 3.79966 25.8121 6.66792 19.0634 11.7311C18.7761 11.9466 18.5921 12.272 18.5584 12.6289C18.5247 12.9857 18.6414 13.3426 18.8838 13.6096C21.0855 16.038 23.2895 18.6931 25.8143 21.9675C26.234 22.5129 27.0038 22.6274 27.5694 22.2256C32.6595 18.5786 37.0764 15.8764 41.3541 13.8049C41.1633 15.9976 38.23 19.3955 35.1642 21.9653C30.2626 25.9782 24.36 30.1504 17.7392 30.6845L17.4811 30.707C16.5071 30.7519 15.459 30.6374 14.3705 30.3681C11.7513 29.697 9.44191 27.41 8.49256 24.562L8.48807 24.5597ZM29.9798 55.9422C23.9695 55.9422 18.4394 53.8909 14.0473 50.4526C14.8867 50.5289 15.7709 50.5671 16.7337 50.5671C17.5395 50.5671 18.4013 50.5401 19.3282 50.4885C24.8044 50.089 30.4646 48.4574 35.6984 45.7754C40.9905 43.062 45.6026 39.3925 49.0432 35.153C51.274 32.3296 53.947 27.9913 54.7056 22.7329C54.7528 22.7979 54.7999 22.8653 54.847 22.9326C55.4979 25.2016 55.848 27.5986 55.848 30.0786C55.848 44.3637 44.2672 55.9445 29.982 55.9445L29.9798 55.9422Z';

/**
 * Силуэт логотипа GigaChat как CSS `mask-image` (`url("data:image/svg+xml,…")`).
 * Для эффектов, заливающих форму иконки внешним paint'ом (например, ведущая иконка
 * `AiShimmer`): силуэт получает shimmer-покрытие вместо собственного цвета иконки.
 */
export const GIGA_MASK_IMAGE = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><g transform="translate(10 10)"><path d="${GIGA_PATH}"/></g></svg>`,
)}")`;

export const GRADIENT_PARAMS = {
  cx: '0',
  cy: '0',
  r: '1',
  gradientUnits: 'userSpaceOnUse',
  gradientTransform: 'translate(39.525 13.0149) scale(55.5181)',
} as const;

/** Стопы градиента для тёмного фона (`type='logoDark'`). */
export const LOGO_DARK_STOPS = [
  { offset: '0.08', stopColor: '#7CB5F2' },
  { offset: '0.17', stopColor: '#78B9EC' },
  { offset: '0.28', stopColor: '#70C6DD' },
  { offset: '0.38', stopColor: '#64D8C7' },
  { offset: '0.44', stopColor: '#5FD7C2' },
  { offset: '0.51', stopColor: '#54D5B3' },
  { offset: '0.58', stopColor: '#40D39C' },
  { offset: '0.66', stopColor: '#26D07C' },
] as const;

/** Стопы градиента для светлого фона (`type='logoLight'`). */
export const LOGO_LIGHT_STOPS = [
  { offset: '0.08', stopColor: '#58A1EE' },
  { offset: '0.17', stopColor: '#5EACE8' },
  { offset: '0.28', stopColor: '#5ABDD8' },
  { offset: '0.38', stopColor: '#54D4C1' },
  { offset: '0.44', stopColor: '#4BD2BB' },
  { offset: '0.51', stopColor: '#47D2AD' },
  { offset: '0.58', stopColor: '#38D198' },
  { offset: '0.66', stopColor: '#24C676' },
] as const;

// `?url` даёт строку-URL и в Astro, и в Storybook: без него static-сборка Storybook
// отдаёт пустую строку, и картинка не рендерится.
import cardImageSrc from './assets/card-image.jpg?url';

export const DEMO_CARD_IMAGE_SRC = cardImageSrc;
export const DEMO_CARD_IMAGE_ALT = 'Card image';

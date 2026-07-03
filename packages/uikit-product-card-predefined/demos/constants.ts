import cardImage from './assets/card-image.jpg';

// Astro типизирует `*.jpg` как `ImageMetadata`, в Storybook (vite) импорт — строка URL.
const cardImageSrc = typeof cardImage === 'string' ? cardImage : cardImage.src;

export const DEMO_CARD_IMAGE_SRC = cardImageSrc;
export const DEMO_CARD_IMAGE_ALT = 'Card image';

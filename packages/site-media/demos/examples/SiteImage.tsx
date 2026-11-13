import { SiteImage } from '@ds/site-media';

import { POSTER } from '../fixtures';

export function ImageExample() {
  return <SiteImage src={POSTER} alt='Интерфейс сервиса' loading='lazy' width={720} height={405} />;
}

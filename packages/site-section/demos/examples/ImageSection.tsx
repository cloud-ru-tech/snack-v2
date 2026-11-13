import { SectionMedia } from '@ds/site-section';

import { POSTER } from '../mediaFixtures';

export function ImageSection() {
  return (
    <SectionMedia
      container='new'
      title='Изображение'
      media={{ type: 'image', src: POSTER, alt: 'Иллюстрация к разделу' }}
    />
  );
}

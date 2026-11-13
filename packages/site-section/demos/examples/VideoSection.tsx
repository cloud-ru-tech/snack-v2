import { SectionMedia } from '@ds/site-section';

import { VIDEO } from '../mediaFixtures';

export function VideoSection() {
  return <SectionMedia container='new' title='Видеопрезентация' media={{ type: 'video', ...VIDEO }} />;
}

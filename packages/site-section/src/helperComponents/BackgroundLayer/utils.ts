import { ACRYLIC_LEVEL, backgroundPredefinedFillToAcrylic } from '@ds/materials';

import { SECTION_BACKGROUND_FILL } from '../../constants';
import { SectionBackgroundFill } from '../../types';

/** Пара `data-acrylic-appearance` / `data-acrylic-level` для подложки секции. */
export function sectionBackgroundFillToAcrylic(fill: SectionBackgroundFill) {
  if (fill === SECTION_BACKGROUND_FILL.NeutralBackground) {
    return { appearance: 'neutral', level: ACRYLIC_LEVEL.Default } as const;
  }

  return backgroundPredefinedFillToAcrylic(fill);
}

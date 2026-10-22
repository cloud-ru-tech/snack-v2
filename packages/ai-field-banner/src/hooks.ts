import { LayoutPresets, mergePresets, useLayoutDefaults } from '@ds/adaptive';

import { SIZE } from './constants';
import { AiFieldBannerLayoutDefaults, Size } from './types';

/** DS-пресет адаптива: на mobile — Field Banner Mobile (`size=m`). */
export const AI_FIELD_BANNER_LAYOUT_PRESETS: LayoutPresets<AiFieldBannerLayoutDefaults> = {
  mobile: { size: SIZE.M },
};

export function useAiFieldBannerSize(size?: Size, layoutPresets?: LayoutPresets<AiFieldBannerLayoutDefaults>): Size {
  return (
    useLayoutDefaults<AiFieldBannerLayoutDefaults>(
      { size: SIZE.S },
      mergePresets(AI_FIELD_BANNER_LAYOUT_PRESETS, layoutPresets),
      { size },
    ).size ?? SIZE.S
  );
}

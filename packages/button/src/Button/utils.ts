import { ReactNode } from 'react';

import { ICON_POSITION, VIEW } from './constants';
import { View } from './types';

type Variant = 'label-only' | 'icon-before' | 'icon-after' | 'icon-only';

type StateLayer = 'emptyDarkOnAccent' | 'emptyNeutralOnBackground';

/**
 * View'ы с акцентной подложкой (filled, tonal) несут тёмный слой состояния
 * (`material/stateLayer/emptyDarkOnAccent`), остальные — нейтральный поверх фона страницы.
 */
export function getStateLayer(view: View): StateLayer {
  return view === VIEW.Filled || view === VIEW.Tonal ? 'emptyDarkOnAccent' : 'emptyNeutralOnBackground';
}

export function getVariant(props: {
  label?: string;
  icon?: ReactNode;
  iconPosition?: (typeof ICON_POSITION)[keyof typeof ICON_POSITION];
}): Variant {
  const hasLabel = Boolean(props.label?.trim());
  const hasIcon = Boolean(props.icon);
  const position = props.iconPosition ?? ICON_POSITION.Before;
  if (!hasLabel && hasIcon) return 'icon-only';
  if (hasIcon && position === ICON_POSITION.Before) return 'icon-before';
  if (hasIcon && position === ICON_POSITION.After) return 'icon-after';
  return 'label-only';
}

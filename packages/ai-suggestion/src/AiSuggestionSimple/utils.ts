import { APPEARANCE, LAYER_STATE } from './constants';
import { Appearance, LayerState } from './types';

export function getLayerState(appearance: Appearance): LayerState {
  return appearance === APPEARANCE.Primary ? LAYER_STATE.ActivatedOnBackground : LAYER_STATE.EmptyNeutralOnBackground;
}

import { APPEARANCE } from './constants';
import { Appearance, LayerState } from './types';

export function getLayerState(appearance: Appearance): LayerState {
  return appearance === APPEARANCE.Primary ? 'activatedFilled' : 'regularFilled';
}

import { Action } from './types';

export function hasVisibleActions(actions: Action[]) {
  return actions.some(action => !action.hidden);
}

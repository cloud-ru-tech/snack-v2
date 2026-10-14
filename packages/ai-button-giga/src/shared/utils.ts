import { IconPosition } from '../types';

export function getContentVariant(hasLabel: boolean, hasIcon: boolean, iconPosition: IconPosition) {
  if (!hasLabel) return 'icon-only';
  if (!hasIcon) return 'label-only';
  return iconPosition === 'after' ? 'icon-after' : 'icon-before';
}

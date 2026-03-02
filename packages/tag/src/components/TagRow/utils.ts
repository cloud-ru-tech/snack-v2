import { APPEARANCE } from '../../constants';
import type { TagRowItem, TagRowItemInner } from '../../types';

export const mapTagRowItem = ({ appearance = APPEARANCE.Neutral, ...props }: TagRowItem): TagRowItemInner => ({
  ...props,
  appearance,
});

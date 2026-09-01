import { CalendarDropdownProps } from '../../components';

type CalendarPlacement = NonNullable<CalendarDropdownProps['placement']>;

const ALIGNED_FALLBACK_PLACEMENTS = {
  top: ['right', 'bottom', 'left'],
  'top-start': ['right-start', 'bottom-start', 'left-start'],
  'top-end': ['right-end', 'bottom-end', 'left-end'],
  right: ['top', 'bottom', 'left'],
  'right-start': ['top-start', 'bottom-start', 'left-start'],
  'right-end': ['top-end', 'bottom-end', 'left-end'],
  bottom: ['top', 'right', 'left'],
  'bottom-start': ['top-start', 'right-start', 'left-start'],
  'bottom-end': ['top-end', 'right-end', 'left-end'],
  left: ['top', 'right', 'bottom'],
  'left-start': ['top-start', 'right-start', 'bottom-start'],
  'left-end': ['top-end', 'right-end', 'bottom-end'],
} satisfies Record<CalendarPlacement, CalendarPlacement[]>;

/**
 * Сохраняет выравнивание `start` / `end` при смене стороны календаря, чтобы после flip он
 * оставался привязан к тому же краю trigger и не смещался к центру широкого поля.
 */
export function getAlignedFallbackPlacements(placement: CalendarPlacement): CalendarPlacement[] {
  return ALIGNED_FALLBACK_PLACEMENTS[placement];
}

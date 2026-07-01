import { LayoutPresets, mergePresets, useLayoutDefaults } from '@ds/adaptive';
import { WithSupportProps } from '@ds/utils';

import { ALIGN } from '../../constants';
import { AlertBase, AlertSharedFieldProps } from '../AlertBase';

/** Пропы `AlertTop`, дефолты которых меняет адаптив (preset-класс). */
type AlertTopLayoutDefaults = Pick<AlertSharedFieldProps, 'collapsible'>;

export type AlertTopProps = WithSupportProps<
  AlertSharedFieldProps & {
    /**
     * Override mobile-дефолтов адаптива для этого инстанса (deep-merge поверх `ALERT_TOP_LAYOUT_PRESETS`).
     * Escape-hatch: обычно не нужен — DS-пресет применяется автоматически по `AdaptiveProvider`.
     */
    layoutPresets?: LayoutPresets<AlertTopLayoutDefaults>;
  }
>;

/** DS-пресет адаптива `AlertTop`: на mobile alert раскрываемый (`collapsible`), desktop — плоский. */
export const ALERT_TOP_LAYOUT_PRESETS: LayoutPresets<AlertTopLayoutDefaults> = {
  mobile: { collapsible: true },
};

export function AlertTop({ align: alignProp = ALIGN.Vertical, collapsible, layoutPresets, ...props }: AlertTopProps) {
  // collapsible участвует в пресете — передаём без destructure-дефолта, дефолт держим в базе useLayoutDefaults.
  const { collapsible: resolvedCollapsible } = useLayoutDefaults<AlertTopLayoutDefaults>(
    { collapsible: false },
    mergePresets(ALERT_TOP_LAYOUT_PRESETS, layoutPresets),
    { collapsible },
  );

  return <AlertBase {...props} collapsible={resolvedCollapsible} align={alignProp} variant='top' />;
}

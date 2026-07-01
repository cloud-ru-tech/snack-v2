import { LayoutPresets, mergePresets, useLayoutDefaults } from '@ds/adaptive';
import { WithSupportProps } from '@ds/utils';

import { ALIGN } from '../../constants';
import { AlertBase, AlertSharedFieldProps } from '../AlertBase';

/** Пропы inline `Alert`, дефолты которых меняет адаптив (preset-класс). */
type AlertLayoutDefaults = Pick<AlertSharedFieldProps, 'truncate'>;

export type AlertProps = WithSupportProps<
  AlertSharedFieldProps & {
    /** Внешний бордер */
    outline?: boolean;
    /**
     * Override mobile-дефолтов адаптива для этого инстанса (deep-merge поверх `ALERT_LAYOUT_PRESETS`).
     * Escape-hatch: обычно не нужен — DS-пресет применяется автоматически по `AdaptiveProvider`.
     */
    layoutPresets?: LayoutPresets<AlertLayoutDefaults>;
  }
>;

/** DS-пресет адаптива inline `Alert`: на mobile заголовок усечён до 2 строк (desktop — 1). */
export const ALERT_LAYOUT_PRESETS: LayoutPresets<AlertLayoutDefaults> = {
  mobile: { truncate: { title: 2 } },
};

export function Alert({ outline, align: alignProp = ALIGN.Vertical, truncate, layoutPresets, ...props }: AlertProps) {
  // truncate участвует в пресете — передаём без destructure-дефолта, дефолт держим в базе useLayoutDefaults.
  const { truncate: resolvedTruncate } = useLayoutDefaults<AlertLayoutDefaults>(
    { truncate: { title: 1 } },
    mergePresets(ALERT_LAYOUT_PRESETS, layoutPresets),
    { truncate },
  );

  return <AlertBase {...props} truncate={resolvedTruncate} align={alignProp} outline={outline} variant='inline' />;
}

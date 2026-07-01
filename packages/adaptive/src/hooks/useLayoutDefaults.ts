import { useAdaptiveLayout } from '../context/adaptiveContext';
import { LayoutPresets } from '../types/presets';
import { resolveByLayout } from '../utils/resolveByLayout';

/**
 * React-хук preset-класса адаптивности: резолвит дефолты пропов по раскладке из `AdaptiveProvider`.
 * desktop-first приоритет: пресет раскладки (instance > DS) > явный проп инстанса > базовый дефолт.
 * Preset-участвующие пропы передавай в `explicit` без destructure-дефолта.
 *
 * @example
 * const { collapsible } = useLayoutDefaults(
 *   { collapsible: false },                                // база (desktop)
 *   mergePresets(ALERT_TOP_LAYOUT_PRESETS, layoutPresets), // DS-пресет ⊕ instance-override
 *   { collapsible },                                       // явный проп инстанса = desktop-значение (может быть undefined)
 * );
 */
export function useLayoutDefaults<P extends object>(base: P, presets: LayoutPresets<P>, explicit: Partial<P>): P {
  const { layoutType } = useAdaptiveLayout();

  return resolveByLayout({ layoutType, base, presets, explicit });
}

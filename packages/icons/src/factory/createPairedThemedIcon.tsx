import { useThemeAppearance } from '@ds/theme';
import { forwardRef, ForwardRefExoticComponent, PropsWithoutRef, Ref, RefAttributes } from 'react';

import { ISvgIconProps } from '../types';

type ThemeVariant = ForwardRefExoticComponent<PropsWithoutRef<ISvgIconProps> & RefAttributes<SVGSVGElement>>;

type PairedThemedIconConfig = {
  /** Standalone-компонент для светлой темы. */
  light: ThemeVariant;
  /** Standalone-компонент для тёмной темы. */
  dark: ThemeVariant;
};

/**
 * Фабрика логотипа, переключающего свою standalone-часть по теме через useThemeAppearance()
 * из @ds/theme. Вся логика в одном экземпляре на пакет; сгенерированные paired-файлы
 * (pairLogoVariants.ts) передают только две части — Light и Dark.
 */
export function createPairedThemedIcon({ light: Light, dark: Dark }: PairedThemedIconConfig) {
  return forwardRef((props: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
    const { colorScheme } = useThemeAppearance().appearance;
    const Variant = colorScheme === 'dark' ? Dark : Light;
    return <Variant ref={ref} {...props} />;
  });
}

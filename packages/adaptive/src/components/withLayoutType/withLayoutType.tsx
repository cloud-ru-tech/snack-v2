import { ComponentType } from 'react';

import { LayoutType } from '../../types/layoutTypes';
import { AdaptiveProvider } from '../AdaptiveProvider';

/**
 * HOC форса раскладки: оборачивает компонент в `<AdaptiveProvider layoutType=…>`, фиксируя раскладку
 * для него и поддерева. Дженерик-параметры стираются (для них — инлайновый `AdaptiveProvider`).
 * Вызывать на module-scope, не в теле рендера.
 *
 * @example
 * const DesktopSection = withLayoutType(Section, 'desktop');
 */
export function withLayoutType<P extends object>(Component: ComponentType<P>, layoutType: LayoutType) {
  function Fixed(props: P) {
    return (
      <AdaptiveProvider layoutType={layoutType}>
        <Component {...props} />
      </AdaptiveProvider>
    );
  }

  Fixed.displayName = `withLayoutType(${Component.displayName ?? Component.name}, ${layoutType})`;

  return Fixed;
}

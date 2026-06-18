import { backgroundPredefinedFillToAcrylic } from '@ds/materials';
import cn from 'classnames';
import { forwardRef, ReactNode } from 'react';

import {
  TABLE_STICKY_CONTROLS_BACKGROUND_NEUTRAL,
  TableStickyControlsBackgroundPredefined,
} from '../../components/types';
import styles from './styles.module.scss';

export type ControlsAcrylicAttrs = {
  'data-acrylic-appearance': string;
  'data-acrylic-level': string;
};

export type ControlsChromeProps = {
  className?: string;
  /** Пара data-acrylic-* для acrylic-подложки (см. `getControlsAcrylicAttrs`) */
  acrylic: ControlsAcrylicAttrs;
  children: ReactNode;
};

/** Маппинг `controlsBackgroundPredefined` → data-атрибуты acrylic-слоя */
export function getControlsAcrylicAttrs(fill: TableStickyControlsBackgroundPredefined): ControlsAcrylicAttrs {
  const { appearance, level } =
    fill === TABLE_STICKY_CONTROLS_BACKGROUND_NEUTRAL
      ? { appearance: 'neutral', level: 'default' }
      : backgroundPredefinedFillToAcrylic(fill);

  return {
    'data-acrylic-appearance': appearance,
    'data-acrylic-level': level,
  };
}

export function ControlsAcrylicBackground() {
  return <span className={styles.acrylic} data-acrylic-background aria-hidden />;
}

/** Обёртка chrome-контролов таблицы с acrylic-подложкой */
export const ControlsChrome = forwardRef<HTMLDivElement, ControlsChromeProps>(function ControlsChrome(
  { className, acrylic, children },
  ref,
) {
  return (
    <div ref={ref} className={cn(styles.surface, className)} {...acrylic}>
      <ControlsAcrylicBackground />
      {children}
    </div>
  );
});

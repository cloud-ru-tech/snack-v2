import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';

import { LOADER_SIZE } from '../constants';
import { LoaderSize } from '../types';
import { SPINNER_GEOMETRY, SPINNER_TRACK_OPACITY } from './constants';
import styles from './styles.module.scss';
import { buildQuarterArcPath } from './utils';

export type SpinnerProps = WithSupportProps<{
  /** Размер */
  size?: LoaderSize;
  /** CSS-класс */
  className?: string;
}>;

/** Компонент спиннер */
export function Spinner({ size = LOADER_SIZE.S, className, ...rest }: SpinnerProps) {
  const { frame, ring, strokeWidth } = SPINNER_GEOMETRY[size];
  const center = frame / 2;
  const radius = ring / 2;

  return (
    <svg
      viewBox={`0 0 ${frame} ${frame}`}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={cn(styles.spinner, className)}
      {...extractSupportProps(rest)}
      data-size={size}
    >
      <circle opacity={SPINNER_TRACK_OPACITY} cx={center} cy={center} r={radius} strokeWidth={strokeWidth} />
      <path
        d={buildQuarterArcPath(center, radius)}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

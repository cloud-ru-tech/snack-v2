import type { CSSProperties, SVGProps } from 'react';

export type ISvgIconProps = {
  className?: string;
  size?: number;
  style?: CSSProperties;
} & SVGProps<SVGSVGElement>;

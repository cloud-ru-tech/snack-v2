import { forwardRef, Ref, SVGProps } from 'react';

type FlagProps = SVGProps<SVGSVGElement> & {
  /** Размер флага в пикселях (выставляет width и height). */
  size?: number;
};

export const SouthSudanSVG = forwardRef<SVGSVGElement, FlagProps>(
  ({ size = 24, style, ...props }, ref: Ref<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 18'
      ref={ref}
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      {...props}
    >
      <g clipPath='url(#South_Sudan_svg__a)'>
        <path fill='#078930' d='M0 12.6h24V18H0z' />
        <path fill='#fff' d='M0 5.4h24v7.2H0z' />
        <path fill='#000' d='M0 0h24v5.4H0z' />
        <path fill='#DA121A' d='M0 6.3h24v5.4H0z' />
        <path fill='#0F47AF' d='m0 0 15.589 9L0 18z' />
        <path fill='#FCDD09' d='M7.526 7.305 2.314 9l5.212 1.691L4.31 6.262v5.476z' />
      </g>
      <rect
        width={23.5}
        height={17.5}
        x={0.25}
        y={0.25}
        stroke='#DDE0EA'
        strokeWidth={0.5}
        rx={1.75}
        style={{
          fillOpacity: 0,
        }}
      />
      <defs>
        <clipPath id='South_Sudan_svg__a'>
          <rect width={24} height={18} fill='#fff' rx={2} />
        </clipPath>
      </defs>
    </svg>
  ),
);

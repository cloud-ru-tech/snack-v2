import { forwardRef, Ref, SVGProps } from 'react';

type FlagProps = SVGProps<SVGSVGElement> & {
  /** Размер флага в пикселях (выставляет width и height). */
  size?: number;
};

export const LibyaSVG = forwardRef<SVGSVGElement, FlagProps>(
  ({ size = 24, style, ...props }, ref: Ref<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 18'
      ref={ref}
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      {...props}
    >
      <g clipPath='url(#Libya_svg__a)'>
        <path fill='#239E46' d='M0 0h24v18H0z' />
        <path fill='#000' d='M0 0h24v13.5H0z' />
        <path fill='#E70013' d='M0 0h24v4.5H0z' />
        <path
          fill='#fff'
          d='M13.59 7.409a1.955 1.955 0 1 0 0 3.182 2.25 2.25 0 1 1 0-3.182M13.093 9l3.028-.983-1.872 2.574V7.41l1.872 2.574z'
        />
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
        <clipPath id='Libya_svg__a'>
          <rect width={24} height={18} fill='#fff' rx={2} />
        </clipPath>
      </defs>
    </svg>
  ),
);

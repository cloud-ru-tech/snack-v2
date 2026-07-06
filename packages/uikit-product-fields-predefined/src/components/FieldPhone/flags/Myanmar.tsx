import { forwardRef, Ref, SVGProps } from 'react';

type FlagProps = SVGProps<SVGSVGElement> & {
  /** Размер флага в пикселях (выставляет width и height). */
  size?: number;
};

export const MyanmarSVG = forwardRef<SVGSVGElement, FlagProps>(
  ({ size = 24, style, ...props }, ref: Ref<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 18'
      ref={ref}
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      {...props}
    >
      <g clipPath='url(#Myanmar_svg__a)'>
        <path fill='#FECB00' d='M0 0h24v18H0z' />
        <path fill='#34B233' d='M0 6h24v12H0z' />
        <path fill='#EA2839' d='M0 12h24v6H0z' />
        <path
          fill='#fff'
          fillRule='evenodd'
          d='m12 3 1.409 4.695 4.9-.11-4.03 2.79L15.899 15 12 12.03 8.101 15l1.62-4.626-4.03-2.79 4.9.111z'
          clipRule='evenodd'
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
        <clipPath id='Myanmar_svg__a'>
          <rect width={24} height={18} fill='#fff' rx={2} />
        </clipPath>
      </defs>
    </svg>
  ),
);

import { forwardRef, Ref, SVGProps } from 'react';

type FlagProps = SVGProps<SVGSVGElement> & {
  /** Размер флага в пикселях (выставляет width и height). */
  size?: number;
};

export const ChileSVG = forwardRef<SVGSVGElement, FlagProps>(
  ({ size = 24, style, ...props }, ref: Ref<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 18'
      ref={ref}
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      {...props}
    >
      <g fillRule='evenodd' clipPath='url(#Chile_svg__a)' clipRule='evenodd'>
        <path fill='#fff' d='M9 0h15v9H9z' />
        <path fill='#0039A6' d='M0 0h9v9H0z' />
        <path
          fill='#fff'
          d='M5.9 6.74 4.506 5.694 3.118 6.75l.517-1.716L2.25 3.976l1.712-.017.53-1.709.546 1.705 1.712.004-1.378 1.068z'
        />
        <path fill='#D52B1E' d='M0 9h24v9H0z' />
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
        <clipPath id='Chile_svg__a'>
          <rect width={24} height={18} fill='#fff' rx={2} />
        </clipPath>
      </defs>
    </svg>
  ),
);

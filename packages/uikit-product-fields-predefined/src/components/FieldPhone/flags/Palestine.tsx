import { forwardRef, Ref, SVGProps } from 'react';

type FlagProps = SVGProps<SVGSVGElement> & {
  /** Размер флага в пикселях (выставляет width и height). */
  size?: number;
};

export const PalestineSVG = forwardRef<SVGSVGElement, FlagProps>(
  ({ size = 24, style, ...props }, ref: Ref<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 18'
      ref={ref}
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      {...props}
    >
      <g clipPath='url(#Palestine_svg__a)'>
        <path fill='#000' fillRule='evenodd' d='M0 0h24v6.001H0z' clipRule='evenodd' />
        <path fill='#fff' fillRule='evenodd' d='M0 6.001h24V12H0z' clipRule='evenodd' />
        <path fill='#090' fillRule='evenodd' d='M0 11.999h24V18H0z' clipRule='evenodd' />
        <path fill='red' d='M13.5 9 0 2.25v13.5z' />
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
        <clipPath id='Palestine_svg__a'>
          <rect width={24} height={18} fill='#fff' rx={2} />
        </clipPath>
      </defs>
    </svg>
  ),
);

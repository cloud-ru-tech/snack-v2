import { forwardRef, Ref, SVGProps } from 'react';

type FlagProps = SVGProps<SVGSVGElement> & {
  /** Размер флага в пикселях (выставляет width и height). */
  size?: number;
};

export const SouthAfricaSVG = forwardRef<SVGSVGElement, FlagProps>(
  ({ size = 24, style, ...props }, ref: Ref<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 18'
      ref={ref}
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      {...props}
    >
      <g clipPath='url(#SouthAfrica_svg__a)'>
        <path fill='#fff' d='M0 0h24v18H0z' />
        <path fill='#000C8A' fillRule='evenodd' d='M0 12h24v6H0z' clipRule='evenodd' />
        <path fill='#E1392D' fillRule='evenodd' d='M0 0h24v6H0z' clipRule='evenodd' />
        <path fill='#fff' fillRule='evenodd' d='M9.616 12 2.4 18H0V0h2.4l7.2 6H24v6z' clipRule='evenodd' />
        <path fill='#007847' fillRule='evenodd' d='M9.24 10.8.6 18H0V0h.6l8.64 7.2H24v3.6z' clipRule='evenodd' />
        <path fill='#FFB915' fillRule='evenodd' d='M0 3.6 7.2 9 0 14.4z' clipRule='evenodd' />
        <path fill='#151515' fillRule='evenodd' d='M0 4.8 5.7 9 0 13.2z' clipRule='evenodd' />
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
        <clipPath id='SouthAfrica_svg__a'>
          <rect width={24} height={18} fill='#fff' rx={2} />
        </clipPath>
      </defs>
    </svg>
  ),
);

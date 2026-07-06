import { forwardRef, Ref, SVGProps } from 'react';

type FlagProps = SVGProps<SVGSVGElement> & {
  /** Размер флага в пикселях (выставляет width и height). */
  size?: number;
};

export const TongaSVG = forwardRef<SVGSVGElement, FlagProps>(
  ({ size = 24, style, ...props }, ref: Ref<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 18'
      ref={ref}
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      {...props}
    >
      <g clipPath='url(#Tonga_svg__a)'>
        <path fill='#C10000' fillRule='evenodd' d='M0 0h24v18H0z' clipRule='evenodd' />
        <path fill='#fff' fillRule='evenodd' d='M0 0h9.375v7.511H0z' clipRule='evenodd' />
        <path fill='#C10000' fillRule='evenodd' d='M3.855 1.17h1.496v5.235H3.86l-.002-1.867z' clipRule='evenodd' />
        <path fill='#C10000' fillRule='evenodd' d='M7.223 3.038v1.5H1.987v-1.5h5.236' clipRule='evenodd' />
        <path fill='#C10000' d='M3.856 3.038h1.495V4.55h-1.5z' />
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
        <clipPath id='Tonga_svg__a'>
          <rect width={24} height={18} fill='#fff' rx={2} />
        </clipPath>
      </defs>
    </svg>
  ),
);

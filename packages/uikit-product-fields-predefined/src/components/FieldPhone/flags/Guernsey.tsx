import { forwardRef, Ref, SVGProps } from 'react';

type FlagProps = SVGProps<SVGSVGElement> & {
  /** Размер флага в пикселях (выставляет width и height). */
  size?: number;
};

export const GuernseySVG = forwardRef<SVGSVGElement, FlagProps>(
  ({ size = 24, style, ...props }, ref: Ref<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 18'
      ref={ref}
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      {...props}
    >
      <g clipPath='url(#Guernsey_svg__a)'>
        <path fill='#fff' d='M0 0h24v18H0z' />
        <path fill='#E8112D' d='M14 0v6.75h10v4.5H14V18h-4v-6.75H0v-4.5h10V0z' />
        <path
          fill='#F9DD16'
          d='m5 10.5.75-.75H11V15l-.75.75h3L12.5 15V9.75h5.25l.75.75v-3l-.75.75H12.5V3l.75-.75h-3L11 3v5.25H5.75L5 7.5z'
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
        <clipPath id='Guernsey_svg__a'>
          <rect width={24} height={18} fill='#fff' rx={2} />
        </clipPath>
      </defs>
    </svg>
  ),
);

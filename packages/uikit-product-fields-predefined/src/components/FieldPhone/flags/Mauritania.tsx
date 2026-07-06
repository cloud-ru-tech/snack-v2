import { forwardRef, Ref, SVGProps } from 'react';

type FlagProps = SVGProps<SVGSVGElement> & {
  /** Размер флага в пикселях (выставляет width и height). */
  size?: number;
};

export const MauritaniaSVG = forwardRef<SVGSVGElement, FlagProps>(
  ({ size = 24, style, ...props }, ref: Ref<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 18'
      ref={ref}
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      {...props}
    >
      <g clipPath='url(#Mauritania_svg__a)'>
        <path fill='#CD2A3E' d='M0 0h24v18H0z' />
        <path fill='#006233' d='M0 2.7h24v12.6H0z' />
        <path fill='#FFC400' d='M17.625 5.798a5.625 5.625 0 1 1-11.25 0 5.813 5.813 0 1 0 11.25 0' />
        <path
          fill='#FFC400'
          d='m12 3.518-.506 1.556H9.863l1.323.96-.506 1.552 1.324-.96 1.324.96-.507-1.552 1.324-.96H12.51z'
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
        <clipPath id='Mauritania_svg__a'>
          <rect width={24} height={18} fill='#fff' rx={2} />
        </clipPath>
      </defs>
    </svg>
  ),
);

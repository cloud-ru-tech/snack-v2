import { forwardRef, Ref, SVGProps } from 'react';

type FlagProps = SVGProps<SVGSVGElement> & {
  /** Размер флага в пикселях (выставляет width и height). */
  size?: number;
};

export const AlgeriaSVG = forwardRef<SVGSVGElement, FlagProps>(
  ({ size = 24, style, ...props }, ref: Ref<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 18'
      ref={ref}
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      {...props}
    >
      <g clipPath='url(#Algeria_svg__a)'>
        <g clipPath='url(#Algeria_svg__b)'>
          <path fill='#fff' d='M12 0h12v18H12z' />
          <path fill='#006233' d='M0 0h12v18H0z' />
          <path
            fill='#D21034'
            d='M15.9 6.75a4.5 4.5 0 1 0 0 4.5 3.6 3.6 0 1 1 0-4.5M16.05 9 12 7.68l2.52 3.45V6.87L12 10.32z'
          />
        </g>
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
        <clipPath id='Algeria_svg__a'>
          <rect width={24} height={18} fill='#fff' rx={2} />
        </clipPath>
        <clipPath id='Algeria_svg__b'>
          <path fill='#fff' d='M0 0h24v18H0z' />
        </clipPath>
      </defs>
    </svg>
  ),
);

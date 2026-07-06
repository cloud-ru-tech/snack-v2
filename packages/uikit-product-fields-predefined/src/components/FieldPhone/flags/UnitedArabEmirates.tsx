import { forwardRef, Ref, SVGProps } from 'react';

type FlagProps = SVGProps<SVGSVGElement> & {
  /** Размер флага в пикселях (выставляет width и height). */
  size?: number;
};

export const UnitedArabEmiratesSVG = forwardRef<SVGSVGElement, FlagProps>(
  ({ size = 24, style, ...props }, ref: Ref<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 18'
      ref={ref}
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      {...props}
    >
      <g clipPath='url(#UnitedArabEmirates_svg__a)'>
        <path
          fill='#fff'
          d='M21.714 0H2.286C1.023 0 0 1.075 0 2.4v13.2C0 16.926 1.023 18 2.286 18h19.428C22.977 18 24 16.925 24 15.6V2.4C24 1.075 22.977 0 21.714 0'
        />
        <path fill='#000' fillRule='evenodd' d='M0 12h24v6H0z' clipRule='evenodd' />
        <path fill='#00732F' fillRule='evenodd' d='M0 0h24v6H0z' clipRule='evenodd' />
        <path fill='red' fillRule='evenodd' d='M0 0v18h6.857V0z' clipRule='evenodd' />
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
        <clipPath id='UnitedArabEmirates_svg__a'>
          <rect width={24} height={18} fill='#fff' rx={2} />
        </clipPath>
      </defs>
    </svg>
  ),
);

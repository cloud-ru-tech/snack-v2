import { forwardRef, Ref, SVGProps } from 'react';

type FlagProps = SVGProps<SVGSVGElement> & {
  /** Размер флага в пикселях (выставляет width и height). */
  size?: number;
};

export const NewZealandSVG = forwardRef<SVGSVGElement, FlagProps>(
  ({ size = 24, style, ...props }, ref: Ref<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 18'
      ref={ref}
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      {...props}
    >
      <g clipPath='url(#NewZealand_svg__a)'>
        <g clipPath='url(#NewZealand_svg__b)'>
          <path fill='#1A47B8' d='M0 0h24v18H0z' />
          <path
            fill='#F93939'
            fillRule='evenodd'
            d='M18 4.8V6h1.2V4.8zm2.4 2.4v1.2h1.2V7.2zm-4.8 1.2v1.2h1.2V8.4zm2.4 4.8v1.2h1.2v-1.2z'
            clipRule='evenodd'
          />
          <path
            fill='#fff'
            d='M10.8 1.2H2.4a1.2 1.2 0 0 0-1.2 1.2v6a1.2 1.2 0 0 0 1.2 1.2h8.4A1.2 1.2 0 0 0 12 8.4v-6a1.2 1.2 0 0 0-1.2-1.2'
          />
          <path
            fill='#F93939'
            fillRule='evenodd'
            d='M6 6H2.4V4.8H6V2.4h1.2v2.4h3.6V6H7.2v2.4H6zm3 1.2v1.2h1.8V7.2zm0-4.8v1.2h1.8V2.4zM2.4 7.2v1.2h1.8V7.2zm0-4.8v1.2h1.8V2.4z'
            clipRule='evenodd'
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
        <clipPath id='NewZealand_svg__a'>
          <rect width={24} height={18} fill='#fff' rx={2} />
        </clipPath>
        <clipPath id='NewZealand_svg__b'>
          <path fill='#fff' d='M0 0h24v18H0z' />
        </clipPath>
      </defs>
    </svg>
  ),
);

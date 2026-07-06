import { forwardRef, Ref, SVGProps } from 'react';

type FlagProps = SVGProps<SVGSVGElement> & {
  /** Размер флага в пикселях (выставляет width и height). */
  size?: number;
};

export const GuyanaSVG = forwardRef<SVGSVGElement, FlagProps>(
  ({ size = 24, style, ...props }, ref: Ref<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 18'
      ref={ref}
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      {...props}
    >
      <g clipPath='url(#Guyana_svg__a)'>
        <g clipPath='url(#Guyana_svg__b)'>
          <path fill='#249F58' d='M0 0h24v18H0z' />
          <path fill='#fff' fillRule='evenodd' d='M0 18V0h3.429L24 7.2v3.6L3.429 18z' clipRule='evenodd' />
          <path fill='#FFDA2C' fillRule='evenodd' d='m0 0 24 9-24 9z' clipRule='evenodd' />
          <path fill='#151515' fillRule='evenodd' d='M0 18V0h1.143L12.57 9 1.143 18z' clipRule='evenodd' />
          <path fill='#F93939' fillRule='evenodd' d='m0 0 11.429 9L0 18z' clipRule='evenodd' />
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
        <clipPath id='Guyana_svg__a'>
          <rect width={24} height={18} fill='#fff' rx={2} />
        </clipPath>
        <clipPath id='Guyana_svg__b'>
          <path fill='#fff' d='M0 0h24v18H0z' />
        </clipPath>
      </defs>
    </svg>
  ),
);

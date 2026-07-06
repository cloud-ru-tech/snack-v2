import { forwardRef, Ref, SVGProps } from 'react';

type FlagProps = SVGProps<SVGSVGElement> & {
  /** Размер флага в пикселях (выставляет width и height). */
  size?: number;
};

export const BotswanaSVG = forwardRef<SVGSVGElement, FlagProps>(
  ({ size = 24, style, ...props }, ref: Ref<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 18'
      ref={ref}
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      {...props}
    >
      <g clipPath='url(#Botswana_svg__a)'>
        <g clipPath='url(#Botswana_svg__b)'>
          <path fill='#3ECBF8' d='M0 0h24v18H0z' />
          <path fill='#fff' fillRule='evenodd' d='M0 10.8h24V12H0z' clipRule='evenodd' />
          <path fill='#151515' fillRule='evenodd' d='M0 7.2h24v3.6H0z' clipRule='evenodd' />
          <path fill='#fff' fillRule='evenodd' d='M0 6h24v1.2H0z' clipRule='evenodd' />
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
        <clipPath id='Botswana_svg__a'>
          <rect width={24} height={18} fill='#fff' rx={2} />
        </clipPath>
        <clipPath id='Botswana_svg__b'>
          <path fill='#fff' d='M0 0h24v18H0z' />
        </clipPath>
      </defs>
    </svg>
  ),
);

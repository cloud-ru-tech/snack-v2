import { forwardRef, Ref, SVGProps } from 'react';

type FlagProps = SVGProps<SVGSVGElement> & {
  /** Размер флага в пикселях (выставляет width и height). */
  size?: number;
};

export const SlovakiaSVG = forwardRef<SVGSVGElement, FlagProps>(
  ({ size = 24, style, ...props }, ref: Ref<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 18'
      ref={ref}
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      {...props}
    >
      <g clipPath='url(#Slovakia_svg__a)'>
        <g clipPath='url(#Slovakia_svg__b)'>
          <path fill='#EE1C25' d='M0 0h24v18H0z' />
          <path fill='#0B4EA2' d='M0 0h24v12H0z' />
          <path fill='#fff' d='M0 0h24v6H0z' />
          <path
            fill='#fff'
            d='M8.737 13.905c-1.612-.776-3.922-2.321-3.922-5.37 0-3.052.15-4.44.15-4.44h7.549s.146 1.388.146 4.44-2.31 4.59-3.923 5.37'
          />
          <path
            fill='#EE1C25'
            d='M8.737 13.5c-1.48-.713-3.6-2.13-3.6-4.927 0-2.798.135-4.073.135-4.073h6.93s.132 1.275.132 4.073c.004 2.8-2.115 4.214-3.597 4.927'
          />
          <path
            fill='#fff'
            d='M9.052 7.838c.402.007 1.186.022 1.88-.21 0 0-.016.25-.016.54 0 .288.019.54.019.54-.638-.214-1.429-.218-1.883-.214v1.545h-.63V8.494c-.45-.004-1.24 0-1.878.213 0 0 .018-.25.018-.54 0-.292-.018-.54-.018-.54.693.233 1.477.218 1.875.21v-.97c-.364 0-.89.014-1.485.213 0 0 .018-.248.018-.54 0-.289-.018-.54-.018-.54a4.4 4.4 0 0 0 1.485.214c-.02-.615-.199-1.388-.199-1.388s.371.027.517.027c.15 0 .518-.027.518-.027s-.18.773-.199 1.388c.364.003.889-.015 1.485-.214 0 0-.018.251-.018.54 0 .292.018.54.018.54a4.5 4.5 0 0 0-1.489-.214v.975z'
          />
          <path
            fill='#0B4EA2'
            d='M8.738 9.874c-.747 0-1.144 1.031-1.144 1.031s-.225-.487-.833-.487c-.412 0-.712.363-.907.705.75 1.188 1.946 1.923 2.883 2.377.938-.45 2.138-1.189 2.884-2.377-.195-.338-.495-.705-.907-.705-.608 0-.833.487-.833.487s-.393-1.031-1.143-1.031'
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
        <clipPath id='Slovakia_svg__a'>
          <rect width={24} height={18} fill='#fff' rx={2} />
        </clipPath>
        <clipPath id='Slovakia_svg__b'>
          <path fill='#fff' d='M0 0h24v18H0z' />
        </clipPath>
      </defs>
    </svg>
  ),
);

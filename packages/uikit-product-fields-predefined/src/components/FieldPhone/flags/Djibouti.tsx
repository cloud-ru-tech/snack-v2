import { forwardRef, Ref, SVGProps } from 'react';

type FlagProps = SVGProps<SVGSVGElement> & {
  /** Размер флага в пикселях (выставляет width и height). */
  size?: number;
};

export const DjiboutiSVG = forwardRef<SVGSVGElement, FlagProps>(
  ({ size = 24, style, ...props }, ref: Ref<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 18'
      ref={ref}
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      {...props}
    >
      <g clipPath='url(#Djibouti_svg__a)'>
        <g clipPath='url(#Djibouti_svg__b)'>
          <path fill='#0C0' d='M0 0h24v18H0z' />
          <path fill='#69F' fillRule='evenodd' d='M0 0h24v9.6H0z' clipRule='evenodd' />
          <path fill='#fff' fillRule='evenodd' d='m0 0 14.4 9L0 18z' clipRule='evenodd' />
          <path
            fill='red'
            fillRule='evenodd'
            d='m5.4 10.5-1.764.928.336-1.965-1.426-1.392 1.972-.284L5.4 6l.882 1.788 1.972.284-1.428 1.392.336 1.964'
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
        <clipPath id='Djibouti_svg__a'>
          <rect width={24} height={18} fill='#fff' rx={2} />
        </clipPath>
        <clipPath id='Djibouti_svg__b'>
          <path fill='#fff' d='M0 0h24v18H0z' />
        </clipPath>
      </defs>
    </svg>
  ),
);

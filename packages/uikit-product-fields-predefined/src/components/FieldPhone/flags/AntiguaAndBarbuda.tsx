import { forwardRef, Ref, SVGProps } from 'react';

type FlagProps = SVGProps<SVGSVGElement> & {
  /** Размер флага в пикселях (выставляет width и height). */
  size?: number;
};

export const AntiguaAndBarbudaSVG = forwardRef<SVGSVGElement, FlagProps>(
  ({ size = 24, style, ...props }, ref: Ref<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 18'
      ref={ref}
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      {...props}
    >
      <g clipPath='url(#AntiguaAndBarbuda_svg__a)'>
        <g fillRule='evenodd' clipPath='url(#AntiguaAndBarbuda_svg__b)' clipRule='evenodd'>
          <path fill='#fff' d='M0 0h24v18H0z' />
          <path fill='#000' d='M.003 0H24v7.2H0z' />
          <path fill='#0072C6' d='M3.55 7.144h16.876v3.937H3.55z' />
          <path fill='#CE1126' d='M24 18H11.998L24 0zM0 18h11.998L0 0z' />
          <path
            fill='#FCD116'
            d='m18.284 7.147-2.686-.678 2.281-1.723-2.802.4 1.442-2.443-2.486 1.442.45-2.844L12.8 3.544 12.121.942l-.763 2.683-1.68-2.286.481 2.925-2.49-1.522 1.442 2.444-2.72-.44 2.242 1.68-2.809.721z'
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
        <clipPath id='AntiguaAndBarbuda_svg__a'>
          <rect width={24} height={18} fill='#fff' rx={2} />
        </clipPath>
        <clipPath id='AntiguaAndBarbuda_svg__b'>
          <path fill='#fff' d='M0 0h24v18H0z' />
        </clipPath>
      </defs>
    </svg>
  ),
);

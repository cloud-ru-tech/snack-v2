import { forwardRef, Ref, SVGProps } from 'react';

type FlagProps = SVGProps<SVGSVGElement> & {
  /** Размер флага в пикселях (выставляет width и height). */
  size?: number;
};

export const TanzaniaSVG = forwardRef<SVGSVGElement, FlagProps>(
  ({ size = 24, style, ...props }, ref: Ref<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 18'
      ref={ref}
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      {...props}
    >
      <g clipPath='url(#Tanzania_svg__a)'>
        <path fill='#09F' fillRule='evenodd' d='M0 0h24v18H0z' clipRule='evenodd' />
        <path fill='#090' d='M0 17V0h24v1z' />
        <path fill='#000' d='M19.5 0H24v4.768L4.5 18H0v-4.768z' />
        <path fill='#FF0' d='M21.105 0H19.08L0 12.725v1.35zM2.895 18H4.92L24 5.275v-1.35z' />
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
        <clipPath id='Tanzania_svg__a'>
          <rect width={24} height={18} fill='#fff' rx={2} />
        </clipPath>
      </defs>
    </svg>
  ),
);

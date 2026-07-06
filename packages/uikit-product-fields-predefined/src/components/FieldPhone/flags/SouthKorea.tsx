import { forwardRef, Ref, SVGProps } from 'react';

type FlagProps = SVGProps<SVGSVGElement> & {
  /** Размер флага в пикселях (выставляет width и height). */
  size?: number;
};

export const SouthKoreaSVG = forwardRef<SVGSVGElement, FlagProps>(
  ({ size = 24, style, ...props }, ref: Ref<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 18'
      ref={ref}
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      {...props}
    >
      <g clipPath='url(#SouthKorea_svg__a)'>
        <path fill='#000' d='M24 0H0v18h24z' />
        <path fill='#fff' d='M24 0H0v18h24z' />
        <path fill='#fff' fillRule='evenodd' d='m20.31 14.781-3.121-2.082.208-.312 3.121 2.082z' clipRule='evenodd' />
        <path fill='#CD2E3A' fillRule='evenodd' d='M8.246 6.508a4.499 4.499 0 0 1 7.488 4.996z' clipRule='evenodd' />
        <path
          fill='#0047A0'
          fillRule='evenodd'
          d='M8.246 6.508a4.5 4.5 0 0 0-.668 3.379 4.49 4.49 0 0 0 5.293 3.531 4.5 4.5 0 0 0 2.863-1.914c.329-.496.45-1.106.332-1.691a2.249 2.249 0 0 0-4.078-.805z'
          clipRule='evenodd'
        />
        <path fill='#CD2E3A' d='M11.988 9.008a2.25 2.25 0 1 0-3.742-2.5 2.25 2.25 0 0 0 3.742 2.5' />
        <path
          fill='#000'
          fillRule='evenodd'
          d='m2.629 5.469 2.496-3.746.625.418-2.496 3.742zm.937.625 2.497-3.746.625.418-2.5 3.742zm.934.62L7 2.974l.621.418-2.496 3.742zm11.856 7.907 2.496-3.742.625.418-2.497 3.742zm.937.625 2.496-3.742.625.414-2.496 3.746zm.938.625 2.496-3.742.62.414-2.495 3.746zM2.64 12.547l2.496 3.742.625-.418-2.496-3.742zm2.288 1.403 1.145 1.714.621-.414-1.143-1.716zm-.208-.312.623-.416L4.2 11.504l-.625.418zm-.21-2.341 2.497 3.742.625-.414-2.496-3.746zm13-6.191L16.367 3.39l.625-.418 1.144 1.716zm.208.312 1.144 1.715.625-.414L18.344 5zm2.082 1.094-2.496-3.746.62-.414 2.497 3.742zm-.418-2.654L18.238 2.14l.625-.414 1.143 1.713zm.207.312 1.144 1.717.625-.418-1.145-1.717z'
          clipRule='evenodd'
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
        <clipPath id='SouthKorea_svg__a'>
          <rect width={24} height={18} fill='#fff' rx={2} />
        </clipPath>
      </defs>
    </svg>
  ),
);

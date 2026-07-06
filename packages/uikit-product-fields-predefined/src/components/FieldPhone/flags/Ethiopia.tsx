import { forwardRef, Ref, SVGProps } from 'react';

type FlagProps = SVGProps<SVGSVGElement> & {
  /** Размер флага в пикселях (выставляет width и height). */
  size?: number;
};

export const EthiopiaSVG = forwardRef<SVGSVGElement, FlagProps>(
  ({ size = 24, style, ...props }, ref: Ref<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 18'
      ref={ref}
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      {...props}
    >
      <g clipPath='url(#Ethiopia_svg__a)'>
        <path fill='#FFC621' fillRule='evenodd' d='M0 6.344h24v5.726H0z' clipRule='evenodd' />
        <path fill='#EF2118' fillRule='evenodd' d='M0 12.073h24v5.975H0z' clipRule='evenodd' />
        <path fill='#298C08' fillRule='evenodd' d='M0 0h24v6.345H0z' clipRule='evenodd' />
        <path fill='#006BC6' d='M11.42 13.13a3.801 3.801 0 1 0 0-7.603 3.801 3.801 0 0 0 0 7.602' />
        <path
          fill='#FFC621'
          fillRule='evenodd'
          d='m9.715 6.634-.23.159.83 1.163.221-.141-.824-1.181zm1.036 2.75-.341-.24.14-.448-1.695.025-.494-.377 2.316-.025.43-1.3.233.528-.589 1.833zm2.697-2.493-.222-.169-.857 1.142.198.166zm-2.305 1.816.123-.395h.469l-.536-1.614.212-.582.722 2.2 1.368.017-.43.377-1.928-.007zm3.193 1.805.095-.261-1.35-.47-.098.248zm-2.435-1.636.412-.004.144.445 1.368-1.005.62.021-1.871 1.364.405 1.312-.493-.296zm-.698 3.595.278.008.01-1.428-.26-.018-.028 1.442zm.775-2.83.134.391-.377.282 1.389.977.176.592-1.89-1.34-1.11.8.124-.564 1.55-1.138zm-3.641.458.08.264 1.365-.43-.07-.253zm2.933-.14-.332.25-.38-.272-.501 1.622-.508.352.688-2.21L9.13 8.89l.574-.056z'
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
        <clipPath id='Ethiopia_svg__a'>
          <rect width={24} height={18} fill='#fff' rx={2} />
        </clipPath>
      </defs>
    </svg>
  ),
);

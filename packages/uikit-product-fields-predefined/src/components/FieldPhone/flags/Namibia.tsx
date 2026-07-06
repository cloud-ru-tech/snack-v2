import { forwardRef, Ref, SVGProps } from 'react';

type FlagProps = SVGProps<SVGSVGElement> & {
  /** Размер флага в пикселях (выставляет width и height). */
  size?: number;
};

export const NamibiaSVG = forwardRef<SVGSVGElement, FlagProps>(
  ({ size = 24, style, ...props }, ref: Ref<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 18'
      ref={ref}
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      {...props}
    >
      <g clipPath='url(#Namibia_svg__a)'>
        <path fill='#fff' fillRule='evenodd' d='M0 0h24v18H0z' clipRule='evenodd' />
        <path fill='#3662A2' d='M0 .007 19.219 0 0 12.35z' />
        <path fill='#38A100' d='M24 5.132 4.586 17.992 24 17.986z' />
        <path fill='#C70000' d='M24 4.216 3.446 17.996 0 18v-4.691L20.576.01 24 0z' />
        <path
          fill='#FFE700'
          fillRule='evenodd'
          d='m8.235 6.45-.817-.495-.473.829-.457-.833-.825.484.022-.952-.952.007.495-.817-.83-.47.833-.46-.48-.825.953.022-.004-.956.814.495.472-.829.458.833.825-.484-.023.952.953-.007-.495.817.829.469-.833.461.48.825-.952-.022z'
          clipRule='evenodd'
        />
        <path
          fill='#3662A2'
          fillRule='evenodd'
          d='M8.715 4.215c0 .96-.784 1.736-1.747 1.736A1.74 1.74 0 0 1 5.22 4.215c0-.96.78-1.732 1.748-1.732.967 0 1.747.776 1.747 1.732'
          clipRule='evenodd'
        />
        <path
          fill='#FFE700'
          fillRule='evenodd'
          d='M8.336 4.215a1.369 1.369 0 1 1-2.737 0 1.369 1.369 0 0 1 2.737 0'
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
        <clipPath id='Namibia_svg__a'>
          <rect width={24} height={18} fill='#fff' rx={2} />
        </clipPath>
      </defs>
    </svg>
  ),
);

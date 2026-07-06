import { forwardRef, Ref, SVGProps } from 'react';

type FlagProps = SVGProps<SVGSVGElement> & {
  /** Размер флага в пикселях (выставляет width и height). */
  size?: number;
};

export const CentralAfricanRepublicSVG = forwardRef<SVGSVGElement, FlagProps>(
  ({ size = 24, style, ...props }, ref: Ref<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 18'
      ref={ref}
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      {...props}
    >
      <g clipPath='url(#CentralAfricanRepublic_svg__a)'>
        <g fillRule='evenodd' clipPath='url(#CentralAfricanRepublic_svg__b)' clipRule='evenodd'>
          <path fill='#00F' d='M0 0h24v4.463H0z' />
          <path fill='#FF0' d='M0 13.485h24V18H0z' />
          <path fill='#009A00' d='M0 8.974h24v4.511H0z' />
          <path fill='#fff' d='m0 4.463 24 .026V9L0 8.974z' />
          <path fill='red' d='M9.754.019h4.497V18H9.754z' />
          <path
            fill='#FF0'
            d='m4.189 3.964-1.182-.818-1.173.825.408-1.383L1.1 1.725l1.432-.037L3 .326l.476 1.362 1.429.026-1.133.874'
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
        <clipPath id='CentralAfricanRepublic_svg__a'>
          <rect width={24} height={18} fill='#fff' rx={2} />
        </clipPath>
        <clipPath id='CentralAfricanRepublic_svg__b'>
          <path fill='#fff' d='M0 0h24v18H0z' />
        </clipPath>
      </defs>
    </svg>
  ),
);

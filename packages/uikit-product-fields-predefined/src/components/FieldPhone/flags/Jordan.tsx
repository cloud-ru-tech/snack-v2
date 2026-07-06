import { forwardRef, Ref, SVGProps } from 'react';

type FlagProps = SVGProps<SVGSVGElement> & {
  /** Размер флага в пикселях (выставляет width и height). */
  size?: number;
};

export const JordanSVG = forwardRef<SVGSVGElement, FlagProps>(
  ({ size = 24, style, ...props }, ref: Ref<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 18'
      ref={ref}
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      {...props}
    >
      <g fillRule='evenodd' clipPath='url(#Jordan_svg__a)' clipRule='evenodd'>
        <path fill='#000' d='M0 0h24v6.001H0z' />
        <path fill='#fff' d='M0 6.001h24V12H0z' />
        <path fill='#090' d='M0 11.999h24V18H0z' />
        <path fill='red' d='m0 18 18-9L0 0z' />
        <path
          fill='#fff'
          d='m5.003 10.16.2-.875h-.896l.808-.387-.559-.7.809.387.197-.872.2.876.805-.39-.562.699.808.387H5.92l.2.875-.558-.703z'
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
        <clipPath id='Jordan_svg__a'>
          <rect width={24} height={18} fill='#fff' rx={2} />
        </clipPath>
      </defs>
    </svg>
  ),
);

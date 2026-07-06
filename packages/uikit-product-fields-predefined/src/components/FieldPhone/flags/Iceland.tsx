import { forwardRef, Ref, SVGProps } from 'react';

type FlagProps = SVGProps<SVGSVGElement> & {
  /** Размер флага в пикселях (выставляет width и height). */
  size?: number;
};

export const IcelandSVG = forwardRef<SVGSVGElement, FlagProps>(
  ({ size = 24, style, ...props }, ref: Ref<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 18'
      ref={ref}
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      {...props}
    >
      <g fillRule='evenodd' clipPath='url(#Iceland_svg__a)' clipRule='evenodd'>
        <path fill='#003897' d='M0 0h24v18H0z' />
        <path fill='#fff' d='M0 7.001h7.001V0H11v7.001H24V11H10.999V18H7v-7.001H0z' />
        <path fill='#D72828' d='M0 7.999h7.999V0H10v7.999H24V10H10.001V18H8v-7.999H0z' />
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
        <clipPath id='Iceland_svg__a'>
          <rect width={24} height={18} fill='#fff' rx={2} />
        </clipPath>
      </defs>
    </svg>
  ),
);

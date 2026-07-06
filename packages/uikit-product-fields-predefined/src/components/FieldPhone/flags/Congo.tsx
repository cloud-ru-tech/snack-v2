import { forwardRef, Ref, SVGProps } from 'react';

type FlagProps = SVGProps<SVGSVGElement> & {
  /** Размер флага в пикселях (выставляет width и height). */
  size?: number;
};

export const CongoSVG = forwardRef<SVGSVGElement, FlagProps>(
  ({ size = 24, style, ...props }, ref: Ref<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 18'
      ref={ref}
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      {...props}
    >
      <g clipPath='url(#Congo_svg__a)'>
        <path fill='#007FFF' d='M0 0h24v18H0z' />
        <path
          fill='#F7D618'
          d='M1.08 3.6H3.6l.78-2.52.78 2.52h2.52L5.64 5.16l.78 2.52-2.04-1.56-2.04 1.56.78-2.52zM22.5 0 0 13.5V18h1.5L24 4.5V0z'
        />
        <path fill='#CE1021' d='M24 0 0 14.4V18L24 3.6z' />
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
        <clipPath id='Congo_svg__a'>
          <rect width={24} height={18} fill='#fff' rx={2} />
        </clipPath>
      </defs>
    </svg>
  ),
);

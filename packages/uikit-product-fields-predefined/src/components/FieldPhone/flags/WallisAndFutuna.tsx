import { forwardRef, Ref, SVGProps } from 'react';

type FlagProps = SVGProps<SVGSVGElement> & {
  /** Размер флага в пикселях (выставляет width и height). */
  size?: number;
};

export const WallisAndFutunaSVG = forwardRef<SVGSVGElement, FlagProps>(
  ({ size = 24, style, ...props }, ref: Ref<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 18'
      ref={ref}
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      {...props}
    >
      <g clipPath='url(#Wallis_and_Futuna_svg__a)'>
        <path fill='#CE1126' d='M0 0h24v18H0z' />
        <path fill='#fff' d='M0 0h7.2v7.2H0z' />
        <path fill='#002654' d='M0 0h3.6v7.2H0z' />
        <path
          fill='#fff'
          d='M10.89 7.29H0v-.18h10.71V0h.18zM18.9 8.28l-2.16-2.16h4.32zm-.72.72-2.16-2.16v4.32zm.72.72-2.16 2.16h4.32zm.72-.72 2.16-2.16v4.32z'
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
        <clipPath id='Wallis_and_Futuna_svg__a'>
          <rect width={24} height={18} fill='#fff' rx={2} />
        </clipPath>
      </defs>
    </svg>
  ),
);

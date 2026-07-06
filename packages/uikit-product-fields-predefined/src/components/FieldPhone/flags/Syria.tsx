import { forwardRef, Ref, SVGProps } from 'react';

type FlagProps = SVGProps<SVGSVGElement> & {
  /** Размер флага в пикселях (выставляет width и height). */
  size?: number;
};

export const SyriaSVG = forwardRef<SVGSVGElement, FlagProps>(
  ({ size = 24, style, ...props }, ref: Ref<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 18'
      ref={ref}
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      {...props}
    >
      <g clipPath='url(#Syria_svg__a)'>
        <g clipPath='url(#Syria_svg__b)'>
          <path fill='#fff' d='M0 0h24v18H0z' />
          <path fill='#000' d='M0 0h24v18H0z' />
          <path fill='#fff' d='M0 0h24v12H0z' />
          <path fill='#CE1126' d='M0 0h24v6H0z' />
          <path
            fill='#007A3D'
            d='M6.037 11.25 7.5 6.75l1.462 4.5-3.825-2.783h4.725m5.176 2.783 1.462-4.5 1.462 4.5-3.825-2.783h4.726'
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
        <clipPath id='Syria_svg__a'>
          <rect width={24} height={18} fill='#fff' rx={2} />
        </clipPath>
        <clipPath id='Syria_svg__b'>
          <path fill='#fff' d='M0 0h24v18H0z' />
        </clipPath>
      </defs>
    </svg>
  ),
);

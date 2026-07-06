import { forwardRef, Ref, SVGProps } from 'react';

type FlagProps = SVGProps<SVGSVGElement> & {
  /** Размер флага в пикселях (выставляет width и height). */
  size?: number;
};

export const HondurasSVG = forwardRef<SVGSVGElement, FlagProps>(
  ({ size = 24, style, ...props }, ref: Ref<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 18'
      ref={ref}
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      {...props}
    >
      <g clipPath='url(#Honduras_svg__a)'>
        <path fill='#18C3DF' d='M0 0h24v18H0z' />
        <path fill='#fff' d='M0 6h24v6H0z' />
        <path
          fill='#18C3DF'
          fillRule='evenodd'
          d='m7.001 6.399.213.707.738-.016-.607.42.244.697L7 7.76l-.587.447.244-.697-.608-.42.739.016zm9.998 0 .212.707.739-.016-.608.42.244.697L17 7.76l-.588.447.244-.697-.607-.42.738.016zm-4.411 3.41L12 9.36l-.587.448.244-.697-.608-.42.739.016L12 8l.212.708.74-.017-.608.42zm4.41-.41.213.708.739-.017-.608.42.244.697L17 10.76l-.588.447.244-.697-.607-.42.738.017zm-9.997 0 .213.708.738-.017-.607.42.244.697L7 10.76l-.587.447.244-.697-.608-.42.739.017z'
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
        <clipPath id='Honduras_svg__a'>
          <rect width={24} height={18} fill='#fff' rx={2} />
        </clipPath>
      </defs>
    </svg>
  ),
);

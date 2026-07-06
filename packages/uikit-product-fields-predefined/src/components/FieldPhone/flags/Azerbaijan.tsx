import { forwardRef, Ref, SVGProps } from 'react';

type FlagProps = SVGProps<SVGSVGElement> & {
  /** Размер флага в пикселях (выставляет width и height). */
  size?: number;
};

export const AzerbaijanSVG = forwardRef<SVGSVGElement, FlagProps>(
  ({ size = 24, style, ...props }, ref: Ref<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 18'
      ref={ref}
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      {...props}
    >
      <g clipPath='url(#Azerbaijan_svg__a)'>
        <g clipPath='url(#Azerbaijan_svg__b)'>
          <path fill='#3F9C35' d='M0 0h24v18H0z' />
          <path fill='#ED2939' d='M0 0h24v12H0z' />
          <path fill='#00B9E4' d='M0 0h24v6H0z' />
          <path fill='#fff' d='M11.397 11.7a2.7 2.7 0 1 0 0-5.4 2.7 2.7 0 0 0 0 5.4' />
          <path fill='#ED2939' d='M11.996 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5' />
          <path
            fill='#fff'
            d='m14.397 7.5.288.806.773-.367-.368.776.806.285-.806.289.368.772-.773-.367-.289.806-.288-.806-.773.367.368-.772L12.897 9l.806-.289-.368-.772.773.367z'
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
        <clipPath id='Azerbaijan_svg__a'>
          <rect width={24} height={18} fill='#fff' rx={2} />
        </clipPath>
        <clipPath id='Azerbaijan_svg__b'>
          <path fill='#fff' d='M0 0h24v18H0z' />
        </clipPath>
      </defs>
    </svg>
  ),
);

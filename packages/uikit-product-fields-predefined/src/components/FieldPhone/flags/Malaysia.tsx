import { forwardRef, Ref, SVGProps } from 'react';

type FlagProps = SVGProps<SVGSVGElement> & {
  /** Размер флага в пикселях (выставляет width и height). */
  size?: number;
};

export const MalaysiaSVG = forwardRef<SVGSVGElement, FlagProps>(
  ({ size = 24, style, ...props }, ref: Ref<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 18'
      ref={ref}
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      {...props}
    >
      <g clipPath='url(#Malaysia_svg__a)'>
        <path fill='#C00' d='M0 0h24v18H0z' />
        <path fill='#C00' d='M0 0h24v1.286H0z' />
        <path fill='#fff' d='M0 1.286h24v1.286H0z' />
        <path fill='#C00' d='M0 2.573h24v1.286H0z' />
        <path fill='#fff' d='M0 3.859h24v1.279H0z' />
        <path fill='#C00' d='M0 5.141h24v1.287H0z' />
        <path fill='#fff' d='M0 6.428h24v1.286H0z' />
        <path fill='#C00' d='M0 7.714h24V9H0z' />
        <path fill='#fff' d='M0 9h24v1.286H0z' />
        <path fill='#C00' d='M0 10.286h24v1.287H0z' />
        <path fill='#fff' d='M0 11.573h24v1.286H0z' />
        <path fill='#C00' d='M0 12.859h24v1.278H0z' />
        <path fill='#fff' d='M0 14.141h24v1.287H0z' />
        <path fill='#C00' d='M0 15.428h24v1.286H0z' />
        <path fill='#fff' d='M0 16.714h24V18H0z' />
        <path fill='#006' d='M0 .019h12v10.286H0z' />
        <path
          fill='#FC0'
          d='m7.781 2.768.225 1.526.863-1.275-.465 1.47 1.331-.78-1.054 1.125 1.538-.12-1.436.555 1.436.555-1.538-.12 1.054 1.125-1.331-.78.461 1.473-.863-1.278-.225 1.526-.22-1.526-.863 1.275.465-1.47-1.332.78 1.05-1.125-1.537.12 1.44-.555-1.436-.555 1.537.12-1.054-1.125 1.332.78-.465-1.474.862 1.279zm-1.248.063a2.666 2.666 0 0 0-3.428 3.71 2.666 2.666 0 0 0 3.427 1.165 3 3 0 0 1-4.309-.873 3 3 0 0 1 4.31-4.002'
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
        <clipPath id='Malaysia_svg__a'>
          <rect width={24} height={18} fill='#fff' rx={2} />
        </clipPath>
      </defs>
    </svg>
  ),
);

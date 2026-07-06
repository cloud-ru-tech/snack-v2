import { forwardRef, Ref, SVGProps } from 'react';

type FlagProps = SVGProps<SVGSVGElement> & {
  /** Размер флага в пикселях (выставляет width и height). */
  size?: number;
};

export const MaltaSVG = forwardRef<SVGSVGElement, FlagProps>(
  ({ size = 24, style, ...props }, ref: Ref<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 18'
      ref={ref}
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      {...props}
    >
      <g clipPath='url(#Malta_svg__a)'>
        <g clipPath='url(#Malta_svg__b)'>
          <path fill='#fff' d='M0 0h24v18H0z' />
          <path
            fill='#CF142B'
            d='M12 0h12v18H12zM4.12 5.79h-1.5V4.52a.49.49 0 0 1-.39-.38c-.01-.01-.01-.01-.01-.02H.95v-1.5h1.27a.49.49 0 0 1 .38-.39c0-.01.01-.01.02-.01V.95h1.5v1.27a.49.49 0 0 1 .39.38s.01.01.01.02h1.27v1.5H4.52a.49.49 0 0 1-.38.39c-.01 0-.01.01-.02.01zm-1.33-.17h1.16V4.35h.16a.3.3 0 0 0 .18-.11c.05-.06.07-.13.06-.2v-.09h1.27V2.79H4.35v-.16a.3.3 0 0 0-.11-.18.25.25 0 0 0-.2-.06h-.09V1.12H2.79v1.27H2.7c-.03-.01-.05 0-.07 0a.3.3 0 0 0-.18.11c-.05.06-.07.13-.06.2v.09H1.12v1.16h1.27v.09c-.01.02 0 .05 0 .07.01.07.05.13.11.18s.13.07.2.06h.09z'
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
        <clipPath id='Malta_svg__a'>
          <rect width={24} height={18} fill='#fff' rx={2} />
        </clipPath>
        <clipPath id='Malta_svg__b'>
          <path fill='#fff' d='M0 0h24v18H0z' />
        </clipPath>
      </defs>
    </svg>
  ),
);

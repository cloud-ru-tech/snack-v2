import { forwardRef, Ref, SVGProps } from 'react';

type FlagProps = SVGProps<SVGSVGElement> & {
  /** Размер флага в пикселях (выставляет width и height). */
  size?: number;
};

export const OmanSVG = forwardRef<SVGSVGElement, FlagProps>(
  ({ size = 24, style, ...props }, ref: Ref<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 18'
      ref={ref}
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      {...props}
    >
      <g clipPath='url(#Oman_svg__a)'>
        <path fill='#007E3C' d='M24 0H0v18h24z' />
        <path fill='#DF1A23' d='M24 0H0v12h24z' />
        <path fill='#fff' d='M24 0H0v6h24z' />
        <path fill='#DF1A23' d='M7 0H0v18h7z' />
        <path
          fill='#fff'
          d='M2.11 3.1H1.2c-.05 0-.09.04-.09.08v.42c0 .05.04.08.09.08h.91c.06 0 .1-.03.1-.08v-.42c0-.04-.04-.08-.1-.08M5.09 3.1H6c.05 0 .09.04.09.08v.42c0 .05-.04.08-.09.08h-.91c-.06 0-.1-.03-.1-.08v-.42c0-.04.04-.08.1-.08'
        />
        <path
          fill='#fff'
          fillRule='evenodd'
          d='M2.9 4.41C1.45 5.82.84 6 1.13 6.11c.28.12 1.21-.61 2.18-1.58S4.87 2.7 4.58 2.59c-.29-.12-.15.32-1.68 1.82'
          clipRule='evenodd'
        />
        <path
          fill='#fff'
          fillRule='evenodd'
          d='M4.5 3.12c.62-1.07 1.04-1.97.95-2.01-.09-.05-.67.78-1.29 1.85M4.3 4.41C5.75 5.82 6.36 6 6.07 6.11c-.28.12-1.21-.61-2.18-1.58S2.33 2.7 2.62 2.59c.29-.12.15.32 1.68 1.82'
          clipRule='evenodd'
        />
        <path
          fill='#fff'
          fillRule='evenodd'
          d='M2.7 3.12c-.62-1.07-1.04-1.97-.95-2.01.09-.05.67.78 1.29 1.85'
          clipRule='evenodd'
        />
        <path
          fill='#fff'
          fillRule='evenodd'
          d='M3.16 2.54c0 .93 0 1.28-.07 1.33-.06.05-1.87 0-1.87.26 0 .27 1.49.54 1.94.54.59 0 .89-.27.89-.8V2.54z'
          clipRule='evenodd'
        />
        <path
          fill='#fff'
          d='M3.41 2.15h.38v.16h-.38zm.03-.16h.32v.16h-.32zm0-.16h.32v.16h-.32zM3.48 1.62h.25v.21h-.25zM3.47 1.43h.27v.19h-.27z'
        />
        <path
          fill='#fff'
          fillRule='evenodd'
          d='M3.8 1.24c0 .07.1.19.1.19-.07.05-.18.08-.28.08s-.23-.02-.28-.08c0 0 .09-.12.09-.19s-.09-.15-.09-.15c.07-.05.18-.08.28-.08s.21.03.28.08c0 0-.1.08-.1.15'
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
        <clipPath id='Oman_svg__a'>
          <rect width={24} height={18} fill='#fff' rx={2} />
        </clipPath>
      </defs>
    </svg>
  ),
);

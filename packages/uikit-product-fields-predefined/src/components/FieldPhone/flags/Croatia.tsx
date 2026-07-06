import { forwardRef, Ref, SVGProps } from 'react';

type FlagProps = SVGProps<SVGSVGElement> & {
  /** Размер флага в пикселях (выставляет width и height). */
  size?: number;
};

export const CroatiaSVG = forwardRef<SVGSVGElement, FlagProps>(
  ({ size = 24, style, ...props }, ref: Ref<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 18'
      ref={ref}
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      {...props}
    >
      <g clipPath='url(#Croatia_svg__a)'>
        <path fill='#171796' d='M24 0H0v18h24z' />
        <path fill='#fff' d='M0 0h24v12H0z' />
        <path fill='red' d='M0 0h24v6H0zm12 13.65c1.92 0 3.5-1.58 3.5-3.5V6h-7v4.15c0 1.93 1.57 3.5 3.5 3.5' />
        <path
          fill='#fff'
          d='M12 13.59c.91 0 1.78-.36 2.42-1.01.65-.64 1.01-1.51 1.01-2.42v-4.1H8.57v4.1c0 .91.36 1.78 1 2.42s1.52 1 2.43 1.01'
        />
        <path
          fill='red'
          d='M10.01 6.19H8.69v1.45h1.33zm0 2.9h1.33V7.64h-1.33zm-1.32 1.07c0 .12.01.26.03.38h1.3V9.09H8.69zm3.97-1.07h-1.32v1.45h1.32zm0 2.91h1.32v-1.46h-1.32zm1.32.79c.29-.22.55-.49.75-.79h-.75zM10.01 12h1.33v-1.46h-1.33zm-.75 0c.2.3.46.57.75.79V12zm2.97 1.45c.14-.01.28-.03.43-.06V12h-1.32v1.39q.21.045.42.06c.16.01.31 0 .47 0M15.27 10.54c.02-.12.03-.26.03-.38V9.09h-1.32v1.45zm-2.62-1.45h1.33V7.64h-1.33zm0-2.9h-1.32l.01 1.45h1.31zm2.65 1.45V6.19h-1.32v1.45z'
        />
        <path fill='#0093DD' d='m9.48 3.55-1.02-.38-.58.93.22.5.56 1.26c.42-.18.85-.33 1.3-.45z' />
        <path fill='#171796' d='m11.15 3.27-.95-.54-.72.82.48 1.86c.44-.11.89-.18 1.35-.22z' />
        <path
          fill='red'
          d='M9.84 4.95c.47-.12.95-.2 1.43-.24l-.04-.48c-.51.04-1.01.12-1.51.25zm-.24-.94c.52-.13 1.05-.21 1.59-.26l-.04-.47c-.56.04-1.12.14-1.67.27z'
        />
        <path fill='#0093DD' d='m12.85 3.27-.01.01-.84-.7-.84.69.15 1.92a8 8 0 0 1 1.38 0z' />
        <path fill='#171796' d='m14.51 3.55-.72-.82-.94.54-.16 1.92c.45.04.91.11 1.35.22l.47-1.85z' />
        <path fill='#0093DD' d='m15.33 5.86.78-1.76-.57-.93-1.02.38-.48 1.87c.44.11.87.26 1.29.44' />
        <path fill='#fff' d='M14.34 4.23c.51.13 1.01.3 1.49.52l-.3.68c-.45-.2-.9-.36-1.37-.48z' />
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
        <clipPath id='Croatia_svg__a'>
          <rect width={24} height={18} fill='#fff' rx={2} />
        </clipPath>
      </defs>
    </svg>
  ),
);

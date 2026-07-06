import { forwardRef, Ref, SVGProps } from 'react';

type FlagProps = SVGProps<SVGSVGElement> & {
  /** Размер флага в пикселях (выставляет width и height). */
  size?: number;
};

export const IranSVG = forwardRef<SVGSVGElement, FlagProps>(
  ({ size = 24, style, ...props }, ref: Ref<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 18'
      ref={ref}
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      {...props}
    >
      <g clipPath='url(#Iran_svg__a)'>
        <path fill='#fff' d='M0 0h24v18H0z' />
        <path fill='#fff' d='M24 0H0v18h24z' />
        <path fill='#DA0000' fillRule='evenodd' d='M0 12.08h24V18H0z' clipRule='evenodd' />
        <path fill='#239F40' fillRule='evenodd' d='M0 0h24v5.91H0z' clipRule='evenodd' />
        <path
          fill='#DA0000'
          fillRule='evenodd'
          d='M12.83 6.94c.3.36 1.22 2.38-.55 3.7-.83.62-.32.65-.29.76 1.33-.71 1.77-1.67 1.76-2.53s-.47-1.62-.92-1.93'
          clipRule='evenodd'
        />
        <path
          fill='#DA0000'
          fillRule='evenodd'
          d='M13.01 6.84c.32.2.6.47.81.79s.35.68.4 1.06.02.76-.09 1.13c-.12.36-.31.69-.57.98.95-.22 2.18-3.04-.55-3.96m-2.03 0c-.32.2-.6.47-.81.79a2.54 2.54 0 0 0-.3 2.19c.11.36.3.69.56.98-.95-.22-2.18-3.04.55-3.96'
          clipRule='evenodd'
        />
        <path
          fill='#DA0000'
          fillRule='evenodd'
          d='M11.16 6.94c-.3.36-1.22 2.38.55 3.7.83.62.32.65.29.76-1.33-.71-1.77-1.67-1.75-2.53 0-.86.46-1.62.91-1.93'
          clipRule='evenodd'
        />
        <path
          fill='#DA0000'
          fillRule='evenodd'
          d='M13.69 11.21c-.52.01-1.18-.07-1.67-.32.08.16.15.25.23.41.46.04 1.1.1 1.44-.09m-3.34 0c.52.01 1.18-.07 1.67-.32-.08.16-.15.25-.23.41-.46.04-1.11.1-1.44-.09m.96-4.87c.1.28.38.32.68.16.22.12.55.13.67-.15.09.7-.65.53-.67.4-.28.26-.78.11-.68-.41'
          clipRule='evenodd'
        />
        <path
          fill='#DA0000'
          fillRule='evenodd'
          d='m12.01 11.65.27-.32.04-4.21-.32-.29-.33.27.06 4.25z'
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
        <clipPath id='Iran_svg__a'>
          <rect width={24} height={18} fill='#fff' rx={2} />
        </clipPath>
      </defs>
    </svg>
  ),
);

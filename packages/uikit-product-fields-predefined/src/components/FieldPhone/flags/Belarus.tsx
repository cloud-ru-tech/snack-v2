import { forwardRef, Ref, SVGProps } from 'react';

type FlagProps = SVGProps<SVGSVGElement> & {
  /** Размер флага в пикселях (выставляет width и height). */
  size?: number;
};

export const BelarusSVG = forwardRef<SVGSVGElement, FlagProps>(
  ({ size = 24, style, ...props }, ref: Ref<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 18'
      ref={ref}
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      {...props}
    >
      <g clipPath='url(#Belarus_svg__a)'>
        <g clipPath='url(#Belarus_svg__b)'>
          <path fill='#F93939' d='M0 0h24v18H0z' />
          <path fill='#B20000' fillRule='evenodd' d='M0 0h24v12H0z' clipRule='evenodd' />
          <path fill='#429F00' fillRule='evenodd' d='M0 12h24v6H0z' clipRule='evenodd' />
          <path fill='#fff' fillRule='evenodd' d='M0 0h3.98v18H0z' clipRule='evenodd' />
          <path
            fill='#B20000'
            fillRule='evenodd'
            d='M.37.3H.18v.31h.19zm.57 0H.75v.31H.56v.3H.37v.3H.18v.31h.38v-.31h.19v-.3h.19v-.3h.19v.3h.19v.3h.19v.31h.38v-.31H1.7v-.3h-.19v-.3h-.19V.3h-.19V0H.94zM2.08 0h-.19v.3h.19zm.76.3h-.19v.31h-.19v.3h-.19v.3h.38v-.3h.19v-.3h.19v.3h.19v.3h.19v.31h.38v-.31H3.6v-.3h-.19v-.3h-.19V.3h-.19V0h-.19zm.95 0H3.6v.31h.19zM.75 2.43v-.3H.56v-.3H.37v-.31H0v.31h.18v.3h.19v.3h.19v.31h.19v.31h.19v.3h.19v-.3h.19v-.31h.19v-.31h.19v-.3h-.38v.3h-.19v.31H.94v-.31zm1.9-.3h-.38v.3h.19v.31h.19v.31h.19v.3h.19v-.3h.19v-.31h.19v-.31h.19v-.3h-.38v.3h-.19v.31h-.19v-.31h-.19zm-.57.61h-.19v.3h.19zm-1.9 0H0v.3h.18zm3.8 0h-.19v.3h.19zM1.13 4.26H.94v.31h.19zm.19.31H.75v.3H.56v.31H.37v.31H.18v.3h.76v-.3h.19v.3h.76v-.3H1.7v-.31h-.19v-.31h-.19zm1.71-.3h-.19v.3h-.19v.3h-.19v.31h-.19v.31h-.19v.3h.76v-.3h.19v.3h.76v-.3H3.6v-.31h-.19v-.31h-.19v-.3h-.19zM2.84 6.4h-.19v.31h.95V6.4h.19v-.3h.19v-.3h-.95v.3h-.19zm-1.71.61v-.3h.19V6.4h-.19v-.3H.94v-.31H0v.31h.18v.3h.19v.31h.19v.3zm2.28-.3h-.57v.31h.19v.3h.19v-.3h.19zm-2.66.3h.19v.31H.75zm.95-.61h.57v.31H1.7zm.19.31h.19v.3h-.19zm0 .3H1.7v.3h-.19v.31h-.19v.3h-.19v.31h.38v-.31h.19v-.3h.19v-.31h.19v.31h.19v.3h.19v.31h.38v-.31h-.19v-.3h-.19v-.31h-.19v-.3h-.19v.01h-.19zM1.32 5.8h1.33v.3h-.19v.3h-.95v-.3h-.19zm.76-4.59h.38v.31h-.19v.31h.19v.3h-.38v-.3h-.19v.3h-.38v-.3h.19v-.31h.38zm1.52.31h.38v.3h-.19v.31h-.38v-.31h.19zM0 4.57h.18v.3H0zm3.79 0h.19v.3h-.19zM.94 8.54v-.31h.38v.31h-.19v.3H.94v.31h.19v.3h.19v.31H.94v-.31H.75v.31H.56v.3H.18v-.3h.19v-.31h.19v-.3h.19v-.31H.56v-.3H.37v-.31H.18v-.3h.38v.3h.19v.31zm-.57-.61v-.31H0v.31h.37M0 10.06h.37v.31H.18v.31H0zm3.03-1.83v.31h.19v-.31h.19v-.3h.19v-.31h.38v.31h-.19v.3H3.6v.31h-.19v.3h-.57v-.3h-.19v-.31zm0 .62h.19v.3h.19v.3h.19v.31h.19v.3h.19v.62h-.19v-.31H3.6v-.31h-.19v-.3h-.19v-.31h-.19v.31h-.38v-.31h.19v-.3h.19zm-1.14-.92h.19v.31h-.19zm-.57.92h.19v.3h-.19zm1.14 0h.19v.3h-.19zm-.57 0h.19v.3h.19v.3h-.19v-.3h-.19v.3H1.7v-.3h.19zM0 8.85h.18v.3H0zm3.79 0h.19v.3h-.19zm-1.9-4.28h.19v.3h-.19zM.94 1.52h.19v.31H.94zm1.9 0h.19v.31h-.19zm-.95 2.13h.19v-.3h.19v-.3h.19v.3h.19v.3h.19v.31h-.19v.31h-.19v.3h-.19v-.3h-.19v-.31h-.19v.31H1.7v.3h-.19v-.3h-.19v-.31h-.19v-.31h.19v-.3h.19v-.3h.19v.3h.19zm.38 0v.31h.19v-.31zm-.57.31v-.31h-.19v.31zm1.33-.31h.19v-.3h.19v-.3h.19v.3h.19v.3h.19v.31h-.19v.31H3.6v.3h-.19v-.3h-.19v-.31h-.19zm.38 0v.31h.19v-.31zM0 3.65h.18v-.3h.19v-.3h.19v.3h.19v.3h.19v.31H.75v.3H.18v-.3H0zm.37 0v.31h.19v-.31zm.19.62H.37v.3h.19zm3.42 3.05h-.19v.3h.19zm-3.8 0H0v.3h.18zm.19 10.37H.18v-.3h.19zm.57 0H.75v-.3h.57v.3h-.19V18H.94zm1.14.31h-.19v-.31h.19zm.76-.31h-.19v-.31h-.19v-.3h-.19v-.3h.38v.3h.19v.3h.19v-.3h.19v-.3h.19v-.31h.19v-.3h.38v.3h-.19v.31H3.6v.3h-.19v.3h-.19v.31h-.19V18h-.19zm-1.9-.31H.56v-.3H.37v-.3h.38v.3h.19zm.57-.3v.3h-.38v-.3h.19v-.3h.19v-.31h.38v.31H1.7v.3zm2.28.61H3.6v-.31h.19zm-3.23-.91H.18v-.31H0v-.3h.37v.3h.19zm.19-.92H.37v-.3h.19v-.31h.19v-.31h.19v-.3h.19v.3h.19v.31h.19v.31h.19v.29h.19v.31h-.38v-.3h-.19v-.3h-.19v-.31H.94v.31H.75zm1.9 0h-.19v.3h-.38v-.31h.19v-.29h.19v-.31h.19v-.31h.19v-.3h.19v.3h.19v.31h.19v.31h.19v.3h-.38v-.3h-.19v-.31h-.19v.31h-.19zm-.57-.61h-.19v-.3h.19zm-1.9 0H0v-.3h.18zm3.8 0h-.19v-.3h.19zm-2.85-1.52H.94v-.31h.19zm.19-.31H.75v-.3H.56v-.31H.37v-.31H1.7v.31h-.19v.31h-.19zm1.71.3h-.19v-.3h-.19v-.3h-.19v-.31h-.19v-.31H3.6v.31h-.19v.31h-.19v.3h-.19zm-.19-2.13h-.19v-.31h.19v-.31h.19v-.3h.19v.3h.19v.31h.19v.31h.19v.3h.19v.3h-.95v-.3h-.19zm-2.28-.31h.76v.31h-.19v.3H.94v.3H0v-.3h.18v-.3h.19v-.31zm0 0v-.3h.57v.3zm1.14.31h.57v-.31h-.19v-.3h.19v-.3h.19v-.31h.19v-.3h.19v-.31h-.38v.31h-.19v.3h-.19v.3h-.19v-.3H1.7v-.3h-.19v-.31h-.38v.31h.19v.3h.19v.31h.19v.3h.19v.3H1.7zm-.38.6h1.33v-.3h-.19v-.3h-.95v.3h-.19zm.76 4.58h.38v-.3h-.19v-.3H1.7v.3h.38zm-1.9-.61h.38v-.3H.18zm3.23 0h.38v-.3h-.38zM0 13.42h.18v-.3H0zm3.79 0h.19v-.3h-.19zm-1.9-3.36h.19v-.31h-.19zm0 3.35h.19v-.3h-.19zm-.95 3.06h.19v-.3H.94zm1.9 0h.19v-.3h-.19zm-.95-2.13h.19v.3h.57v-.3h-.38v-.31h-.38v-.3H1.7v-.31h-.19v.31h-.19v.3h-.19v.31h.19v.3h.57zm-.19-.31v.31h-.19v-.31zm-.19.91h.19v-.3h-.19zm.76 0h.19v-.3h-.19zm.19-.6h.38v-.31h-.19v-.31h-.19v-.3h-.19v.3h-.19v.31h.38zm.57 0h.19v.3h.57v-.3h-.38v-.31h-.38zm.57 0h.38v-.31h-.19v-.31H3.6v-.3h-.19v.3h-.19v.31h.38zm-.19.6h.19v-.3h-.19zM0 14.34h.18v.3h.57v-.3H.37v-.31H0zm.94 0H.56v-.31H.18v-.31h.19v-.3h.19v.3h.19v.31h.19zm-.38.6H.37v-.3h.19zm.38-2.44H.18v-.3h.76zm.95 0h-.76v-.3h.76zm.95 0h-.76v-.3h.76zm.95 0h-.76v-.3h.76zM2.27 8.54h-.19v.3h.19zm-.38 0H1.7v.3h.19zm-.95 2.44H.75v-.31h.19z'
            clipRule='evenodd'
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
        <clipPath id='Belarus_svg__a'>
          <rect width={24} height={18} fill='#fff' rx={2} />
        </clipPath>
        <clipPath id='Belarus_svg__b'>
          <path fill='#fff' d='M0 0h24v18H0z' />
        </clipPath>
      </defs>
    </svg>
  ),
);

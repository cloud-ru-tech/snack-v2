import { forwardRef, Ref, SVGProps } from 'react';

type FlagProps = SVGProps<SVGSVGElement> & {
  /** Размер флага в пикселях (выставляет width и height). */
  size?: number;
};

export const SenegalSVG = forwardRef<SVGSVGElement, FlagProps>(
  ({ size = 24, style, ...props }, ref: Ref<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 18'
      ref={ref}
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      {...props}
    >
      <g clipPath='url(#Senegal_svg__a)'>
        <path fill='#0B7226' fillRule='evenodd' d='M0 0h7.999v18H0z' clipRule='evenodd' />
        <path fill='#FF0' fillRule='evenodd' d='M7.999 0h7.999v18h-8z' clipRule='evenodd' />
        <path fill='#BC0000' fillRule='evenodd' d='M15.998 0H24v18h-8.002z' clipRule='evenodd' />
        <path
          fill='#0B7226'
          d='M12.825 8.205h2.693L13.395 9.84l.776 2.599-2.122-1.635-2.123 1.56.777-2.524L8.58 8.205h2.618l.85-2.674z'
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
        <clipPath id='Senegal_svg__a'>
          <rect width={24} height={18} fill='#fff' rx={2} />
        </clipPath>
      </defs>
    </svg>
  ),
);

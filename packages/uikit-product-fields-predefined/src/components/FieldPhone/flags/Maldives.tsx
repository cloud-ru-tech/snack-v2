import { forwardRef, Ref, SVGProps } from 'react';

type FlagProps = SVGProps<SVGSVGElement> & {
  /** Размер флага в пикселях (выставляет width и height). */
  size?: number;
};

export const MaldivesSVG = forwardRef<SVGSVGElement, FlagProps>(
  ({ size = 24, style, ...props }, ref: Ref<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 18'
      ref={ref}
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      {...props}
    >
      <g clipPath='url(#Maldives_svg__a)'>
        <path fill='#D21034' d='M0 0h24v18H0z' />
        <path fill='#007E3A' d='M4.5 4.5h15v9h-15z' />
        <path
          fill='#fff'
          fillRule='evenodd'
          d='M13.688 11.947q-.274.053-.563.053a3 3 0 1 1 .563-5.947 3 3 0 0 0 0 5.894'
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
        <clipPath id='Maldives_svg__a'>
          <rect width={24} height={18} fill='#fff' rx={2} />
        </clipPath>
      </defs>
    </svg>
  ),
);

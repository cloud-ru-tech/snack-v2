import { forwardRef, Ref, SVGProps } from 'react';

type FlagProps = SVGProps<SVGSVGElement> & {
  /** Размер флага в пикселях (выставляет width и height). */
  size?: number;
};

export const CameroonSVG = forwardRef<SVGSVGElement, FlagProps>(
  ({ size = 24, style, ...props }, ref: Ref<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 18'
      ref={ref}
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      {...props}
    >
      <g clipPath='url(#Cameroon_svg__a)'>
        <path fill='#007A5E' d='M0 0h7.999v18H0z' />
        <path fill='#CE1126' d='M7.999 0h8.003v18H7.999z' />
        <path fill='#FCD116' d='M16.002 0h7.999v18h-7.999z' />
        <path
          fill='#FCD116'
          fillRule='evenodd'
          d='m9.971 8.34 1.248.914-.473 1.472L12 9.822l1.254.904-.472-1.472 1.247-.913-1.546-.006L12 6.867l-.483 1.468z'
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
        <clipPath id='Cameroon_svg__a'>
          <rect width={24} height={18} fill='#fff' rx={2} />
        </clipPath>
      </defs>
    </svg>
  ),
);

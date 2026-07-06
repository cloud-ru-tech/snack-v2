import { forwardRef, Ref, SVGProps } from 'react';

type FlagProps = SVGProps<SVGSVGElement> & {
  /** Размер флага в пикселях (выставляет width и height). */
  size?: number;
};

export const SaoTomeAndPrincipeSVG = forwardRef<SVGSVGElement, FlagProps>(
  ({ size = 24, style, ...props }, ref: Ref<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 18'
      ref={ref}
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      {...props}
    >
      <g clipPath='url(#SaoTomeAndPrincipe_svg__a)'>
        <path fill='#12AD2B' d='M0 0h24v18H0z' />
        <path fill='#FFCE00' d='M0 5.141h24v7.722H0z' />
        <path fill='#D21034' d='M0 0v18l9-9' />
        <path
          fill='#000'
          fillRule='evenodd'
          d='m10.74 8.205 1.51 1.098-.576 1.777 1.511-1.098 1.511 1.098-.577-1.777 1.512-1.098h-1.869l-.577-1.776-.577 1.776zm8.498 0h-1.869l1.512 1.098-.578 1.777 1.512-1.098 1.511 1.098-.577-1.777 1.512-1.098h-1.869l-.577-1.776z'
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
        <clipPath id='SaoTomeAndPrincipe_svg__a'>
          <rect width={24} height={18} fill='#fff' rx={2} />
        </clipPath>
      </defs>
    </svg>
  ),
);

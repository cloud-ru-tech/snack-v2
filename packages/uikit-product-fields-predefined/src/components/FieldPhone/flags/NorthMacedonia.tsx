import { forwardRef, Ref, SVGProps } from 'react';

type FlagProps = SVGProps<SVGSVGElement> & {
  /** Размер флага в пикселях (выставляет width и height). */
  size?: number;
};

export const NorthMacedoniaSVG = forwardRef<SVGSVGElement, FlagProps>(
  ({ size = 24, style, ...props }, ref: Ref<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 18'
      ref={ref}
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      {...props}
    >
      <g clipPath='url(#NorthMacedonia_svg__a)'>
        <g clipPath='url(#NorthMacedonia_svg__b)'>
          <path fill='#D20000' d='M24 0H0v18h24z' />
          <path
            fill='#FFE600'
            fillRule='evenodd'
            d='M0 0h3.602l6.332 6.541a3.2 3.2 0 0 0-.504.532zm8.824 8.523L0 7.2v3.602l8.824-1.324a3.2 3.2 0 0 1 0-.954m.606 2.404L0 18h3.602l6.332-6.541a3.2 3.2 0 0 1-.504-.532m2.2 1.263L10.5 18h3l-1.13-5.81a3.3 3.3 0 0 1-.74 0m2.436-.731L20.399 18H24l-9.43-7.073a3.2 3.2 0 0 1-.504.532m1.11-1.982L24 10.8V7.199l-8.824 1.324a3.2 3.2 0 0 1 0 .954m-.606-2.404L24 0h-3.602l-6.331 6.541q.281.237.503.532m-2.2-1.263L13.5 0h-3l1.13 5.81a3.3 3.3 0 0 1 .74 0M9.43 9c0-1.42 1.15-2.57 2.57-2.57S14.57 7.58 14.57 9s-1.15 2.57-2.57 2.57S9.43 10.42 9.43 9'
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
        <clipPath id='NorthMacedonia_svg__a'>
          <rect width={24} height={18} fill='#fff' rx={2} />
        </clipPath>
        <clipPath id='NorthMacedonia_svg__b'>
          <path fill='#fff' d='M0 0h24v18H0z' />
        </clipPath>
      </defs>
    </svg>
  ),
);

import { forwardRef, Ref, SVGProps } from 'react';

type FlagProps = SVGProps<SVGSVGElement> & {
  /** Размер флага в пикселях (выставляет width и height). */
  size?: number;
};

export const TuvaluSVG = forwardRef<SVGSVGElement, FlagProps>(
  ({ size = 24, style, ...props }, ref: Ref<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 18'
      ref={ref}
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      {...props}
    >
      <g clipPath='url(#Tuvalu_svg__a)'>
        <path fill='#009FCA' d='M0 0h24v18H0z' />
        <path
          fill='#FFF40D'
          fillRule='evenodd'
          d='M17.829 2.926h1.038l-.836.57.319.927-.836-.574-.833.574.319-.927-.836-.57h1.031L17.514 2zm-2.595 7.38h1.035l-.836.57.318.927-.836-.574-.836.574.322-.927-.836-.57h1.027l.32-.926zm2.595-1.672h1.038l-.836.57.319.926-.836-.574-.833.574.319-.926-.836-.57h1.031l.319-.927zM6.672 13.989h1.035l-.84.566.323.922-.836-.57-.836.57.322-.922-.84-.574h1.035l.319-.922zM9.02 11.12H7.985l.836-.574-.319-.922.837.57.836-.57-.323.922.837.574H9.658l-.32.923zm3.049-4.219H11.03l.836-.57-.319-.926.837.574.836-.574-.322.926.836.57h-1.031l-.32.926zm2.561-.873h-1.035l.84-.574-.322-.923.836.57.836-.57-.322.923.84.574h-1.036l-.318.922zm-2.561 7.297H11.03l.836-.57-.311-.93.836.57.836-.57-.322.926.836.57H12.71l-.319.927zm-3.049.746H7.985l.836-.57-.319-.926.837.57.836-.57-.323.923.84.577h-1.03l-.32.926z'
          clipRule='evenodd'
        />
        <path fill='#012169' d='M6 5h12v9H6z' />
        <path
          fill='#fff'
          d='m7.406 5 4.575 3.394L16.538 5H18v1.162L13.5 9.52l4.5 3.337V14h-1.5L12 10.644 7.519 14H6v-1.125l4.481-3.338L6 6.2V5z'
        />
        <path
          fill='#C8102E'
          d='M13.95 10.269 18 13.25V14l-5.081-3.731zm-3.45.375.113.656-3.6 2.7H6zM18 5v.056l-4.669 3.525.038-.825L17.063 5zM6 5l4.481 3.3H9.356L6 5.787z'
        />
        <path fill='#fff' d='M10.519 5v9h3V5zM6 8v3h12V8z' />
        <path fill='#C8102E' d='M6 8.619v1.8h12v-1.8zM11.119 5v9h1.8V5z' />
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
        <clipPath id='Tuvalu_svg__a'>
          <rect width={24} height={18} fill='#fff' rx={2} />
        </clipPath>
      </defs>
    </svg>
  ),
);

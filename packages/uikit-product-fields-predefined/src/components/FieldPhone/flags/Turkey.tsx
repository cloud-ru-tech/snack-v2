import { forwardRef, Ref, SVGProps } from 'react';

type FlagProps = SVGProps<SVGSVGElement> & {
  /** Размер флага в пикселях (выставляет width и height). */
  size?: number;
};

export const TurkeySVG = forwardRef<SVGSVGElement, FlagProps>(
  ({ size = 24, style, ...props }, ref: Ref<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 18'
      ref={ref}
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      {...props}
    >
      <g fillRule='evenodd' clipPath='url(#Turkey_svg__a)' clipRule='evenodd'>
        <path fill='#E30A17' d='M0 0h24v18H0z' />
        <path
          fill='#fff'
          d='M14.556 6.88a3.68 3.68 0 0 0-2.725-1.195c-2.021 0-3.66 1.605-3.66 3.593s1.639 3.6 3.66 3.6c1.086 0 2.06-.465 2.73-1.203a4.59 4.59 0 0 1-3.873 2.102c-2.528 0-4.575-2.013-4.575-4.5s2.047-4.492 4.575-4.492a4.59 4.59 0 0 1 3.868 2.095M16.151 7.181l-.037 1.661-1.55.42 1.53.544-.037 1.527.994-1.193 1.508.525-.87-1.279 1.06-1.271-1.63.45-.968-1.388z'
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
        <clipPath id='Turkey_svg__a'>
          <rect width={24} height={18} fill='#fff' rx={2} />
        </clipPath>
      </defs>
    </svg>
  ),
);

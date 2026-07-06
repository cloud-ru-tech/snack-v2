import { forwardRef, Ref, SVGProps } from 'react';

type FlagProps = SVGProps<SVGSVGElement> & {
  /** Размер флага в пикселях (выставляет width и height). */
  size?: number;
};

export const SingaporeSVG = forwardRef<SVGSVGElement, FlagProps>(
  ({ size = 24, style, ...props }, ref: Ref<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 18'
      ref={ref}
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      {...props}
    >
      <g fillRule='evenodd' clipPath='url(#Singapore_svg__a)' clipRule='evenodd'>
        <path fill='#fff' d='M0 0h24v18H0z' />
        <path fill='#DF0000' d='M0 0h24v9H0z' />
        <path
          fill='#fff'
          d='M5.475 1.508a3.165 3.165 0 0 0 .03 6.195A3.225 3.225 0 0 1 1.508 5.49 3.225 3.225 0 0 1 3.72 1.515a3.1 3.1 0 0 1 1.759-.007z'
        />
        <path
          fill='#fff'
          d='m4.988 4.125.183.563-.487-.345-.48.352.176-.57-.48-.349.596-.007.188-.563.187.563h.593zm.656 1.95.187.566-.487-.345-.484.349.18-.566-.48-.353.596-.003.184-.567.188.563h.6zm2.194-.015.183.57-.487-.349-.48.349.176-.566-.48-.349.596-.008.188-.562.187.563h.593zm.652-1.935.184.566-.488-.345-.48.349.18-.566-.484-.353.6-.003.18-.567.188.563h.6zM6.754 2.839l.187.57-.487-.349-.484.353.18-.57-.48-.353.593-.004.187-.566.188.563h.6z'
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
        <clipPath id='Singapore_svg__a'>
          <rect width={24} height={18} fill='#fff' rx={2} />
        </clipPath>
      </defs>
    </svg>
  ),
);

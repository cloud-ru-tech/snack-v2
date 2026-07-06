import { forwardRef, Ref, SVGProps } from 'react';

type FlagProps = SVGProps<SVGSVGElement> & {
  /** Размер флага в пикселях (выставляет width и height). */
  size?: number;
};

export const MoroccoSVG = forwardRef<SVGSVGElement, FlagProps>(
  ({ size = 24, style, ...props }, ref: Ref<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 18'
      ref={ref}
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      {...props}
    >
      <g clipPath='url(#Morocco_svg__a)'>
        <path fill='#C1272D' d='M24 0H0v18h24z' />
        <path
          fill='#006233'
          fillRule='evenodd'
          d='m12 6.017.671 2.064h2.165l-1.752 1.271.669 2.057L12 10.14l-1.753 1.27.669-2.057-1.752-1.27h2.165zm-.814 2.503h-.67l.542.393zm.246.664.216-.664h.704l.216.664-.568.412zm-.143.439-.208.64.545-.396zm1.085.244.545.395-.208-.64zm.568-.954.542-.393h-.67zm-.732-.832h-.42l.21-.645z'
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
        <clipPath id='Morocco_svg__a'>
          <rect width={24} height={18} fill='#fff' rx={2} />
        </clipPath>
      </defs>
    </svg>
  ),
);

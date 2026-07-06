import { forwardRef, Ref, SVGProps } from 'react';

type FlagProps = SVGProps<SVGSVGElement> & {
  /** Размер флага в пикселях (выставляет width и height). */
  size?: number;
};

export const IsraelSVG = forwardRef<SVGSVGElement, FlagProps>(
  ({ size = 24, style, ...props }, ref: Ref<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 18'
      ref={ref}
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      {...props}
    >
      <g fillRule='evenodd' clipPath='url(#Israel_svg__a)' clipRule='evenodd'>
        <path fill='#fff' d='M24 18H0V0h24z' />
        <path
          fill='#0038B8'
          d='M24 4.037H0V1.668h24zm0 12.355H0v-2.369h24zM7.865 6.698l3.881 6.754 3.966-6.722-7.847-.028z'
        />
        <path fill='#fff' d='m11.017 11.178.736 1.252.755-1.245-1.495-.007z' />
        <path fill='#0038B8' d='m7.851 11.277 3.885-6.754 3.962 6.726z' />
        <path
          fill='#fff'
          d='m11.017 6.73.736-1.251.755 1.247-1.495.004zM9.473 9.532l-.765 1.27 1.445-.004-.68-1.27zm-.751-2.344 1.452.01-.698 1.28zm5.33 2.362.736 1.251-1.47-.017zm.722-2.362-1.452.01.698 1.28zm-4.029 0L9.745 9l1.014 1.773 1.861.042L13.75 9l-1.044-1.833-1.96.018z'
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
        <clipPath id='Israel_svg__a'>
          <rect width={24} height={18} fill='#fff' rx={2} />
        </clipPath>
      </defs>
    </svg>
  ),
);

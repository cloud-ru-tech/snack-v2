import { forwardRef, Ref, SVGProps } from 'react';

type FlagProps = SVGProps<SVGSVGElement> & {
  /** Размер флага в пикселях (выставляет width и height). */
  size?: number;
};

export const RwandaSVG = forwardRef<SVGSVGElement, FlagProps>(
  ({ size = 24, style, ...props }, ref: Ref<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 18'
      ref={ref}
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      {...props}
    >
      <g clipPath='url(#Rwanda_svg__a)'>
        <path fill='#20603D' d='M24 0H0v18h24z' />
        <path fill='#FAD201' d='M0 0h24v13.5H0z' />
        <path fill='#00A1DE' d='M0 0h24v9H0z' />
        <path
          fill='#E5BE01'
          fillRule='evenodd'
          d='m20.055 4.586 2.011.117-2.011.117 1.91.633-1.969-.406 1.68 1.105-1.797-.906a.903.903 0 0 0-.168-1.258l1.5-1.34-1.332 1.508 1.797-.902-1.68 1.105 1.969-.41zm-.344-.598.902-1.8-1.105 1.682q.11.046.203.118m-.203-.118.406-1.968-.633 1.907-.117-2.008-.117 2.008-.633-1.907.402 1.969a.9.9 0 0 1 .692 0m-.692 0-1.105-1.682.902 1.8-1.5-1.34 1.335 1.507a.9.9 0 0 1 .368-.284m-.368.285-1.8-.901 1.68 1.105-1.969-.41 1.91.637-2.007.117 2.008.117-1.91.633 1.968-.406-1.68 1.105 1.798-.904a.9.9 0 0 1 .002-1.093m-.001 1.094-1.334 1.505 1.5-1.336-.902 1.8 1.105-1.683-.402 1.969.633-1.91.117 2.011.117-2.011.633 1.91-.406-1.969 1.105 1.684-.902-1.801 1.5 1.336-1.332-1.508a.9.9 0 0 1-1.432.002m-.1-.546a.816.816 0 1 1 1.628-.002.816.816 0 0 1-1.628.002'
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
        <clipPath id='Rwanda_svg__a'>
          <rect width={24} height={18} fill='#fff' rx={2} />
        </clipPath>
      </defs>
    </svg>
  ),
);

import { forwardRef, Ref, SVGProps } from 'react';

type FlagProps = SVGProps<SVGSVGElement> & {
  /** Размер флага в пикселях (выставляет width и height). */
  size?: number;
};

export const BosniaAndHerzegovinaSVG = forwardRef<SVGSVGElement, FlagProps>(
  ({ size = 24, style, ...props }, ref: Ref<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 18'
      ref={ref}
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      {...props}
    >
      <g clipPath='url(#BosniaAndHerzegovina_svg__a)'>
        <path fill='#009' d='M24 0H0v17.988h24z' />
        <path fill='#FC0' fillRule='evenodd' d='m4.988 0 17.96 18V0z' clipRule='evenodd' />
        <path
          fill='#fff'
          fillRule='evenodd'
          d='m17.485 16.204.98.71-.367-1.155.985-.73h-1.227l-.379-1.167-.379 1.163h-1.23l.992.723-.379 1.167zm2.61 1.074 1.23.004-.958.706h-1.28l-.981-.714h1.23l.38-1.163zM1.113 0 .73 1.167l1.008-.71.976.718-.363-1.16L2.373 0zm15.722 12.789-.984.726.371 1.159-.984-.714-1.008.71.383-1.167-.992-.722 1.23.004.379-1.168.375 1.168zm-2.257-2.265-.985.727.364 1.159-.981-.715-1.004.711.379-1.167-.992-.719h1.226l.383-1.167.38 1.168zm-2.243-2.236-.984.726h.004l.371 1.155-.984-.714-1.008.714.383-1.171-.993-.718h1.231l.379-1.164.371 1.172zM10.075 6.03l-.985.726h.004l.364 1.16-.981-.715-1.004.71.38-1.166-.997-.723h1.227l.382-1.163.38 1.167zM7.833 3.783l-.981.73.363 1.16-.976-.72-1.008.711.387-1.167-1-.718h1.23l.383-1.167.375 1.17zm-2.25-2.249-.981.73.363 1.16-.976-.719-1.008.715.387-1.171-1-.719h1.23L3.981.363l.375 1.171z'
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
        <clipPath id='BosniaAndHerzegovina_svg__a'>
          <rect width={24} height={18} fill='#fff' rx={2} />
        </clipPath>
      </defs>
    </svg>
  ),
);

import { forwardRef, Ref, SVGProps } from 'react';

type FlagProps = SVGProps<SVGSVGElement> & {
  /** Размер флага в пикселях (выставляет width и height). */
  size?: number;
};

export const BarbadosSVG = forwardRef<SVGSVGElement, FlagProps>(
  ({ size = 24, style, ...props }, ref: Ref<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 18'
      ref={ref}
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      {...props}
    >
      <g clipPath='url(#Barbados_svg__a)'>
        <g clipPath='url(#Barbados_svg__b)'>
          <path fill='#00267F' d='M0 0h24v18H0z' />
          <path fill='#FFC726' d='M7.998 0H16v18H7.998z' />
          <path
            fill='#000'
            fillRule='evenodd'
            d='m11.99 5.086.002-.005v.012l.013.035c.257.698.52 1.413 1.078 1.967a2.3 2.3 0 0 0-.683-.105v2.981l.84.124c.03 0 .038-.049.038-.112.082-.927.3-1.707.555-2.513.006-.033.04-.096.077-.164.084-.154.184-.338.013-.286-.01 0-.05.014-.098.03-.102.036-.243.085-.21.041a3.2 3.2 0 0 1 1.74-.9c.057-.011.09.02.038.083-.84 1.297-1.549 2.831-1.541 4.65-.166 0-.448-.05-.73-.098-.28-.049-.559-.097-.722-.097v2.104h-.82v-2.104c-.164 0-.443.048-.723.097-.281.049-.564.098-.729.098.008-1.819-.701-3.353-1.541-4.65-.053-.064-.019-.094.037-.083.66.11 1.27.425 1.74.9.033.044-.107-.005-.21-.04a1 1 0 0 0-.097-.03c-.172-.053-.071.13.013.285.037.068.07.13.077.164.255.806.472 1.586.555 2.513 0 .063.007.112.037.112l.84-.124V6.99a2.3 2.3 0 0 0-.682.105c.557-.554.82-1.27 1.077-1.967q.008-.017.013-.035l.001-.012z'
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
        <clipPath id='Barbados_svg__a'>
          <rect width={24} height={18} fill='#fff' rx={2} />
        </clipPath>
        <clipPath id='Barbados_svg__b'>
          <path fill='#fff' d='M0 0h24v18H0z' />
        </clipPath>
      </defs>
    </svg>
  ),
);

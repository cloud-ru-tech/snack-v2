import { forwardRef, Ref, SVGProps } from 'react';

type FlagProps = SVGProps<SVGSVGElement> & {
  /** Размер флага в пикселях (выставляет width и height). */
  size?: number;
};

export const TransnistriaSVG = forwardRef<SVGSVGElement, FlagProps>(
  ({ size = 24, style, ...props }, ref: Ref<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 18'
      ref={ref}
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      {...props}
    >
      <g clipPath='url(#Transnistria_svg__a)'>
        <path fill='#DE0000' d='M0 0h24v18H0z' />
        <path fill='#068E6B' d='M0 6.75h24v4.5H0z' />
        <path
          fill='#FFD900'
          d='m4 .9-.18.622H3.24l.47.384-.18.622.47-.384.47.384-.18-.622.471-.384h-.581L3.999.9zm0 .324.115.398h.372l-.301.246.115.398L4 2.02l-.301.246.115-.398-.301-.246h.372zM2.716 4.157l.398.45.376-.42c.57.688 1.17 1.35 1.736 2.04a.202.202 0 0 0 .31.002.27.27 0 0 0 0-.347L3.71 3.942l.506-.563-.704-.11z'
        />
        <path
          fill='#FFD900'
          d='M4 2.7c.328.207.577.504.723.815.149.314.214.643.216.906.002.538-.39.975-.87.975a.83.83 0 0 1-.645-.322l-.088.083a.12.12 0 0 0-.147.042.17.17 0 0 0-.135.125.6.6 0 0 1-.323.32l-.004.001a.5.5 0 0 0-.185.138c-.11.124-.164.282-.133.394a.1.1 0 0 0-.005.03c0 .051.037.093.083.093a.1.1 0 0 0 .033-.008c.1.025.234-.037.34-.156a.6.6 0 0 0 .126-.225.6.6 0 0 1 .295-.362.18.18 0 0 0 .09-.124c.204.271.511.444.854.454.63.016 1.1-.504 1.123-1.252a2.1 2.1 0 0 0-.415-1.26A1.85 1.85 0 0 0 4 2.7'
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
        <clipPath id='Transnistria_svg__a'>
          <rect width={24} height={18} fill='#fff' rx={2} />
        </clipPath>
      </defs>
    </svg>
  ),
);

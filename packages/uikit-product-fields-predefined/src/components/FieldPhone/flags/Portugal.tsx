import { forwardRef, Ref, SVGProps } from 'react';

type FlagProps = SVGProps<SVGSVGElement> & {
  /** Размер флага в пикселях (выставляет width и height). */
  size?: number;
};

export const PortugalSVG = forwardRef<SVGSVGElement, FlagProps>(
  ({ size = 24, style, ...props }, ref: Ref<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 18'
      ref={ref}
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      {...props}
    >
      <g clipPath='url(#Portugal_svg__a)'>
        <g clipPath='url(#Portugal_svg__b)'>
          <path fill='red' d='M24 0H0v18h24z' />
          <path fill='#060' d='M9.8 0H0v18h9.8z' />
          <path
            fill='#FF0'
            fillRule='evenodd'
            d='M13.32 11.792C11.962 11.75 5.729 7.86 5.686 7.24l.344-.574c.618.898 6.991 4.683 7.617 4.549z'
            clipRule='evenodd'
          />
          <path
            fill='#FF0'
            fillRule='evenodd'
            d='M9.808 7.615c1.36-.01 3.04-.186 4.006-.57l-.209-.339c-.57.316-2.259.524-3.809.555-1.833-.017-3.127-.187-3.775-.622l-.197.36c1.192.504 2.413.611 3.984.616M5.34 9.255c.837.45 2.695.677 4.454.692 1.602.003 3.688-.247 4.469-.66l-.022-.451c-.244.381-2.48.747-4.464.732S5.95 9.247 5.336 8.85zM9.79 11.714c-1.924-.011-3.573-.524-3.922-.61l.254.399c.615.258 2.224.644 3.687.601 1.463-.042 2.741-.156 3.642-.594l.26-.412c-.614.289-2.703.613-3.92.616'
            clipRule='evenodd'
          />
          <path
            fill='#FF0'
            fillRule='evenodd'
            d='M13.797 8.9c.007 1.265-.641 2.402-1.163 2.903a4.2 4.2 0 0 1-2.86 1.186c-1.277.024-2.481-.809-2.804-1.174-.631-.715-1.145-1.623-1.162-2.846.078-1.382.62-2.345 1.407-3.005s1.834-.981 2.706-.958c1.006.026 2.181.52 2.993 1.5.532.641.763 1.338.883 2.393M9.784 4.563c2.452 0 4.468 1.995 4.468 4.441 0 2.447-2.016 4.442-4.468 4.442s-4.452-1.995-4.452-4.442 2-4.441 4.452-4.441'
            clipRule='evenodd'
          />
          <path fill='#FF0' fillRule='evenodd' d='M9.98 4.53h-.383v8.954h.384z' clipRule='evenodd' />
          <path
            fill='#FF0'
            fillRule='evenodd'
            d='M14.255 9.177v-.33l-.27-.252-1.53-.405-2.205-.225-2.655.135-1.89.45-.382.283v.33l.967-.433 2.295-.36h2.205l1.62.18 1.125.27zM12.012 10.857c-.82-.153-1.641-.176-2.215-.169-2.763.033-3.656.568-3.765.73l-.206-.337c.703-.51 2.208-.796 3.986-.767.923.015 1.72.077 2.39.207z'
            clipRule='evenodd'
          />
          <path
            fill='#FF0'
            fillRule='evenodd'
            d='m13.741 11.132-.332.515-.954-.847L9.98 9.135l-2.79-1.53-1.449-.495.31-.573.104-.057.9.225 2.97 1.53 1.71 1.08 1.44 1.035.585.675z'
            clipRule='evenodd'
          />
          <path
            fill='#fff'
            d='M7.127 9.495c0 .733.3 1.395.786 1.879a2.66 2.66 0 0 0 1.881.79c.737 0 1.406-.298 1.89-.782.485-.483.786-1.15.786-1.884V5.934l-5.344-.006z'
          />
          <path
            fill='red'
            d='M7.227 9.502c0 .7.29 1.338.755 1.8a2.56 2.56 0 0 0 4.371-1.798V6.049L7.23 6.047zm4.096-2.42v2.2l-.002.233a1.494 1.494 0 0 1-.45 1.077 1.515 1.515 0 0 1-2.154-.007 1.53 1.53 0 0 1-.451-1.078v-2.43z'
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
        <clipPath id='Portugal_svg__a'>
          <rect width={24} height={18} fill='#fff' rx={2} />
        </clipPath>
        <clipPath id='Portugal_svg__b'>
          <path fill='#fff' d='M0 0h24v18H0z' />
        </clipPath>
      </defs>
    </svg>
  ),
);

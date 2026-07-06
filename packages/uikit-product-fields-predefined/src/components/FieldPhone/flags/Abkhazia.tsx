import { forwardRef, Ref, SVGProps } from 'react';

type FlagProps = SVGProps<SVGSVGElement> & {
  /** Размер флага в пикселях (выставляет width и height). */
  size?: number;
};

export const AbkhaziaSVG = forwardRef<SVGSVGElement, FlagProps>(
  ({ size = 24, style, ...props }, ref: Ref<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 18'
      ref={ref}
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      {...props}
    >
      <g clipPath='url(#Abkhazia_svg__a)'>
        <g clipPath='url(#Abkhazia_svg__b)'>
          <path fill='#00993E' d='M24 0H0v18h24z' />
          <path fill='#fff' d='M24 2.572H0v2.571h24zM24 7.714H0v2.572h24zM24 12.858H0v2.571h24z' />
          <path fill='#C8312A' d='M13.68 0H0v7.714h13.68z' />
          <path
            fill='#fff'
            d='M5.781 4.31s-.117.049-.037.99c.066.774.342 1.027.342 1.027l.12.48 1.144.004s.021-.297.065-.39c.109-.231.54-.495.725-.893.198-.242.099-.738.498-1.216.198-.238-.232-.137-.232-.137-.236.157-.351.34-.41.469-.041.247-.226.453-.243.274 0 0-.067-.31-.269-.914-.02-.179-.106-.797-.125-1.27-.013-.306-.282-.325-.304-.013l-.032 1.236-.065-1.428c-.027-.404-.333-.344-.346-.009L6.6 4.006l-.056-1.44c-.083-.276-.3-.112-.304.186l-.037 1.401s-.047-.767-.058-1.091c-.01-.195-.238-.18-.26.098-.03.403-.08.732-.103 1.15M6.493 1.678 6.84.608l.348 1.07-.91-.66h1.125zM9.196 2.105l-.91-.661H9.41l-.91.66.347-1.069zM10.914 3.376l-.91-.66h1.125l-.91.66.347-1.07zM11.909 5.172l-.91-.661h1.125l-.91.661.347-1.07zM4.485 2.105l.91-.661H4.27l.91.66-.347-1.069zM2.766 3.376l.91-.66H2.551l.91.66-.347-1.07zM1.771 5.172l.91-.661H1.557l.91.661-.347-1.07z'
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
        <clipPath id='Abkhazia_svg__a'>
          <rect width={24} height={18} fill='#fff' rx={2} />
        </clipPath>
        <clipPath id='Abkhazia_svg__b'>
          <path fill='#fff' d='M0 0h24v18H0z' />
        </clipPath>
      </defs>
    </svg>
  ),
);

// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const CertificatePlainSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-certificate-plain';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='m3.25 11.97.01 7.73h16.48l.01-7.73.01-7.73H3.24zm14.99.01v6.22H4.76V5.76h13.48zM7.498 8.291c-.011.029-.015.366-.009.75l.011.699 4.03.01 4.03.01V8.24h-4.021c-3.239 0-4.025.01-4.041.051m0 3c-.011.029-.015.366-.009.75l.011.699h8v-1.48l-3.991-.01c-3.229-.008-3.995-.001-4.011.041'
      />
    </svg>
  ).props.children;
  const style = isCustomSize
    ? {
        ...(props.style || {}),
        width: sizePx,
        height: sizePx,
      }
    : props.style;
  return (
    <svg
      ref={ref}
      xmlns='http://www.w3.org/2000/svg'
      width={sizePx}
      height={sizePx}
      fill='currentColor'
      viewBox='0 0 24 24'
      data-test-id={'icon' + testId}
      style={style}
      {...props}
    >
      {children}
    </svg>
  );
});
export default CertificatePlainSVG;

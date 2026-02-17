// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const CertificateStarSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-certificate-star';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M3.24 11.961c0 6.142.01 7.725.05 7.737.027.009 1.774.025 3.88.036l3.83.021V18.24H8.81c-1.205 0-2.608-.012-3.12-.026l-.93-.027V5.76h13.48V12h1.52V4.24H3.24zm4.258-3.67c-.011.029-.015.366-.009.75l.011.699 4.03.01 4.03.01V8.24h-4.021c-3.239 0-4.025.01-4.041.051m0 3c-.011.029-.015.366-.009.75l.011.699h8v-1.48l-3.991-.01c-3.229-.008-3.995-.001-4.011.041m8.511 2.303-.931 1.51-1.749.393c-.962.216-1.761.404-1.775.418-.014.014.512.628 1.168 1.365l1.194 1.34-.019.16c-.047.399-.299 3.352-.287 3.364.008.007.751-.292 1.652-.665.901-.373 1.662-.679 1.691-.679.029 0 .793.306 1.697.68.904.374 1.648.676 1.653.67.006-.005-.06-.801-.146-1.767-.132-1.474-.148-1.767-.104-1.82l1.18-1.332c.62-.697 1.127-1.283 1.127-1.3 0-.018-.794-.212-1.765-.432l-1.766-.399-.905-1.469a66.522 66.522 0 0 0-.945-1.508c-.026-.026-.358.478-.97 1.471m1.42 2.098.449.733.828.187c.455.103.836.197.847.207.01.011-.109.164-.267.34l-.566.635-.28.314.077.856c.042.471.074.858.07.86a27.8 27.8 0 0 1-.821-.332l-.814-.337-.806.336c-.443.184-.811.325-.816.311-.006-.013.023-.401.064-.862l.075-.838-.482-.541-.576-.645-.094-.103.857-.194.857-.194.45-.732c.248-.403.461-.733.475-.733.013 0 .226.33.473.732'
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
export default CertificateStarSVG;

// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const RouterSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-router';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M11.34 3.28a8.699 8.699 0 0 0-5.521 2.54c-1.344 1.343-2.192 3.027-2.485 4.94-.096.63-.096 1.85 0 2.48.398 2.594 1.87 4.839 4.07 6.205 1.518.943 3.456 1.42 5.206 1.282 2.156-.17 4.069-1.044 5.571-2.546 1.502-1.502 2.376-3.415 2.546-5.571.214-2.714-.976-5.533-3.073-7.281-1.795-1.495-4.009-2.214-6.314-2.049m1.892 1.576a7.288 7.288 0 0 1 2.326.838c1.982 1.135 3.337 3.13 3.622 5.336l.028.21H16.76V9.18l-1.41 1.41L13.94 12l1.41 1.41 1.41 1.41v-2.06h2.45l-.027.21c-.201 1.543-.945 3.029-2.085 4.166-1.026 1.023-2.274 1.687-3.738 1.989-.404.084-.569.095-1.36.095-.791 0-.956-.011-1.36-.095-1.461-.301-2.72-.97-3.731-1.981-.928-.928-1.61-2.095-1.909-3.264-.09-.353-.2-.928-.2-1.05 0-.065.085-.07 1.22-.07h1.22v2.06l1.41-1.41L10.06 12l-1.41-1.41-1.41-1.41v2.06H6.02c-1.135 0-1.22-.005-1.22-.07 0-.287.233-1.252.418-1.731a7.388 7.388 0 0 1 4.221-4.221c.522-.201 1.029-.32 1.861-.435.266-.037 1.615.014 1.932.073M10.58 7.36l-1.4 1.4h2.06v6.48H9.18l1.41 1.41L12 18.06l1.41-1.41 1.41-1.41h-2.06V8.76h2.06l-1.4-1.4c-.77-.77-1.409-1.4-1.42-1.4-.011 0-.65.63-1.42 1.4'
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
export default RouterSVG;

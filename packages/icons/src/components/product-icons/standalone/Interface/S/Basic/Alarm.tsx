// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const AlarmSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-alarm';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M11.34 3.281A8.68 8.68 0 0 0 5.819 5.82c-1.344 1.343-2.192 3.027-2.485 4.94-.096.63-.096 1.85 0 2.48.398 2.594 1.87 4.839 4.07 6.205 1.518.943 3.456 1.42 5.206 1.282 2.156-.17 4.069-1.044 5.571-2.546s2.376-3.415 2.546-5.571c.214-2.714-.976-5.533-3.073-7.281-1.795-1.495-4.014-2.215-6.314-2.048m1.892 1.575a7.25 7.25 0 0 1 3.883 2.029c1.088 1.088 1.776 2.428 2.052 3.995.032.183.052.62.052 1.12s-.02.937-.052 1.12c-.275 1.564-.96 2.9-2.047 3.992-1.037 1.042-2.281 1.708-3.76 2.013-.404.084-.569.095-1.36.095s-.956-.011-1.36-.095c-1.461-.301-2.72-.97-3.731-1.981-1.122-1.122-1.79-2.418-2.075-4.024-.071-.4-.071-1.84 0-2.24a9 9 0 0 1 .384-1.441 7.39 7.39 0 0 1 4.221-4.221c.522-.201 1.029-.32 1.861-.435.266-.037 1.615.014 1.932.073M11.25 10.29l.01 2.85h1.48l.01-2.85.011-2.85h-1.522zm-.01 5.43v.84h1.52v-1.68h-1.52z'
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
export default AlarmSVG;

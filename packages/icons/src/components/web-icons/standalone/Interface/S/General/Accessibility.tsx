// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const AccessibilitySVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-accessibility';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path d='M11.34 3.281A8.681 8.681 0 0 0 5.819 5.82c-1.344 1.343-2.192 3.027-2.485 4.94-.096.63-.096 1.85 0 2.48.398 2.594 1.87 4.839 4.07 6.205 1.518.943 3.456 1.42 5.206 1.282 2.156-.17 4.069-1.044 5.571-2.546 1.502-1.502 2.376-3.415 2.546-5.571.214-2.714-.976-5.533-3.073-7.281-1.795-1.495-4.014-2.215-6.314-2.048m1.892 1.575a7.25 7.25 0 0 1 3.883 2.029c1.088 1.088 1.776 2.428 2.052 3.995.032.183.052.62.052 1.12 0 .5-.02.937-.052 1.12-.275 1.564-.96 2.9-2.047 3.992-1.037 1.042-2.281 1.708-3.76 2.013-.404.084-.569.095-1.36.095-.791 0-.956-.011-1.36-.095-1.461-.301-2.72-.97-3.731-1.981-1.122-1.122-1.79-2.418-2.075-4.024-.071-.4-.071-1.84 0-2.24a8.832 8.832 0 0 1 .384-1.441 7.385 7.385 0 0 1 4.221-4.221c.522-.201 1.029-.32 1.861-.435.266-.037 1.615.014 1.932.073m-1.476 1.945c-.354.059-.687.311-.869.656-.092.176-.106.25-.106.563 0 .313.014.387.106.563a1.263 1.263 0 0 0 1.685.549c.193-.097.43-.338.541-.549.092-.176.106-.25.106-.563 0-.313-.014-.387-.106-.563a1.266 1.266 0 0 0-1.357-.656m-4.258 3.49c-.011.029-.015.366-.009.75l.011.699 1.87.01 1.87.011v1.419L9.6 14.82l-1.64 1.641.54.539.54.539 1.48-1.479L12 14.58l1.48 1.48 1.48 1.479.54-.539.54-.539-1.64-1.641-1.64-1.64v-1.419l1.87-.011 1.87-.01v-1.48l-4.491-.01c-3.637-.008-4.495-.001-4.511.041' />
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
export default AccessibilitySVG;

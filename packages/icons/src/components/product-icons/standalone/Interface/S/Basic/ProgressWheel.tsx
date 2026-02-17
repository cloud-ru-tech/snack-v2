// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const ProgressWheelSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-progress-wheel';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M11.34 3.28a8.699 8.699 0 0 0-5.521 2.54c-1.344 1.343-2.192 3.027-2.485 4.94-.096.63-.096 1.85 0 2.48.398 2.594 1.87 4.839 4.07 6.205 1.518.943 3.456 1.42 5.206 1.282 2.156-.17 4.069-1.044 5.571-2.546 1.502-1.502 2.376-3.415 2.546-5.571.214-2.714-.976-5.533-3.073-7.281-1.795-1.495-4.009-2.214-6.314-2.049m-.1 5.27v3.75l2.665 2.665 2.665 2.665-.295.217a7.39 7.39 0 0 1-2.915 1.278c-.404.084-.569.095-1.36.095-.791 0-.956-.011-1.36-.095-1.461-.301-2.72-.97-3.731-1.981-1.122-1.122-1.79-2.418-2.075-4.024-.071-.4-.071-1.84 0-2.24a8.832 8.832 0 0 1 .384-1.441 7.388 7.388 0 0 1 4.221-4.221c.487-.188 1.356-.401 1.691-.414l.11-.004zm2.234-3.645a7.259 7.259 0 0 1 3.667 2.004c1.068 1.077 1.753 2.42 2.026 3.971.032.183.052.62.052 1.12 0 .877-.029 1.122-.221 1.873a7.33 7.33 0 0 1-1.136 2.374l-.233.322-2.434-2.434L12.76 11.7V4.79l.21.027c.115.015.342.055.504.088'
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
export default ProgressWheelSVG;

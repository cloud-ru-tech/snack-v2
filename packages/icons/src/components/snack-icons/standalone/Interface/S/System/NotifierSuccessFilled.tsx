// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const NotifierSuccessFilledSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-notifier-success-filled';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path d='M11.34 3.281A8.681 8.681 0 0 0 5.819 5.82c-1.344 1.343-2.192 3.027-2.485 4.94-.096.63-.096 1.85 0 2.48.398 2.594 1.87 4.839 4.07 6.205 1.518.943 3.456 1.42 5.206 1.282 2.156-.17 4.069-1.044 5.571-2.546 1.502-1.502 2.376-3.415 2.546-5.571.214-2.714-.976-5.533-3.073-7.281-1.795-1.495-4.014-2.215-6.314-2.048M16.863 8.5c.417.44.78.829.808.865.044.057-.408.511-3.556 3.574l-3.607 3.508-2.214-2.213c-1.218-1.218-2.209-2.228-2.203-2.246.006-.018.388-.427.85-.91l.839-.877 1.34 1.339c.737.737 1.351 1.34 1.364 1.34.014 0 1.255-1.196 2.76-2.658 2.534-2.461 2.741-2.652 2.799-2.59z' />
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
export default NotifierSuccessFilledSVG;

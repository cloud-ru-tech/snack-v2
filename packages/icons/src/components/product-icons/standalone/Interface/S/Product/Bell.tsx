// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const BellSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-bell';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M7.47 4.47 6.24 5.7v7.061L4.38 15.24a196.493 196.493 0 0 0-1.86 2.5c0 .011 4.266.02 9.48.02s9.48-.009 9.48-.02c0-.012-.837-1.136-1.86-2.5l-1.86-2.479V5.7l-1.23-1.23-1.23-1.23H8.7zm8 1.06.77.769v6.942l1.118 1.489 1.117 1.49-3.237.01c-1.781.006-4.695.006-6.476 0l-3.237-.01 1.117-1.49 1.118-1.489v-6.94l.77-.771.769-.77h5.4zM11 20v.76h2v-1.52h-2z'
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
export default BellSVG;

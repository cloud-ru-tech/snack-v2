// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const ShieldArrowsSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-shield-arrows';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M3.251 9.91c.012 5.141.02 5.695.08 5.939.163.653.482 1.282.895 1.763.503.585.534.603 4.304 2.491L12 21.841l3.47-1.738c3.77-1.888 3.801-1.906 4.304-2.491.413-.481.732-1.11.895-1.763.06-.244.068-.798.08-5.939l.013-5.67H3.238zm7.989-.41v3.74H8.76v-2.06l-1.41 1.41L5.94 14l1.41 1.41 1.41 1.41v-2.06h2.48v2.5c0 1.375-.009 2.5-.021 2.5-.011 0-1.231-.605-2.71-1.345L5.82 17.069l-.321-.324c-.368-.371-.543-.671-.66-1.129-.077-.299-.079-.46-.079-5.082V5.76h6.48zm8 1.034c0 4.622-.002 4.783-.079 5.082-.117.458-.292.758-.66 1.129l-.321.324-2.689 1.346c-1.479.74-2.699 1.345-2.71 1.345s-.021-2.025-.021-4.5v-4.5h2.48v2.06l1.41-1.41L18.06 10l-1.41-1.41-1.41-1.41v2.06h-2.48V5.76h6.48z'
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
export default ShieldArrowsSVG;

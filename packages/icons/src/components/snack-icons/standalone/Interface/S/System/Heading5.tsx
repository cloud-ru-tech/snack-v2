// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const Heading5SVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-heading5';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M5.24 12v7h1.52v-6.24h6.48V19h1.52V5h-1.52v6.24H6.76V5H5.24zm12.461.284c-.131.02-.338.084-.46.143-.262.127-.674.524-.798.768-.182.356-.253 1.037-.164 1.578a1.77 1.77 0 0 0 1.144 1.373c.246.089.313.094 1.201.094h.94l.098.098c.086.086.098.134.098.383 0 .273-.042.426-.136.488-.024.017-.624.03-1.334.03L17 17.24v1.52h1.27c.698 0 1.375-.018 1.503-.039a1.77 1.77 0 0 0 1.373-1.144c.082-.227.094-.332.094-.809-.001-.572-.037-.768-.2-1.088a2 2 0 0 0-.632-.669c-.364-.214-.443-.226-1.521-.249-1.201-.026-1.127.008-1.127-.523 0-.284.013-.358.073-.412.063-.058.232-.067 1.37-.076l1.297-.011v-1.48l-1.28-.005c-.704-.003-1.388.01-1.519.029'
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
export default Heading5SVG;

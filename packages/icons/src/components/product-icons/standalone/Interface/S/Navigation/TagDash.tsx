// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const TagDashSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-tag-dash';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M7.07 7.87 2.44 12.5l4.53 4.53 4.53 4.53 4.63-4.63 4.63-4.63V3.24H11.7zm12.17.36v3.47l-3.87 3.87-3.87 3.87-3.47-3.47-3.47-3.47 3.87-3.87 3.87-3.87h6.94zm-2.963-1.948c-.776.126-1.241 1.005-.91 1.721a1.24 1.24 0 0 0 2.266 0c.08-.172.104-.287.104-.503 0-.775-.684-1.345-1.46-1.218m.385 1.056c.054.054.098.127.098.162 0 .082-.178.26-.26.26-.082 0-.26-.178-.26-.26 0-.082.178-.26.26-.26.035 0 .108.044.162.098M8 12v.76h8v-1.52H8z'
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
export default TagDashSVG;

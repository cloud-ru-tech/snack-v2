// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const DotSmallSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-dot-small';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M11.617 9.283c-.585.069-1.098.328-1.552.781a2.7 2.7 0 0 0-.693 1.116c-.091.277-.105.387-.105.82s.014.543.105.82c.146.44.357.781.692 1.116s.676.546 1.116.692c.277.091.387.105.82.105s.543-.014.82-.105c.44-.146.781-.357 1.116-.692s.546-.676.692-1.116c.091-.277.105-.387.105-.82s-.014-.543-.105-.82c-.425-1.294-1.642-2.06-3.011-1.897'
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
export default DotSmallSVG;

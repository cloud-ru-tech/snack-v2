// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const SpineSwitchSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-spine-switch';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M3.24 12v8.76h17.52V3.24H3.24zm16 0v7.24H4.76V4.76h14.48zm-13-3.74c0 1.111.013 2.02.03 2.02.016 0 .358-.328.76-.73l.73-.73 1.59 1.59L10.94 12l-1.59 1.59-1.59 1.59-.73-.73c-.402-.402-.744-.73-.76-.73s-.03.909-.03 2.02v2.02h2.02c1.111 0 2.02-.013 2.02-.03 0-.016-.328-.358-.73-.76l-.73-.73 1.59-1.59L12 13.06l1.59 1.59 1.59 1.59-.73.73c-.402.402-.73.744-.73.76s.909.03 2.02.03h2.02v-2.02c0-1.111-.013-2.02-.03-2.02-.016 0-.358.328-.76.73l-.73.73-1.59-1.59L13.06 12l1.59-1.59 1.59-1.59.73.73c.402.402.744.73.76.73s.03-.909.03-2.02V6.24h-2.02c-1.111 0-2.02.013-2.02.03 0 .016.328.358.73.76l.73.73-1.59 1.59L12 10.94l-1.59-1.59-1.59-1.59.73-.73c.402-.402.73-.744.73-.76s-.909-.03-2.02-.03H6.24z'
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
export default SpineSwitchSVG;

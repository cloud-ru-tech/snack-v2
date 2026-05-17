// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const SoundOffSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-sound-off';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M10.224 5.559 7.708 7.76H4.24v8.48h3.468l2.516 2.201 2.516 2.201.01-4.321c.006-2.377.006-6.265 0-8.642l-.01-4.321zm1.006 9.102-.01 2.661-1.46-1.28-1.46-1.279-1.27-.002-1.27-.001V9.24l1.27-.001 1.27-.002 1.46-1.279 1.46-1.28.01 2.661c.006 1.464.006 3.858 0 5.322M14.98 10l-.519.52.739.74.739.74-.729.73-.73.731.53.529.529.53.731-.73.73-.729.73.729.731.73.529-.53.53-.529-.73-.731-.729-.73.739-.74.739-.74-.529-.53-.53-.529-.74.739-.74.739-.73-.729c-.402-.402-.74-.73-.751-.73s-.254.234-.539.52'
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
export default SoundOffSVG;

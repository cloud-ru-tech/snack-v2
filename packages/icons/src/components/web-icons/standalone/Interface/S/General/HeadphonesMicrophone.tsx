// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const HeadphonesMicrophoneSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-headphones-microphone';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M11.88 2.279C9.732 2.43 7.684 3.431 6.27 5.02a7.917 7.917 0 0 0-1.988 4.56c-.026.269-.042 1.953-.042 4.33v3.89l2.71-.023c1.491-.013 2.733-.031 2.76-.039.039-.012.05-.699.05-3.257V11.24h-4l.001-.69c.001-.741.064-1.34.195-1.853C6.542 6.4 8.45 4.544 10.82 3.965c.623-.152.913-.184 1.68-.184.767 0 1.057.032 1.68.184 1.971.481 3.648 1.853 4.473 3.657.434.95.587 1.716.587 2.947v.671h-4v5.508l-1.39 1.746-1.39 1.746h-1.82v1.52l1.27-.002 1.27-.002 1.58-2 1.58-2 1.82.012 1.82.012.012-.37.011-.37h.761l-.014-3.79c-.016-4.135-.009-3.997-.257-4.95-.98-3.765-4.609-6.302-8.613-6.021M8.24 14.52v1.76H5.76v-3.52h2.48zm11 0v1.76h-2.48v-3.52h2.48z'
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
export default HeadphonesMicrophoneSVG;

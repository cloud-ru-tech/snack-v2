// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const EnvelopeOpenSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-envelope-open';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M7.771 4.992c-2.292 1.577-4.169 2.884-4.17 2.903 0 .019.08.148.179.287s.18.272.18.295c0 .027-.131.043-.36.043h-.36v12.24h17.52V8.52h-.36c-.229 0-.36-.016-.36-.043 0-.023.081-.156.18-.295s.179-.268.179-.287c-.003-.049-8.308-5.753-8.391-5.763-.038-.005-1.944 1.282-4.237 2.86m7.559 1.209c1.798 1.237 3.27 2.261 3.269 2.274-.001.041-6.526 4.1-6.595 4.103-.08.003-6.606-4.066-6.592-4.111.017-.055 6.566-4.545 6.608-4.53a373 373 0 0 1 3.31 2.264m-9.044 4.613c.822.514 1.494.953 1.494.977 0 .038-2.728 2.999-2.935 3.185l-.085.076v-2.586c0-1.422.007-2.586.016-2.586s.689.42 1.51.934m12.954 1.667v2.601l-1.51-1.624c-.831-.893-1.51-1.643-1.51-1.667 0-.038 2.916-1.899 2.99-1.907.017-.002.03 1.166.03 2.597m-8.654 1.02c.755.472 1.392.859 1.414.859s.659-.387 1.414-.859a54 54 0 0 1 1.43-.877c.035-.011.88.871 2.226 2.321l2.17 2.339v1.956H4.76v-1.958l2.17-2.338c1.347-1.451 2.191-2.331 2.226-2.32.031.01.674.405 1.43.877'
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
export default EnvelopeOpenSVG;

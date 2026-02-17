// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const TelephoneSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-telephone';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M5.083 4.416c-.801.801-1.48 1.5-1.509 1.555-.21.402-.36 1.409-.317 2.129.122 2.033 1.031 4.181 2.639 6.24 1.361 1.742 3.443 3.653 5.149 4.729 2.456 1.547 4.78 2.043 6.613 1.412.226-.078.311-.155 1.8-1.631.859-.853 1.562-1.57 1.562-1.594 0-.024-1.085-1.12-2.411-2.435l-2.411-2.391-1.08 1.067-1.08 1.068-2.3-2.273-2.3-2.272 1.087-1.06 1.087-1.06-2.507-2.46a238.236 238.236 0 0 0-2.536-2.47c-.016-.005-.685.645-1.486 1.446m2.931 2.052a99.831 99.831 0 0 1 1.417 1.413c.006.014-.468.502-1.053 1.084l-1.064 1.058 2.894 2.858c1.591 1.573 3.105 3.065 3.364 3.318l.47.458.589-.578 1.079-1.059.49-.479 1.36 1.359 1.36 1.359-.91.912c-1.098 1.1-.997 1.048-2.03 1.049-.787 0-1.058-.047-1.9-.328-1.322-.441-2.788-1.337-4.2-2.569-2.198-1.917-3.756-3.913-4.512-5.783-.502-1.242-.703-2.439-.569-3.4l.05-.36.844-.85c.465-.467.861-.85.88-.85.02 0 .668.624 1.441 1.388'
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
export default TelephoneSVG;

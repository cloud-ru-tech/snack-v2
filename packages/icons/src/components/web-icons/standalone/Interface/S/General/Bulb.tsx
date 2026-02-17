// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const BulbSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-bulb';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M11.354 2.284c-2.66.205-5.107 1.921-6.265 4.394a7.935 7.935 0 0 0-.567 4.956c.268 1.295.901 2.538 1.828 3.59l.279.316.129.6c.185.864.343 1.485.531 2.09l.164.53h9.14l.082-.35c.303-1.3.615-2.577.666-2.73.037-.111.161-.294.326-.479.985-1.107 1.593-2.368 1.88-3.901.083-.441.115-1.67.057-2.164-.358-3.041-2.372-5.543-5.224-6.492a7.143 7.143 0 0 0-1.82-.363c-.589-.045-.587-.045-1.206.003m1.866 1.597c.558.118.923.246 1.48.521 1.783.882 3.034 2.589 3.362 4.59.118.72.072 1.858-.102 2.534-.273 1.06-.723 1.882-1.552 2.832-.374.428-.477.691-.788 2.002l-.204.86-3.424.01c-3.208.01-3.425.006-3.45-.058a26.675 26.675 0 0 1-.225-.951c-.299-1.328-.344-1.441-.755-1.901-.903-1.012-1.42-2.065-1.624-3.312-.084-.512-.084-1.504 0-2.016a6.228 6.228 0 0 1 1.77-3.448A6.115 6.115 0 0 1 11.24 3.8c.436-.06 1.525-.015 1.98.081M12 6.489c0 .838-.021.789.341.79.405.002 1.031.263 1.431.597.536.448.947 1.219.949 1.783.001.362-.048.341.79.341h.741l-.024-.35a4.122 4.122 0 0 0-1.206-2.656 4.246 4.246 0 0 0-2.672-1.221L12 5.748zM8 21v.76h8v-1.52H8z'
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
export default BulbSVG;

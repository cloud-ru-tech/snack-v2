// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const StarFilledSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-star-filled';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path d='M10.267 5.415 8.555 8.267l-3.168.732c-1.742.403-3.201.745-3.242.759-.062.023.284.441 2.056 2.485 1.172 1.351 2.153 2.484 2.18 2.517.039.048-.009.724-.24 3.36a205 205 0 0 0-.277 3.315c.007.008 1.377-.564 3.046-1.27S11.969 18.88 12 18.88s1.422.578 3.09 1.285c1.669.706 3.039 1.278 3.046 1.27s-.118-1.5-.277-3.315c-.231-2.636-.279-3.312-.24-3.36.027-.033 1.008-1.166 2.18-2.517 1.772-2.044 2.118-2.462 2.056-2.485-.041-.014-1.5-.356-3.242-.759l-3.168-.732-1.712-2.852C12.791 3.847 12.011 2.563 12 2.563s-.791 1.284-1.733 2.852' />
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
export default StarFilledSVG;

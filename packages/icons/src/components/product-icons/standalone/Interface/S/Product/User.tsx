// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const UserSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-user';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M11.542 3.285a4.4 4.4 0 0 0-1.929.701c-.795.527-1.449 1.452-1.721 2.434-.101.365-.111.46-.111 1.08 0 .617.01.716.109 1.071.376 1.351 1.291 2.377 2.57 2.881.538.212.912.28 1.54.28.751 0 1.249-.116 1.915-.446a4.28 4.28 0 0 0 2.027-2.211c.229-.582.275-.846.275-1.575s-.046-.993-.275-1.575c-.292-.743-.907-1.51-1.554-1.939a5.5 5.5 0 0 0-1.268-.581c-.24-.066-1.115-.182-1.2-.16-.011.003-.181.021-.378.04M12.62 4.82c.926.192 1.792 1.033 2.042 1.98.091.35.091 1.05 0 1.4-.122.461-.361.862-.741 1.241-.557.557-1.139.799-1.921.799s-1.364-.242-1.921-.799C9.504 8.867 9.27 8.306 9.27 7.5s.234-1.367.809-1.941c.387-.387.826-.64 1.281-.737a3.6 3.6 0 0 1 1.26-.002M4.544 16.87c-1.157 1.447-2.104 2.642-2.104 2.656s.258.232.572.485l.573.459 1.877-2.353 1.878-2.353h9.32l1.878 2.353 1.877 2.353.573-.459c.314-.253.572-.471.572-.485s-.947-1.209-2.104-2.656l-2.104-2.63H6.648z'
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
export default UserSVG;

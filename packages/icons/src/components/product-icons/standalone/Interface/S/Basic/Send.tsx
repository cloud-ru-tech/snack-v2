// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const SendSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-send';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M11.626 6.14C6.591 7.909 2.466 9.361 2.46 9.368c-.007.007 1.422 1.101 3.174 2.432l3.186 2.421.01 3.129c.006 1.722.024 3.13.04 3.129.017-.001.892-.739 1.945-1.641l1.915-1.64.125.094 5.696 4.32c.028.022.058.032.066.024.013-.014 2.265-18.602 2.263-18.686 0-.016-.022-.029-.05-.027-.027.001-4.17 1.449-9.204 3.217m1.854 3.32c-1.991 1.991-3.634 3.62-3.651 3.62-.022 0-3.992-2.994-4.226-3.186-.009-.008-.007-.023.005-.035.031-.031 11.363-4.012 11.432-4.016.033-.001-1.569 1.626-3.56 3.617m4.74 3.012a841.058 841.058 0 0 1-.785 6.386c-.008.008-1.451-1.077-3.206-2.411l-3.191-2.425 3.969-3.969a713.784 713.784 0 0 1 3.976-3.961c.004.004-.34 2.875-.763 6.38m-7.25 3.385c.281.214.51.401.51.417 0 .015-.202.198-.449.407l-.56.473-.111.093v-.928c0-.737.01-.921.05-.89z'
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
export default SendSVG;

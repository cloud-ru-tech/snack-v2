// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FolderUploadFilledSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-folder-upload-filled';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path d='M4.24 12v6.76h15.52V6.96h-7.545l-1.318-.86-1.317-.86H4.24zm9.14-1.273a706.33 706.33 0 0 1 1.75 1.816l.389.408-.543.512-.543.512-.835-.857-.834-.858-.002 1.69-.002 1.69h-1.52l-.002-1.69-.002-1.69-.834.858-.835.857-.543-.512-.543-.512.369-.389c.941-.988 3.13-3.242 3.149-3.242.012 0 .634.633 1.381 1.407' />
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
export default FolderUploadFilledSVG;

// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FileUploadFilledSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-file-upload-filled';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path d='M5.24 12v7.76h13.52V8.199L16.816 6.22l-1.944-1.98H5.24zm8.52-1.3 1.74 1.74-.53.53-.53.529-.84-.839-.84-.839V16.24h-1.52V11.821l-.84.839-.84.839-.53-.529-.53-.53 1.74-1.74A110.06 110.06 0 0 1 12 8.96c.011 0 .803.783 1.76 1.74' />
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
export default FileUploadFilledSVG;

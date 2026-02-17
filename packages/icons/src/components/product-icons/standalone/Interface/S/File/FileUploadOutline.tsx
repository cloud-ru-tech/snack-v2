// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FileUploadOutlineSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-file-upload-outline';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M5.24 12v7.76h13.52V8.199L16.816 6.22l-1.944-1.98H5.24zm10.513-4.724 1.487 1.517v9.447H6.76V5.76h7.506zM9.72 10.22l-1.74 1.74.53.53.53.53 1.1-1.1 1.1-1.099V16h1.52v-5.179l1.1 1.099 1.1 1.1.53-.53.53-.53-1.75-1.749-1.749-1.75-.26.258-.261.259-.251-.249a2.76 2.76 0 0 0-.27-.249c-.011 0-.802.783-1.759 1.74'
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
export default FileUploadOutlineSVG;

// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FolderUploadOutlineSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-folder-upload-outline';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M4.24 12v6.76h15.52V6.96h-7.545l-1.318-.86-1.317-.86H4.24zm6.242-4.38 1.317.86h6.441v8.76H5.76V6.76h3.404zm-.512 3.79L8.48 12.9l.53.53.529.53.851-.85.85-.849v4.179h1.52v-4.179l.85.849.851.85.529-.53.53-.531-1.5-1.499-1.499-1.499-.261.259-.26.258-.251-.249a3 3 0 0 0-.27-.249c-.011 0-.69.671-1.509 1.49'
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
export default FolderUploadOutlineSVG;

// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FileStampSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-file-stamp';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M4.24 12v8.76H11v-1.52H5.76V4.76h8.94l1.77 1.77 1.77 1.77V9h1.52V7.7l-2.23-2.23-2.23-2.23H4.24zM8 8v.76h6V7.24H8zm6.873 3.574-.667 1.333.416 1.657.417 1.666a.76.76 0 0 1-.169.01c-.168 0-.182.012-.9.73l-.73.731v3.059h7.52v-3.061l-.73-.729c-.718-.717-.734-.73-.9-.73a.753.753 0 0 1-.169-.01l.417-1.666.416-1.657-.667-1.333-.666-1.334h-2.922zM8 12v.761l1.75-.011 1.75-.01v-1.48l-1.75-.01L8 11.239zm9.874.426.332.667-.392 1.573-.393 1.574h-.842l-.393-1.574-.392-1.573.332-.667.333-.666h1.082zM8 16v.76h2v-1.52H8zm10.969 2.029.271.269v.942h-4.48v-.938l.269-.271.269-.271h3.4z'
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
export default FileStampSVG;

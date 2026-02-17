// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FileSearchSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-file-search';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M4.24 12v8.76H11v-1.52H5.76V4.76h8.94l1.77 1.77 1.77 1.77V12h1.52V7.7l-2.23-2.23-2.23-2.23H4.24zM8 8v.76h6V7.24H8zm0 4v.761l1.75-.011 1.75-.01v-1.48l-1.75-.01L8 11.239zm6.779.282c-1.265.124-2.415.892-3.051 2.038-.535.962-.619 2.212-.221 3.276a4.001 4.001 0 0 0 2.422 2.341c.326.11.967.223 1.271.223.584 0 1.43-.228 1.938-.522l.278-.161 1.022 1.019 1.022 1.019.54-.516.54-.515-1.032-1.034-1.031-1.034.161-.278c.216-.374.39-.888.462-1.365.074-.491.074-.655.001-1.144-.318-2.106-2.191-3.557-4.322-3.347m.924 1.521c.675.121 1.378.67 1.69 1.32a2.445 2.445 0 0 1-1.116 3.269c-.399.19-.649.248-1.077.248-.428 0-.678-.058-1.077-.248-.265-.127-.403-.227-.645-.47a2.316 2.316 0 0 1-.718-1.722c0-.404.069-.706.247-1.077a2.461 2.461 0 0 1 1.116-1.116c.185-.09.427-.18.537-.2.28-.053.762-.055 1.043-.004M8 16v.76h2v-1.52H8z'
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
export default FileSearchSVG;

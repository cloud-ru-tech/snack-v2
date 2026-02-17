// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const TechSupportSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-tech-support';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M10.8 2.781a10.041 10.041 0 0 0-4.947 2.102A10.501 10.501 0 0 0 3.864 7.08c-2.366 3.563-2.103 8.329.641 11.6a9.738 9.738 0 0 0 13.375 1.546c.457-.343 1.3-1.152 1.708-1.64l.296-.353-.572-.455a9.991 9.991 0 0 0-.597-.456c-.014-.001-.125.12-.247.268-.555.678-1.494 1.495-2.228 1.938a8.666 8.666 0 0 1-3.31 1.125l-.17.019V19.44h-1.52v1.23l-.19-.019c-.392-.038-1.168-.213-1.636-.368a8.375 8.375 0 0 1-2.355-1.224 11.277 11.277 0 0 1-1.471-1.419c-.948-1.175-1.621-2.768-1.772-4.19l-.026-.25H5v-1.48H3.789l.027-.27c.196-1.938 1.308-4 2.856-5.292.936-.781 2.117-1.4 3.196-1.675.312-.08 1.197-.243 1.316-.243.046 0 .056.112.056.6v.6h1.52v-.6c0-.488.01-.6.056-.6.119 0 1.004.163 1.316.243a8.168 8.168 0 0 1 1.557.599 8.238 8.238 0 0 1 4.551 7.096v.222h-1.12c-.616 0-1.12.014-1.12.03 0 .017.635.665 1.41 1.44l1.41 1.41 1.44-1.44 1.44-1.44h-1.93l-.026-.39c-.064-.958-.213-1.771-.465-2.539-.641-1.95-1.777-3.554-3.386-4.779a9.935 9.935 0 0 0-4.861-1.931c-.521-.055-1.713-.045-2.232.02m2.96 8.599-1.94 1.94-1.14-1.14-1.141-1.14-.529.53-.53.531 1.68 1.679 1.68 1.68 2.47-2.47 2.47-2.47-.54-.54-.54-.54z'
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
export default TechSupportSVG;

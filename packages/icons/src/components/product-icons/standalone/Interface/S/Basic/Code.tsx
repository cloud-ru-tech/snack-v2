// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const CodeSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-code';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M13.26 4.85c-.075.214-3.975 13.928-3.965 13.939.042.041 1.406.405 1.427.381.034-.04 4-13.941 3.983-13.959a45 45 0 0 0-1.416-.411c-.006 0-.019.022-.029.05M5.2 9.74 2.94 12l2.26 2.26 2.259 2.26.531-.53.53-.529-1.73-1.731L5.06 12l1.74-1.74 1.739-1.74L8.02 8a10 10 0 0 0-.54-.52c-.011 0-1.037 1.017-2.28 2.26M15.98 8l-.519.52 1.739 1.74L18.94 12l-1.73 1.73-1.73 1.731.53.529.531.53 2.259-2.26L21.06 12 18.8 9.74a185 185 0 0 0-2.28-2.26 10 10 0 0 0-.54.52'
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
export default CodeSVG;

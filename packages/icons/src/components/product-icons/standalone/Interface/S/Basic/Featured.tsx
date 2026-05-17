// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FeaturedSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-featured';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M8.444 7.495 4.24 12.75v2.01h2.94c2.326 0 2.94.01 2.939.05-.001.028-.223 1.594-.493 3.48-.271 1.887-.483 3.44-.472 3.45.01.011.516.019 1.123.018l1.103-.001 3.93-5.245 3.93-5.245V9.24h-2.68c-2.118 0-2.68-.01-2.679-.05.001-.028.223-1.594.493-3.48.271-1.887.483-3.44.472-3.45-.01-.011-.51-.02-1.109-.02h-1.089zm4.177-.174c-.25 1.748-.46 3.233-.468 3.299l-.013.12 2.793.02 2.792.02-3.383 4.51c-1.86 2.48-3.388 4.51-3.395 4.51s.197-1.467.453-3.26c.256-1.794.457-3.27.446-3.28-.011-.011-1.377-.02-3.036-.02s-3.011-.015-3.003-.034c.017-.044 7.25-9.083 7.26-9.073.004.005-.197 1.439-.446 3.188'
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
export default FeaturedSVG;

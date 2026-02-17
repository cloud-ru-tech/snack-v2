// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const TelegramSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-telegram';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path d='M18.44 5.988c-.109.022-12.622 4.565-13.14 4.771-.579.229-.995.489-1.103.688-.061.112.028.265.228.392.202.128.77.325 1.835.637.374.109.878.268 1.119.353l.44.154.172.518c.094.286.362 1.113.595 1.839.6 1.866.674 2.007 1.006 1.907.086-.026.516-.33 1.028-.729.484-.377.956-.73 1.05-.785a.683.683 0 0 1 .69-.014c.099.05.882.572 1.74 1.161 1.821 1.249 1.807 1.24 1.951 1.24.273 0 .412-.238.55-.942.047-.241.606-2.782 1.242-5.648C18.48 8.665 19 6.278 19 6.226c0-.185-.267-.299-.56-.238m-1.6 2.288c0 .066-.555.531-2.38 1.992-2.569 2.057-3.594 2.959-3.94 3.47-.126.185-.136.226-.167.66-.084 1.213-.228 1.796-.407 1.647-.092-.077-.216-.402-.385-1.014a42.554 42.554 0 0 0-.321-1.09c-.271-.862-.26-1.109.061-1.44.327-.337 1.108-.794 4.659-2.73 3.044-1.66 2.88-1.575 2.88-1.495' />
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
export default TelegramSVG;

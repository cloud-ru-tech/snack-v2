// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const HeartFilledSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-heart-filled';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path d='M7.527 4.284c-1.394.125-2.728.924-3.511 2.105A5.481 5.481 0 0 0 3.425 7.7a4.61 4.61 0 0 0 .337 3.34c.233.463.493.803 1.173 1.528C8.721 16.611 11.973 20.06 12 20.06c.027 0 3.279-3.449 7.065-7.492.868-.927 1.172-1.379 1.427-2.128.413-1.213.328-2.409-.253-3.58a4.713 4.713 0 0 0-3.473-2.544 6.622 6.622 0 0 0-.806-.044c-1.09.001-1.994.305-2.874.968-.335.253-.78.702-.951.96-.058.088-.118.16-.134.16-.015 0-.083-.078-.151-.172-.346-.482-.86-.937-1.454-1.288-.833-.493-1.84-.709-2.869-.616' />
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
export default HeartFilledSVG;

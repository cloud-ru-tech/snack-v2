// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const HeartSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-heart';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M7.527 4.284c-1.394.125-2.728.924-3.511 2.105A5.481 5.481 0 0 0 3.425 7.7a4.61 4.61 0 0 0 .337 3.34c.233.463.493.803 1.173 1.528C8.721 16.611 11.973 20.06 12 20.06c.027 0 3.279-3.449 7.065-7.492.868-.927 1.172-1.379 1.427-2.128.413-1.213.328-2.409-.253-3.58a4.713 4.713 0 0 0-3.473-2.544 6.622 6.622 0 0 0-.806-.044c-1.09.001-1.994.305-2.874.968-.335.253-.78.702-.951.96-.058.088-.118.16-.134.16-.015 0-.083-.078-.151-.172-.346-.482-.86-.937-1.454-1.288-.833-.493-1.84-.709-2.869-.616m1.387 1.594c.459.132.837.343 1.276.712.391.329.694.8.932 1.45l.11.3h1.536l.134-.374c.377-1.057 1.153-1.793 2.206-2.094.454-.13 1.338-.131 1.784-.002 1.069.31 1.941 1.164 2.235 2.19.122.423.131 1.296.018 1.7a3.252 3.252 0 0 1-.557 1.087c-.222.279-6.55 7.033-6.588 7.033-.013 0-.769-.795-1.682-1.767l-3.275-3.49c-1.61-1.716-1.858-2.015-2.056-2.485-.337-.803-.287-1.914.12-2.658.424-.776 1.176-1.382 1.981-1.597.436-.117.451-.119 1.012-.103.373.01.603.038.814.098'
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
export default HeartSVG;

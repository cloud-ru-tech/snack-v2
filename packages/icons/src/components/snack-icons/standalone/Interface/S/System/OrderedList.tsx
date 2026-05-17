// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const OrderedListSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-ordered-list';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M5.1 3.84 3.46 5.48l.53.529.529.53.361-.359.36-.358V10h1.52V6.1c0-2.145-.005-3.9-.01-3.9-.006 0-.748.738-1.65 1.64M11 6v.76h9V5.24h-9zm0 6v.76h9v-1.52h-9zm-5.37.281c-1.232.147-2.236 1.184-2.371 2.449l-.028.27H4.75l.019-.176c.043-.376.334-.769.703-.951.152-.075.253-.093.528-.093.399 0 .616.086.875.345.268.267.42.69.35.971-.064.252-.568.715-2.805 2.577a261 261 0 0 0-2.379 1.992l-.099.095H8v-1.519l-.945-.01-.944-.011.789-.657c1.731-1.441 2.104-2.179 1.718-3.401-.398-1.259-1.64-2.041-2.988-1.881M11 18v.76h9v-1.52h-9z'
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
export default OrderedListSVG;

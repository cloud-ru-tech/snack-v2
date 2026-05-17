// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const DislikeOutlineSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-dislike-outline';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M6.459 4.282c-.587.076-1.101.351-1.605.857-.31.311-.394.425-.548.744-.1.208-.219.512-.263.677-.112.413-.819 7.86-.782 8.24.096.999.564 1.604 1.441 1.864.211.062.483.072 2.385.086l2.147.015.014 1.367.014 1.368.109.311c.315.897 1.064 1.558 2.06 1.814.316.082.497.102.961.108l.572.007 1.757-3.98 1.756-3.98 2.142-.01 2.141-.011V4.24l-7.03.005c-3.866.003-7.139.019-7.271.037m8.781 5.029v3.551l-1.615 3.659-1.616 3.659-.138-.004c-.331-.009-.823-.34-1.004-.676-.086-.157-.087-.195-.098-2.21l-.012-2.05h-2.8c-3.116 0-3.028.007-3.138-.257a1 1 0 0 1-.059-.333c0-.204.662-7.333.703-7.568.072-.419.397-.924.723-1.126.323-.199.156-.192 4.744-.194l4.31-.002zm4-.311v3.24h-2.48V5.76h2.48z'
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
export default DislikeOutlineSVG;

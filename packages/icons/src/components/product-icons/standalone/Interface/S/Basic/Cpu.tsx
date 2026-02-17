// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const CpuSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-cpu';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M9.031 3.29 9.02 4.58l-.9.011-.9.01L5.89 5.93 4.56 7.26v1.78H2v1.48h2.56v2.96H2v1.48h2.56v1.78l1.35 1.35 1.35 1.35h1.78V22h1.48v-2.56h2.96V22h1.48v-2.56h1.78l1.35-1.35 1.35-1.35v-1.78H22v-1.48h-2.56v-2.96H22V9.04h-2.56V7.26l-1.33-1.33-1.33-1.329-.9-.01-.9-.011-.011-1.29-.01-1.29h-1.478l-.01 1.29-.011 1.29h-2.92l-.011-1.29-.01-1.29H9.041zm7.999 3.68.89.891v8.278l-.89.891-.889.89H7.859l-.889-.89-.89-.891V7.861l.89-.891.889-.89h8.282zM9.04 12v2.96h5.92V9.04H9.04zm4.44 0v1.48h-2.96v-2.96h2.96z'
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
export default CpuSVG;

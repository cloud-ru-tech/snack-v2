// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const ApiKeysSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-api-keys';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M3.24 5.62V8h1.52V4.76H8V3.24H3.24zm11.28-2.338a5.68 5.68 0 0 0-3.576 1.662C9.934 5.953 9.352 7.259 9.259 8.72a5.964 5.964 0 0 0 .127 1.517l.059.258-3.102 3.102L3.24 16.7v4.06H7.3l3.103-3.103 3.102-3.102.262.06c1.245.289 2.682.097 3.865-.516 1.571-.815 2.64-2.241 3.011-4.019.07-.334.088-.555.088-1.08s-.018-.746-.088-1.08c-.246-1.178-.771-2.162-1.588-2.976a5.685 5.685 0 0 0-4.535-1.662m1.199 1.538a4.234 4.234 0 0 1 3.091 2.32c.798 1.609.469 3.576-.814 4.859a4.185 4.185 0 0 1-2.995 1.241c-2.362 0-4.242-1.894-4.241-4.273.001-2.011 1.49-3.785 3.48-4.144a5.021 5.021 0 0 1 1.479-.003m-.23 2.93.011.75h1.48l.011-.75.011-.75h-1.524zm-5.171 4.573c.277.409.917 1.052 1.337 1.345.179.124.333.233.343.241.01.008-1.178 1.21-2.64 2.673L6.7 19.24H4.76V17.3l2.65-2.65a247.153 247.153 0 0 1 2.67-2.649c.011.001.118.146.238.322m8.922 5.297v1.62H16v1.52h4.76V16h-1.52z'
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
export default ApiKeysSVG;

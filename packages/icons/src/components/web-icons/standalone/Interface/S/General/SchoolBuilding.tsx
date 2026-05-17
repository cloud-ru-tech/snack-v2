// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const SchoolBuildingSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-school-building';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M11.24 5.47V7.7L9.71 9.23l-1.53 1.53H3.24v10h17.52v-10h-4.94l-1.53-1.53-1.53-1.53v-.46h2.48v-4h-4zm2.52-.21v.5h-1v-1h1zm-.16 5.4 1.58 1.58h4.06v7H4.76v-7h4.06l1.58-1.58A91 91 0 0 1 12 9.08c.011 0 .731.711 1.6 1.58m-2.351 3.09.011.75h1.48l.011-.75.011-.75h-1.524zm0 3 .011.75h1.48l.011-.75.011-.75h-1.524z'
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
export default SchoolBuildingSVG;

// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const UmbrellaSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-umbrella';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M11.34 3.28c-2.758.198-5.31 1.749-6.785 4.124a9.993 9.993 0 0 0-.814 1.713c-.331.962-.454 1.678-.489 2.833l-.024.81h8.012v2.71c0 1.699.016 2.807.043 2.97a2.68 2.68 0 0 0 .797 1.559c.527.53 1.068.737 1.92.736.349-.001.579-.022.76-.071 1.109-.299 1.849-1.2 1.983-2.414l.027-.25H15.251l-.024.201a1.573 1.573 0 0 1-.32.713c-.187.202-.528.325-.902.325-.607.002-1.007-.274-1.182-.814-.055-.169-.063-.549-.063-2.93V12.76h8v-.53c-.001-3.144-1.408-5.836-3.933-7.522-1.572-1.051-3.554-1.566-5.487-1.428m-1.115 1.896c-.468.731-.961 1.775-1.297 2.748-.348 1.008-.536 1.887-.674 3.146l-.019.17H6.518c-1.61 0-1.718-.004-1.718-.07 0-.122.11-.697.2-1.05.599-2.346 2.613-4.41 4.955-5.079.421-.12.429-.115.27.135m3.875-.115c.427.124 1.098.42 1.545.682 1.919 1.124 3.256 3.123 3.538 5.287l.027.21h-3.441l-.024-.09a1.316 1.316 0 0 1-.025-.25c-.001-.297-.161-1.256-.304-1.826a14.046 14.046 0 0 0-1.609-3.844c-.108-.176-.147-.27-.111-.27.03 0 .212.045.404.101m-1.913.431c.922 1.388 1.54 2.816 1.849 4.27.077.363.204 1.234.204 1.4 0 .076-.046.078-2.24.078-2.194 0-2.24-.002-2.24-.078 0-.043.028-.29.062-.548.166-1.27.536-2.457 1.142-3.665.328-.653.965-1.703 1.036-1.707.011-.001.095.112.187.25'
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
export default UmbrellaSVG;

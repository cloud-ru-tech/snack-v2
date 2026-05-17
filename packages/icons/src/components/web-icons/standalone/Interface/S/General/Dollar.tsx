// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const DollarSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-dollar';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M4.47 4.47 3.24 5.7v12.6l1.23 1.23 1.23 1.23h12.6l1.23-1.23 1.23-1.23V5.7l-1.23-1.23-1.23-1.23H5.7zm6.77 1.525v1.234l-.381.028c-.721.053-1.093.206-1.499.619a1.9 1.9 0 0 0-.543.991c-.052.222-.061.459-.047 1.273.015.91.024 1.023.106 1.26.228.655.664 1.058 1.378 1.271.164.049.538.066 1.85.085l1.643.024.159.111c.297.205.334.326.334 1.074-.001.652-.001.656-.119.861a1.1 1.1 0 0 1-.25.3l-.131.094-2.37.011-2.37.011v1.518h2.24v2.48H6.299l-.769-.77-.77-.771V6.301l.77-.771.769-.77h4.941zm7.23-.465.77.769v11.4l-.77.771-.769.77H12.76v-2.47l.59-.02c.626-.021.874-.079 1.227-.286.396-.233.783-.686.993-1.165.157-.355.201-.734.181-1.537-.014-.593-.031-.742-.107-.962-.226-.658-.78-1.197-1.484-1.445-.25-.088-.322-.092-1.922-.113-1.511-.02-1.672-.029-1.772-.094-.187-.123-.205-.221-.205-1.128-.001-.773.006-.851.08-.98.167-.287.107-.28 2.509-.28H15V7.24h-2.24V4.76h4.939z'
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
export default DollarSVG;

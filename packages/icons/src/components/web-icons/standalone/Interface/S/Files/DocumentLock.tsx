// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const DocumentLockSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-document-lock';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='m3.25 11.97.01 7.73h7.24l.011-.75.011-.75H4.76V5.76h13.479l.011 1.87.01 1.87h1.48l.01-2.63.011-2.63H3.24zm4.248-3.679c-.011.029-.015.366-.009.75l.011.699 4.03.01 4.03.01V8.24h-4.021c-3.239 0-4.025.01-4.041.051m8.114 2.99a2.098 2.098 0 0 0-1.792 1.609c-.037.156-.059.457-.059.8l-.001.55h-1.52v6.52h8.52v-6.52h-1.52l-.001-.55c0-.343-.022-.644-.059-.8-.178-.753-.801-1.388-1.541-1.569-.236-.058-1.661-.086-2.027-.04m1.712 1.525c.329.11.404.273.428.924l.019.51h-2.542l.019-.51c.024-.641.1-.812.412-.922.166-.058 1.492-.06 1.664-.002M19.24 17.5v1.74h-5.48v-3.48h5.48zm-3.48 0v.74h1.48v-1.48h-1.48z'
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
export default DocumentLockSVG;

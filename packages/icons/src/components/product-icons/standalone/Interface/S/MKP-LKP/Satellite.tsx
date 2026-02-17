// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const SatelliteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-satellite';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M15.13 3.282a5 5 0 0 0-2.654 1.025c-.578.435-1.118 1.059-1.432 1.656l-.136.259-3.613 1.859C5.308 9.103 3.681 9.956 3.681 9.977a24.48 24.48 0 0 0 .661 1.296c.006.008 1.232-.616 2.725-1.385a899.608 899.608 0 0 1 3.038-1.561l.325-.163.005.394c.012.912.325 1.925.821 2.66l.188.278-2.882 2.882L5.68 17.26l.53.53.53.53 2.882-2.882 2.882-2.882.278.188c.771.52 1.782.818 2.78.819.264 0 .473.013.463.029-.093.154-3.271 5.99-3.277 6.019-.004.021.28.197.632.392.504.279.648.342.68.301.022-.029.94-1.701 2.04-3.715l2-3.662.205-.123c.305-.183.81-.602 1.072-.89.994-1.092 1.488-2.543 1.346-3.955-.154-1.539-.913-2.864-2.143-3.74a5.19 5.19 0 0 0-3.45-.937m1.37 1.589c1.316.362 2.289 1.345 2.644 2.67.058.218.074.414.072.899-.002.557-.014.657-.111.978-.103.339-.404.982-.46.982-.014 0-1.159-1.134-2.545-2.521-2.031-2.032-2.508-2.529-2.46-2.562.299-.203.913-.439 1.346-.518.318-.057 1.196-.016 1.514.072m-1.44 4.09c2.051 2.051 2.509 2.529 2.46 2.563-.166.117-.739.361-1.04.443-.285.077-.434.091-.92.089-.511-.003-.623-.016-.94-.112-.685-.207-1.162-.487-1.624-.954a3.671 3.671 0 0 1-.963-1.704c-.121-.451-.12-1.257.001-1.746.084-.34.414-1.1.477-1.1.016 0 1.163 1.134 2.549 2.521'
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
export default SatelliteSVG;

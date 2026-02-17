// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const CampSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-camp';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M6.224 6.447 3.515 10.06l1.096.02 1.096.02-1.494 2.654a327.904 327.904 0 0 0-1.493 2.67c0 .009.891.016 1.98.016s1.98.009 1.98.02c0 .011-.645 1.168-1.434 2.57-.788 1.403-1.455 2.591-1.481 2.64l-.048.09H17v-.778l.271.269.271.269 2.179-2.326c1.198-1.279 2.179-2.341 2.179-2.36 0-.054-6.717-11.991-6.748-11.993-.016 0-.619.629-1.34 1.398L12.5 6.638l-.105-.109L10.74 4.76a772.94 772.94 0 0 0-1.678-1.793l-.128-.132zm4.039-.007c.629.671 1.153 1.243 1.165 1.27.011.028-.197.282-.464.565-.266.284-.484.529-.484.546 0 .017.103.128.23.247l.23.217-.288-.152c-.188-.1-.301-.139-.326-.113-.021.022-.644 1.12-1.385 2.44a208.158 208.158 0 0 1-1.377 2.431c-.016.016-.534.025-1.15.02L5.293 13.9l1.486-2.64 1.485-2.64-.872-.011c-.48-.006-.872-.019-.872-.03 0-.053 2.53-3.382 2.562-3.372.02.007.551.562 1.181 1.233m7.138 4.43c1.395 2.481 2.567 4.564 2.606 4.63l.07.121-1.442 1.539a100.13 100.13 0 0 1-1.468 1.55c-.015.005-1.148-1.984-2.518-4.42a3067.533 3067.533 0 0 0-2.609-4.637l-.118-.207 1.446-1.543c.795-.849 1.457-1.543 1.471-1.543.015 0 1.167 2.029 2.562 4.51m-4.046 4.183a454.378 454.378 0 0 1 2.325 4.16c0 .015-.882.027-1.96.027h-1.96v-4.56h-1.52v4.56H8.28c-1.078 0-1.96-.012-1.96-.027 0-.052 4.65-8.293 4.68-8.293.017 0 1.077 1.86 2.355 4.133'
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
export default CampSVG;

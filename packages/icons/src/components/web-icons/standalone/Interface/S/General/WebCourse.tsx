// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const WebCourseSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-web-course';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M8.887 3.883 5.835 5.6H3.24v12.12h8v2.52H7v1.52h10v-1.52h-4.24v-2.52h8V5.6h-2.595l-3.066-1.72c-1.687-.946-3.088-1.718-3.113-1.717-.025.002-1.42.776-3.099 1.72m5.299 1.202c1.185.663 2.176 1.226 2.204 1.251.038.036-.46.332-2.17 1.291L12 8.872 9.78 7.627c-1.363-.764-2.205-1.258-2.182-1.281.057-.057 4.336-2.458 4.388-2.462.025-.002 1.015.538 2.2 1.201M6.52 7.517l.7.395.02 1.724.02 1.723 2.37 1.296L12 13.951l2.38-1.302 2.379-1.301.011-1.718.01-1.718.7-.395.7-.395.53-.001.53-.001v9.08H4.76V7.12l.53.001.53.001zm3.912 2.195 1.568.881 1.568-.881c.863-.484 1.592-.89 1.62-.901.042-.016.052.148.052.82v.839l-1.62.886-1.62.885-1.62-.885-1.62-.886v-.839c0-.672.01-.836.052-.82.028.011.757.417 1.62.901'
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
export default WebCourseSVG;

// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const BoldSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-bold';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M7 11.999v6.764l3.65-.013c3.956-.015 3.77-.005 4.39-.234 1.097-.405 1.976-1.342 2.297-2.448a3.75 3.75 0 0 0-1.617-4.251l-.196-.125c-.009-.006.067-.099.168-.208.898-.959 1.193-2.542.708-3.796-.451-1.167-1.406-2.009-2.648-2.335-.325-.086-.4-.088-3.542-.103L7 5.235zm6.436-5.177c.393.092.708.278 1.044.616.466.469.639.892.639 1.562 0 .427-.053.669-.223 1.02-.158.327-.637.81-.966.975-.488.246-.478.245-3.058.245H8.52V6.76l2.33.001c1.937 0 2.373.01 2.586.061m1.09 6.062c1.544.601 1.963 2.545.8 3.707a2.2 2.2 0 0 1-.528.398c-.508.255-.454.251-3.506.251H8.52v-4.483l2.87.011 2.87.012z'
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
export default BoldSVG;

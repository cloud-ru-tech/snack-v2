// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const ProjectSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-project';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M4.47 4.47 3.24 5.7v12.6l1.23 1.23 1.23 1.23h12.6l1.23-1.23 1.23-1.23V5.7l-1.23-1.23-1.23-1.23H5.7zm14 1.06.77.769v11.4l-.77.771-.769.77H6.299l-.769-.77-.77-.771V6.301l.77-.771.769-.77h11.4zM7.24 12v5h1.52V7H7.24zm4-3v2h1.52V7h-1.52zm4 1.5V14h1.52V7h-1.52z'
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
export default ProjectSVG;

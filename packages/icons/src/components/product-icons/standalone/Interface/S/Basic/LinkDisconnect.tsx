// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const LinkDisconnectSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-link-disconnect';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='m13.44 4.98-2.499 2.5.539.54.539.54 2.241-2.24 2.24-2.24 1.71 1.71 1.71 1.71-1.71 1.71-1.711 1.71-.659-.66-.659-.66-.531.53-.53.529.93.931.929.93h1.081l2.23-2.23 2.23-2.23V6.94l-2.23-2.23-2.23-2.23h-1.12zm-6.29-.978c-.346.175-.63.327-.63.338s.315.65.7 1.42l.7 1.4.65-.324c.358-.179.658-.333.669-.342.03-.029-1.375-2.814-1.419-2.812a9 9 0 0 0-.67.32M3.61 7.5l-.33.66 1.402.701c.771.386 1.415.693 1.43.684.043-.028.667-1.3.646-1.319A120 120 0 0 0 3.97 6.84c-.017 0-.179.297-.36.66m1.1 6.21-2.23 2.23v1.12l2.23 2.23 2.23 2.23h1.12l2.47-2.47c1.359-1.359 2.47-2.488 2.47-2.511 0-.022-.234-.274-.52-.559l-.52-.519-2.23 2.229-2.23 2.23-1.71-1.71-1.71-1.71 1.71-1.71 1.71-1.71.81.81.81.81.53-.53.53-.53-1.08-1.08-1.079-1.08H6.94zm13.21 1.37c-.176.351-.32.648-.32.659 0 .025 2.804 1.43 2.82 1.413.006-.006.157-.304.336-.662l.324-.65-1.4-.7c-.77-.385-1.409-.7-1.42-.7s-.164.288-.34.64m-2.14 2.087c-.352.177-.648.33-.659.339-.025.025 1.371 2.814 1.409 2.814.046 0 1.31-.637 1.31-.66 0-.028-1.398-2.821-1.41-2.818a41 41 0 0 0-.65.325'
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
export default LinkDisconnectSVG;

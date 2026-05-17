// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const UserLaptopSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-user-laptop';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M11.916 3.282a4.38 4.38 0 0 0-3.555 2.486c-.74 1.581-.402 3.429.857 4.686a4.47 4.47 0 0 0 4.371 1.124c2.002-.571 3.363-2.522 3.134-4.491-.116-.996-.51-1.822-1.203-2.52-.748-.752-1.692-1.189-2.78-1.287a8 8 0 0 0-.46-.034c-.011.003-.175.019-.364.036m1.259 1.575c.976.268 1.809 1.125 2.01 2.068.085.399.056 1.04-.063 1.395-.247.735-.887 1.413-1.614 1.708a3.2 3.2 0 0 1-2.296 0c-.727-.295-1.367-.973-1.614-1.708-.119-.354-.148-.996-.064-1.392.23-1.078 1.142-1.911 2.346-2.143.202-.039 1.065.009 1.295.072m-8.537 12c-1.198 1.44-2.178 2.634-2.178 2.655s.252.248.559.504c.538.447.562.462.62.387.034-.043.916-1.105 1.961-2.36l1.9-2.281 1.39-.001 1.39-.001v-1.52H6.816zm9.292-2.547c-.015.038-.354 1.159-.754 2.49l-.726 2.42-1.225.011-1.225.01v1.519h9.555l.1-.33c.682-2.251 1.825-6.095 1.825-6.136 0-.045-.643-.054-3.761-.054-3.545 0-3.763.004-3.789.07m5.528 1.54c-.012.05-.244.828-.515 1.73l-.493 1.64-2.219.01-2.219.011.522-1.741.522-1.74h4.426z'
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
export default UserLaptopSVG;

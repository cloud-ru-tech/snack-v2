// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const ChatSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-chat';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M11.34 3.281A8.681 8.681 0 0 0 5.819 5.82c-1.344 1.343-2.192 3.027-2.485 4.94-.096.63-.096 1.85 0 2.48.398 2.594 1.87 4.839 4.07 6.205 1.102.684 2.511 1.152 3.836 1.273.29.026 2.195.042 5.154.042h4.695l-.024-.09c-.014-.049-.381-.99-.818-2.09l-.793-2 .111-.182c.171-.278.536-1.058.674-1.438.269-.745.418-1.472.485-2.367.203-2.737-.971-5.514-3.07-7.264-1.795-1.495-4.014-2.215-6.314-2.048m1.892 1.575a7.25 7.25 0 0 1 3.883 2.029c1.071 1.07 1.743 2.359 2.033 3.895.097.513.096 1.931-.002 2.46A7.251 7.251 0 0 1 18.038 16c-.138.209-.25.398-.25.42.001.022.247.658.547 1.414.3.755.545 1.381.545 1.391 0 .01-1.768.012-3.93.005l-3.93-.013-.466-.106c-1.457-.33-2.654-.976-3.645-1.967-1.122-1.122-1.79-2.418-2.075-4.024-.071-.4-.071-1.84 0-2.24a8.832 8.832 0 0 1 .384-1.441 7.385 7.385 0 0 1 4.221-4.221c.522-.201 1.029-.32 1.861-.435.266-.037 1.615.014 1.932.073M7.24 12v1h1.52v-2H7.24zm4 0v1h1.52v-2h-1.52zm4 0v1h1.52v-2h-1.52z'
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
export default ChatSVG;

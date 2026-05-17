// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const WebApplicationCloudSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-web-application-cloud';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M11.52 3.282a5.74 5.74 0 0 0-4.598 3.043c-.305.58-.446 1.01-.625 1.905-.012.058-.048.09-.099.09-.362 0-1.258.285-1.83.581-1.571.815-2.64 2.241-3.011 4.019-.07.334-.088.555-.088 1.08s.018.746.088 1.08c.245 1.176.77 2.16 1.587 2.976.813.814 1.774 1.328 2.976 1.592l.42.092h11.32l.42-.092c1.202-.264 2.163-.778 2.976-1.592.817-.816 1.342-1.8 1.587-2.976.07-.334.088-.555.088-1.08s-.018-.746-.088-1.08c-.246-1.178-.771-2.162-1.588-2.976-.793-.791-1.814-1.348-2.863-1.561a3 3 0 0 0-.39-.063c-.051 0-.087-.032-.099-.09-.179-.895-.32-1.325-.625-1.905a5.5 5.5 0 0 0-1.023-1.381 5.69 5.69 0 0 0-4.535-1.662m1.199 1.538a4.23 4.23 0 0 1 3.091 2.32c.308.621.43 1.201.43 2.05v.57h.57c.849 0 1.429.122 2.05.43a4.23 4.23 0 0 1 2.32 3.091c.366 2.079-.878 4.114-2.921 4.774-.578.188-.493.185-6.259.185s-5.681.003-6.259-.185c-1.531-.495-2.646-1.763-2.918-3.317-.327-1.868.606-3.698 2.317-4.548.63-.312 1.188-.43 2.05-.43h.57v-.57q0-.918.208-1.528c.502-1.467 1.771-2.568 3.272-2.839a5 5 0 0 1 1.479-.003M7.7 11.76l-1.76 1.76 1.77 1.77 1.77 1.77.53-.53.53-.53-1.24-1.24-1.24-1.24 1.23-1.23 1.23-1.231-.53-.529-.531-.53zm6.31-1.23-.53.53 1.23 1.23 1.23 1.23-1.24 1.24L13.46 16l.53.53.53.53 1.77-1.77 1.77-1.77-1.76-1.76L14.54 10zM11.46 13l-1 1 .53.53.53.53 1-1 1-1.001-.53-.529-.531-.53z'
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
export default WebApplicationCloudSVG;

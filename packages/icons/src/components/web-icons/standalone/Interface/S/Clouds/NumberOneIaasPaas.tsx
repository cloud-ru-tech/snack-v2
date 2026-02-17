// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const NumberOneIaasPaasSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-number-one-iaas-paas';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M11.52 3.282a5.736 5.736 0 0 0-4.598 3.043c-.305.58-.446 1.01-.625 1.905-.012.058-.048.09-.099.09-.362 0-1.258.285-1.83.581-1.571.815-2.64 2.241-3.011 4.019-.07.334-.088.555-.088 1.08s.018.746.088 1.08c.245 1.176.77 2.16 1.587 2.976.807.808 1.768 1.324 2.956 1.588.39.087.477.09 3.397.105l2.997.016 2.473-2.472 2.473-2.473V19.771l.61-.022c.336-.012.74-.05.9-.085 1.373-.298 2.651-1.402 3.366-2.907 1.129-2.377.713-5.044-1.061-6.813-.793-.791-1.814-1.348-2.863-1.561a3.348 3.348 0 0 0-.39-.063c-.051 0-.087-.032-.099-.09-.179-.895-.32-1.325-.625-1.905a5.494 5.494 0 0 0-1.023-1.381 5.685 5.685 0 0 0-4.535-1.662m1.199 1.538a4.234 4.234 0 0 1 3.091 2.32c.308.621.43 1.201.43 2.05v.57h.57c.849 0 1.429.122 2.05.43a4.252 4.252 0 0 1 2.341 3.206c.064.427.028 1.222-.076 1.684-.281 1.235-1.052 2.332-2.008 2.856a1.672 1.672 0 0 1-.31.144c-.036 0-.047-.847-.047-3.449v-3.45l-.531.53-.53.529H12v1.52h4.18L13.94 16l-2.24 2.24H9.134c-2.689 0-2.849-.009-3.393-.185-1.531-.495-2.646-1.763-2.918-3.317-.327-1.868.606-3.698 2.317-4.548.63-.312 1.188-.43 2.05-.43h.57v-.57c0-.611.07-1.123.208-1.528.502-1.467 1.771-2.568 3.272-2.839a5.021 5.021 0 0 1 1.479-.003'
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
export default NumberOneIaasPaasSVG;

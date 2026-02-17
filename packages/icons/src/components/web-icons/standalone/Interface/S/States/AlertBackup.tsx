// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const AlertBackupSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-alert-backup';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M11.04 3.806a8.815 8.815 0 0 0-5.134 2.39c-1.131 1.092-1.904 2.363-2.323 3.817A8.504 8.504 0 0 0 5.12 17.68c.344.431 1.171 1.233 1.567 1.52l.305.22-.906.91-.905.91H9.76v-2.26c0-1.243-.013-2.26-.03-2.26-.016 0-.398.369-.85.819l-.82.819-.44-.335c-1.562-1.189-2.552-2.864-2.802-4.737-.148-1.111.001-2.424.383-3.39a9.171 9.171 0 0 1 .87-1.616c.319-.451 1.061-1.212 1.509-1.546 1.316-.983 2.759-1.459 4.42-1.459s3.104.476 4.42 1.459c.446.332 1.189 1.093 1.511 1.546.308.434.815 1.428.967 1.896.485 1.493.447 3.269-.099 4.648-1.07 2.701-3.46 4.43-6.409 4.636l-.39.027V20.96l.35-.001c1.055-.002 2.421-.347 3.55-.897a8.747 8.747 0 0 0 4-4.002 8.474 8.474 0 0 0 .517-6.047c-.974-3.382-3.978-5.86-7.531-6.212a11.494 11.494 0 0 0-1.846.005m.21 6.544.01 2.71h1.48l.01-2.71.011-2.71h-1.522zm-.001 5.1.011.85h1.48l.011-.85.011-.85h-1.524z'
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
export default AlertBackupSVG;

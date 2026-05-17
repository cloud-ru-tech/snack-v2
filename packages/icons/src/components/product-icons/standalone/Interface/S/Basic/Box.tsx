// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const BoxSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-box';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M8.3 5.247a1268 1268 0 0 0-3.655 2.096c-.008.007.067.153.166.325l.18.312-.375.011-.376.012v8.431l3.68 2.103a508 508 0 0 0 3.697 2.103c.01 0 .094-.135.188-.3s.182-.3.195-.3.101.135.195.3.178.3.188.3 1.673-.946 3.697-2.103l3.68-2.103V8.003l-.376-.012-.375-.011.18-.312c.099-.172.174-.318.166-.325-.072-.064-7.327-4.182-7.365-4.181-.027.002-1.688.94-3.69 2.085m6.43 1.182c1.491.851 2.706 1.562 2.7 1.58-.011.034-5.381 3.111-5.43 3.111S6.581 8.043 6.57 8.009C6.561 7.982 11.944 4.88 12 4.88c.01 0 1.239.697 2.73 1.549m-6.225 4.442 2.715 1.552.01 3.132c.007 1.978-.004 3.127-.028 3.118-.021-.007-1.253-.706-2.739-1.553l-2.7-1.54-.002-3.13c0-1.722.006-3.13.014-3.13s1.237.698 2.73 1.551m9.734 1.579-.002 3.13-2.7 1.54a341 341 0 0 1-2.739 1.553c-.024.009-.035-1.14-.028-3.118l.01-3.132 2.7-1.548a219 219 0 0 1 2.73-1.551c.017-.002.029 1.404.029 3.126'
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
export default BoxSVG;

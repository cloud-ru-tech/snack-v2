// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const PaaSCloudSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-paa-s-cloud';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M11.54 4.282a5.304 5.304 0 0 0-1.302.29c-1.758.661-3.014 2.166-3.385 4.053-.037.188-.086.348-.11.354-.024.006-.16.033-.303.059-1.387.256-2.783 1.307-3.512 2.642-1.362 2.495-.592 5.667 1.753 7.217a5.295 5.295 0 0 0 1.811.753l.408.09h10.2l.408-.09c2.334-.517 3.978-2.399 4.215-4.826.183-1.875-.691-3.832-2.191-4.901-.6-.428-1.37-.774-1.972-.885a7.145 7.145 0 0 1-.305-.06c-.025-.007-.066-.13-.091-.274-.104-.596-.382-1.357-.673-1.842-1.061-1.767-2.941-2.746-4.951-2.58m1.34 1.579c.347.09.95.376 1.254.594.499.357.998.969 1.246 1.528.084.189.3.853.3.921 0 .009-1.658.016-3.684.016-3.177 0-3.682-.008-3.663-.057.012-.032.035-.126.051-.21.051-.276.326-.889.549-1.224A4.298 4.298 0 0 1 9.98 6.375a4.085 4.085 0 0 1 1.16-.51c.154-.034.316-.072.36-.082.177-.041 1.129.012 1.38.078m4.708 4.727c.671.234 1.037.466 1.532.971a3.89 3.89 0 0 1 1.104 2.381l.027.3H3.749l.027-.3c.143-1.581 1.24-2.939 2.724-3.373.154-.045.334-.09.4-.099.066-.009 2.415-.015 5.22-.013l5.1.005zm2.324 5.362c-.458 1.049-1.302 1.803-2.413 2.156l-.359.114H6.86l-.36-.114a3.847 3.847 0 0 1-2.412-2.156l-.084-.19h15.992z'
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
export default PaaSCloudSVG;

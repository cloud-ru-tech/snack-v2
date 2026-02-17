// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const AdmissionControlSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-admission-control';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M8.16 4.012a1154.894 1154.894 0 0 0-3.835 1.854c-.014.01-1.867 8.09-1.894 8.258-.007.044.925 1.246 2.469 3.183a878.957 878.957 0 0 0 2.671 3.342l.192.231h8.474l.192-.231c.991-1.194 5.149-6.469 5.14-6.522-.027-.166-1.881-8.252-1.894-8.261-.026-.019-7.644-3.686-7.67-3.692-.014-.003-1.744.824-3.845 1.838m7.015 1.351c1.741.838 3.177 1.535 3.191 1.55.015.015.379 1.572.81 3.461.65 2.85.775 3.445.734 3.503-.028.038-1.021 1.287-2.209 2.776l-2.159 2.707H8.458l-2.159-2.707a844.769 844.769 0 0 1-2.209-2.776c-.041-.058.083-.651.734-3.503.431-1.889.795-3.446.81-3.461.024-.025 6.329-3.07 6.361-3.072.008-.001 1.439.684 3.18 1.522M7.4 11.032c0 3.201-.005 3.128.248 3.648.087.177.225.357.436.569l.31.31 1.786.88c.982.485 1.801.881 1.82.881.019 0 .838-.396 1.82-.881l1.786-.88.31-.31c.211-.212.349-.392.436-.569.253-.52.248-.447.248-3.648V8.12H7.4zm3.84 1.428c0 1.551-.01 2.82-.022 2.82-.012 0-.468-.225-1.015-.499-1.101-.554-1.205-.633-1.279-.98-.029-.133-.044-.896-.044-2.183V9.64h2.36zm3.88-.842c0 1.287-.015 2.05-.044 2.183-.074.347-.178.426-1.279.98-.547.274-1.003.499-1.015.499-.012 0-.022-1.269-.022-2.82V9.64h2.36z'
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
export default AdmissionControlSVG;

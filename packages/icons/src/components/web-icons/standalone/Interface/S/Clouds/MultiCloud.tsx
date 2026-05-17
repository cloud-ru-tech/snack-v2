// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const MultiCloudSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-multi-cloud';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M11.54 4.282a5.3 5.3 0 0 0-1.302.29c-1.758.661-3.014 2.166-3.385 4.053-.037.188-.086.348-.11.354s-.16.033-.303.059c-1.387.256-2.783 1.307-3.512 2.642-1.362 2.495-.592 5.667 1.753 7.217a5.3 5.3 0 0 0 1.811.753l.408.09h10.2l.408-.09c2.334-.517 3.978-2.399 4.215-4.826.183-1.875-.691-3.832-2.191-4.901-.6-.428-1.37-.774-1.972-.885a7 7 0 0 1-.305-.06c-.025-.007-.066-.13-.091-.274-.104-.596-.382-1.357-.673-1.842-1.061-1.767-2.941-2.746-4.951-2.58m-.3 7.76v6.202l-2.21-.014-2.21-.014-.34-.112c-1.349-.444-2.289-1.469-2.627-2.864-.108-.444-.098-1.463.019-1.89.257-.942.814-1.761 1.535-2.257a3.3 3.3 0 0 1 1.005-.5c.344-.116.416-.125 1.092-.143l.724-.019.025-.628c.029-.749.108-1.177.307-1.667.352-.864 1.021-1.598 1.81-1.985.256-.126.731-.304.82-.309.04-.002.05 1.264.05 6.2m1.842-6.118c1.238.406 2.163 1.392 2.517 2.683.094.342.158.931.16 1.458l.001.365.73.02c.682.018.754.027 1.098.143.66.221 1.033.456 1.532.966.498.508.807 1.057 1.008 1.791.07.255.086.427.088.97.003.6-.007.695-.105 1.048-.375 1.346-1.283 2.306-2.591 2.736l-.34.112-2.21.014-2.21.014v-6.202c0-3.411.015-6.202.033-6.202s.149.038.289.084'
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
export default MultiCloudSVG;

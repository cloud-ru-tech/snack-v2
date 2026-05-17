// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const IaaSCloudSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-iaa-s-cloud';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M11.54 3.282a5.3 5.3 0 0 0-1.302.29c-1.758.661-3.014 2.166-3.385 4.053-.037.188-.086.348-.11.354s-.16.033-.303.059c-1.387.256-2.783 1.307-3.512 2.642a5.58 5.58 0 0 0-.162 4.997c.376.814 1.127 1.702 1.838 2.174.316.21 1.105.615 1.134.583.03-.034.514-1.395.499-1.404a19 19 0 0 0-.359-.176c-1.057-.512-1.848-1.593-2.062-2.82a4.35 4.35 0 0 1 .239-2.238c.257-.635.806-1.328 1.352-1.703a3.3 3.3 0 0 1 1.005-.5c.344-.116.416-.125 1.092-.143l.724-.019.025-.628c.029-.752.108-1.177.31-1.674a3.83 3.83 0 0 1 1.977-2.056c.531-.237.802-.292 1.46-.292.682 0 .947.057 1.514.323.466.218.789.448 1.131.802.769.799 1.11 1.767 1.114 3.159l.001.365.73.02c.682.018.754.027 1.098.143.66.221 1.033.456 1.532.966a3.83 3.83 0 0 1 1.005 1.791c.116.441.143 1.203.06 1.678-.215 1.231-1.005 2.314-2.063 2.826-.188.091-.35.17-.359.176-.015.009.469 1.37.499 1.404.007.007.187-.069.401-.17a5.44 5.44 0 0 0 2.991-3.887 5.65 5.65 0 0 0-.928-4.254 6 6 0 0 0-1.194-1.2c-.6-.428-1.37-.774-1.972-.885a7 7 0 0 1-.305-.06c-.025-.007-.066-.13-.091-.274-.104-.596-.382-1.357-.673-1.842-1.061-1.767-2.941-2.746-4.951-2.58m-.3 9.958v2h-4v5.52h9.52v-9.52h-5.52zm4 .76v1.24h-2.48v-2.48h2.48zm-4 4v1.24H8.76v-2.48h2.48zm4 0v1.24h-2.48v-2.48h2.48z'
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
export default IaaSCloudSVG;

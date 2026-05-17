// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const CloudDownloadSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-cloud-download';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M11.54 4.282a5.3 5.3 0 0 0-1.302.29c-1.758.661-3.014 2.166-3.385 4.053-.037.188-.086.348-.11.354s-.16.033-.303.059c-1.387.256-2.783 1.307-3.512 2.642-1.362 2.495-.592 5.667 1.753 7.217.742.49 1.669.799 2.499.831l.32.012v-1.48l-.34-.031c-1.58-.142-2.908-1.342-3.307-2.989-.108-.444-.098-1.463.019-1.89.257-.942.814-1.761 1.535-2.257a3.3 3.3 0 0 1 1.005-.5c.344-.116.416-.125 1.092-.143l.724-.019.025-.628c.029-.752.108-1.177.31-1.674a3.83 3.83 0 0 1 1.977-2.056c.531-.237.802-.292 1.46-.292.682 0 .947.057 1.514.323.466.218.789.448 1.131.802.769.799 1.11 1.767 1.114 3.159l.001.365.73.02c.682.018.754.027 1.098.143.66.221 1.033.456 1.532.966.498.508.807 1.057 1.008 1.791.07.255.086.427.088.97.003.6-.007.695-.105 1.048-.444 1.594-1.734 2.722-3.271 2.861l-.34.031v1.48l.32-.012c.83-.032 1.757-.341 2.499-.831 1.907-1.26 2.822-3.642 2.264-5.892-.385-1.552-1.39-2.825-2.783-3.524a4.8 4.8 0 0 0-1.24-.443 7 7 0 0 1-.305-.06c-.025-.007-.066-.13-.091-.274-.104-.596-.382-1.357-.673-1.842-1.061-1.767-2.941-2.746-4.951-2.58m-.3 10.338v2.62H9.18l1.41 1.41L12 20.06l1.41-1.41 1.41-1.41h-2.06V12h-1.52z'
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
export default CloudDownloadSVG;

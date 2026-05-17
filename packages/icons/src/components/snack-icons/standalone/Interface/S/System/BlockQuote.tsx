// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const BlockQuoteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-block-quote';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M6.46 4.803c-.861.144-1.748.9-2.039 1.738-.158.457-.18.726-.181 2.187 0 1.474.017 1.657.191 2.032.148.319.571.725.874.839.732.275 1.37.159 1.897-.344.721-.688.734-1.772.029-2.468-.334-.33-.612-.461-1.099-.518l-.379-.044.014-.543c.013-.466.028-.566.104-.711.189-.357.51-.617.83-.671.326-.055.299.018.299-.803V4.76l-.17.005c-.094.002-.26.019-.37.038m5 0c-.861.144-1.748.9-2.039 1.738-.158.457-.18.726-.181 2.187 0 1.474.017 1.657.191 2.032.148.319.571.725.874.839.732.275 1.37.159 1.897-.344.721-.688.734-1.772.029-2.468-.334-.33-.612-.461-1.099-.518l-.379-.044.014-.543c.013-.466.028-.566.104-.711.189-.357.51-.617.83-.671.326-.055.299.018.299-.803V4.76l-.17.005c-.093.002-.26.019-.37.038M15 6v.76h5V5.24h-5zm0 4v.76h5V9.24h-5zm-8.833-.174c.152.138.045.414-.16.414-.16 0-.247-.108-.247-.306V9.76h.167c.099 0 .196.027.24.066m5 0c.152.138.045.414-.16.414-.16 0-.247-.108-.247-.306V9.76h.167c.099 0 .196.027.24.066M4 14v.76h16v-1.52H4zm0 4v.76h16v-1.52H4z'
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
export default BlockQuoteSVG;

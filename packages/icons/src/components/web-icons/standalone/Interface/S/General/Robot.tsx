// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const RobotSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-robot';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path d='M11.24 4.16v1.16h-.104c-.172 0-.863.152-1.2.264-1.74.578-3.158 1.817-3.994 3.49a6.866 6.866 0 0 0-.596 1.842l-.046.304-1.03.011-1.03.01v4.519h2v3.54l1.23 1.23 1.23 1.23h8.6l1.23-1.23 1.23-1.23v-3.54h2v-4.519l-1.03-.01-1.03-.011-.046-.304c-.278-1.823-1.472-3.603-3.114-4.641a8.561 8.561 0 0 0-1.476-.691c-.338-.112-1.029-.264-1.2-.264h-.104V3h-1.52zm1.8 2.7a5.128 5.128 0 0 1 2.556 1.362 5.483 5.483 0 0 1 1.548 2.738c.066.275.073.613.085 4.018l.014 3.718-.771.772-.771.772H8.299l-.771-.772-.771-.772.014-3.718c.012-3.405.019-3.743.085-4.018a5.489 5.489 0 0 1 1.541-2.732c.796-.771 1.69-1.221 2.803-1.412.397-.068 1.441-.043 1.84.044m-3.8 5.4V13h1.52v-1.48H9.24zm4 0V13h1.52v-1.48h-1.52z' />
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
export default RobotSVG;

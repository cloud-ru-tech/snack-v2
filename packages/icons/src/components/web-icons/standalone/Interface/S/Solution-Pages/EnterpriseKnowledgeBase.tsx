// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const EnterpriseKnowledgeBaseSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-enterprise-knowledge-base';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M12.023 4.285c-1.005.08-2.027.513-2.864 1.212C7.962 6.498 7.24 8.103 7.24 9.764V10h1.509l.023-.51c.014-.305.056-.633.104-.816.353-1.357 1.322-2.381 2.632-2.781.319-.097.412-.107.992-.107s.673.01.992.107c1.292.395 2.241 1.382 2.613 2.718.085.306.107.493.129 1.089l.026.72.7.023c.79.026 1.031.075 1.554.319 1.915.895 2.744 3.188 1.883 5.211-.373.876-1.209 1.691-2.075 2.021-.623.238-.717.246-2.98.246H13.28v1.526l2.17-.018c1.348-.012 2.255-.036 2.394-.063 1.136-.224 2.121-.755 2.878-1.55.823-.865 1.31-1.879 1.481-3.09.065-.455.025-1.402-.077-1.865-.262-1.181-.832-2.167-1.698-2.935a6 6 0 0 0-1.184-.804c-.31-.155-.99-.382-1.264-.422-.239-.035-.3-.077-.3-.207 0-.133-.143-.688-.265-1.032a5.38 5.38 0 0 0-3.359-3.28c-.593-.194-1.326-.271-2.033-.215M3.24 14.718c0 2.044.015 3.726.033 3.738.018.011.905.292 1.97.623l1.986.621c.032.011.087-.106.157-.332l.108-.348.093.3c.051.165.093.323.093.35 0 .028.014.049.03.049.016-.001.93-.259 2.03-.575l2-.573.01-3.785c.008-2.738-.002-3.786-.034-3.786-.024 0-.982.297-2.13.661l-2.086.661-2.086-.661A96 96 0 0 0 3.284 11c-.032 0-.044 1.056-.044 3.718m2.506-1.379c.516.164.955.309.976.322.051.032.051 4.299 0 4.299-.039 0-.263-.068-1.332-.405l-.63-.198v-2.159c0-1.187.011-2.158.024-2.158s.446.135.962.299m4.494 1.899v2.199l-.27.079c-.601.176-1.686.484-1.707.484-.013 0-.023-.973-.023-2.161 0-2.021.005-2.163.07-2.19a57 57 0 0 1 1.88-.605c.039-.003.05.46.05 2.194'
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
export default EnterpriseKnowledgeBaseSVG;

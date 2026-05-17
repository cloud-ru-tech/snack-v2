// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const TrainingCertificateSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-training-certificate';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path d='M5.599 4.28c-1.028.1-1.798.668-2.169 1.601-.165.413-.195.774-.182 2.179l.012 1.28 1.37.011 1.37.01V7.84H4.76v-.614c0-.361.019-.67.046-.75a.98.98 0 0 1 .504-.583c.212-.104.266-.113.69-.113s.478.009.69.113a.98.98 0 0 1 .504.583c.034.101.046 1.876.046 6.89v6.754H10V18.6H8.762l-.012-6.11c-.011-5.606-.018-6.128-.08-6.33-.416-1.352-1.524-2.031-3.071-1.88M10 5v.76h9.24v14.08h1.52V4.24H10zm3.964 7.204c-1.234.19-2.326 1.195-2.631 2.42-.103.415-.094 1.185.019 1.584.144.51.481 1.107.784 1.389l.104.097v1.713c0 1.08.014 1.713.039 1.713.021 0 .53-.216 1.13-.479l1.091-.48 1.089.48c.599.263 1.108.479 1.13.479.027 0 .041-.578.041-1.713v-1.713l.104-.097c.158-.146.448-.566.58-.839.214-.442.291-.802.291-1.358.001-.588-.065-.9-.29-1.376-.396-.839-1.262-1.557-2.125-1.763-.332-.079-1.026-.108-1.356-.057m1.045 1.534a1.75 1.75 0 0 1 1.231 1.66c-.002.829-.62 1.534-1.475 1.683-.847.147-1.726-.421-1.951-1.261-.229-.858.267-1.768 1.126-2.065.251-.087.809-.096 1.069-.017' />
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
export default TrainingCertificateSVG;

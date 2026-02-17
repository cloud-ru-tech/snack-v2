// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const CupSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-cup';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M6.28 4.24v1H3.228l.025.85c.038 1.288.142 1.99.414 2.79.246.725.533 1.223.98 1.701.464.496.919.779 1.605.998l.393.125.129.322a4.944 4.944 0 0 0 1.203 1.766c.553.531 1.286.96 1.973 1.155l.259.073-.022.243c-.059.637-.312 1.567-.592 2.172-.344.746-.908 1.404-1.434 1.675l-.252.13H6v1.52h12v-1.52h-1.895l-.279-.166c-1.021-.606-1.827-2.123-2.008-3.776l-.027-.242.395-.13c1.002-.329 1.824-.909 2.437-1.721a6.92 6.92 0 0 0 .742-1.347c.06-.155.075-.166.339-.235 1.254-.331 2.177-1.258 2.63-2.643.274-.838.378-1.55.413-2.81l.025-.93h-2.971l-.01-.99-.011-.99-5.75-.01-5.75-.01zm10 3.065c0 2.078-.011 2.62-.061 2.957-.277 1.865-1.315 3.021-3.039 3.381-1.047.22-2.385.096-3.238-.298-1.118-.517-1.851-1.569-2.08-2.985-.051-.314-.062-.835-.062-2.99V4.76h8.48zm-10 1.055c0 .88-.014 1.6-.032 1.6-.069 0-.514-.393-.659-.581-.216-.281-.493-.863-.589-1.239-.103-.4-.2-.986-.2-1.21v-.17h1.48zm12.911-1.25c-.101 1.088-.392 1.898-.869 2.42-.182.2-.511.463-.533.426-.005-.009-.004-.731.003-1.606l.012-1.59h1.42zm-6.895 8.193a.609.609 0 0 1 .024.17c0 .059.053.362.117.673.214 1.037.583 1.971 1.078 2.724l.244.37h-1.742c-.958 0-1.733-.013-1.723-.03l.207-.31c.523-.779.982-2.051 1.139-3.16.078-.549.043-.5.356-.5.214 0 .281.014.3.063'
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
export default CupSVG;

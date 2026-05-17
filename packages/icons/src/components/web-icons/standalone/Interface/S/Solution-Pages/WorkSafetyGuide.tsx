// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const WorkSafetyGuideSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-work-safety-guide';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M3.24 9.63c0 5.907 0 5.891.213 6.51.119.349.309.728.52 1.04.217.319.705.802 1.027 1.013.143.095 1.776.931 3.63 1.859L12 21.74l3.37-1.688c1.853-.928 3.487-1.764 3.63-1.859.882-.58 1.535-1.621 1.702-2.713.048-.318.058-1.272.058-5.83V4.2h-1.52v5.511c0 5.413-.001 5.516-.081 5.803-.156.562-.462 1.026-.888 1.347-.16.12-1.344.735-3.26 1.693l-3.01 1.506-1.841-.92c-2.07-1.034-1.929-.927-1.743-1.327.176-.378-.054-.35 3.041-.374 2.637-.021 2.732-.025 3.032-.109.725-.203 1.12-.422 1.58-.875.261-.257.36-.388.467-.62.178-.387.24-.719.211-1.128A2.5 2.5 0 0 0 15.3 12.58c-.629-.302-.671-.307-2.56-.34-1.721-.03-1.862-.044-2.123-.203-.162-.098-.217-.23-.217-.513 0-.443.136-.668.518-.856l.26-.128 2.161-.02 2.161-.02.01-1.87.011-1.87h2.159V4.2H14V9h-1.19c-1.676.001-2.056.056-2.707.393-.369.192-.771.59-.936.928-.469.959-.341 2.059.315 2.715.274.274.51.406.979.548.358.108.364.109 2.039.137 1.749.03 1.821.037 2.18.22a.98.98 0 0 1 .477.499c.097.214.11.592.026.755-.085.164-.365.401-.598.508-.513.234-.452.229-3.447.254l-2.762.023-.304.15a2.7 2.7 0 0 0-.506.332c-.239.215-.5.6-.589.868l-.063.19-.478-.244a6 6 0 0 1-.717-.423c-.416-.313-.724-.782-.878-1.339-.079-.286-.081-.393-.081-5.083V5.64h7.68V4.16h-9.2z'
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
export default WorkSafetyGuideSVG;

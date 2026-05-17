// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const DialogSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-dialog';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M9.9 2.282c-1.689.134-3.333.909-4.549 2.144a7.25 7.25 0 0 0-1.849 7.001c.127.47.404 1.16.615 1.533.116.204.157.316.138.375-.014.047-.321.828-.681 1.737-.36.908-.654 1.668-.654 1.69 0 .024.84.038 2.26.038h2.26v3.32h4.119l3.151 1.145c1.732.63 3.173 1.154 3.2 1.165.039.014.05-.231.05-1.146V20.12h3V8.64h-1.517c-1.711 0-1.533.038-1.583-.34-.077-.588-.324-1.349-.65-1.999-.944-1.885-2.707-3.277-4.834-3.817-.704-.179-1.721-.262-2.476-.202m1.367 1.519c1.324.173 2.5.724 3.436 1.61.47.445.826.914 1.11 1.465.453.878.6 1.493.6 2.504 0 .973-.127 1.546-.54 2.42-.324.689-.61 1.099-1.149 1.654-.94.966-2.011 1.531-3.344 1.763-.305.053-.811.063-3.31.063-1.623 0-2.95-.007-2.95-.016s.189-.495.42-1.079c.231-.585.42-1.072.42-1.082s-.098-.17-.217-.354c-.63-.966-.921-1.852-.97-2.953-.073-1.637.478-3.102 1.607-4.271a5.7 5.7 0 0 1 3.3-1.706 7.2 7.2 0 0 1 1.587-.018M7.68 8.38v.74h6V7.64h-6zm11.76 6v4.26h-3v.825c0 .766-.005.823-.07.805-.038-.011-1.065-.382-2.281-.825l-2.21-.805H8.96V16.8h.896c1.37 0 2.079-.096 2.973-.405a7.63 7.63 0 0 0 4.948-5.524 5 5 0 0 0 .103-.579c0-.065.012-.131.027-.145.014-.015.365-.027.78-.027h.753zm-11.76-3v.74h6v-1.48h-6z'
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
export default DialogSVG;

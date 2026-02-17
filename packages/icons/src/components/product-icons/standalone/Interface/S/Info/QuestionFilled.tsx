// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const QuestionFilledSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-question-filled';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path d='M11.393 4.282A7.847 7.847 0 0 0 7.1 6c-.382.314-1.038.996-1.307 1.361-1.118 1.512-1.669 3.403-1.52 5.209a7.25 7.25 0 0 0 .393 1.91 7.793 7.793 0 0 0 3.101 4.01c.74.487 1.812.928 2.693 1.108a8.1 8.1 0 0 0 3.08 0c1.162-.237 2.429-.836 3.341-1.579.367-.3 1.064-1.024 1.327-1.38 1.116-1.512 1.672-3.417 1.518-5.209a7.333 7.333 0 0 0-.392-1.91c-.405-1.204-1.032-2.186-1.979-3.101-1.328-1.282-2.957-2.004-4.828-2.139a10.77 10.77 0 0 0-.627-.034zm1.247 3.044c.74.143 1.49.708 1.815 1.367.196.398.273.759.273 1.287-.001.736-.161 1.26-.554 1.811-.103.144-.489.573-.856.953-.634.654-.782.85-.892 1.186-.021.063-.094.07-.769.07h-.746l.027-.19c.048-.334.243-.831.445-1.135.108-.162.505-.613.883-1.002.813-.838.936-1.035.966-1.549.033-.584-.18-.989-.65-1.237-.178-.094-.248-.107-.582-.107-.334 0-.404.013-.582.107-.386.203-.658.617-.658 1V10H9.237l.025-.21c.069-.603.192-.957.483-1.397.602-.908 1.673-1.303 2.895-1.067m-.28 9.174v.74h-1.48v-1.48h1.48z' />
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
export default QuestionFilledSVG;

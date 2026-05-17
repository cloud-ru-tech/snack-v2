// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const HardDriveSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-hard-drive';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M3.24 12v8.76h17.52V3.24H3.24zm16 0v7.24h-4.8c-2.64 0-4.8-.007-4.8-.016 0-.017.723-1.759.736-1.773.005-.005.157.027.339.07 2.021.483 4.194-.225 5.569-1.814.792-.915 1.24-1.975 1.362-3.221.172-1.76-.586-3.626-1.938-4.769-.96-.811-2.002-1.248-3.239-1.356a5.64 5.64 0 0 0-4.733 1.911c-.806.92-1.259 1.983-1.383 3.248a5.7 5.7 0 0 0 .126 1.78c.041.175.071.324.065.329-.013.013-1.751.731-1.77.731-.008 0-.014-2.16-.014-4.8v-4.8h14.48zm-6.23-4.046c1.657.44 2.869 1.78 3.112 3.443.065.444.028 1.21-.077 1.613-.314 1.197-1.108 2.183-2.185 2.712-.601.296-1.011.401-1.66.427-.503.019-1.052-.027-1.183-.1-.039-.022.198-.632.929-2.389l1.056-2.549.076-.188-.089.035c-.049.019-1.195.495-2.548 1.057-1.671.695-2.467 1.007-2.487.976-.069-.112-.123-.758-.102-1.21a3.9 3.9 0 0 1 .547-1.874c.586-1.025 1.663-1.783 2.854-2.01.418-.08 1.355-.049 1.757.057m-2.73 5.781c0 .008-.511 1.245-1.135 2.75L8.011 19.22l-1.626.01-1.626.011.011-1.626.01-1.626 2.72-1.132c2.629-1.093 2.78-1.154 2.78-1.122'
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
export default HardDriveSVG;

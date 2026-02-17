// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const KeySVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-key';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M15.18 2.283a6.056 6.056 0 0 0-3.496 1.487c-1.035.902-1.759 2.22-1.983 3.611-.108.671-.06 1.837.098 2.379l.041.14-3.3 3.3-3.3 3.3v4.26H7.5l3.305-3.305 3.305-3.305.144.048c.482.159 1.685.211 2.365.101 2.165-.348 3.996-1.842 4.746-3.871A6.018 6.018 0 0 0 19.98 4.06c-.497-.496-.913-.808-1.473-1.103a6.077 6.077 0 0 0-3.327-.674m1.28 1.54c1.906.331 3.411 1.845 3.719 3.74a4.56 4.56 0 0 1-3.314 5.153 4.325 4.325 0 0 1-1.852.104c-.954-.155-1.762-.547-2.429-1.18-1.416-1.342-1.838-3.379-1.069-5.153.507-1.169 1.562-2.126 2.762-2.504a4.734 4.734 0 0 1 2.183-.16m-.211 3.167.011.79h1.48l.011-.79.011-.79h-1.524zm-5.685 4.56c.391.645 1.24 1.493 1.89 1.888l.154.094-2.854 2.854L6.9 19.24H4.76V17.1l2.85-2.85a813.6 813.6 0 0 1 2.857-2.85c.003 0 .047.067.097.15'
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
export default KeySVG;

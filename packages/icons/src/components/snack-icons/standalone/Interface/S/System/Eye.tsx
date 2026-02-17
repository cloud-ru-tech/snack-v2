// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const EyeSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-eye';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M5.49 6.95 2.24 9.66V14.347l3.248 2.707 3.248 2.706h6.528l3.248-2.706 3.248-2.707V9.66l-3.25-2.71-3.25-2.709H8.74zm11.999 1.101 2.749 2.289.001 1.66.001 1.661-2.748 2.289-2.748 2.29H9.256l-2.748-2.29-2.748-2.289L3.761 12l.001-1.66 2.749-2.289 2.749-2.29h5.48zm-6.269-.228c-1.693.297-2.97 1.516-3.369 3.216-.1.423-.1 1.499 0 1.922.228.97.722 1.771 1.456 2.359.564.452 1.2.735 1.943.864.458.08 1.312.059 1.743-.043 1.682-.396 2.895-1.686 3.191-3.391.079-.454.059-1.312-.041-1.734-.4-1.697-1.679-2.9-3.398-3.195a5.23 5.23 0 0 0-1.525.002m1.52 1.521c.712.168 1.379.694 1.693 1.337.238.486.292.731.292 1.319s-.054.833-.292 1.319c-.307.627-.884 1.095-1.633 1.326-.245.076-.391.092-.8.092-.409 0-.555-.016-.8-.092-.749-.231-1.326-.699-1.633-1.326-.238-.486-.292-.731-.292-1.319s.054-.833.292-1.319c.292-.596.867-1.08 1.547-1.3.431-.14 1.124-.156 1.626-.037'
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
export default EyeSVG;

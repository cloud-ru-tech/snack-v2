// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const UpdateSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-update';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path d='m18.593 5.346-1.146 1.147-.314-.29c-.891-.826-2.291-1.528-3.553-1.784-2.298-.465-4.697.12-6.48 1.581-.382.314-1.038.996-1.307 1.361A7.885 7.885 0 0 0 4.282 11.3a9.9 9.9 0 0 0-.042.57V12h1.508l.026-.393a6.256 6.256 0 0 1 .685-2.477 6.323 6.323 0 0 1 3.612-3.065c.714-.231 1.077-.283 1.969-.282.841.002 1.265.064 1.92.282.734.244 1.648.772 2.16 1.248l.26.241-1.1 1.103-1.099 1.103H19.76V6.98c0-1.529-.005-2.78-.01-2.78-.006 0-.526.516-1.157 1.146m-.367 7.044a6.175 6.175 0 0 1-1.891 4.092c-.57.55-.999.846-1.702 1.174-.817.382-1.481.54-2.401.572-.913.032-1.639-.079-2.414-.37-.68-.255-1.463-.729-1.945-1.178l-.253-.234 1.1-1.103 1.099-1.103H4.24V19.819l1.154-1.153 1.154-1.153.326.292a7.17 7.17 0 0 0 1.566 1.07 7.643 7.643 0 0 0 6.04.459c1.204-.405 2.186-1.032 3.101-1.979a7.359 7.359 0 0 0 1.755-2.88c.248-.735.424-1.708.424-2.342V12h-1.508z' />
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
export default UpdateSVG;

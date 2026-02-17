// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const DiamondSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-diamond';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path d='M4.976 5.09C2.172 9.321 2.073 9.475 2.107 9.531 2.177 9.649 11.97 21.12 12 21.12c.036 0 9.876-11.541 9.902-11.614.01-.025-.907-1.441-2.037-3.146l-2.053-3.1-5.805-.01-5.806-.01zm3.84.7a366.38 366.38 0 0 1-.648 1.97l-.315.94-1.726.01c-.95.006-1.727.002-1.727-.008 0-.011.584-.902 1.298-1.981L6.996 4.76H9.151zm5.094.92c.358 1.073.65 1.964.65 1.98 0 .017-1.152.03-2.56.03-1.408 0-2.56-.013-2.56-.03 0-.016.292-.907.65-1.98l.649-1.95h2.522zm4.392.012c.714 1.079 1.298 1.97 1.298 1.98 0 .01-.777.014-1.727.008l-1.726-.01-.355-1.06c-.194-.583-.486-1.47-.649-1.97l-.294-.91h2.154zM8.726 13.08c.479 1.573.867 2.874.862 2.891-.005.017-1.002-1.135-2.215-2.56A3090.3 3090.3 0 0 0 4.9 10.51l-.267-.311 1.611.011 1.61.01zm5.834-2.843c0 .062-2.507 8.284-2.535 8.311a.035.035 0 0 1-.05 0c-.027-.027-2.535-8.246-2.535-8.309 0-.025.91-.039 2.56-.039 1.542 0 2.56.015 2.56.037m4.111.774-2.469 2.899c-.978 1.148-1.784 2.081-1.792 2.074-.013-.014 1.701-5.691 1.737-5.754.01-.017.737-.03 1.616-.03h1.598z' />
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
export default DiamondSVG;

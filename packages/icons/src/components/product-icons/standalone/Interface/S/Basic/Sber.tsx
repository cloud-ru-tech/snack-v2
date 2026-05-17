// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const SberSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-sber';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M11.34 3.28a8.7 8.7 0 0 0-5.521 2.54c-1.344 1.343-2.192 3.027-2.485 4.94-.096.63-.096 1.85 0 2.48.398 2.594 1.87 4.839 4.07 6.205 1.518.943 3.456 1.42 5.206 1.282 2.846-.225 5.348-1.737 6.835-4.131.938-1.51 1.411-3.411 1.279-5.144-.061-.807-.071-.853-.179-.85-.047.002-.373.052-.725.112l-.64.11.02.278c.037.514.016 1.715-.035 2.018a7.3 7.3 0 0 1-2.045 3.992c-1.037 1.042-2.281 1.708-3.76 2.013-.404.084-.569.095-1.36.095s-.956-.011-1.36-.095c-1.461-.301-2.72-.97-3.731-1.981-1.122-1.122-1.79-2.418-2.075-4.024-.071-.4-.071-1.84 0-2.24.282-1.593.953-2.9 2.049-3.997s2.406-1.768 3.997-2.049c.4-.071 1.755-.071 2.2 0 1.282.204 2.57.779 3.5 1.562l.373.31.133.108.527-.53.527-.529-.18-.16c-.726-.646-1.316-1.049-2.1-1.435a8.7 8.7 0 0 0-4.52-.88m4.21 6.46c-1.93 1.287-3.528 2.34-3.55 2.34-.023 0-.608-.378-1.3-.84a53 53 0 0 0-1.279-.84c-.022 0-.821 1.186-.821 1.219 0 .031 3.353 2.261 3.4 2.261.033 0 7.797-5.153 7.889-5.236.029-.026-.741-1.215-.799-1.234-.016-.005-1.609 1.043-3.54 2.33'
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
export default SberSVG;

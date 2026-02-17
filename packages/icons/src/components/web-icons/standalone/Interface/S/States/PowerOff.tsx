// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const PowerOffSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-power-off';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='m11.25 5.01.01 2.49h1.48l.01-2.49.011-2.49h-1.522zm-3.171-.319c-.97.488-1.599.949-2.34 1.714-.952.984-1.623 2.077-2.037 3.321A8.743 8.743 0 0 0 8.18 20.362a8.396 8.396 0 0 0 3.82.878c1.38 0 2.582-.276 3.82-.878a8.748 8.748 0 0 0 4.757-9.602c-.451-2.245-1.827-4.279-3.769-5.571-.437-.291-1.48-.813-1.527-.765-.019.02-.153.333-.298.696-.186.464-.249.665-.213.676.027.01.257.121.51.248 1.9.952 3.351 2.818 3.793 4.877.189.878.215 1.999.066 2.839a7.575 7.575 0 0 1-.965 2.52c-.883 1.441-2.274 2.555-3.848 3.081a7.105 7.105 0 0 1-4.652 0C7.6 18.668 5.9 16.986 5.159 14.893c-.45-1.273-.521-2.752-.198-4.129.464-1.977 1.911-3.794 3.759-4.72.253-.127.483-.238.511-.248.035-.011-.03-.217-.222-.693-.149-.373-.29-.683-.312-.691-.022-.007-.3.118-.618.279'
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
export default PowerOffSVG;

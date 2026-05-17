// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const Heading3SVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-heading3';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M5.24 12v7h1.52v-6.24h6.48V19h1.52V5h-1.52v6.24H6.76V5H5.24zm12.222.284c-.834.124-1.498.649-1.601 1.266l-.028.17h.76c.74 0 .759.002.739.08-.025.096-.021.096.162.02.2-.084.569-.075.775.018.287.131.274.394-.03.59-.284.182-.329.226-.402.387-.206.452.041.94.539 1.067.395.1.483.227.455.655-.022.349-.102.51-.299.605-.185.089-.738.123-1.052.066-.238-.044-.274-.037-.21.041a.4.4 0 0 1 .056.151l.014.1-.752.011-.751.011.026.149c.123.692.865 1.069 2.097 1.065.797-.002 1.333-.189 1.755-.611.769-.771.858-2.201.188-3.025l-.13-.16.084-.18c.07-.152.083-.257.083-.681 0-.484-.004-.51-.129-.763-.232-.47-.736-.847-1.301-.973-.349-.077-.767-.101-1.048-.059'
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
export default Heading3SVG;

// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const AiSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-ai';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path d='M8.24 3.62v.62H6.7L5.47 5.47 4.24 6.7v1.54H3v1.52h1.24v1.48H3v1.52h1.24v1.48H3v1.52h1.24v1.54l1.23 1.23 1.23 1.23h1.54V21h1.52v-1.24h1.48V21h1.52v-1.24h1.48V21h1.52v-1.24h1.54l1.23-1.23 1.23-1.23v-1.54H21v-1.52h-1.24v-1.48H21v-1.52h-1.24V9.76H21V8.24h-1.24V6.7l-1.23-1.23-1.23-1.23h-1.54V3h-1.52v1.24h-1.48V3h-1.52v1.24H9.76V3H8.24zm9.23 2.91.77.771v9.398l-.77.771-.769.77H7.299l-.769-.77-.77-.771V7.301l.77-.771.769-.77h9.402zM9.871 8.28c-.187.056-.39.202-.455.327-.034.066-.473 1.257-.975 2.646a938.15 938.15 0 0 1-1.096 3.021c-.224.605-.244.706-.184.928.154.574.938.737 1.294.268.054-.071.224-.472.377-.89l.278-.76 1.199-.011 1.199-.01.232.61c.431 1.138.481 1.213.871 1.317.463.124.964-.32.899-.796-.011-.082-.196-.609-.41-1.17-.214-.561-.72-1.938-1.125-3.06-.404-1.122-.768-2.084-.808-2.138a.734.734 0 0 0-.43-.284c-.192-.044-.717-.043-.866.002m4.914.008c-.235.064-.448.299-.504.558-.033.154-.043 1.067-.034 3.274.012 2.923.016 3.067.09 3.215.277.557 1.088.538 1.348-.033.069-.153.073-.342.074-3.293.001-3.387.007-3.289-.211-3.522a.784.784 0 0 0-.763-.199m-4.106 3.242.271.75h-.639c-.494 0-.636-.011-.622-.05l.314-.881.297-.831.054.131c.03.072.176.468.325.881' />
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
export default AiSVG;

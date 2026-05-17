// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const MicrophoneRoundSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-microphone-round';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M14.938 3.281a5.36 5.36 0 0 0-4.309 2.9 5.5 5.5 0 0 0-.54 1.866l-.029.307-3.536 4.432-3.537 4.433 1.916 1.886 1.916 1.887.14-.111c2.967-2.33 9.149-7.081 9.215-7.081.047 0 .266-.044.486-.097 2.887-.701 4.645-3.589 3.921-6.443a5.32 5.32 0 0 0-3.945-3.858c-.273-.065-1.228-.178-1.316-.156-.011.003-.183.019-.382.035m1.442 1.595c.657.17 1.465.659 1.893 1.145.41.466.716 1.049.871 1.659.112.442.103 1.378-.018 1.82-.092.337-.383.991-.474 1.066-.042.035-.61-.509-2.681-2.571-1.445-1.438-2.627-2.624-2.626-2.635.006-.063.782-.402 1.083-.474.514-.122.505-.122 1.092-.107.379.01.636.039.86.097m-1.453 4.198 2.649 2.633-.265.148c-1.531.856-3.456.583-4.654-.661-.546-.568-.855-1.14-1.021-1.894-.085-.384-.067-1.214.036-1.628.117-.474.467-1.232.569-1.232.021 0 1.23 1.185 2.686 2.634m-4.345 1.753c.378.828 1.213 1.754 2.026 2.247.256.156.767.394 1.004.469.125.039.227.082.225.094-.002.019-6.105 4.761-6.729 5.229l-.168.127-.972-.947-.971-.946 2.691-3.37c2.394-2.997 2.696-3.359 2.727-3.28.02.05.095.219.167.377'
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
export default MicrophoneRoundSVG;

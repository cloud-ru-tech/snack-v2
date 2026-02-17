// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const CleanSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-clean';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path d='M8.564 9.416c-3.087 3-5.609 5.471-5.606 5.49.004.019 1.122 1.118 2.486 2.444l2.478 2.41H19.44v-1.52l-3.071-.01-3.071-.01 3.889-3.78 3.889-3.78-.288-.285c-.249-.246-5.857-5.689-6.409-6.221l-.202-.194zM4.603 5.107c-.229.524-.436.974-.46.999-.023.025-.466.221-.983.435-.517.214-.974.406-1.016.428-.061.033.113.118.95.467.564.235 1.04.444 1.059.465.018.022.22.466.449.988.228.523.427.937.441.92.015-.016.212-.452.437-.969.226-.517.431-.953.455-.968.024-.016.49-.213 1.034-.439.545-.226.991-.42.991-.432-.001-.012-.463-.213-1.028-.447l-1.028-.427-.409-.933a40.242 40.242 0 0 0-.442-.987c-.022-.035-.176.275-.45.9m12.449 3.731 1.871 1.818-.331.326c-.367.361-4.714 4.577-4.979 4.83l-.166.158-2.354-2.289c-1.294-1.26-2.353-2.302-2.353-2.316 0-.014 1.224-1.216 2.72-2.671l2.719-2.647.501.487zm-7.035 5.888 2.35 2.286-.613.614-.613.614H8.51l-1.165-1.135-1.719-1.67-.555-.535 1.267-1.23c.697-.677 1.281-1.23 1.298-1.23.016 0 1.088 1.029 2.381 2.286' />
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
export default CleanSVG;

// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const RoundUserPlusSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-round-user-plus';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M11.34 3.281A8.68 8.68 0 0 0 5.819 5.82c-1.344 1.343-2.192 3.027-2.485 4.94-.096.63-.096 1.85 0 2.48.398 2.594 1.87 4.839 4.07 6.205 1.416.879 3.29 1.378 4.876 1.297.897-.045 1.88-.217 1.88-.328 0-.046-.32-1.376-.337-1.402a3 3 0 0 0-.304.066c-.812.202-2.098.214-2.965.028a7.3 7.3 0 0 1-2.829-1.259l-.294-.217.934-.935.934-.935H14v-1.52H8.701l-1.164 1.163-1.164 1.164-.202-.274c-.698-.947-1.12-1.947-1.337-3.173-.071-.4-.071-1.84 0-2.24.282-1.593.953-2.9 2.049-3.997s2.404-1.767 3.997-2.049c.398-.071 1.839-.071 2.24-.001 1.567.276 2.907.964 3.995 2.052s1.776 2.428 2.052 3.995c.081.463.069 1.846-.021 2.32-.04.209-.081.434-.092.5l-.02.12.721.185.721.185.064-.281c.557-2.448-.011-5.1-1.527-7.137-1.376-1.848-3.509-3.114-5.773-3.427a10.4 10.4 0 0 0-1.9-.064m.277 4.002c-.585.069-1.098.328-1.552.781a2.7 2.7 0 0 0-.693 1.116c-.091.277-.105.387-.105.82s.014.543.105.82c.146.44.357.781.692 1.116s.676.546 1.116.692c.277.091.387.105.82.105s.543-.014.82-.105c.44-.146.781-.357 1.116-.692s.546-.676.692-1.116c.091-.277.105-.387.105-.82s-.014-.543-.105-.82c-.425-1.294-1.642-2.06-3.011-1.897m.911 1.59c.239.117.481.359.599.599.133.27.133.787 0 1.057-.464.943-1.795.943-2.252 0a1.43 1.43 0 0 1-.074-.871c.097-.348.43-.703.785-.838.232-.088.708-.061.942.053m4.712 7.247v1.12H15v1.52h2.24V21h1.52v-2.24H21v-1.52h-2.24V15h-1.52z'
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
export default RoundUserPlusSVG;

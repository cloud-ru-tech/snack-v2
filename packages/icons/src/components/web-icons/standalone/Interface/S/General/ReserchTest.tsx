// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const ReserchTestSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-reserch-test';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M7.52 4.717 3.46 7.066V16.937l4.06 2.349a543.054 543.054 0 0 0 4.087 2.351c.015.002.104-.132.198-.297.094-.165.182-.3.195-.3.013 0 .101.135.195.3.094.165.183.299.198.297.015-.002 1.854-1.06 4.087-2.352l4.06-2.348v-9.87l-4.076-2.354a1065.63 1065.63 0 0 0-4.087-2.353c-.006 0-.088.135-.182.3-.094.165-.182.3-.195.3-.013 0-.101-.135-.195-.3-.094-.165-.183-.298-.198-.296-.015.002-1.854 1.061-4.087 2.353M12 6.9h.74l.02-1.291.02-1.29 3.13 1.806 3.13 1.807v8.14l-3.106 1.794c-1.708.987-3.121 1.8-3.14 1.807-.019.008-.034-.564-.034-1.27V17.12h-1.52v1.283c0 .706-.015 1.278-.034 1.27-.019-.007-1.432-.82-3.14-1.807L4.96 16.072v-8.14l3.13-1.807 3.13-1.806.02 1.29.02 1.291zm-4.3 3.34L5.94 12l1.76 1.76 1.759 1.76.531-.53.53-.529-1.23-1.231L8.06 12l1.24-1.24 1.239-1.24L10.02 9a9.5 9.5 0 0 0-.54-.52c-.011 0-.812.792-1.78 1.76M13.98 9l-.519.52 1.239 1.24L15.94 12l-1.23 1.23-1.23 1.231.53.529.531.53 1.759-1.76L18.06 12l-1.76-1.76c-.968-.968-1.769-1.76-1.78-1.76a9.5 9.5 0 0 0-.54.52'
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
export default ReserchTestSVG;

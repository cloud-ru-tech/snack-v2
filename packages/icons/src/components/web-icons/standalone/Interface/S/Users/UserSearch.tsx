// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const UserSearchSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-user-search';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M10.857 3.28C8.688 3.433 6.6 4.51 5.174 6.211a8.231 8.231 0 0 0 .002 10.578c1.46 1.737 3.441 2.752 5.733 2.939 1.983.161 4.136-.498 5.691-1.743l.18-.144 1.84 1.837 1.84 1.836.54-.517.54-.517-1.849-1.85-1.85-1.85.144-.18c1.457-1.821 2.075-4.374 1.615-6.669a8.269 8.269 0 0 0-5.139-6.129c-1.076-.42-2.372-.608-3.604-.522m1.531 1.541a6.733 6.733 0 0 1 5.791 5.791 6.75 6.75 0 0 1-.917 4.389c-.182.299-.46.679-.497.679-.014 0-.502-.477-1.085-1.06l-1.059-1.06-3.121-.002-3.12-.002-1.063 1.088-1.063 1.088-.179-.236c-1.023-1.35-1.481-3.132-1.254-4.884a6.619 6.619 0 0 1 1.917-3.874 6.684 6.684 0 0 1 5.65-1.917M11.1 7.025c-.7.109-1.377.548-1.793 1.164-.501.74-.564 1.781-.159 2.606.191.388.706.923 1.096 1.139.738.408 1.776.408 2.512 0 .324-.18.863-.71 1.032-1.014.286-.514.402-1.213.294-1.768a2.692 2.692 0 0 0-1.842-2.05c-.219-.066-.912-.112-1.14-.077m.843 1.571c.737.335.896 1.32.299 1.858-.238.214-.412.28-.742.28-.336 0-.51-.068-.753-.292-.587-.541-.425-1.512.308-1.845.222-.101.666-.102.888-.001m2.917 7.327.84.842-.14.12c-.357.307-1.108.713-1.771.959a6.79 6.79 0 0 1-4.578 0c-.649-.241-1.325-.602-1.739-.93l-.152-.121.828-.856.829-.857h5.044z'
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
export default UserSearchSVG;

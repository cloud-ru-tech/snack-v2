// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const QuestionSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-question';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M11.36 3.281c-2.488.165-4.867 1.468-6.373 3.491a8.9 8.9 0 0 0-1.653 3.988c-.096.63-.096 1.85 0 2.48.293 1.913 1.139 3.595 2.485 4.941a8.7 8.7 0 0 0 8.941 2.116 8.6 8.6 0 0 0 3.421-2.116c1.502-1.502 2.376-3.415 2.546-5.571.214-2.714-.976-5.533-3.073-7.281-1.793-1.494-3.97-2.203-6.294-2.048m1.872 1.575a7.25 7.25 0 0 1 3.883 2.029c1.088 1.088 1.776 2.428 2.052 3.995.032.183.052.62.052 1.12s-.02.937-.052 1.12c-.274 1.559-.957 2.894-2.041 3.988q-1.545 1.558-3.766 2.017c-.404.084-.569.095-1.36.095s-.956-.011-1.36-.095c-1.461-.301-2.72-.97-3.731-1.981-1.122-1.122-1.79-2.418-2.075-4.024-.071-.4-.071-1.84 0-2.24q.207-1.17.666-2.079A7.31 7.31 0 0 1 11.147 4.8c.402-.051 1.696-.016 2.085.056m-1.686 2.43c-.984.092-1.779.562-2.284 1.349-.287.447-.5 1.088-.501 1.515l-.001.17h.739c.835 0 .741.04.802-.34.04-.242.204-.557.393-.752.751-.772 2.451-.553 2.896.373.209.434.194 1.079-.035 1.559-.108.226-.249.383-1.077 1.2-.523.517-1.036 1.057-1.139 1.2-.33.457-.539.957-.539 1.287V15h1.469l.066-.17c.113-.294.437-.674 1.199-1.404.99-.949 1.259-1.286 1.485-1.864.171-.437.233-.846.211-1.402-.023-.569-.12-.937-.362-1.367-.588-1.045-1.902-1.641-3.322-1.507M10.8 16.76v.76h1.48V16H10.8z'
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
export default QuestionSVG;

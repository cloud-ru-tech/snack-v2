// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const BubblesQuestionSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-bubbles-question';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M9.78 2.282c-2.738.189-5.137 2.014-6.084 4.628-.313.861-.432 1.575-.432 2.57 0 1.222.236 2.284.721 3.249l.175.35-.605 1.51a100 100 0 0 0-.625 1.581c-.018.066.103.07 2.145.07H7.24v2.52h4.08l2.96 1.48 2.96 1.48v-2.96h3.52V8.24h-1.761c-1.375 0-1.764-.011-1.775-.05-.008-.028-.054-.23-.104-.45a7.15 7.15 0 0 0-3.122-4.406A7 7 0 0 0 9.78 2.282m1.3 1.536c2.398.364 4.278 2.252 4.662 4.682.073.463.073 1.345-.001 1.78-.2 1.187-.708 2.147-1.566 2.96-.903.855-2 1.342-3.329 1.478-.409.041-5.726.062-5.726.022 0-.01.163-.426.361-.923l.362-.905-.207-.323c-.594-.926-.874-1.941-.875-3.169 0-2.823 1.965-5.165 4.699-5.6a6.3 6.3 0 0 1 1.62-.002M9.717 5.217c-.649.143-1.358.683-1.656 1.261a2.9 2.9 0 0 0-.226.845l-.011.217.743.011.744.011.028-.15c.084-.449.464-.742.958-.74.326.002.55.098.743.317.176.2.222.361.187.656-.065.544-.785 1.296-1.657 1.729l-.33.164V11h1.52l.001-.29.002-.29.251-.169c.324-.219.86-.717 1.084-1.008.683-.888.836-1.902.416-2.763-.183-.375-.677-.86-1.074-1.054a2.77 2.77 0 0 0-1.723-.209M19.24 13.5v3.74h-3.48v1.02c0 .561-.009 1.02-.02 1.02s-.938-.459-2.06-1.02l-2.04-1.02H8.76v-1h1.06c1.337 0 1.885-.072 2.78-.367a6.66 6.66 0 0 0 2.673-1.61q1.762-1.704 2.029-4.273l.024-.23h1.914zm-9.991-.75.011.75h1.48l.011-.75.011-.75H9.238z'
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
export default BubblesQuestionSVG;

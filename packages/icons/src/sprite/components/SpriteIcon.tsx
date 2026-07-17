'use client';

import { forwardRef, ReactNode, Ref, useEffect, useState } from 'react';

import { ISvgIconProps } from '../../types';
import { subscribeSpriteMounted } from '../registry';

export type SpriteIconProps = ISvgIconProps & {
  /** id символа спрайта, на который ссылается `<use href="#...">` (см. манифест `SPRITE_SYMBOL_IDS`). */
  symbolId: string;
  /** Суффикс data-test-id (итоговый атрибут — `icon${testId}`); переопределяется явным `data-test-id`. */
  testId?: string;
  /** Что рендерить внутри `<svg>`, пока символа нет в DOM (спрайт не смонтирован или id неизвестен). */
  fallback?: ReactNode;
};

/**
 * Динамическая sprite-иконка: рендерит `<use href="#symbolId">` на символ смонтированного
 * спрайта. Для сценариев, где id иконки известен только в рантайме (например, приходит из CMS) —
 * глиф не попадает в бандл, его приносит спрайт.
 *
 * Модель рендера — fallback-first: SSR и первый клиентский рендер — `fallback` (по умолчанию
 * пустой `<svg>` правильного размера, лейаут не прыгает); после маунта иконка проверяет наличие
 * символа в DOM и переключается на `<use>`, а если спрайт грузится асинхронно — дожидается его
 * через подписку на шину `sprite/registry`. Отсутствие символа — штатный режим (иконка остаётся
 * на fallback), предупреждений в консоль нет.
 *
 * Статически сгенерированные иконки пакета построены на этом же компоненте через
 * `createSpriteIcon` (у них fallback — инлайн-копия глифа).
 */
export const SpriteIcon = forwardRef(
  ({ symbolId, testId = '', fallback = null, size = 24, ...props }: SpriteIconProps, ref: Ref<SVGSVGElement>) => {
    props.width = undefined;
    props.height = undefined;

    const [useFallback, setUseFallback] = useState(true);

    useEffect(() => {
      if (document.getElementById(symbolId)) {
        setUseFallback(false);

        return;
      }

      // symbolId мог смениться с существующего на отсутствующий — возвращаемся на fallback.
      setUseFallback(true);

      return subscribeSpriteMounted(() => {
        if (document.getElementById(symbolId)) setUseFallback(false);
      });
    }, [symbolId]);

    const isCustomSize = typeof size === 'number';
    if (isCustomSize) {
      props.style = { ...props.style, width: size + 'px', height: size + 'px' };
    }

    return (
      <svg
        ref={ref}
        xmlns='http://www.w3.org/2000/svg'
        width={24}
        height={24}
        fill='currentColor'
        viewBox='0 0 24 24'
        data-test-id={'icon' + testId}
        {...props}
      >
        {useFallback ? fallback : <use href={'#' + symbolId} />}
      </svg>
    );
  },
);

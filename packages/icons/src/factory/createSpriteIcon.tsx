import { forwardRef, Ref } from 'react';

import { SpriteIcon } from '../sprite/components/SpriteIcon';
import { ISvgIconProps } from '../types';

type SpriteIconConfig = {
  /** id символа спрайта, на который ссылается `<use href="#...">`. */
  symbolId: string;
  /** Суффикс data-test-id (итоговый атрибут — `icon${testId}`). */
  testId: string;
  /** Содержимое инлайн-fallback — innerHTML исходного SVG без обёртки `<svg>`. */
  fallback: string;
  /** Дефолт пропа `size`. */
  defaultSize?: number;
};

/**
 * Фабрика статической sprite-иконки: сгенерированные файлы иконок передают только данные
 * (symbolId, testId, fallback), рендер целиком живёт в `SpriteIcon` (см. его JSDoc про
 * fallback-first модель). Отличие от динамического `SpriteIcon` — зашитый инлайн-fallback:
 * иконка видна и без смонтированного спрайта.
 */
export function createSpriteIcon({ symbolId, testId, fallback, defaultSize = 24 }: SpriteIconConfig) {
  // Содержимое — собственный SVG пакета, зашитый на этапе генерации (postProcessIconFallback.ts),
  // пользовательского ввода здесь нет.
  const fallbackNode = <g dangerouslySetInnerHTML={{ __html: fallback }} />;

  return forwardRef(({ size = defaultSize, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => (
    <SpriteIcon ref={ref} symbolId={symbolId} testId={testId} fallback={fallbackNode} size={size} {...props} />
  ));
}

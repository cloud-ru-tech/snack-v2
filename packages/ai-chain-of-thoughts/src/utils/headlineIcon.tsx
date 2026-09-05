import { AiIconGiga } from '@ds/ai-icon-giga';
import { ReactNode } from 'react';

import { TEST_IDS } from '../constants';

/** Размер иконки заголовка в px — тот же бокс, что у ведущей иконки `AiShimmer`. */
export const HEADLINE_ICON_SIZE = 16;

/**
 * Иконка слева от подписи: в неактивном состоянии её нет, `undefined` даёт GigaChat
 * по умолчанию, любой узел подставляется как есть, `null` скрывает слот.
 */
export function resolveHeadlineIcon(active: boolean, icon: ReactNode | undefined, className?: string): ReactNode {
  if (!active) {
    return null;
  }

  if (icon !== undefined) {
    return icon;
  }

  return <AiIconGiga className={className} size={HEADLINE_ICON_SIZE} data-test-id={TEST_IDS.headlineIcon} />;
}

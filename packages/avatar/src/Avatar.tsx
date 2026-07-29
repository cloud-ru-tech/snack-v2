import { Appearance as StatusAppearance, StatusIndicator } from '@ds/status';
import { withInnerRefSupport, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { HTMLAttributes, ReactNode, Ref, useEffect, useState } from 'react';

import { APPEARANCE, SHAPE, SIZE, TEST_IDS } from './constants';
import styles from './styles.module.scss';
import { Appearance, Shape, Size } from './types';
import { AVATAR_TO_STATUS_INDICATOR_SIZE, getAbbreviation } from './utils';

export type AvatarProps = WithSupportProps<{
  /** Имя пользователя для генерации аббревиатуры */
  name: string;
  /** URL изображения аватара */
  src?: string;
  /** Внешний вид (цвет) */
  appearance?: Appearance;
  /** Размер */
  size?: Size;
  /** Форма: круглая или квадратная */
  shape?: Shape;
  /** Отображение двух заглавных символов имени вместо одного */
  showTwoSymbols?: boolean;
  /** Произвольный нод в слот значка (правый-нижний угол). Перекрывает `status`. */
  badge?: ReactNode;
  /**
   * Appearance дефолтного `StatusIndicator` в правом-нижнем углу. Размер
   * индикатора подбирается из `size` аватара автоматически. Полностью
   * настроить значок можно через слот `badge`, который перекрывает `status`.
   */
  status?: StatusAppearance;
  /** CSS-класс */
  className?: string;
  /**
   * Ref на корневой DOM-элемент.
   * Используем явный проп, чтобы не зависеть от `forwardRef` и не тащить type-assertions на экспорт.
   */
  innerRef?: Ref<HTMLDivElement>;
}> &
  HTMLAttributes<HTMLDivElement>;

function resolveBadge(badge: ReactNode, status: StatusAppearance | undefined, size: Size): ReactNode {
  if (badge !== undefined && badge !== null) return badge;
  if (status == null) return null;
  return (
    <StatusIndicator
      size={AVATAR_TO_STATUS_INDICATOR_SIZE[size]}
      appearance={status}
      data-test-id={TEST_IDS.statusIndicator}
    />
  );
}

/**
 * Компонент отображения аватара пользователя.
 *
 * Поддерживает:
 * - Отображение изображения аватара (с fallback на аббревиатуру)
 * - Генерацию аббревиатуры из имени пользователя (1 или 2 символа)
 * - Различные размеры: xs, s, m, l, 3xl, 6xl, 9xl
 * - Различные формы: круглая (rounded) или квадратная (squared)
 * - Различные цветовые схемы: neutral, red, orange, yellow, green, blue, violet, pink
 * - Слот `badge` (любой ReactNode) и шорткат `status` для дефолтного `StatusIndicator`
 */
export function Avatar({
  name,
  src,
  appearance = APPEARANCE.Neutral,
  size = SIZE.M,
  shape = SHAPE.Rounded,
  showTwoSymbols = false,
  badge,
  status,
  className,
  innerRef,
  ...rest
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);
  const numberOfSymbols = showTwoSymbols ? 2 : 1;

  useEffect(() => {
    setImageError(false);
  }, [src]);

  const showImage = Boolean(src) && !imageError;
  const badgeNode = resolveBadge(badge, status, size);

  return (
    <div
      ref={innerRef}
      className={cn(styles.avatar, className)}
      data-size={size}
      data-appearance={appearance}
      data-shape={shape}
      {...rest}
    >
      {showImage ? (
        <img
          className={styles.image}
          src={src}
          onError={() => setImageError(true)}
          alt=''
          aria-hidden='true'
          data-test-id={TEST_IDS.image}
        />
      ) : (
        <div className={styles.abbreviation} data-test-id={TEST_IDS.abbreviation}>
          {getAbbreviation(name, numberOfSymbols)}
        </div>
      )}
      <div className={styles.border} data-test-id={TEST_IDS.border} aria-hidden='true' />
      {badgeNode !== null && (
        <div className={styles.badge} data-test-id={TEST_IDS.badge}>
          {badgeNode}
        </div>
      )}
    </div>
  );
}

withInnerRefSupport(Avatar);

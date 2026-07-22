import { Card, VIEW } from '@ds/card';
import { IconPredefined } from '@ds/icon-predefined';
import { PromoTag } from '@ds/promo-tag';
import { useToggleGroup } from '@ds/toggles';
import { TruncateString } from '@ds/truncate-string';
import { extractSupportProps } from '@ds/utils';
import cn from 'classnames';
import { KeyboardEventHandler } from 'react';

import { SIZE, TEST_IDS } from '../../constants';
import { ToggleCardProps } from '../../types';
import styles from './styles.module.scss';
import { isEmblemPicture, sizeToEmblemSize } from './utils';

const TRUNCATE_DEFAULTS = { title: 1, description: 2 };

/**
 * ToggleCard — кликабельная карточка выбора. Работает внутри `ToggleGroup`:
 * клик / Enter / Space по карточке переключает её значение в контексте группы.
 * Визуальный chrome (acrylic-фон, state-layer выбора, outline, focus-ring)
 * приходит из `@ds/card`; карточка добавляет раскладку контента и клавиатуру.
 */
export function ToggleCard({
  title,
  value,
  description,
  emblem,
  promoBadge,
  size = SIZE.M,
  truncate,
  disabled = false,
  className,
  ...rest
}: ToggleCardProps) {
  const { isChecked, handleClick, multipleSelection } = useToggleGroup({ value });

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = e => {
    if (disabled) return;

    if (e.code === 'Enter' || e.code === 'Space') {
      e.preventDefault();
      handleClick();
    }
  };

  // `?? DEFAULT` вместо spread: явный `truncate={{ description: undefined }}`
  // (сборка объекта из optional-переменной) не должен перетирать дефолт.
  const maxLines = {
    title: truncate?.title ?? TRUNCATE_DEFAULTS.title,
    description: truncate?.description ?? TRUNCATE_DEFAULTS.description,
  };

  return (
    <Card
      className={cn(styles.card, className)}
      view={VIEW.Outline}
      radius={size}
      checked={isChecked}
      disabled={disabled}
      role={multipleSelection ? 'checkbox' : 'radio'}
      aria-checked={isChecked}
      onClick={!disabled ? handleClick : undefined}
      onKeyDown={handleKeyDown}
      data-test-id={TEST_IDS.card}
      {...extractSupportProps(rest)}
    >
      {promoBadge && (
        <div className={styles.promoBadge} data-size={size} data-test-id={TEST_IDS.promoBadge}>
          {/* eslint-disable-next-line jsx-a11y/aria-role */}
          <PromoTag {...(typeof promoBadge === 'string' ? { label: promoBadge } : promoBadge)} role='decor' />
        </div>
      )}

      <div className={styles.content} data-size={size}>
        {emblem && (
          <span
            className={styles.emblem}
            data-test-id={TEST_IDS.cardEmblem}
            aria-hidden={isEmblemPicture(emblem) ? undefined : true}
          >
            {isEmblemPicture(emblem) ? (
              <img className={styles.picture} src={emblem.src} alt={emblem.alt} data-size={sizeToEmblemSize(size)} />
            ) : (
              <IconPredefined {...emblem} size={sizeToEmblemSize(size)} decor={emblem.decor ?? false} />
            )}
          </span>
        )}

        <div className={styles.textContent}>
          <span className={styles.title} data-test-id={TEST_IDS.cardTitle}>
            <TruncateString text={title} maxLines={maxLines.title} />
          </span>

          {description && (
            <span className={styles.description} data-test-id={TEST_IDS.cardDescription}>
              <TruncateString text={description} maxLines={maxLines.description} />
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}

import { Button } from '@ds/button';
import { Divider, VARIANT } from '@ds/divider';
import { TruncateString, TruncateStringProps } from '@ds/truncate-string';
import { CSSProperties, ForwardedRef, MouseEvent, ReactNode, RefObject, useMemo } from 'react';

import { useCollapseLevelContext, useNewListContext } from '../../components/Lists/contexts';
import { TEST_IDS } from '../../constants';
import { listLocale } from '../../locale';
import { stopPropagation } from '../../utils';
import styles from './styles.module.scss';

export type SeparatorProps = {
  label?: string;
  /** Слот иконки слева от label. */
  beforeContent?: ReactNode;
  truncate?: {
    variant?: TruncateStringProps['variant'];
  };
  groupVariant?: 'subtitle' | 'subtitleTertiary';
  divider?: boolean;
  selectButton?: {
    onClick?(e: MouseEvent<HTMLElement>): void;
    indeterminate?: boolean;
    checked?: boolean;
    itemRef?: ForwardedRef<HTMLElement>;
    label?: string;
  };
};

export function Separator({
  label,
  beforeContent,
  truncate,
  divider,
  groupVariant = 'subtitleTertiary',
  selectButton,
}: SeparatorProps) {
  const { size = 'm' } = useNewListContext();
  const { level = 0 } = useCollapseLevelContext();

  const { t } = listLocale.useTranslations();

  const selectButtonJSX = useMemo(() => {
    if (!selectButton) {
      return null;
    }

    const { onClick, checked, itemRef, label } = selectButton;

    return (
      <span className={styles.selectButton} data-size={size}>
        <Button
          view='function'
          appearance='neutral'
          size={size}
          tabIndex={0}
          data-test-id={TEST_IDS.bulkSelectButton}
          onClick={(e: MouseEvent<HTMLElement>) => {
            onClick?.(e);
            e.preventDefault();
            e.stopPropagation();
          }}
          onFocus={stopPropagation}
          innerRef={itemRef as RefObject<HTMLButtonElement>}
          label={label ?? (checked ? t('groupSelectButton.reset') : t('groupSelectButton.select'))}
        />
      </span>
    );
  }, [selectButton, size, t]);

  if (label) {
    return (
      <div
        className={styles.separatorWithLabel}
        data-size={size}
        data-level-one={level === 1 || undefined}
        data-level-more-one={level > 1 || undefined}
        style={{ '--level': level } as CSSProperties}
      >
        <div className={styles.contentWrapper}>
          {beforeContent && (
            <span className={styles.centeredWrapper} aria-hidden>
              {beforeContent}
            </span>
          )}

          <div className={styles.textWrapper}>
            <div className={styles.textContent}>
              <span className={styles.headline} data-group-variant={groupVariant}>
                <TruncateString variant={truncate?.variant} text={label} maxLines={1} />
              </span>
            </div>

            {selectButtonJSX}
          </div>
        </div>

        {/* Figma weight-ось дивайдера = @ds/divider `variant`: subtitle → regular, subtitleTertiary → thin (легаси light).
            Линия подчёркивает строку заголовка целиком, поэтому вынесена из потока. */}
        {divider && (
          <Divider className={styles.divider} variant={groupVariant === 'subtitle' ? VARIANT.Regular : VARIANT.Thin} />
        )}
      </div>
    );
  }

  if (divider) {
    return (
      <div className={styles.separatorWithoutLabel} data-size={size}>
        <Divider variant={VARIANT.Regular} />
      </div>
    );
  }

  return null;
}

import { Button } from '@ds/button';
import { Divider, VARIANT } from '@ds/divider';
import { useLocale } from '@ds/locale';
import { TruncateString, TruncateStringProps } from '@ds/truncate-string';
import { CSSProperties, ForwardedRef, MouseEvent, ReactNode, RefObject, useMemo } from 'react';

import { useCollapseLevelContext, useNewListContext } from '../../components/Lists/contexts';
import { TEST_IDS } from '../../constants';
import { stopPropagation } from '../../utils';
import { SELECT_BUTTON_SIZE_MAP } from './constants';
import styles from './styles.module.scss';

export type SeparatorProps = {
  label?: string;
  /** Слот иконки слева от label (Figma listItemGroup 2945:7298). */
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
  const { size = 's' } = useNewListContext();
  const { level = 0 } = useCollapseLevelContext();

  const { t } = useLocale('List');

  const selectButtonJSX = useMemo(() => {
    if (!selectButton) {
      return null;
    }

    const { onClick, checked, itemRef, label } = selectButton;

    return (
      <span className={styles.selectButton} data-size={size} data-weight={(divider && groupVariant) || undefined}>
        <Button
          view='function'
          appearance='neutral'
          size={SELECT_BUTTON_SIZE_MAP[size]}
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
  }, [divider, groupVariant, selectButton, size, t]);

  if (label) {
    return (
      <div
        className={styles.separatorWithLabel}
        data-size={size}
        data-level-one={level === 1 || undefined}
        data-level-more-one={level > 1 || undefined}
        style={{ '--level': level } as CSSProperties}
      >
        {beforeContent && (
          <span className={styles.beforeContent} aria-hidden>
            {beforeContent}
          </span>
        )}

        <span className={styles.label} data-group-variant={groupVariant}>
          <TruncateString variant={truncate?.variant} text={label} maxLines={1} />
        </span>

        <div className={styles.labelEnd}>
          {selectButtonJSX}

          {/* Figma weight-ось дивайдера = @ds/divider `variant`: subtitle → regular, subtitleTertiary → thin (легаси light). */}
          {divider && (
            <Divider
              className={styles.divider}
              variant={groupVariant === 'subtitle' ? VARIANT.Regular : VARIANT.Thin}
            />
          )}
        </div>
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

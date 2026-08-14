import { Block, SIZE as BLOCK_SIZE } from '@ds/block';
import { APPEARANCE, SIZE, VIEW } from '@ds/button';
import { extractSupportProps } from '@ds/utils';
import cn from 'classnames';
import { useMemo } from 'react';

import { Headline } from '../Headline';
import { useButtonWithTooltip, useGetButtonLabel, useStickyFooterShadow } from './hooks';
import styles from './styles.module.scss';
import { DesktopPageFormProps } from './types';

export function DesktopPageForm({
  children,
  stepper,
  title,
  subtitle,
  className,
  footer,
  sideBlock,
  priceSummary,
  stickyFooter,
  ...rest
}: DesktopPageFormProps) {
  const getButtonLabel = useGetButtonLabel();

  const { sentinelRef, atBottom } = useStickyFooterShadow(stickyFooter);

  const moreItems = useMemo(
    () => [priceSummary?.content].concat(sideBlock?.map(item => item.content)).filter(Boolean),
    [priceSummary?.content, sideBlock],
  );

  const PrimaryButton = useButtonWithTooltip({ view: VIEW.Filled, tooltip: footer?.buttonPrimary.tooltip });
  const SecondaryButton = useButtonWithTooltip({ view: VIEW.Outline, tooltip: footer?.buttonSecondary?.tooltip });
  const AdditionalButton = useButtonWithTooltip({ view: VIEW.Simple, tooltip: footer?.buttonAdditional?.tooltip });

  return (
    <div className={cn(styles.container, className)} {...extractSupportProps(rest)}>
      <Block size={BLOCK_SIZE.L} className={styles.form} contentClassName={styles.formContent}>
        <div className={styles.headline}>
          <Headline title={title} subtitle={subtitle} />
        </div>

        {stepper}

        <div className={styles.body}>{children}</div>

        {footer && (
          <>
            <div
              className={cn(styles.footer, {
                [styles.footerSticky]: stickyFooter,
                [styles.footerStuck]: stickyFooter && !atBottom,
              })}
            >
              {footer.buttonSecondary && (
                <SecondaryButton
                  {...footer.buttonSecondary}
                  size={SIZE.M}
                  appearance={APPEARANCE.Neutral}
                  label={
                    footer.buttonSecondary.variant === 'custom'
                      ? footer.buttonSecondary.label
                      : getButtonLabel(footer.buttonSecondary.variant)
                  }
                />
              )}

              <div className={styles.mainActions}>
                {footer.buttonAdditional && (
                  <AdditionalButton {...footer.buttonAdditional} size={SIZE.M} appearance={APPEARANCE.Neutral} />
                )}

                <PrimaryButton
                  {...footer.buttonPrimary}
                  size={SIZE.M}
                  appearance={APPEARANCE.Primary}
                  label={
                    footer.buttonPrimary.variant === 'custom'
                      ? footer.buttonPrimary.label
                      : getButtonLabel(footer.buttonPrimary.variant)
                  }
                />
              </div>
            </div>

            {stickyFooter && (
              <>
                <div ref={sentinelRef} className={styles.footerSentinel} aria-hidden />
                {/* Замыкающий пустой блок держит нижний отступ формы под прилипшим футером. */}
                {/* <div /> */}
              </>
            )}
          </>
        )}
      </Block>

      {moreItems.length > 0 && (
        <div className={styles.sideItems}>
          {/* sideBlock/priceSummary приносят свою подложку сами (quota-виджет, price-summary).
              Своя `.card`-обёртка давала двойную подложку и расходилась с mobile-PageForm
              (там контент рендерится без карточки) и с легаси-PageForm. */}
          {moreItems.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
      )}
    </div>
  );
}

DesktopPageForm.displayName = 'DesktopPageForm';

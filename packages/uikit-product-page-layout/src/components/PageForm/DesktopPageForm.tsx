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
  subHeader,
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
      <div className={styles.form}>
        <div className={styles.headline}>
          <Headline title={title} subHeader={subHeader} />
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
      </div>

      {moreItems.length > 0 && (
        <div className={styles.sideItems}>
          {moreItems.map((item, index) => (
            <div key={index} className={styles.card}>
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

DesktopPageForm.displayName = 'DesktopPageForm';

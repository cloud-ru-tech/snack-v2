import { APPEARANCE, SIZE, VIEW } from '@ds/button';
import { extractSupportProps } from '@ds/utils';
import cn from 'classnames';
import { useMemo } from 'react';

import { Headline } from '../Headline';
import { useButtonWithTooltip, useGetButtonLabel } from './hooks';
import styles from './styles.module.scss';
import { DesktopPageFormProps } from './types';

export function DesktopPageForm({
  children,
  stepper,
  filters,
  title,
  subHeader,
  className,
  footer,
  sideBlock,
  priceSummary,
  ...rest
}: DesktopPageFormProps) {
  const getButtonLabel = useGetButtonLabel();

  const helperItems = useMemo(
    () => [priceSummary?.content].concat(sideBlock?.map(item => item.content)).filter(Boolean),
    [priceSummary?.content, sideBlock],
  );

  const PrimaryButton = useButtonWithTooltip({ view: VIEW.Filled, tooltip: footer?.buttonPrimary.tooltip });
  const SecondaryButton = useButtonWithTooltip({ view: VIEW.Outline, tooltip: footer?.buttonSecondary?.tooltip });
  const AdditionalButton = useButtonWithTooltip({ view: VIEW.Simple, tooltip: footer?.buttonAdditional?.tooltip });

  return (
    <div className={cn(styles.page, className)} {...extractSupportProps(rest)}>
      <div className={styles.card}>
        <div className={styles.headline}>
          <Headline title={title} subHeader={subHeader} />
        </div>
      </div>

      {stepper && <div className={styles.card}>{stepper}</div>}

      <div className={styles.contentRow}>
        {filters && <div className={cn(styles.card, styles.filters)}>{filters}</div>}

        <div className={styles.mainColumn}>
          {children}

          {footer && (
            <div className={styles.card}>
              <div className={styles.footer}>
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
            </div>
          )}
        </div>

        {helperItems.length > 0 && (
          <div className={styles.helperColumn}>
            {helperItems.map((item, index) => (
              <div key={index} className={styles.card}>
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

DesktopPageForm.displayName = 'DesktopPageForm';

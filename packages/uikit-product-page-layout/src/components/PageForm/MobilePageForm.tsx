import { LAYOUT_TYPE, withLayoutType } from '@ds/adaptive';
import { APPEARANCE, Button, VIEW } from '@ds/button';
import { Dropdown } from '@ds/dropdown';
import { ChevronRightSVG, KebabSVG } from '@ds/icons';
import { Droplist } from '@ds/list';
import { ModalCustom } from '@ds/modal';
import { SIZE, Typography, VARIANT } from '@ds/typography';
import { extractSupportProps } from '@ds/utils';
import cn from 'classnames';
import { useState } from 'react';

import { TEST_IDS } from '../../constants';
import { Headline } from '../Headline';
import { useButtonWithTooltip, useGetButtonLabel } from './hooks';
import styles from './mobileStyles.module.scss';
import { DesktopPageFormProps } from './types';

export type MobilePageFormProps = DesktopPageFormProps;

function MobilePageFormBase({
  children,
  title,
  subHeader,
  className,
  footer,
  stepper,
  filters,
  priceSummary,
  sideBlock,
  ...rest
}: MobilePageFormProps) {
  const PrimaryButton = useButtonWithTooltip({ view: VIEW.Filled, tooltip: footer?.buttonPrimary.tooltip });
  const SecondaryButton = useButtonWithTooltip({ view: VIEW.Outline, tooltip: footer?.buttonSecondary?.tooltip });
  const AdditionalButton = useButtonWithTooltip({ view: VIEW.Simple, tooltip: footer?.buttonAdditional?.tooltip });

  const [openPriceSummary, setOpenPriceSummary] = useState(false);
  const [openMore, setOpenMore] = useState(false);
  const [openMoreContentIndex, setOpenMoreContentIndex] = useState<number | undefined>(undefined);

  const getButtonLabel = useGetButtonLabel();

  return (
    <div className={cn(styles.container, className)} {...extractSupportProps(rest)}>
      <Headline
        title={title}
        subHeader={subHeader}
        moreActions={
          sideBlock ? (
            <Droplist
              open={openMore}
              onOpenChange={setOpenMore}
              items={sideBlock.map(({ label }, idx) => ({
                id: idx,
                content: {
                  option: label,
                },
                onClick: () => {
                  setOpenMoreContentIndex(idx);
                  setOpenMore(false);
                },
              }))}
            >
              <Button view={VIEW.Function} appearance={APPEARANCE.Neutral} icon={<KebabSVG />} size='m' />
            </Droplist>
          ) : undefined
        }
      />

      {sideBlock && (
        <ModalCustom open={openMoreContentIndex !== undefined} onClose={() => setOpenMoreContentIndex(undefined)}>
          <ModalCustom.Body content={sideBlock[openMoreContentIndex ?? 0].content} />
        </ModalCustom>
      )}

      {stepper && <div className={styles.stepper}>{stepper}</div>}

      {filters && <div className={styles.filters}>{filters}</div>}

      <div className={styles.body}>{children}</div>

      {(priceSummary || footer) && (
        <div className={styles.footer}>
          {priceSummary && (
            <div className={styles.priceSummary}>
              <Typography variant={VARIANT.body} size={SIZE.m} className={styles.priceSummaryText}>
                Оценка бюджета
              </Typography>

              <Dropdown
                open={openPriceSummary}
                onOpenChange={setOpenPriceSummary}
                content={<div className={styles.modalContent}>{priceSummary.content}</div>}
                data-test-id={TEST_IDS.pageForm.priceSummarySheet}
              >
                <div className={styles.priceSummaryRight} data-test-id={TEST_IDS.pageForm.priceSummaryTrigger}>
                  <Typography variant={VARIANT.label} size={SIZE.l} className={styles.priceSummaryTotal}>
                    {priceSummary.total}
                  </Typography>
                  {priceSummary.content && (
                    <Button view={VIEW.Function} appearance={APPEARANCE.Neutral} size='m' icon={<ChevronRightSVG />} />
                  )}
                </div>
              </Dropdown>
            </div>
          )}

          {footer && (
            <div
              className={styles.actions}
              data-column={(footer.buttonAdditional && footer.buttonSecondary) || undefined}
            >
              {footer.buttonAdditional && (
                <AdditionalButton {...footer.buttonAdditional} size='m' fullWidth appearance={APPEARANCE.Neutral} />
              )}

              {footer.buttonSecondary && (
                <SecondaryButton
                  {...footer.buttonSecondary}
                  size='m'
                  fullWidth
                  appearance={APPEARANCE.Neutral}
                  label={
                    footer.buttonSecondary.variant === 'custom'
                      ? footer.buttonSecondary.label
                      : getButtonLabel(footer.buttonSecondary.variant)
                  }
                />
              )}

              <PrimaryButton
                {...footer.buttonPrimary}
                size='m'
                fullWidth
                appearance={APPEARANCE.Primary}
                label={
                  footer.buttonPrimary.variant === 'custom'
                    ? footer.buttonPrimary.label
                    : getButtonLabel(footer.buttonPrimary.variant)
                }
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Мобильный `PageForm`. Форсирует `mobile`-раскладку через `withLayoutType`, чтобы вложенные
 * адаптивные `@ds`-примитивы (`Dropdown` price-summary, `ModalCustom` sideBlock) рендерили
 * bottom-sheet даже под desktop-провайдером.
 */
export const MobilePageForm = withLayoutType(MobilePageFormBase, LAYOUT_TYPE.Mobile);

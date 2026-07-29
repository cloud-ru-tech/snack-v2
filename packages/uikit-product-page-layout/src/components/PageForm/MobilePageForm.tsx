import { LAYOUT_TYPE, withLayoutType } from '@ds/adaptive';
import { APPEARANCE, Button, BUTTON_GROUP_ACTION_SLOT, ButtonGroup, VIEW } from '@ds/button';
import { Dropdown } from '@ds/dropdown';
import { ChevronRightSVG, KebabSVG } from '@ds/icons/interface/system';
import { Droplist } from '@ds/list';
import { ModalCustom } from '@ds/modal';
import { WithTooltip } from '@ds/tooltip';
import { SIZE, Typography, VARIANT } from '@ds/typography';
import { extractSupportProps } from '@ds/utils';
import cn from 'classnames';
import { useState } from 'react';

import { TEST_IDS } from '../../constants';
import { Headline } from '../Headline';
import { useGetButtonLabel } from './hooks';
import styles from './mobileStyles.module.scss';
import { DesktopPageFormProps } from './types';

export type MobilePageFormProps = DesktopPageFormProps;

/** Убирает PageForm-специфичные поля (`variant`/`tooltip`/`size`), оставляя пропсы `@ds/button` для `ButtonGroup`. */
function stripFooterButton<T extends object>(button: T): Omit<T, 'variant' | 'tooltip' | 'size'> {
  const buttonProps = { ...button } as Record<string, unknown>;

  delete buttonProps.variant;
  delete buttonProps.tooltip;
  delete buttonProps.size;

  return buttonProps as Omit<T, 'variant' | 'tooltip' | 'size'>;
}

function MobilePageFormBase({
  children,
  title,
  subtitle,
  className,
  footer,
  stepper,
  priceSummary,
  sideBlock,
  ...rest
}: MobilePageFormProps) {
  const [openPriceSummary, setOpenPriceSummary] = useState(false);
  const [openMore, setOpenMore] = useState(false);
  const [openMoreContentIndex, setOpenMoreContentIndex] = useState<number | undefined>(undefined);

  const getButtonLabel = useGetButtonLabel();

  const footerTooltips = footer && {
    [BUTTON_GROUP_ACTION_SLOT.Primary]: footer.buttonPrimary.tooltip,
    [BUTTON_GROUP_ACTION_SLOT.Secondary]: footer.buttonSecondary?.tooltip,
    [BUTTON_GROUP_ACTION_SLOT.Tertiary]: footer.buttonAdditional?.tooltip,
  };

  return (
    <div className={cn(styles.container, className)} {...extractSupportProps(rest)}>
      <div className={styles.header}>
        <Headline
          title={title}
          subtitle={subtitle}
          moreActions={
            sideBlock ? (
              <Droplist
                size='m'
                open={openMore}
                onOpenChange={setOpenMore}
                items={sideBlock.map(({ label }, idx) => ({
                  id: idx,
                  content: {
                    label: label,
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

        {stepper}
      </div>

      {sideBlock && (
        <ModalCustom
          open={openMoreContentIndex !== undefined}
          onClose={() => setOpenMoreContentIndex(undefined)}
          // Высоту листа задаёт сам sideBlock-элемент (`snapPoints`); напр. `[1]` — на всю высоту.
          // По умолчанию — по высоте контента.
          snapPoints={sideBlock[openMoreContentIndex ?? 0].snapPoints}
        >
          <ModalCustom.Body content={sideBlock[openMoreContentIndex ?? 0].content} />
        </ModalCustom>
      )}

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
            <ButtonGroup
              size='m'
              filled
              // 2 кнопки — в ряд (делят ширину); 3 — в столбик (правило футеров).
              vertical={
                [footer.buttonPrimary, footer.buttonSecondary, footer.buttonAdditional].filter(Boolean).length >= 3
              }
              renderAction={(button, slot) => {
                const tooltip = footerTooltips?.[slot];

                // disableSpanWrapper — чтобы кнопка осталась прямым flex-потомком группы (раскладка `filled`).
                return (
                  <WithTooltip tooltip={tooltip && { ...tooltip, disableSpanWrapper: true }}>{button}</WithTooltip>
                );
              }}
              primaryAction={{
                ...stripFooterButton(footer.buttonPrimary),
                view: VIEW.Filled,
                appearance: APPEARANCE.Primary,
                label:
                  footer.buttonPrimary.variant === 'custom'
                    ? footer.buttonPrimary.label
                    : getButtonLabel(footer.buttonPrimary.variant),
              }}
              secondaryAction={
                footer.buttonSecondary
                  ? {
                      ...stripFooterButton(footer.buttonSecondary),
                      view: VIEW.Outline,
                      appearance: APPEARANCE.Neutral,
                      label:
                        footer.buttonSecondary.variant === 'custom'
                          ? footer.buttonSecondary.label
                          : getButtonLabel(footer.buttonSecondary.variant),
                    }
                  : undefined
              }
              tertiaryAction={
                footer.buttonAdditional
                  ? {
                      ...stripFooterButton(footer.buttonAdditional),
                      view: VIEW.Simple,
                      appearance: APPEARANCE.Neutral,
                    }
                  : undefined
              }
            />
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

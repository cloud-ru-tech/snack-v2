import { Button } from '@ds/button';
import { NotifierInfoFilledSVG } from '@ds/icons/interface/system';
import { LinkProps } from '@ds/link';
import { BACKGROUND_PREDEFINED_FILL, backgroundPredefinedFillToAcrylic } from '@ds/materials';
import { QuestionTooltip } from '@ds/tooltip';
import { SIZE, Typography, VARIANT } from '@ds/typography';
import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ReactNode } from 'react';

import { formatCurrency } from '../../helpers';
import { priceSummaryLocale } from '../../locale';
import { ContentBlock, ContentBlockProps } from '../ContentBlock';
import styles from './styles.module.scss';

export type PriceSummarySmallProps = WithSupportProps<
  ContentBlockProps & {
    /** Итоговая сумма. */
    value: number | undefined;
    /** Function-ссылка внизу блока. */
    docsLink?: {
      href?: LinkProps['href'];
      label?: LinkProps['label'];
    };
    /** Контент подсказки для иконки рядом с итоговой суммой. */
    hintTooltipText?: ReactNode;
    /** Дополнительный класс корневого контейнера. */
    className?: string;
  }
>;

export function PriceSummarySmall({
  value = 0,
  docsLink,
  hintTooltipText,
  loading,
  dataError,
  onRetry,
  className,
  ...rest
}: PriceSummarySmallProps) {
  const { t } = priceSummaryLocale.useTranslations();
  const { appearance, level } = backgroundPredefinedFillToAcrylic(BACKGROUND_PREDEFINED_FILL.NeutralBackground1Level);

  return (
    <div
      className={cn(styles.priceSummarySmall, className)}
      data-acrylic-appearance={appearance}
      data-acrylic-level={level}
      {...extractSupportProps(rest)}
    >
      <span className={styles.acrylic} aria-hidden data-acrylic-background />

      <div className={styles.content}>
        <Typography variant={VARIANT.body} size={SIZE.m}>
          {t('total')}
        </Typography>

        <ContentBlock loading={loading} dataError={dataError} onRetry={onRetry}>
          <div className={styles.value}>
            {hintTooltipText ? (
              <QuestionTooltip tip={hintTooltipText}>
                <NotifierInfoFilledSVG size={16} className={styles.icon} />
              </QuestionTooltip>
            ) : (
              <NotifierInfoFilledSVG size={16} className={styles.icon} />
            )}

            <Typography variant={VARIANT.title} size={SIZE.m}>
              {formatCurrency(value)}
            </Typography>
          </div>

          {docsLink?.href && (
            <Button
              as='a'
              view='function'
              size='m'
              label={docsLink.label || t('costLink')}
              href={docsLink.href}
              target='_blank'
              className={styles.docLink}
            />
          )}
        </ContentBlock>
      </div>
    </div>
  );
}

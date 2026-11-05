import { Button } from '@ds/button';
import { Pagination, PaginationProps } from '@ds/pagination';

import { TEST_IDS } from '../../constants';
import { siteSectionLocale } from '../../locale';
import { SectionMoreButton } from '../../types';
import styles from './styles.module.scss';

export type SectionFooterProps = {
  /** Настройки пагинации. */
  pagination?: PaginationProps;
  /** Кнопка «Показать еще». */
  moreButton?: SectionMoreButton;
};

/** Футер секции (Figma `sectionFooter`): пагинация и кнопка «Показать еще» по центру. */
export function SectionFooter({ pagination, moreButton }: SectionFooterProps) {
  const { t } = siteSectionLocale.useTranslations();

  return (
    <div className={styles.sectionFooter} data-test-id={TEST_IDS.footer}>
      {pagination && <Pagination data-test-id={TEST_IDS.pagination} {...pagination} />}
      {moreButton && (
        <Button
          {...(moreButton.href ? { as: 'a', href: moreButton.href } : { type: 'button' })}
          label={moreButton.label ?? t('showMore')}
          onClick={moreButton.onClick}
          view='outline'
          appearance='neutral'
          size='l'
          data-test-id={moreButton['data-test-id'] ?? TEST_IDS.moreButton}
        />
      )}
    </div>
  );
}

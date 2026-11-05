import { useAdaptiveLayout } from '@ds/adaptive';
import { RichText } from '@ds/site-rich-text';
import { extractSupportProps } from '@ds/utils';
import cn from 'classnames';

import { SECTION_TITLE_TAG, SECTION_TITLE_TYPE, TEST_IDS } from './constants';
import styles from './styles.module.scss';
import { SectionTitleProps } from './types';

/** Заголовочный блок секции сайта (Figma `sectionTitle`): заголовок и описание. Типографика зависит от раскладки. */
export function SectionTitle({
  title,
  description,
  type = SECTION_TITLE_TYPE.DescriptionRight,
  titleTag = SECTION_TITLE_TAG.H2,
  className,
  ...rest
}: SectionTitleProps) {
  const { layoutType } = useAdaptiveLayout();

  return (
    <div
      className={cn(styles.sectionTitle, className)}
      data-type={type}
      data-layout-type={layoutType}
      {...extractSupportProps(rest)}
    >
      {title && <RichText tag={titleTag} className={styles.title} content={title} data-test-id={TEST_IDS.title} />}
      {description && (
        <RichText className={styles.description} content={description} data-test-id={TEST_IDS.description} />
      )}
    </div>
  );
}

import { Typography } from '@ds/typography';
import { withInnerRefSupport } from '@ds/utils';
import cn from 'classnames';
import { ElementType } from 'react';

import { APPEARANCE, TEST_IDS } from './constants';
import styles from './styles.module.scss';
import { CardVacancyProps } from './types';

export function CardVacancy<T extends ElementType = 'a'>({
  as: asProp,
  innerRef,
  className,
  appearance = APPEARANCE.Neutral,
  mobile = false,
  title,
  description,
  ...rest
}: CardVacancyProps<T>) {
  const Tag: ElementType = asProp ?? 'a';
  const restProps = rest as Record<string, unknown>;
  const isAnchor = !asProp || asProp === 'a';
  const isExternal = isAnchor && restProps.target === '_blank';
  const rel = isExternal ? 'noopener noreferrer' : restProps.rel;

  return (
    <Tag
      {...restProps}
      rel={rel}
      ref={innerRef}
      className={cn(styles.cardVacancy, className)}
      data-test-id={(restProps['data-test-id'] as string | undefined) ?? TEST_IDS.root}
      data-appearance={appearance}
      data-mobile={mobile || undefined}
    >
      <span className={styles.background} aria-hidden />
      <span className={styles.stateLayer} data-state='emptyNeutralOnBackground' aria-hidden />
      <span className={styles.content}>
        <Typography
          as='span'
          className={styles.title}
          variant='title'
          size={mobile ? 'm' : 'l'}
          data-test-id={TEST_IDS.title}
        >
          {title}
        </Typography>
        <Typography
          as='span'
          className={styles.description}
          variant='body'
          size={mobile ? 's' : 'm'}
          data-test-id={TEST_IDS.description}
        >
          {description}
        </Typography>
      </span>
    </Tag>
  );
}

withInnerRefSupport(CardVacancy);

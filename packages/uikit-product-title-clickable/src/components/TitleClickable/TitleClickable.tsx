import { ArrowLinksSVG, ChevronRightSVG } from '@ds/icons/interface/system';
import { withInnerRefSupport } from '@ds/utils';
import cn from 'classnames';
import { ElementType } from 'react';

import { TEST_IDS } from '../../constants';
import { TitleClickableProps } from '../../types';
import styles from './styles.module.scss';
import { TitleClickableContent } from './TitleClickableContent';

export function TitleClickable<T extends ElementType = 'a'>({
  as: asProp,
  innerRef,
  className,
  fullWidth,
  showArrow = true,
  title,
  icon,
  children,
  titleTag,
  avatar,
  ...rest
}: TitleClickableProps<T>) {
  const Tag: ElementType = asProp ?? 'a';
  const restProps = rest as Record<string, unknown>;
  const isAnchor = !asProp || asProp === 'a';
  const isExternal = isAnchor && restProps.target === '_blank';
  const rel = isExternal ? 'noopener noreferrer' : restProps.rel;
  const ArrowIcon = isExternal ? ArrowLinksSVG : ChevronRightSVG;

  return (
    <Tag
      {...restProps}
      rel={rel}
      ref={innerRef}
      className={cn(styles.titleClickable, className)}
      data-test-id={(restProps['data-test-id'] as string | undefined) ?? TEST_IDS.root}
      data-full-width={fullWidth || undefined}
    >
      <TitleClickableContent title={title} icon={icon} avatar={avatar} titleTag={titleTag} fullWidth={fullWidth}>
        {children}
      </TitleClickableContent>

      {showArrow && (
        <span
          data-test-id={TEST_IDS.chevron}
          className={styles.chevron}
          data-acrylic-appearance='decorTransparent'
          data-acrylic-level='1Level'
          aria-hidden
        >
          <span className={styles.acrylic} aria-hidden />
          <span className={styles.stateLayer} data-state='emptyNeutralOnBackground' aria-hidden />
          <ArrowIcon size={16} className={styles.chevronIcon} />
        </span>
      )}
    </Tag>
  );
}

withInnerRefSupport(TitleClickable);

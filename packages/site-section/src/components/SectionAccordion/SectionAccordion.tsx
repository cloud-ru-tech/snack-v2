import { Accordion, AccordionProps, SELECTION_MODE } from '@ds/accordion';
import { RichText } from '@ds/site-rich-text';
import { Typography } from '@ds/typography';
import { WithSupportProps } from '@ds/utils';
import { ReactNode, useEffect, useRef } from 'react';

import { CONTAINER, TEST_IDS } from '../../constants';
import { SectionBasic } from '../SectionBasic';
import styles from './styles.module.scss';

export type SectionAccordionItem = {
  title: string;
  description: ReactNode;
  onClick?(): void;
};

type SectionAccordionBase = {
  /** HTML-атрибут `id` секции — якорь для навигации по странице. */
  id?: string;
  /** Заголовок секции. */
  title: string;
  /** Описание секции под заголовком. */
  description?: string;
  /** CSS-класс корня. */
  className?: string;
  /** Пункты аккордеона. */
  items: SectionAccordionItem[];
};

export type SectionAccordionProps = WithSupportProps<
  SectionAccordionBase &
    (
      | {
          selectionMode?: typeof SELECTION_MODE.Multiple;
          expandedDefault?: string[];
          onExpandedChange?(value: string[] | undefined): void;
        }
      | {
          selectionMode: typeof SELECTION_MODE.Single;
          expandedDefault?: string;
          onExpandedChange?(value: string | undefined): void;
        }
    )
>;

function ItemDescription({ description }: { description: SectionAccordionItem['description'] }) {
  if (typeof description === 'string') {
    return <RichText content={description} />;
  }

  return description;
}

function AccordionItem({ item, index }: { item: SectionAccordionItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { onClick } = item;

  // TODO: Убрать, когда CollapseItem будем принимать onClick
  useEffect(() => {
    const node = ref.current;

    if (!node || !onClick) return;

    node.addEventListener('click', onClick);

    return () => node.removeEventListener('click', onClick);
  }, [onClick]);

  return (
    <div ref={ref}>
      <Accordion.CollapseBlockPrimary
        id={`accordion-item-${item.title}-${index}`}
        afterTitle={
          <Typography variant='title' size='l' className={styles.itemTitle}>
            {item.title}
          </Typography>
        }
        data-test-id={`${TEST_IDS.item}-${index}`}
      >
        <ItemDescription description={item.description} />
      </Accordion.CollapseBlockPrimary>
    </div>
  );
}

export function SectionAccordion({
  id,
  title,
  description,
  className,
  items,
  selectionMode = SELECTION_MODE.Multiple,
  expandedDefault,
  onExpandedChange,
  ...rest
}: SectionAccordionProps) {
  const accordionProps = {
    selectionMode,
    expandedDefault,
    onExpandedChange,
  } as AccordionProps;

  return (
    <SectionBasic
      id={id}
      title={title}
      description={description}
      className={className}
      container={CONTAINER.New}
      {...rest}
    >
      <div className={styles.list}>
        <Accordion {...accordionProps}>
          {items.map((item, index) => (
            <AccordionItem key={index} item={item} index={index} />
          ))}
        </Accordion>
      </div>
    </SectionBasic>
  );
}

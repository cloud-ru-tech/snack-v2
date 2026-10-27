import { ChevronDownSVG, ChevronUpSVG } from '@ds/icons/interface/system';
import { useUncontrolledProp, withInnerRefSupport, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ReactNode, Ref, useCallback, useId } from 'react';

import { TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

export type AiHistoryLineAccordionProps = WithSupportProps<{
  /** Идентификатор карточки. */
  id: string;
  /** Карточка раскрыта при первом рендере. */
  defaultOpen?: boolean;
  /** Раскрытие уже показанной карточки. Вместе с `onOpenChange` состояние управляемое. */
  open?: boolean;
  /** Сообщает новое раскрытие после клика или клавиши. */
  onOpenChange?(open: boolean): void;
  /** Подпись кнопки раскрытия. Число вызовов и пометку об ошибке собирает продукт. */
  title: string;
  /** Слот содержимого. Статус каждой строки задаёт сам ребёнок. */
  children?: ReactNode;
  /** Дополнительный класс корня. */
  className?: string;
  /** Ref на корень карточки, не на кнопку. */
  innerRef?: Ref<HTMLDivElement>;
}>;

export function AiHistoryLineAccordion({
  id,
  defaultOpen = false,
  open,
  onOpenChange,
  title,
  children,
  className,
  innerRef,
  'data-test-id': dataTestId = TEST_IDS.accordion,
}: AiHistoryLineAccordionProps) {
  const contentId = useId();
  const [isOpen, setIsOpen] = useUncontrolledProp(open, defaultOpen, onOpenChange);
  const handleToggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);
  const Chevron = isOpen ? ChevronUpSVG : ChevronDownSVG;

  return (
    <div
      ref={innerRef}
      className={cn(styles.root, className)}
      data-test-id={dataTestId}
      data-open={isOpen ? 'true' : 'false'}
      data-accordion-id={id}
    >
      <button
        type='button'
        className={styles.header}
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-controls={contentId}
        data-test-id={TEST_IDS.accordionHeader}
      >
        <span className={styles.title}>{title}</span>
        <Chevron className={styles.chevron} size={24} aria-hidden />
      </button>
      <div id={contentId} className={styles.content} hidden={!isOpen} data-test-id={TEST_IDS.accordionContent}>
        {children}
      </div>
    </div>
  );
}

withInnerRefSupport(AiHistoryLineAccordion);

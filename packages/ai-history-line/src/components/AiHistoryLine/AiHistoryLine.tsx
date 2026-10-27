import { ToggleGroup } from '@ds/toggles';
import { PolymorphicRef, withInnerRefSupport } from '@ds/utils';
import cn from 'classnames';
import { ElementType, ReactElement, ReactNode } from 'react';

import { TEST_IDS } from '../../constants';
import { PolymorphicProps } from '../../types';
import { AiHistoryLineAccordion } from '../AiHistoryLineAccordion';
import { AiHistoryLineAgentContent } from '../AiHistoryLineAgentContent';
import { AiHistoryLineCheckpoint } from '../AiHistoryLineCheckpoint';
import { AiHistoryLineIndicator } from '../AiHistoryLineIndicator';
import { AiHistoryLineItem } from '../AiHistoryLineItem';
import { AiHistoryLineRequest } from '../AiHistoryLineRequest';
import { AiHistoryLineStepper } from '../AiHistoryLineStepper';
import styles from './styles.module.scss';

export type AiHistoryLineProps<T extends ElementType = 'ol'> = PolymorphicProps<
  T,
  {
    /** Элементы ленты. */
    children?: ReactNode;
    /** `id` выбранного индикатора. Вместе с `onIndicatorChange` выбор управляемый. */
    value?: string;
    /** `id` индикатора, выбранного при первом рендере. */
    defaultValue?: string;
    /** Сообщает `id` выбранного индикатора. Повторный клик по нему передаёт `undefined`. */
    onIndicatorChange?(value: string | undefined): void;
    /** Дополнительный класс корня. */
    className?: string;
    /** Полиморфный тег корня. По умолчанию `ul`. */
    as?: T;
    /** Ref на корневой элемент. */
    innerRef?: PolymorphicRef<T>;
  }
>;

function AiHistoryLineRoot<T extends ElementType = 'ol'>({
  as,
  value,
  defaultValue,
  onIndicatorChange,
  innerRef,
  className,
  children,
  'data-test-id': dataTestId = TEST_IDS.root,
  ...rest
}: AiHistoryLineProps<T>): ReactElement {
  const Component = (as || 'ul') as ElementType;

  return (
    <ToggleGroup selectionMode='single' value={value} defaultValue={defaultValue} onChange={onIndicatorChange}>
      <Component {...rest} ref={innerRef} className={cn(styles.root, className)} data-test-id={dataTestId}>
        {children}
      </Component>
    </ToggleGroup>
  );
}

withInnerRefSupport(AiHistoryLineRoot);

export const AiHistoryLine = Object.assign(AiHistoryLineRoot, {
  Item: AiHistoryLineItem,
  Indicator: AiHistoryLineIndicator,
  Stepper: AiHistoryLineStepper,
  AgentContent: AiHistoryLineAgentContent,
  Request: AiHistoryLineRequest,
  Accordion: AiHistoryLineAccordion,
  Checkpoint: AiHistoryLineCheckpoint,
});

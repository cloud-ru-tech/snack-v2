import { SELECTION_MODE, ToggleGroup, ToggleGroupProps } from '@ds/toggles';
import { PropsWithChildren } from 'react';

import { CollapseBlockPrimary, CollapseBlockSecondary, CollapseBlockTertiary } from './components/CollapseBlock';

export type AccordionProps = PropsWithChildren<
  | {
      /** Начальное состояние */
      expandedDefault?: string;
      /** Controlled состояние */
      expanded?: string;
      /** Controlled обработчик измения состояния */
      onExpandedChange?(value: (string | undefined) | string): void;
      /** Режим работы аккордиона */
      selectionMode?: typeof SELECTION_MODE.Single;
    }
  | {
      /** Начальное состояние */
      expandedDefault?: string[];
      /** Controlled состояние */
      expanded?: string[];
      /** Controlled обработчик измения состояния */
      onExpandedChange?(value: (string[] | undefined) | string[]): void;
      /** Режим работы аккордиона */
      selectionMode: typeof SELECTION_MODE.Multiple;
    }
>;

function AccordionBase({
  selectionMode = SELECTION_MODE.Single,
  onExpandedChange,
  expandedDefault,
  expanded,
  children,
}: AccordionProps) {
  const toggleGroupProps = {
    selectionMode,
    defaultValue: expandedDefault,
    value: expanded,
    onChange: onExpandedChange,
    children,
  } as ToggleGroupProps;

  return <ToggleGroup {...toggleGroupProps} />;
}

export const Accordion = Object.assign(AccordionBase, {
  CollapseBlockPrimary,
  CollapseBlockSecondary,
  CollapseBlockTertiary,
});

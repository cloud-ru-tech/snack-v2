import { SELECTION_MODE, ToggleGroup } from '@design-system/toggles';
import { PropsWithChildren } from 'react';

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

export function Accordion({
  selectionMode = SELECTION_MODE.Single,
  onExpandedChange,
  expandedDefault,
  expanded,
  children,
}: AccordionProps) {
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <ToggleGroup
      defaultValue={expandedDefault}
      selectionMode={selectionMode}
      onChange={onExpandedChange}
      value={expanded}
    >
      {children}
    </ToggleGroup>
  );
}

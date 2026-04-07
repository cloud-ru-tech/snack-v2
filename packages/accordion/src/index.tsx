import { Accordion as AccordionComponent } from './Accordion';
import { CollapseBlockPrimary, CollapseBlockSecondary, CollapseBlockTertiary } from './components/CollapseBlock';

export type {
  CollapseBlockPrimaryProps,
  CollapseBlockSecondaryProps,
  CollapseBlockTertiaryProps,
} from './components/CollapseBlock';
export type { AccordionProps } from './Accordion';

export const Accordion = AccordionComponent as typeof AccordionComponent & {
  CollapseBlockPrimary: typeof CollapseBlockPrimary;
  CollapseBlockSecondary: typeof CollapseBlockSecondary;
  CollapseBlockTertiary: typeof CollapseBlockTertiary;
};
Accordion.CollapseBlockPrimary = CollapseBlockPrimary;
Accordion.CollapseBlockSecondary = CollapseBlockSecondary;
Accordion.CollapseBlockTertiary = CollapseBlockTertiary;

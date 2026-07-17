import { BottomSheet } from '@ds/bottom-sheet';
import { QuestionSVG } from '@ds/icons/interface/system';
import { extractSupportProps } from '@ds/utils';
import cn from 'classnames';
import { useUncontrolledProp } from 'uncontrollable';

import styles from '../../components/QuestionTooltip/styles.module.scss';
import { QuestionTooltipProps } from '../../components/QuestionTooltip/types';
import { SIZE, TEST_IDS } from '../../constants';
import { getIconSize } from '../../utils';

/**
 * Mobile-поверхность QuestionTooltip: иконка «?» открывает `tip` в `BottomSheet` из `@ds/bottom-sheet`
 * по клику (вместо hover-popover). Internal — наружу не реэкспортится; рендерится адаптивным
 * `QuestionTooltip` по контексту. desktop-only popover-пропы уходят в `...rest` и не доезжают до BottomSheet.
 */
export function MobileQuestionTooltip({
  tip,
  triggerLabel = 'Подсказка',
  className,
  tooltipClassname,
  open,
  onOpenChange,
  closeOnPopstate,
  tabIndex = 0,
  size = SIZE.XS,
  ...rest
}: QuestionTooltipProps) {
  const [isOpen, setIsOpen] = useUncontrolledProp(open, false, onOpenChange);

  return (
    <>
      <button
        type='button'
        aria-label={triggerLabel}
        data-opened={isOpen}
        tabIndex={tabIndex}
        className={cn(styles.button, className)}
        data-size={size}
        data-test-id={TEST_IDS.questionTooltip.triggerOpen}
        onClick={() => setIsOpen(true)}
      >
        <QuestionSVG size={getIconSize(size)} />
      </button>
      <BottomSheet
        open={isOpen}
        onClose={() => setIsOpen(false)}
        content={tip}
        className={tooltipClassname}
        closeOnPopstate={closeOnPopstate}
        {...extractSupportProps(rest)}
      />
    </>
  );
}

import { APPEARANCE, Button, VIEW } from '@ds/button';
import { CrossSVG } from '@ds/icons/interface/system';
import { Typography } from '@ds/typography';
import { useId } from 'react';
import { TooltipRenderProps } from 'react-joyride';

import { TEST_IDS, TOUR_BUTTON } from '../../constants';
import { welcomeTourLocale } from '../../locale';
import { TourSteps } from '../TourSteps';
import styles from './styles.module.scss';
import { TourStepData } from './types';

/**
 * Подсказка шага — `tooltipComponent` для react-joyride. Поверхность повторяет
 * контейнер `@ds/popover` (padding / радиус / тень / фон из токенов popover'а),
 * раскладка внутри — заголовок, подзаголовок, тело и футер с индикатором и кнопками.
 */
export function TourHint({
  backProps,
  closeProps,
  primaryProps,
  skipProps,
  tooltipProps,
  index,
  size,
  isLastStep,
  step,
}: TooltipRenderProps) {
  // `Partial`, а не `TourStepData`: каст к полному типу прятал бы падение на
  // `buttons.includes(...)`. `data` кладёт `toJoyrideSteps`, его отсутствие означает шаг
  // мимо публичного API — рисовать нечем.
  const { t } = welcomeTourLocale.useTranslations();
  const titleId = useId();
  const contentId = useId();

  const { subtitle, labels, buttons = [] } = (step.data ?? {}) as Partial<TourStepData>;

  if (!labels) return null;

  const showSkip = buttons.includes(TOUR_BUTTON.Skip);
  const showBack = buttons.includes(TOUR_BUTTON.Back) && index > 0;
  const showPrimary = buttons.includes(TOUR_BUTTON.Primary);

  return (
    // `tooltipProps` даёт `role='alertdialog'` + `aria-modal`, имя и описание задаются
    // здесь — так заголовку не нужен произвольный уровень в чужой иерархии страницы.
    // Спред идёт первым, чтобы не перетереть эти aria-атрибуты.
    <div
      {...tooltipProps}
      aria-describedby={step.content ? contentId : undefined}
      aria-labelledby={step.title ? titleId : undefined}
      className={styles.hint}
      data-test-id={TEST_IDS.hint}
    >
      {(step.title || showSkip) && (
        <div className={styles.header}>
          {step.title && (
            <Typography as='div' id={titleId} variant='title' size='m' data-test-id={TEST_IDS.title}>
              {step.title}
            </Typography>
          )}
          {showSkip && (
            <Button
              {...skipProps}
              appearance={APPEARANCE.Neutral}
              aria-label={labels.close}
              data-test-id={TEST_IDS.closeIcon}
              icon={<CrossSVG />}
              view={VIEW.Simple}
            />
          )}
        </div>
      )}

      {subtitle && (
        <Typography
          as='p'
          className={styles.subtitle}
          variant='title'
          size='s'
          weight='thin'
          data-test-id={TEST_IDS.subtitle}
        >
          {subtitle}
        </Typography>
      )}

      {step.content && (
        <Typography
          as='div'
          id={contentId}
          className={styles.content}
          variant='body'
          size='s'
          data-test-id={TEST_IDS.content}
        >
          {step.content}
        </Typography>
      )}

      <div className={styles.footer}>
        {size > 1 && (
          <>
            {/* Точки прогресса под `aria-hidden`, позицию в туре озвучивает этот текст. */}
            <span className={styles.visuallyHidden}>{t('progress', { current: index + 1, total: size })}</span>
            <TourSteps current={index} total={size} />
          </>
        )}

        <div className={styles.actions}>
          {showBack && (
            <Button {...backProps} data-test-id={TEST_IDS.backButton} label={labels.back} view={VIEW.Simple} />
          )}
          {showPrimary &&
            (isLastStep ? (
              <Button {...closeProps} data-test-id={TEST_IDS.finishButton} label={labels.finish} view={VIEW.Filled} />
            ) : (
              <Button {...primaryProps} data-test-id={TEST_IDS.nextButton} label={labels.next} view={VIEW.Filled} />
            ))}
        </div>
      </div>
    </div>
  );
}

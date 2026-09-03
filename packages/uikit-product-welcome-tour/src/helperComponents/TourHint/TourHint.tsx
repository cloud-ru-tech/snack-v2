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

/** Движок кладёт в пропсы кнопок `title` со своими подписями — браузер рисует по нему нативный тултип. */
function withoutNativeTitle<T extends { title?: string }>(props: T): Omit<T, 'title'> {
  const rest = { ...props };
  delete rest.title;

  return rest;
}

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
  const { t } = welcomeTourLocale.useTranslations();
  const titleId = useId();
  const contentId = useId();

  // `Partial`, а не `TourStepData`: каст к полному типу прятал бы падение на
  // `buttons.includes(...)` у шага, пришедшего мимо `toJoyrideSteps`.
  const { subtitle, labels, buttons = [], showStepIndicator = true } = (step.data ?? {}) as Partial<TourStepData>;

  const backButtonProps = withoutNativeTitle(backProps);
  const primaryButtonProps = withoutNativeTitle(primaryProps);
  const closeButtonProps = withoutNativeTitle(closeProps);
  const skipButtonProps = withoutNativeTitle(skipProps);

  if (!labels) return null;

  const showSkip = buttons.includes(TOUR_BUTTON.Skip);
  const showBack = buttons.includes(TOUR_BUTTON.Back) && index > 0;
  const showPrimary = buttons.includes(TOUR_BUTTON.Primary);

  return (
    // Спред первым: `tooltipProps` даёт `role='alertdialog'` + `aria-modal`, перетирать их нельзя.
    <div
      {...tooltipProps}
      aria-describedby={step.content ? contentId : undefined}
      aria-labelledby={step.title ? titleId : undefined}
      className={styles.hint}
      data-test-id={TEST_IDS.hint}
      // Ширину шага движок отдаёт только в свои стили тултипа — у подсказки они свои.
      // `max-width` не трогаем: он держит фолбэк по ширине экрана.
      style={step.width !== undefined ? { width: step.width } : undefined}
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
              {...skipButtonProps}
              className={styles.close}
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
        {showStepIndicator && size > 1 && (
          <>
            {/* Точки прогресса под `aria-hidden`, позицию в туре озвучивает этот текст. */}
            <span className={styles.visuallyHidden}>{t('progress', { current: index + 1, total: size })}</span>
            <TourSteps current={index} total={size} />
          </>
        )}

        <div className={styles.actions}>
          {showBack && (
            <Button
              {...backButtonProps}
              appearance={APPEARANCE.Neutral}
              data-test-id={TEST_IDS.backButton}
              label={labels.back}
              view={VIEW.Outline}
            />
          )}
          {showPrimary &&
            (isLastStep ? (
              <Button
                {...closeButtonProps}
                data-test-id={TEST_IDS.finishButton}
                label={labels.finish}
                view={VIEW.Filled}
              />
            ) : (
              <Button
                {...primaryButtonProps}
                data-test-id={TEST_IDS.nextButton}
                label={labels.next}
                view={VIEW.Filled}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

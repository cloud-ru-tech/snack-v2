import { usePortalContext } from '@ds/portal-context';
import { useThemeClassnames } from '@ds/theme';
import { isBrowser, useUncontrolledProp } from '@ds/utils';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ACTIONS, EventData, EVENTS, Joyride } from 'react-joyride';

import { TOUR_BUTTON, TOUR_STATUS } from '../../constants';
import { TourHint } from '../../helperComponents';
import { welcomeTourLocale } from '../../locale';
import { WelcomeTourProps } from '../../types';
import { TOUR_COLORS, TOUR_GEOMETRY } from './constants';
import { removeUnionElement } from './spotlight';
import { toJoyrideSteps, toTourStatus } from './utils';

const DEFAULT_BUTTONS = [TOUR_BUTTON.Back, TOUR_BUTTON.Primary, TOUR_BUTTON.Skip];

const FLOATING_OPTIONS = { shiftOptions: { crossAxis: true, padding: 16 } };

/**
 * Онбординг-тур по интерфейсу: затемняет страницу, подсвечивает целевой элемент шага
 * и показывает рядом подсказку с заголовком, описанием, индикатором прогресса и кнопками.
 *
 * Шаги описываются пропом `steps`; целевой элемент задаётся CSS-селектором, DOM-нодой,
 * ref'ом или геттером. Запуск — через `open` / `defaultOpen`, текущий шаг — через
 * `stepIndex` / `defaultStepIndex`. Подписи кнопок берутся из locale и переопределяются
 * пропом `labels` (или `labels` конкретного шага).
 *
 * Собственного DOM-узла у компонента нет — вся разметка живёт в портале. Поэтому
 * `data-test-id` компонент не принимает: слоты подсказки адресуются через публичную
 * константу `TEST_IDS`.
 */
export function WelcomeTour({
  steps,
  open,
  defaultOpen = false,
  onOpenChange,
  stepIndex,
  defaultStepIndex = 0,
  onStepChange,
  labels: componentLabels,
  buttons = DEFAULT_BUTTONS,
  scrollOffset,
  spotlightPadding,
  portalContainer,
}: WelcomeTourProps) {
  const { t } = welcomeTourLocale.useTranslations();
  const portalContextRef = usePortalContext();

  const [isOpen, setOpen] = useUncontrolledProp(open, defaultOpen, onOpenChange);

  // Свой контейнер портала: CSS-переменные из `TOUR_COLORS` резолвятся от узла портала,
  // а не от подсказки, — без класса темы здесь под `ChildThemeProvider` оверлей и стрелка
  // возьмут тему корня документа. Стилей у контейнера нет: свой позиционирующий контекст
  // сломал бы вырез.
  const themeClassnames = useThemeClassnames();
  const [portalElement] = useState<HTMLElement | null>(() => (isBrowser() ? document.createElement('div') : null));

  useEffect(() => {
    if (!portalElement || !isBrowser()) return;

    const host = portalContainer ?? portalContextRef.current ?? document.body;
    host.appendChild(portalElement);

    return () => portalElement.remove();
  }, [portalElement, portalContainer, portalContextRef]);

  useEffect(() => {
    if (portalElement) portalElement.className = themeClassnames;
  }, [portalElement, themeClassnames]);

  // Завершённый тур движок держит в статусе `finished`, повторный `run={true}` его не
  // перезапускает — на каждый переход «закрыт → открыт» пересоздаём инстанс через `key`.
  const runIdRef = useRef(0);
  const wasOpenRef = useRef(false);

  if (isOpen && !wasOpenRef.current) {
    runIdRef.current += 1;
  }

  wasOpenRef.current = isOpen;

  const joyrideSteps = useMemo(
    () =>
      toJoyrideSteps({
        steps,
        labels: { next: t('next'), back: t('back'), finish: t('finish'), close: t('close') },
        componentLabels,
        buttons,
      }),
    [steps, t, componentLabels, buttons],
  );

  const handleEvent = useCallback(
    ({ action, controlled, type, index, status }: EventData) => {
      switch (type) {
        // Неуправляемый режим: индекс уже переключил движок, компонент сообщает о факте.
        // В управляемом переход — запрос, о нём сообщает `STEP_AFTER`.
        case EVENTS.STEP_BEFORE:
          if (!controlled) onStepChange?.(index);
          break;

        case EVENTS.STEP_AFTER: {
          steps[index]?.onFinish?.();

          // В управляемом режиме движок не двигает индекс, поэтому `index >= size` не
          // наступает и `tour:end` не приходит — завершаем тур сами.
          if (controlled && index === steps.length - 1 && (action === ACTIONS.CLOSE || action === ACTIONS.NEXT)) {
            setOpen(false, TOUR_STATUS.Finished);
            break;
          }

          // По той же причине сами запрашиваем следующий индекс. Только для навигации:
          // `skip` и `close` завершают тур, не меняя шаг.
          if (controlled && (action === ACTIONS.NEXT || action === ACTIONS.PREV)) {
            const nextIndex = action === ACTIONS.PREV ? index - 1 : index + 1;

            if (nextIndex >= 0 && nextIndex < steps.length) onStepChange?.(nextIndex);
          }

          break;
        }

        // Цель шага может не отрисоваться вовсе (адаптив прячет блок на узком экране).
        // Сам движок перескакивает такой шаг только в неуправляемом режиме.
        case EVENTS.TARGET_NOT_FOUND: {
          if (!controlled) break;

          const nextIndex = action === ACTIONS.PREV ? index - 1 : index + 1;

          if (nextIndex >= 0 && nextIndex < steps.length) onStepChange?.(nextIndex);
          else setOpen(false, TOUR_STATUS.Finished);

          break;
        }

        case EVENTS.TOUR_END:
          // Узел общей подсветки живёт вне React-дерева — убираем его вместе с туром.
          removeUnionElement();
          setOpen(false, toTourStatus(status));
          break;

        default:
          break;
      }
    },
    [steps, onStepChange, setOpen],
  );

  // Esc завершает тур целиком, как у остальных оверлеев ДС; `dismissKeyAction` движка
  // закрывает только текущий шаг, поэтому он выключен. Уступаем чужому слою: шаг тура
  // может открыть диалог, и Esc тогда адресован ему.
  useEffect(() => {
    if (!isOpen || !isBrowser()) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || event.defaultPrevented) return;

      const layer = document.activeElement?.closest('[aria-modal="true"], [role="dialog"], [role="alertdialog"]');
      const isForeignLayer = Boolean(layer && !portalElement?.contains(layer));

      if (!isForeignLayer) {
        setOpen(false, TOUR_STATUS.Skipped);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setOpen, portalElement]);

  return (
    <Joyride
      key={runIdRef.current}
      continuous
      initialStepIndex={defaultStepIndex}
      // `shift` движка удерживает подсказку в экране только по главной оси — поперёк она
      // уезжает за край.
      floatingOptions={FLOATING_OPTIONS}
      // Пока `onBeforeShow` ждёт, движок показывает собственный спиннер — не из ДС.
      // Ожидания здесь короткие, а затемнение и так говорит, что тур идёт.
      loaderComponent={null}
      onEvent={handleEvent}
      options={{
        arrowBase: TOUR_GEOMETRY.arrowBase,
        arrowColor: TOUR_COLORS.arrow,
        arrowSize: TOUR_GEOMETRY.arrowSize,
        buttons: [...buttons],
        dismissKeyAction: false,
        offset: TOUR_GEOMETRY.offset,
        overlayClickAction: false,
        overlayColor: TOUR_COLORS.overlay,
        // Ключи добавляются только когда значение задано: явный `undefined` перетирает
        // дефолт движка, и расчёты позиции уходят в `NaN`.
        ...(scrollOffset !== undefined ? { scrollOffset } : {}),
        skipBeacon: true,
        ...(spotlightPadding !== undefined ? { spotlightPadding } : {}),
        spotlightRadius: TOUR_GEOMETRY.spotlightRadius,
        textColor: TOUR_COLORS.text,
      }}
      portalElement={portalElement}
      run={isOpen}
      // `stepIndex` переводит движок в controlled-режим — пробрасываем как есть.
      stepIndex={stepIndex}
      steps={joyrideSteps}
      tooltipComponent={TourHint}
    />
  );
}

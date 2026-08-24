import { usePortalContext } from '@ds/portal-context';
import { useThemeClassnames } from '@ds/theme';
import { isBrowser, useUncontrolledProp } from '@ds/utils';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ACTIONS, EventData, EVENTS, Joyride } from 'react-joyride';

import { TOUR_BUTTON, TOUR_STATUS } from '../../constants';
import { TourHint } from '../../helperComponents';
import { welcomeTourLocale } from '../../locale';
import { WelcomeTourProps } from '../../types';
import { toJoyrideSteps, toTourStatus, TOUR_COLORS, TOUR_GEOMETRY } from './utils';

const DEFAULT_BUTTONS = [TOUR_BUTTON.Back, TOUR_BUTTON.Primary, TOUR_BUTTON.Skip];

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
  portalContainer,
}: WelcomeTourProps) {
  const { t } = welcomeTourLocale.useTranslations();
  const portalContextRef = usePortalContext();

  const [isOpen, setOpen] = useUncontrolledProp(open, defaultOpen, onOpenChange);

  // Свой контейнер портала: цвета из `TOUR_COLORS` уходят в движок CSS-переменными и
  // резолвятся от узла портала, а не от подсказки, — поэтому класс темы нужен именно тут,
  // иначе под `ChildThemeProvider` оверлей и стрелка возьмут тему корня документа.
  // Стилей у контейнера нет: свой позиционирующий контекст сломал бы вырез.
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
  // Счётчик растёт в фазе рендера и в StrictMode прибавляется дважды: важна уникальность
  // ключа, а не его значение.
  const runIdRef = useRef(0);
  const wasOpenRef = useRef(false);

  if (isOpen && !wasOpenRef.current) {
    runIdRef.current += 1;
  }

  wasOpenRef.current = isOpen;

  // Мемо работает только когда потребитель мемоизирует `labels` и `buttons`; на инлайн-
  // литералах не срабатывает. Без него движок пересчитывал бы позиции на каждый рендер.
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
        case EVENTS.STEP_BEFORE:
          // Неуправляемый режим: индекс уже переключил движок, компонент сообщает о факте.
          // В управляемом переход — запрос, о нём сообщает `STEP_AFTER`.
          if (!controlled) onStepChange?.(index);
          break;

        case EVENTS.STEP_AFTER: {
          steps[index]?.onFinish?.();

          // В управляемом режиме движок не двигает индекс сам (`updateState` отбрасывает
          // `patch.index`), поэтому без этого вызова тур закроет текущий шаг и не откроет
          // следующий. Только для навигации: `skip` и `close` завершают тур, не меняя шаг.
          if (controlled && (action === ACTIONS.NEXT || action === ACTIONS.PREV)) {
            const nextIndex = action === ACTIONS.PREV ? index - 1 : index + 1;

            if (nextIndex >= 0 && nextIndex < steps.length) onStepChange?.(nextIndex);
          }

          break;
        }

        // Завершение тура движок сообщает событием `tour:end`; `tour:status`
        // приходит только на stop/reset и для закрытия не годится.
        case EVENTS.TOUR_END:
          setOpen(false, toTourStatus(status));
          break;

        default:
          break;
      }
    },
    [steps, onStepChange, setOpen],
  );

  // Esc завершает тур целиком, как у остальных оверлеев ДС; `dismissKeyAction` движка
  // закрывает только текущий шаг, поэтому он выключен, а Esc обрабатывается здесь.
  //
  // Слушаем на всплытии, уважаем `defaultPrevented` и уступаем чужому слою: шаг тура может
  // открыть диалог, и Esc тогда адресован ему. Условие именно «фокус в чужом слое», а не
  // «фокус в подсказке»: сразу после запуска фокус ещё на триггере, и Esc обязан работать.
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
        scrollOffset,
        skipBeacon: true,
        spotlightRadius: TOUR_GEOMETRY.spotlightRadius,
        textColor: TOUR_COLORS.text,
      }}
      portalElement={portalElement}
      run={isOpen}
      // `stepIndex` переводит движок в controlled-режим, поэтому пробрасываем его
      // только когда потребитель действительно управляет шагом снаружи.
      stepIndex={stepIndex}
      steps={joyrideSteps}
      tooltipComponent={TourHint}
    />
  );
}

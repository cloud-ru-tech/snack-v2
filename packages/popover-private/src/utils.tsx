import { supportsInnerRef } from '@ds/utils';
import { Placement, ReferenceType, useInteractions } from '@floating-ui/react';
import cn from 'classnames';
import {
  cloneElement,
  CSSProperties,
  Fragment,
  HTMLProps,
  isValidElement,
  MouseEvent,
  ReactElement,
  ReactNode,
  RefObject,
  TouchEvent,
} from 'react';
import { isForwardRef, isMemo, isValidElementType } from 'react-is';

import { PopoverPrivateProps } from './components';
import { TRIGGER } from './constants';
import { Trigger } from './types';

type Params = {
  placement: Placement;
  ref: RefObject<HTMLDivElement | null>;
  x?: number;
  y?: number;
};

export function getArrowPositionStyles({ placement, x, y, ref }: Params): CSSProperties {
  if (!ref.current) {
    return {};
  }

  const height = ref.current.offsetHeight;
  const width = ref.current.offsetWidth;
  const style = getComputedStyle(ref.current);

  const widthWithoutPadding =
    ref.current.offsetWidth -
    parseInt(style.paddingLeft) -
    parseInt(style.paddingRight) -
    parseInt(style.borderLeftWidth) -
    parseInt(style.borderRightWidth);

  const horizontalOffset = (ref.current.offsetWidth - widthWithoutPadding) / 2;

  switch (true) {
    case placement.startsWith('top'):
      return {
        left: x,
        bottom: -height,
      };
    case placement.startsWith('bottom'):
      return {
        left: x,
        top: -height,
        transform: 'rotate(180deg)',
      };
    case placement.startsWith('left'):
      return {
        top: y,
        right: -width + horizontalOffset + height / 2,
        transform: 'rotate(-90deg)',
      };
    case placement.startsWith('right'):
    default:
      return {
        top: y,
        left: -width + horizontalOffset + height / 2,
        transform: 'rotate(90deg)',
      };
  }
}

export const getArrowOffset = (arrowElement?: HTMLElement | null): number => arrowElement?.offsetHeight || 0;

type GetPopoverContentProps = {
  children: PopoverPrivateProps['children'];
  getReferenceProps: ReturnType<typeof useInteractions>['getReferenceProps'];
  validElementWrapperClassName: string;
  setReference: (node: ReferenceType | null) => void;
  disableSpanWrapper?: boolean;
};

type TriggerRefProp =
  | { ref: (node: ReferenceType | null) => void }
  | { innerRef: (node: ReferenceType | null) => void };

/**
 * Каким пропом отдать триггеру reference-ноду:
 *
 * - нативный элемент (`<button>`) и `forwardRef`-компонент принимают React `ref`;
 * - обычная функция-компонент — только проп `innerRef`, и лишь если помечена `withInnerRefSupport`
 *   (интроспекция пропсов функционального компонента в рантайме невозможна);
 * - `memo` пропсы прокидывает как есть, поэтому маркер ищем на обёрнутом компоненте.
 *
 * `null` — канала нет: передавать `innerRef` вслепую нельзя, он утечёт в DOM-атрибут либо молча пропадёт.
 */
function resolveTriggerRefProp(
  element: ReactElement,
  setReference: (node: ReferenceType | null) => void,
): TriggerRefProp | null {
  // `unknown`-алиасы: type-guard'ы `react-is` сужают сам `element` до `never` в отрицательной ветке,
  // после чего к его полям не обратиться.
  const elementType: unknown = element.type;
  const elementNode: unknown = element;

  if (typeof elementType === 'string' || isForwardRef(element)) {
    return { ref: setReference };
  }

  const componentType = isMemo(elementNode) ? (elementType as { type: unknown }).type : elementType;

  if (supportsInnerRef(componentType)) {
    return { innerRef: setReference };
  }

  return null;
}

const warnedTriggerTypes = new Set<unknown>();

function warnMissingRefChannel(type: ReactElement['type']): void {
  if (process.env.NODE_ENV === 'production' || warnedTriggerTypes.has(type)) {
    return;
  }

  warnedTriggerTypes.add(type);

  const name = (typeof type === 'function' && type.name) || 'Anonymous';

  console.warn(
    `@ds/popover: триггер <${name}> не принимает DOM-ноду ни через ref, ни через innerRef, поэтому он обёрнут ` +
      'в <span> (disableSpanWrapper проигнорирован). Чтобы убрать лишний узел, добавьте компоненту проп ' +
      'innerRef на корневой элемент и пометьте его withInnerRefSupport из @ds/utils.',
  );
}

export const getPopoverTriggerJSX = ({
  children,
  getReferenceProps,
  setReference,
  validElementWrapperClassName,
  disableSpanWrapper,
}: GetPopoverContentProps): ReactNode => {
  if (isValidElement(children)) {
    if (isForwardRef(children) || isValidElementType(children) || disableSpanWrapper) {
      // 🔴 Проброс reference-элемента во floating-ui по правильной конвенции. Обычные `@ds`-компоненты
      // (напр. `Button`) — plain function-компоненты и берут DOM-ноду через проп `innerRef`, а НЕ React
      // `ref` (их нельзя ref-ать: React-ворнинг «Function components cannot be given refs»). Если такому
      // передать `ref` — он молча проигнорируется, floating-ui не получит якорь и тултип отрисуется в углу
      // (0,0) / не покажется. Поэтому: plain-функции → `innerRef`, нативные элементы / forwardRef → `ref`.
      const refProp = resolveTriggerRefProp(children, setReference);

      // Триггер не принимает DOM-ноду ни одним из каналов — оборачиваем в `<span>` даже при
      // `disableSpanWrapper`: лишний DOM-узел лучше, чем неспозиционированный поповер.
      if (refProp) {
        return cloneElement(children, {
          ...getReferenceProps({
            ...(children.props as HTMLProps<HTMLElement>),
            className: cn((children.props as HTMLProps<HTMLElement>).className, validElementWrapperClassName),
          }),
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          ...refProp,
          key: 'cloned-element',
        });
      }

      warnMissingRefChannel(children.type);
    }

    return (
      <span className={validElementWrapperClassName} ref={setReference} {...getReferenceProps()} key='wrapped-element'>
        {children}
      </span>
    );
  }

  if (typeof children === 'function') {
    return <Fragment key='function-element'>{children({ getReferenceProps, ref: setReference })}</Fragment>;
  }

  return (
    <span className={validElementWrapperClassName} ref={setReference} {...getReferenceProps()} key='wrapped-element'>
      {children}
    </span>
  );
};

type TriggerProps = {
  useHoverTrigger: boolean;
  useClickTrigger: boolean;
  useFocusTrigger: boolean;
  keyboardOnly: boolean;
};

export const getTriggerProps = (trigger: Trigger): TriggerProps => {
  const defaultProps = {
    useHoverTrigger: false,
    useClickTrigger: false,
    useFocusTrigger: false,
    keyboardOnly: true,
  };

  switch (trigger) {
    case TRIGGER.Hover:
      return { ...defaultProps, useHoverTrigger: true };
    case TRIGGER.Click:
      return { ...defaultProps, useClickTrigger: true };
    case TRIGGER.FocusVisible:
      return { ...defaultProps, useFocusTrigger: true };
    case TRIGGER.Focus:
      return { ...defaultProps, useFocusTrigger: true, keyboardOnly: false };
    case TRIGGER.ClickAndFocusVisible:
      return { ...defaultProps, useFocusTrigger: true, useClickTrigger: true };
    case TRIGGER.HoverAndFocusVisible:
      return { ...defaultProps, useFocusTrigger: true, useHoverTrigger: true };
    case TRIGGER.HoverAndFocus:
      return { ...defaultProps, useFocusTrigger: true, useHoverTrigger: true, keyboardOnly: false };
    default:
      return defaultProps;
  }
};

export const stopPropagationMouse = (e: MouseEvent<HTMLDivElement>) => e.stopPropagation();
export const stopPropagationTouch = (e: TouchEvent<HTMLElement>) => e.stopPropagation();

export function referenceActionToEvent(value: string): keyof HTMLElementEventMap {
  if (value.slice(0, 2) === 'on') {
    return value.replace('on', '').toLowerCase() as keyof HTMLElementEventMap;
  }

  return value.toLowerCase() as keyof HTMLElementEventMap;
}

function createSyntheticEvent(nativeEvent: Event) {
  return {
    ...nativeEvent,
    nativeEvent,
  };
}

export function mapPopoverActionsToSynthetic(actions: Record<string, unknown>) {
  const syntheticActions: Record<string, (e: Event) => void> = {};

  Object.entries(actions).forEach(([key, value]) => {
    syntheticActions[key] = (e: Event) => {
      (value as (e: Event) => void)(createSyntheticEvent(e));
    };
  });

  return syntheticActions;
}

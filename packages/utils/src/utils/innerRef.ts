/**
 * Маркер «компонент принимает DOM-ноду своего корня через проп `innerRef`».
 *
 * Нужен потому, что интроспекция пропсов функционального компонента в рантайме невозможна: обёртки вроде
 * `Popover` / `Tooltip` / `Dropdown` получают триггер как `ReactElement` и должны решить, каким каналом отдать
 * ему reference-ноду. У `forwardRef`-компонента это `ref` (определяется через `react-is`), у обычной функции —
 * проп `innerRef`, и узнать о его поддержке можно только по явной пометке.
 *
 * Ключ — `Symbol.for`, поэтому маркер общий для всех копий `@ds/utils` в дереве зависимостей.
 */
export const SUPPORTS_INNER_REF = Symbol.for('@ds/supports-inner-ref');

/**
 * Помечает компонент как принимающий `innerRef`. Вызывается один раз рядом с объявлением компонента:
 *
 * ```tsx
 * export function Button<T extends ElementType = 'button'>({ innerRef, ...rest }: ButtonProps<T>) { … }
 * withInnerRefSupport(Button);
 * ```
 *
 * Помечать нужно только те компоненты, которые прокидывают `innerRef` на **корневой** DOM-узел — именно его
 * ждёт позиционирование поповера. Компоненты, у которых `innerRef` ведёт на внутренний слот (например, на
 * нативный `input`), не помечаем.
 */
export function withInnerRefSupport<T extends object>(component: T): T {
  Object.defineProperty(component, SUPPORTS_INNER_REF, { value: true });

  return component;
}

/** Принимает ли тип элемента DOM-ноду через проп `innerRef`. */
export function supportsInnerRef(type: unknown): boolean {
  return (
    (typeof type === 'function' || (typeof type === 'object' && type !== null)) &&
    Boolean((type as Record<symbol, unknown>)[SUPPORTS_INNER_REF])
  );
}

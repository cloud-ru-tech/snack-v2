# Private component props (Code)

- Generated: 2026-07-10T11:27:47.350Z
- Command: `pnpm aggregate:props`
- Packages: 50
- Components: 439
- Props: 2945

ai-field-notice (AiFieldNoticeAnimatedDescription)
- items: [readonly AiFieldNoticeDescriptionListItem[]]
- size: m, s, undefined
- className: [string] [infra]

ai-field-notice (AiFieldNoticeDescription)
- hoverIndex: [number]
- messages: [readonly string[]]
- restingIndex: [number]
- size: m, s, undefined
- state: defaultMessage, firstMessage, hoverMessage, secondMessage
- className: [string] [infra]

ai-field-notice (AiFieldNoticeVmInfo)
- size: m, s, undefined
- vmIp: [string]
- vmName: [string]
- className: [string] [infra]

ai-field-notice (AnimatedItem)
- content: [ReactNode]
- currentIndex: [number]
- itemIndex: [number]

ai-queue (AiQueueStepStatus)
- state: done, error, planned, progress

ai-suggestion (AiSuggestionParentGroupProvider)
- initialExpandedKey: [string | null]

ai-suggestion (AnimatedExpandableItem)
- index: [number]
- shown: true, false
- total: [number]

ai-suggestion (AnimatedTriggerWrap)

alert (AlertBase)
- actions: [{ primary: Omit<AlertButtonProps, "size" | "variant">; secondary?: Omit<AlertButtonProps, "si...]
- align: horizontal, vertical
- appearance: error, info, neutral, primary, success, warning
- collapsible: true, false
- description: [ReactNode]
- icon: true, false
- outline: true, false
- size: m, s
- title: [string]
- truncate: [{ title?: number; }]
- variant: inline, top
- actions.disabled: [boolean | undefined] [nested]
- actions.icon: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- actions.iconPosition: after, before [nested]
- actions.invertFocusOutlineColor: [boolean | undefined] [nested]
- actions.label: [string | undefined] [nested]
- actions.loading: [boolean | undefined] [nested]
- actions.size: m, s [nested]
- actions.variant: onAccent, onColor [nested]
- actions.as: [T | undefined] [infra, nested]
- actions.className: [string | undefined] [infra, nested]
- actions.innerRef: [PolymorphicRef<T> | undefined] [infra, nested]
- className: [string] [infra]
- data-test-id: [string] [infra]
- onClose: [(() => void)] [callback]

alert (getAlertAppearanceIcon)

attachment (Actions) [surface: exported-helper]
- hideDelete: true, false
- hideDownload: true, false
- hideRetry: true, false

attachment (Emblem)
- icon: [JSXElementConstructor<{ size?: number; className?: string; }> | undefined]
- imageData: [string]
- loading: true, false
- title: [string]

attachment (HoverContent)
- description: [string]
- error: [string]
- hasImage: true, false
- title: [string]
- className: [string] [infra]

attachment (MainContent)
- description: [string]
- icon: [JSXElementConstructor<{ size?: number; className?: string; }> | undefined]
- imageData: [string]
- title: [string]
- className: [string] [infra]

attachment (Text) [surface: exported-helper]
- data-size: [string]
- maxLines: [number]
- text: [string]
- className: [string] [infra]
- data-test-id: [string] [infra]

attachment (TextBlock) [surface: exported-helper]
- align: center, left
- description: [string]
- error: [string]
- title: [string]
- className: [string] [infra]

bottom-sheet (Handle) [surface: exported-helper]

bottom-sheet (Media) [surface: exported-helper]
- alt: [string]
- kind: icon, image
- src: [string]
- className: [string] [infra]

breadcrumbs (Collapse)
- currentConfig: [BreadcrumbsConfigChain]
- className: [string] [infra]

breadcrumbs (Crumb)
- current: true, false
- item: [Item]
- minWidth: [number]
- renderMode: collapsed, ellipsis, full, shortLabel
- useIconOnly: true, false
- className: [string] [infra]
- data-test-id: [string] [infra]

breadcrumbs (CrumbsTypography)
- size: s, xs
- className: [string] [infra]

breadcrumbs (HiddenChain)
- firstItemIconOnly: true, false
- items: [Item[]]
- separator: [string]
- size: s, xs
- onConfigsBuilt: [(config: BreadcrumbsConfig[]) => void] [callback]

breadcrumbs (useBreadcrumbsLayout)

breadcrumbs (useItemModesRender)
- firstItemIconOnly: true, false

breadcrumbs (Wrapper)
- hidden: true, false
- separator: [string]
- size: s, xs
- className: [string] [infra]
- data-test-id: [string] [infra]

calendar (CalendarBase) [surface: exported-helper]
- autofocus: true, false
- bottomSlot: [ReactNode]
- buildCellProps: [BuildCellPropsFunction]
- defaultValue: [Range]
- fitToContainer: true, false
- locale: [Locale]
- mode: date, date-range, date-time, month, month-range, year, year-range
- navigationStartRef: [RefObject<{ focus(): void; }>]
- presets: [PresetsOptions]
- showHolidays: true, false
- showSeconds: true, false
- size: l, m, s
- today: [number | Date]
- value: [Range]
- className: [string] [infra]
- data-test-id: [string] [infra]
- style: [CSSProperties] [infra]
- onChangeValue: [(value: Range) => void] [callback]
- onFocusLeave: [((direction: FocusDirection) => void)] [callback]

calendar (DesktopCalendarDropdown) [surface: exported-helper]
- autofocus: true, false
- bottomSlot: [ReactNode]
- buildCellProps: true, false
- closeOnApply: true, false
- closeOnEscapeKey: true, false
- closeOnPopstate: true, false
- defaultValue: [Date | Range]
- disableSpanWrapper: true, false
- fallbackPlacements: [Placement[]]
- fitToContainer: true, false
- hoverDelayClose: [number]
- hoverDelayOpen: [number]
- locale: [Intl.Locale]
- mode: date, date-range, date-time, month, month-range, year, year-range
- navigationStartRef: [RefObject<{ focus(): void; }>]
- open: true, false
- outsideClick: [boolean | OutsideClickHandler]
- placement: bottom, bottom-end, bottom-start, left, left-end, left-start, right, right-end, right-start, top, top-end, top-start
- presets: [PresetsOptions]
- showHolidays: true, false
- showSeconds: true, false
- size: l, m, s
- today: [number | Date]
- trigger: click, clickAndFocusVisible, focus, focusVisible, hover, hoverAndFocus, hoverAndFocusVisible
- triggerClassName: [string]
- triggerClickByKeys: true, false
- triggerRef: [ForwardedRef<ReferenceType | HTMLElement | null>]
- value: [Date | Range]
- children: [ReactNode] [infra]
- className: [string] [infra]
- data-test-id: [string] [infra]
- style: [CSSProperties] [infra]
- onApply: [(() => void)] [callback]
- onChangeValue: [((value: Date) => void) | ((value: Range) => void) | ((value: Range) => void) | ((value: Rang...] [callback]
- onCurrent: [(() => void)] [callback]
- onFocusLeave: [((direction: FocusDirection) => void)] [callback]
- onOpenChange: true, false [callback]

calendar (DesktopTimePickerDropdown) [surface: exported-helper]
- closeOnApply: true, false
- closeOnEscapeKey: true, false
- closeOnPopstate: true, false
- defaultValue: [TimeValue]
- disableSpanWrapper: true, false
- fallbackPlacements: [Placement[]]
- fitToContainer: true, false
- hoverDelayClose: [number]
- hoverDelayOpen: [number]
- navigationStartRef: [RefObject<{ focus(): void; }>]
- open: true, false
- outsideClick: [boolean | OutsideClickHandler]
- placement: bottom, bottom-end, bottom-start, left, left-end, left-start, right, right-end, right-start, top, top-end, top-start
- showSeconds: true, false
- size: l, m, s
- today: [number | Date]
- trigger: click, clickAndFocusVisible, focus, focusVisible, hover, hoverAndFocus, hoverAndFocusVisible
- triggerClassName: [string]
- triggerClickByKeys: true, false
- triggerRef: [ForwardedRef<ReferenceType | HTMLElement | null>]
- value: [TimeValue]
- children: [ReactNode] [infra]
- className: [string] [infra]
- data-test-id: [string] [infra]
- onApply: [(() => void)] [callback]
- onChangeValue: [((value?: TimeValue) => void)] [callback]
- onCurrent: [(() => void)] [callback]
- onFocusLeave: [((direction: FocusDirection) => void)] [callback]
- onOpenChange: true, false [callback]

calendar (Footer) [surface: exported-helper]
- flush: true, false
- onApply: [(() => void)] [callback]
- onCurrent: [(() => void)] [callback]

calendar (Grid) [surface: exported-helper]
- grid: [Cell[][]]

calendar (Item) [surface: exported-helper]
- address: [[number, number]]
- another: true, false
- checked: true, false
- current: true, false
- date: [Date]
- disabled: true, false
- holiday: true, false
- label: [string]
- rangePosition: end, in, out, start, start-end
- size: l, m, s
- testIdSegment: [string]
- visible: true, false
- className: [string] [infra]
- tabIndex: -1, 0 [infra]
- onKeyDown: [KeyboardEventHandler] [callback]
- onLeave: [(() => void)] [callback]
- onPreselect: [((date: Date) => void)] [callback]
- onSelect: [((date: Date) => void)] [callback]

calendar (MobileCalendar) [surface: exported-helper]
- buildCellProps: [BuildCellPropsFunction]
- closeOnApply: true, false
- closeOnPopstate: true, false
- defaultValue: [Range]
- locale: [Locale]
- mode: date, date-range, date-time, month, month-range, year, year-range
- open: true, false
- presets: [PresetsOptions]
- showHolidays: true, false
- showSeconds: true, false
- size: l, m, s
- today: [number | Date]
- value: [Range]
- data-test-id: [string] [infra]
- onApply: [(() => void)] [callback]
- onChangeValue: [(value: Range) => void] [callback]
- onClose: [() => void] [callback]
- onCurrent: [(() => void)] [callback]

calendar (MobileCalendarDropdown) [surface: exported-helper]
- autofocus: true, false
- bottomSlot: [ReactNode]
- buildCellProps: true, false
- closeOnApply: true, false
- closeOnEscapeKey: true, false
- closeOnPopstate: true, false
- defaultValue: [Date | Range]
- disableSpanWrapper: true, false
- fallbackPlacements: [Placement[]]
- fitToContainer: true, false
- hoverDelayClose: [number]
- hoverDelayOpen: [number]
- locale: [Intl.Locale]
- mode: date, date-range, date-time, month, month-range, year, year-range
- navigationStartRef: [RefObject<{ focus(): void; }>]
- open: true, false
- outsideClick: [boolean | OutsideClickHandler]
- placement: bottom, bottom-end, bottom-start, left, left-end, left-start, right, right-end, right-start, top, top-end, top-start
- presets: [PresetsOptions]
- showHolidays: true, false
- showSeconds: true, false
- size: l, m, s
- today: [number | Date]
- trigger: click, clickAndFocusVisible, focus, focusVisible, hover, hoverAndFocus, hoverAndFocusVisible
- triggerClassName: [string]
- triggerClickByKeys: true, false
- triggerRef: [ForwardedRef<ReferenceType | HTMLElement | null>]
- value: [Date | Range]
- children: [ReactNode] [infra]
- className: [string] [infra]
- data-test-id: [string] [infra]
- style: [CSSProperties] [infra]
- onApply: [(() => void)] [callback]
- onChangeValue: [((value: Date) => void) | ((value: Range) => void) | ((value: Range) => void) | ((value: Rang...] [callback]
- onCurrent: [(() => void)] [callback]
- onFocusLeave: [((direction: FocusDirection) => void)] [callback]
- onOpenChange: true, false [callback]

calendar (MobileFooter) [surface: exported-helper]
- applyDisabled: true, false
- onApply: [() => void] [callback]
- onCurrent: [() => void] [callback]

calendar (MobilePeriodBlock) [surface: exported-helper]
- config: [LevelConfig]
- date: [Date]
- level: decade, month, year
- size: l, m, s
- onSelect: [(date: Date) => void] [callback]

calendar (MobilePeriodScroller) [surface: exported-helper]
- anchorDate: [Date]
- config: [LevelConfig]
- level: decade, month, year
- size: l, m, s
- onSelect: [(date: Date) => void] [callback]

calendar (MobilePresetsScreen) [surface: exported-helper]
- items: [PresetItem[]]
- onSelect: [(range: Range) => void] [callback]

calendar (MobileTimePickerDropdown) [surface: exported-helper]
- closeOnApply: true, false
- closeOnEscapeKey: true, false
- closeOnPopstate: true, false
- defaultValue: [TimeValue]
- disableSpanWrapper: true, false
- fallbackPlacements: [Placement[]]
- fitToContainer: true, false
- hoverDelayClose: [number]
- hoverDelayOpen: [number]
- navigationStartRef: [RefObject<{ focus(): void; }>]
- open: true, false
- outsideClick: [boolean | OutsideClickHandler]
- placement: bottom, bottom-end, bottom-start, left, left-end, left-start, right, right-end, right-start, top, top-end, top-start
- showSeconds: true, false
- size: l, m, s
- today: [number | Date]
- trigger: click, clickAndFocusVisible, focus, focusVisible, hover, hoverAndFocus, hoverAndFocusVisible
- triggerClassName: [string]
- triggerClickByKeys: true, false
- triggerRef: [ForwardedRef<ReferenceType | HTMLElement | null>]
- value: [TimeValue]
- children: [ReactNode] [infra]
- className: [string] [infra]
- data-test-id: [string] [infra]
- onApply: [(() => void)] [callback]
- onChangeValue: [((value?: TimeValue) => void)] [callback]
- onCurrent: [(() => void)] [callback]
- onFocusLeave: [((direction: FocusDirection) => void)] [callback]
- onOpenChange: true, false [callback]

calendar (MobileTimeScreen) [surface: exported-helper]
- drumRef: [Ref<TimePickerDrumHandle>]
- size: l, m, s

calendar (NavButton) [surface: exported-helper]
- disabled: true, false
- focusName: [string]
- icon: [Element]
- label: [string]
- useNavigationStartRef: true, false
- data-test-id: [string] [infra]
- tabIndex: -1, 0 [infra]
- onClick: [(() => void)] [callback]
- onDownArrowKeyDown: [(() => void)] [callback]
- onLeftArrowKeyDown: [(() => void)] [callback]
- onRightArrowKeyDown: [(() => void)] [callback]

calendar (PeriodPresetsList) [surface: exported-helper]
- items: [PresetItem[]]
- className: [string] [infra]
- onChange: [(range: Range) => void] [callback]

calendar (TimeList) [surface: exported-helper]
- keyboardNavigationRef: [RefObject<{ focusItem(id: ItemId): void; }>]
- navigationStartRef: [RefObject<{ focus(): void; }>]
- numberOfItems: [number]
- value: [number]
- className: [string] [infra]
- data-test-id: [string] [infra]
- onChange: [(value: number) => void] [callback]
- onKeyDownGetter: [OnKeyDownGetter] [callback]

calendar (TimePickerBase) [surface: exported-helper]
- fixedWidth: true, false
- className: [string] [infra]

calendar (TimePickerDrum) [surface: exported-helper]
- customOptions: [TimePickerDrumCustomOptions]
- hours: [number]
- minutes: [number]
- seconds: [number]
- selectedDateLabel: [string]
- showSeconds: true, false
- size: l, m, s
- className: [string] [infra]
- data-test-id: [string] [infra]
- onHoursChange: [(value: number) => void] [callback]
- onMinutesChange: [(value: number) => void] [callback]
- onSecondsChange: [((value: number) => void)] [callback]

calendar (TimePickerDrumWheelColumn) [surface: exported-helper]
- formatLabel: [(value: number) => string]
- height: [number]
- itemHeight: [number]
- options: [number[]]
- value: [number]
- className: [string] [infra]
- data-test-id: [string] [infra]
- onChange: [(value: number) => void] [callback]

calendar (useOpenTrigger)

carousel (Control) [surface: exported-helper]
- direction: next, prev
- className: [string] [infra]
- data-test-id: [string] [infra]
- onClick: [(() => void)] [callback]

carousel (ItemProvider) [surface: exported-helper]
- gap: [string]
- page: [number]
- scrollBy: [number]
- showItems: [number]
- slideCallback: [(direction: number) => void]
- swipe: true, false
- swipeActivateLength: [number]
- transition: [number]

chips (ButtonClearValue) [surface: exported-helper]
- size: m, s
- data-test-id: [string] [infra]
- tabIndex: [number] [infra]
- onClick: [MouseEventHandler<HTMLButtonElement>] [callback]
- onKeyDown: [KeyboardEventHandler<HTMLButtonElement>] [callback]

chips (ChipChoiceBase)
- disabled: true, false
- icon: [ReactNode]
- label: [string]
- loading: true, false
- size: l, m, s
- truncateVariant: end, middle
- value: [unknown]
- valueToRender: [ReactNode]
- className: [string] [infra]
- tabIndex: [number] [infra]
- onClearButtonClick: [MouseEventHandler<HTMLButtonElement>] [callback]
- onClick: [MouseEventHandler<HTMLButtonElement | HTMLDivElement>] [callback]
- onKeyDown: [((e: KeyboardEvent<HTMLDivElement>) => void)] [callback]

chips (ChipChoiceCustom)
- content: [((props: CustomContentRenderProps<any>) => ReactNode)]
- disabled: true, false
- dropDownClassName: [string]
- icon: [ReactNode]
- label: [string]
- loading: true, false
- open: true, false
- placement: bottom, bottom-end, bottom-start, left, left-end, left-start, right, right-end, right-start, top, top-end, top-start
- size: l, m, s
- truncateVariant: end, middle
- value: [any]
- valueRender: [((value: any) => ReactNode)]
- widthStrategy: auto, eq, gte
- className: [string] [infra]
- data-test-id: [string] [infra]
- tabIndex: [number] [infra]
- onChange: [((value: any) => void)] [callback]
- onClearButtonClick: [MouseEventHandler<HTMLButtonElement>] [callback]
- onClick: [MouseEventHandler<HTMLButtonElement | HTMLDivElement>] [callback]
- onOpenChange: true, false [callback]

chips (ChipChoiceDate)
- buildCalendarCellProps: [BuildCellPropsFunction]
- defaultValue: [Date]
- disabled: true, false
- dropDownClassName: [string]
- icon: [ReactNode]
- label: [string]
- loading: true, false
- mode: date, date-time, month, year
- open: true, false
- placement: bottom, bottom-end, bottom-start, left, left-end, left-start, right, right-end, right-start, top, top-end, top-start
- showSeconds: true, false
- size: l, m, s
- truncateVariant: end, middle
- value: [Date]
- valueRender: [((value?: Date) => ReactNode)]
- widthStrategy: auto, eq, gte
- className: [string] [infra]
- data-test-id: [string] [infra]
- tabIndex: [number] [infra]
- onChange: [((value: Date) => void)] [callback]
- onClearButtonClick: [MouseEventHandler<HTMLButtonElement>] [callback]
- onClick: [MouseEventHandler<HTMLButtonElement | HTMLDivElement>] [callback]
- onOpenChange: true, false [callback]

chips (ChipChoiceDateRange)
- buildCalendarCellProps: [BuildCellPropsFunction]
- defaultValue: [Range]
- disabled: true, false
- dropDownClassName: [string]
- icon: [ReactNode]
- label: [string]
- loading: true, false
- open: true, false
- placement: bottom, bottom-end, bottom-start, left, left-end, left-start, right, right-end, right-start, top, top-end, top-start
- size: l, m, s
- truncateVariant: end, middle
- value: [Range]
- valueRender: [((value?: Range) => ReactNode)]
- widthStrategy: auto, eq, gte
- className: [string] [infra]
- data-test-id: [string] [infra]
- tabIndex: [number] [infra]
- onChange: [((value: Range) => void)] [callback]
- onClearButtonClick: [MouseEventHandler<HTMLButtonElement>] [callback]
- onClick: [MouseEventHandler<HTMLButtonElement | HTMLDivElement>] [callback]
- onOpenChange: true, false [callback]

chips (ChipChoiceMultiple)
- autoApply: true, false
- contentRender: [((option: { label: ItemId; value?: ItemId; contentRenderProps?: T; }) => ReactNode) | undefined]
- dataError: true, false
- dataFiltered: true, false
- defaultValue: [ItemId[]]
- disabled: true, false
- disableFuzzySearch: true, false
- dropDownClassName: [string]
- errorDataState: [EmptyStateProps]
- filterFn: [((option: { label: ItemId; value?: ItemId; contentRenderProps?: T; }) => boolean) | undefined]
- footer: [ReactNode ;]
- footerActiveElementsRefs: [RefObject<HTMLElement>[]]
- icon: [ReactNode]
- label: [string]
- loading: true, false
- noDataState: [EmptyStateProps]
- noResultsState: [EmptyStateProps]
- open: true, false
- options: [FilterOption<T>[]]
- placement: bottom, bottom-end, bottom-start, left, left-end, left-start, right, right-end, right-start, top, top-end, top-start
- scrollContainerRef: [Ref<HTMLElement>]
- scrollRef: [Ref<HTMLElement>]
- scrollToSelectedItem: true, false
- searchable: true, false
- selection: [SelectionMultipleState | SelectionSingleState]
- size: l, m, s
- truncateVariant: end, middle
- value: [ItemId[]]
- valueRender: [((option?: BaseOption<T>[]) => ReactNode)]
- virtualized: true, false
- widthStrategy: auto, eq, gte
- errorDataState.description: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- errorDataState.footer: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- errorDataState.icon: [IconPredefinedProps | undefined] [nested]
- noDataState.description: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- noDataState.footer: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- noDataState.icon: [IconPredefinedProps | undefined] [nested]
- noResultsState.description: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- noResultsState.footer: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- noResultsState.icon: [IconPredefinedProps | undefined] [nested]
- className: [string] [infra]
- data-test-id: [string] [infra]
- errorDataState.className: [string | undefined] [infra, nested]
- errorDataState.data-test-id: [string | undefined] [infra, nested]
- noDataState.className: [string | undefined] [infra, nested]
- noDataState.data-test-id: [string | undefined] [infra, nested]
- noResultsState.className: [string | undefined] [infra, nested]
- noResultsState.data-test-id: [string | undefined] [infra, nested]
- tabIndex: [number] [infra]
- onApprove: [(() => void)] [callback]
- onCancel: [(() => void)] [callback]
- onChange: [OnChangeHandler<ItemId[]>] [callback]
- onClearButtonClick: [MouseEventHandler<HTMLButtonElement>] [callback]
- onClick: [MouseEventHandler<HTMLButtonElement | HTMLDivElement>] [callback]
- onOpenChange: true, false [callback]

chips (ChipChoiceSingle)
- autoApply: true, false
- contentRender: [((option: { label: ItemId; value?: ItemId; contentRenderProps?: T; }) => ReactNode) | undefined]
- dataError: true, false
- dataFiltered: true, false
- defaultValue: [ItemId]
- disabled: true, false
- disableFuzzySearch: true, false
- dropDownClassName: [string]
- errorDataState: [EmptyStateProps]
- filterFn: [((option: { label: ItemId; value?: ItemId; contentRenderProps?: T; }) => boolean) | undefined]
- footer: [ReactNode ;]
- footerActiveElementsRefs: [RefObject<HTMLElement>[]]
- icon: [ReactNode]
- label: [string]
- loading: true, false
- noDataState: [EmptyStateProps]
- noResultsState: [EmptyStateProps]
- open: true, false
- options: [FilterOption<T>[]]
- placement: bottom, bottom-end, bottom-start, left, left-end, left-start, right, right-end, right-start, top, top-end, top-start
- scrollContainerRef: [Ref<HTMLElement>]
- scrollRef: [Ref<HTMLElement>]
- scrollToSelectedItem: true, false
- searchable: true, false
- selection: [SelectionMultipleState | SelectionSingleState]
- size: l, m, s
- truncateVariant: end, middle
- value: [ItemId]
- valueRender: [((option?: BaseOption<T>) => ReactNode)]
- virtualized: true, false
- widthStrategy: auto, eq, gte
- errorDataState.description: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- errorDataState.footer: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- errorDataState.icon: [IconPredefinedProps | undefined] [nested]
- noDataState.description: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- noDataState.footer: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- noDataState.icon: [IconPredefinedProps | undefined] [nested]
- noResultsState.description: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- noResultsState.footer: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- noResultsState.icon: [IconPredefinedProps | undefined] [nested]
- className: [string] [infra]
- data-test-id: [string] [infra]
- errorDataState.className: [string | undefined] [infra, nested]
- errorDataState.data-test-id: [string | undefined] [infra, nested]
- noDataState.className: [string | undefined] [infra, nested]
- noDataState.data-test-id: [string | undefined] [infra, nested]
- noResultsState.className: [string | undefined] [infra, nested]
- noResultsState.data-test-id: [string | undefined] [infra, nested]
- tabIndex: [number] [infra]
- onApprove: [(() => void)] [callback]
- onCancel: [(() => void)] [callback]
- onChange: [OnChangeHandler<ItemId>] [callback]
- onClearButtonClick: [MouseEventHandler<HTMLButtonElement>] [callback]
- onClick: [MouseEventHandler<HTMLButtonElement | HTMLDivElement>] [callback]
- onOpenChange: true, false [callback]

chips (ChipChoiceTime)
- defaultValue: [TimeValue]
- disabled: true, false
- dropDownClassName: [string]
- icon: [ReactNode]
- label: [string]
- loading: true, false
- open: true, false
- placement: bottom, bottom-end, bottom-start, left, left-end, left-start, right, right-end, right-start, top, top-end, top-start
- showSeconds: true, false
- size: l, m, s
- truncateVariant: end, middle
- value: [TimeValue]
- valueRender: [((value?: TimeValue) => ReactNode)]
- className: [string] [infra]
- data-test-id: [string] [infra]
- tabIndex: [number] [infra]
- onChange: [((value: TimeValue) => void)] [callback]
- onClearButtonClick: [MouseEventHandler<HTMLButtonElement>] [callback]
- onClick: [MouseEventHandler<HTMLButtonElement | HTMLDivElement>] [callback]
- onOpenChange: true, false [callback]

chips (ForwardedChipChoice)
- autoApply: true, false
- buildCalendarCellProps: [BuildCellPropsFunction]
- content: [((props: CustomContentRenderProps<any>) => ReactNode)]
- contentRender: [((option: { label: ItemId; value?: ItemId; contentRenderProps?: ContentRenderProps; }) => Rea...]
- dataError: true, false
- dataFiltered: true, false
- defaultValue: [Date | Range | ItemId | ItemId[] | TimeValue]
- disabled: true, false
- disableFuzzySearch: true, false
- dropDownClassName: [string]
- errorDataState: [EmptyStateProps]
- filterFn: [((option: { label: ItemId; value?: ItemId; contentRenderProps?: ContentRenderProps; }) => boo...]
- footer: [ReactNode ;]
- footerActiveElementsRefs: [RefObject<HTMLElement>[]]
- icon: [ReactNode]
- label: [string]
- loading: true, false
- mode: date, date-time, month, year
- noDataState: [EmptyStateProps]
- noResultsState: [EmptyStateProps]
- open: true, false
- options: [FilterOption<ContentRenderProps>[]]
- placement: bottom, bottom-end, bottom-start, left, left-end, left-start, right, right-end, right-start, top, top-end, top-start
- scrollContainerRef: [Ref<HTMLElement>]
- scrollRef: [Ref<HTMLElement>]
- scrollToSelectedItem: true, false
- searchable: true, false
- selection: [SelectionMultipleState | SelectionSingleState]
- showSeconds: true, false
- size: l, m, s
- truncateVariant: end, middle
- type: custom, date, date-range, date-time, multiple, single, time
- value: [any]
- valueRender: [((value: any) => ReactNode) | ((value?: Date) => ReactNode) | ((value?: Range) => ReactNode) ...]
- virtualized: true, false
- widthStrategy: auto, eq, gte
- errorDataState.description: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- errorDataState.footer: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- errorDataState.icon: [IconPredefinedProps | undefined] [nested]
- noDataState.description: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- noDataState.footer: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- noDataState.icon: [IconPredefinedProps | undefined] [nested]
- noResultsState.description: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- noResultsState.footer: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- noResultsState.icon: [IconPredefinedProps | undefined] [nested]
- className: [string] [infra]
- data-test-id: [string] [infra]
- errorDataState.className: [string | undefined] [infra, nested]
- errorDataState.data-test-id: [string | undefined] [infra, nested]
- id: [string] [infra]
- noDataState.className: [string | undefined] [infra, nested]
- noDataState.data-test-id: [string | undefined] [infra, nested]
- noResultsState.className: [string | undefined] [infra, nested]
- noResultsState.data-test-id: [string | undefined] [infra, nested]
- tabIndex: [number] [infra]
- onApprove: [(() => void)] [callback]
- onCancel: [(() => void)] [callback]
- onChange: [((value: any) => void) | ((value: Date) => void) | ((value: Range) => void) | OnChangeHandler...] [callback]
- onClearButtonClick: [MouseEventHandler<HTMLButtonElement>] [callback]
- onClick: [MouseEventHandler<HTMLButtonElement | HTMLDivElement>] [callback]
- onOpenChange: true, false [callback]

chips (useAutoApply)
- autoApply: true, false
- size: l, m, s
- onApprove: [() => void] [callback]
- onCancel: [() => void] [callback]

color-picker (ChannelSlider) [surface: exported-helper]
- alpha: true, false
- disabled: true, false
- gradient: [string]
- max: [number]
- min: [number]
- size: l, m, s
- step: [number]
- thumbColor: [string]
- value: [number]
- data-test-id: [string] [infra]
- onChange: [(value: number) => void] [callback]

color-picker (FieldAlphaColor) [surface: exported-helper]
- rgba: [RgbaColor]
- size: l, m, s
- data-test-id: [string] [infra]
- onChange: [(color: Color) => void] [callback]

color-picker (FieldPrivate) [surface: exported-helper]
- disabled: true, false
- error: true, false
- inputType: number, text
- max: [number]
- min: [number]
- size: l, m, s
- value: [string | number]
- className: [string] [infra]
- data-test-id: [string] [infra]
- onChange: [((value?: string) => void)] [callback]

counter (formatValue)
- plusLimit: [number]
- value: [number]
- variant: count, count-k, count-plus

drawer (ButtonClose) [surface: exported-helper]
- className: [string] [infra]
- data-test-id: [string] [infra]
- onClick: [() => void] [callback]

drawer (DesktopDrawer) [surface: exported-helper]
- additionalButton: [BottomSheetActionButton]
- approveButton: [BottomSheetActionButton]
- cancelButton: [BottomSheetActionButton]
- closeOnPopstate: true, false
- container: [string | HTMLElement]
- content: [ReactNode]
- disclaimer: [ReactNode]
- footer: [(ReactElement<any, string | JSXElementConstructor<any>> & (string | number | boolean | ReactE...]
- footerActionsOrientation: horizontal, vertical
- heightAuto: true, false
- media: [ReactNode]
- nestedDrawer: [ReactElement<DrawerProps, string | JSXElementConstructor<any>>]
- open: true, false
- position: bottom, left, right, top
- rootClassName: [string]
- safeArea: true, false
- showBlackout: true, false
- slotAfterHeadline: [ReactNode]
- snapIndex: [number]
- snapPoints: [SnapPoint[]]
- subtitle: [ReactNode]
- swipeEnabled: true, false
- title: [ReactNode]
- width: [string | number]
- nestedDrawer.additionalButton: [BottomSheetActionButton | undefined] [nested]
- nestedDrawer.additionalButton.appearance: critical, neutral, primary [nested]
- nestedDrawer.additionalButton.counter: [Omit<CounterProps, "size" | "appearance"> | undefined] [nested]
- nestedDrawer.additionalButton.disabled: [boolean | undefined] [nested]
- nestedDrawer.additionalButton.icon: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- nestedDrawer.additionalButton.iconPosition: after, before [nested]
- nestedDrawer.additionalButton.label: [string | undefined] [nested]
- nestedDrawer.additionalButton.loading: [boolean | undefined] [nested]
- nestedDrawer.additionalButton.view: elevated, filled, function, outline, simple, tonal [nested]
- nestedDrawer.approveButton: [BottomSheetActionButton | undefined] [nested]
- nestedDrawer.approveButton.appearance: critical, neutral, primary [nested]
- nestedDrawer.approveButton.counter: [Omit<CounterProps, "size" | "appearance"> | undefined] [nested]
- nestedDrawer.approveButton.disabled: [boolean | undefined] [nested]
- nestedDrawer.approveButton.icon: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- nestedDrawer.approveButton.iconPosition: after, before [nested]
- nestedDrawer.approveButton.label: [string | undefined] [nested]
- nestedDrawer.approveButton.loading: [boolean | undefined] [nested]
- nestedDrawer.approveButton.view: elevated, filled, function, outline, simple, tonal [nested]
- nestedDrawer.cancelButton: [BottomSheetActionButton | undefined] [nested]
- nestedDrawer.cancelButton.appearance: critical, neutral, primary [nested]
- nestedDrawer.cancelButton.counter: [Omit<CounterProps, "size" | "appearance"> | undefined] [nested]
- nestedDrawer.cancelButton.disabled: [boolean | undefined] [nested]
- nestedDrawer.cancelButton.icon: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- nestedDrawer.cancelButton.iconPosition: after, before [nested]
- nestedDrawer.cancelButton.label: [string | undefined] [nested]
- nestedDrawer.cancelButton.loading: [boolean | undefined] [nested]
- nestedDrawer.cancelButton.view: elevated, filled, function, outline, simple, tonal [nested]
- nestedDrawer.closeOnPopstate: [boolean | undefined] [nested]
- nestedDrawer.container: [string | HTMLElement | undefined] [nested]
- nestedDrawer.content: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- nestedDrawer.disclaimer: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- nestedDrawer.footer: [(ReactElement<any, string | JSXElementConstructor<any>> & (string | number | boolean | ReactE...] [nested]
- nestedDrawer.footerActionsOrientation: horizontal, vertical [nested]
- nestedDrawer.heightAuto: [boolean | undefined] [nested]
- nestedDrawer.media: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- nestedDrawer.nestedDrawer: [ReactElement<DrawerProps, string | JSXElementConstructor<any>> | undefined] [nested]
- nestedDrawer.nestedDrawer.additionalButton: [BottomSheetActionButton | undefined] [nested]
- nestedDrawer.nestedDrawer.approveButton: [BottomSheetActionButton | undefined] [nested]
- nestedDrawer.nestedDrawer.cancelButton: [BottomSheetActionButton | undefined] [nested]
- nestedDrawer.nestedDrawer.closeOnPopstate: [boolean | undefined] [nested]
- nestedDrawer.nestedDrawer.container: [string | HTMLElement | undefined] [nested]
- nestedDrawer.nestedDrawer.content: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- nestedDrawer.nestedDrawer.disclaimer: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- nestedDrawer.nestedDrawer.footer: [(ReactElement<any, string | JSXElementConstructor<any>> & (string | number | boolean | ReactE...] [nested]
- nestedDrawer.nestedDrawer.footerActionsOrientation: horizontal, vertical [nested]
- nestedDrawer.nestedDrawer.heightAuto: [boolean | undefined] [nested]
- nestedDrawer.nestedDrawer.media: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- nestedDrawer.nestedDrawer.nestedDrawer: [ReactElement<DrawerProps, string | JSXElementConstructor<any>> | undefined] [nested]
- nestedDrawer.nestedDrawer.open: true, false [nested]
- nestedDrawer.nestedDrawer.position: bottom, left, right, top [nested]
- nestedDrawer.nestedDrawer.rootClassName: [string | undefined] [nested]
- nestedDrawer.nestedDrawer.safeArea: [boolean | undefined] [nested]
- nestedDrawer.nestedDrawer.showBlackout: [boolean | undefined] [nested]
- nestedDrawer.nestedDrawer.slotAfterHeadline: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- nestedDrawer.nestedDrawer.snapIndex: [number | undefined] [nested]
- nestedDrawer.nestedDrawer.snapPoints: [SnapPoint[] | undefined] [nested]
- nestedDrawer.nestedDrawer.subtitle: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- nestedDrawer.nestedDrawer.swipeEnabled: [boolean | undefined] [nested]
- nestedDrawer.nestedDrawer.title: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- nestedDrawer.nestedDrawer.width: [string | number | undefined] [nested]
- nestedDrawer.open: true, false [nested]
- nestedDrawer.position: bottom, left, right, top [nested]
- nestedDrawer.rootClassName: [string | undefined] [nested]
- nestedDrawer.safeArea: [boolean | undefined] [nested]
- nestedDrawer.showBlackout: [boolean | undefined] [nested]
- nestedDrawer.slotAfterHeadline: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- nestedDrawer.snapIndex: [number | undefined] [nested]
- nestedDrawer.snapPoints: [SnapPoint[] | undefined] [nested]
- nestedDrawer.subtitle: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- nestedDrawer.swipeEnabled: [boolean | undefined] [nested]
- nestedDrawer.title: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- nestedDrawer.width: [string | number | undefined] [nested]
- className: [string] [infra]
- data-test-id: [string] [infra]
- nestedDrawer.additionalButton.as: button [infra, nested]
- nestedDrawer.additionalButton.className: [string | undefined] [infra, nested]
- nestedDrawer.additionalButton.data-test-id: [string | undefined] [infra, nested]
- nestedDrawer.additionalButton.innerRef: [((instance: HTMLButtonElement | null) => void | DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_...] [infra, nested]
- nestedDrawer.approveButton.as: button [infra, nested]
- nestedDrawer.approveButton.className: [string | undefined] [infra, nested]
- nestedDrawer.approveButton.data-test-id: [string | undefined] [infra, nested]
- nestedDrawer.approveButton.innerRef: [((instance: HTMLButtonElement | null) => void | DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_...] [infra, nested]
- nestedDrawer.cancelButton.as: button [infra, nested]
- nestedDrawer.cancelButton.className: [string | undefined] [infra, nested]
- nestedDrawer.cancelButton.data-test-id: [string | undefined] [infra, nested]
- nestedDrawer.cancelButton.innerRef: [((instance: HTMLButtonElement | null) => void | DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_...] [infra, nested]
- nestedDrawer.children: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [infra, nested]
- nestedDrawer.className: [string | undefined] [infra, nested]
- nestedDrawer.data-test-id: [string | undefined] [infra, nested]
- nestedDrawer.nestedDrawer.children: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [infra, nested]
- nestedDrawer.nestedDrawer.className: [string | undefined] [infra, nested]
- nestedDrawer.nestedDrawer.data-test-id: [string | undefined] [infra, nested]
- nestedDrawer.nestedDrawer.onBackButtonClick: [(() => void) | undefined] [callback, nested]
- nestedDrawer.nestedDrawer.onClose: [() => void] [callback, nested]
- nestedDrawer.nestedDrawer.onSnapIndexChange: [((snapIndex: number) => void) | undefined] [callback, nested]
- nestedDrawer.onBackButtonClick: [(() => void) | undefined] [callback, nested]
- nestedDrawer.onClose: [() => void] [callback, nested]
- nestedDrawer.onSnapIndexChange: [((snapIndex: number) => void) | undefined] [callback, nested]
- onBackButtonClick: [(() => void)] [callback]
- onClose: [() => void] [callback]
- onSnapIndexChange: [((snapIndex: number) => void)] [callback]

drawer (DialogBody)
- bodyPadding: true, false
- content: [ReactNode]
- className: [string] [infra]
- data-test-id: [string] [infra]

drawer (DialogFooter)
- className: [string] [infra]
- data-test-id: [string] [infra]

drawer (DialogHeader)
- actionButton: [ReactNode]
- slotAfterHeadline: [ReactNode]
- subHeadline: [ReactNode]
- subtitle: [ReactNode]
- title: [ReactNode]
- titleId: [string]
- className: [string] [infra]
- data-test-id: [string] [infra]
- onBackButtonClick: [(() => void)] [callback]

drawer (DrawerBody) [surface: exported-helper]
- bodyPadding: true, false
- content: [ReactNode]
- className: [string] [infra]
- data-test-id: [string] [infra]

drawer (DrawerFooter) [surface: exported-helper]
- className: [string] [infra]
- data-test-id: [string] [infra]

drawer (DrawerHeader) [surface: exported-helper]
- actionButton: [ReactNode]
- slotAfterHeadline: [ReactNode]
- subHeadline: [ReactNode]
- subtitle: [ReactNode]
- title: [ReactNode]
- titleId: [string]
- className: [string] [infra]
- data-test-id: [string] [infra]
- onBackButtonClick: [(() => void)] [callback]

drawer (MobileDrawer) [surface: exported-helper]
- additionalButton: [BottomSheetActionButton]
- approveButton: [BottomSheetActionButton]
- cancelButton: [BottomSheetActionButton]
- closeOnPopstate: true, false
- container: [string | HTMLElement]
- content: [ReactNode]
- disclaimer: [ReactNode]
- footer: [(ReactElement<any, string | JSXElementConstructor<any>> & (string | number | boolean | ReactE...]
- footerActionsOrientation: horizontal, vertical
- heightAuto: true, false
- media: [ReactNode]
- nestedDrawer: [ReactElement<DrawerProps, string | JSXElementConstructor<any>>]
- open: true, false
- position: bottom, left, right, top
- rootClassName: [string]
- safeArea: true, false
- showBlackout: true, false
- slotAfterHeadline: [ReactNode]
- snapIndex: [number]
- snapPoints: [SnapPoint[]]
- subtitle: [ReactNode]
- swipeEnabled: true, false
- title: [ReactNode]
- width: [string | number]
- nestedDrawer.additionalButton: [BottomSheetActionButton | undefined] [nested]
- nestedDrawer.additionalButton.appearance: critical, neutral, primary [nested]
- nestedDrawer.additionalButton.counter: [Omit<CounterProps, "size" | "appearance"> | undefined] [nested]
- nestedDrawer.additionalButton.disabled: [boolean | undefined] [nested]
- nestedDrawer.additionalButton.icon: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- nestedDrawer.additionalButton.iconPosition: after, before [nested]
- nestedDrawer.additionalButton.label: [string | undefined] [nested]
- nestedDrawer.additionalButton.loading: [boolean | undefined] [nested]
- nestedDrawer.additionalButton.view: elevated, filled, function, outline, simple, tonal [nested]
- nestedDrawer.approveButton: [BottomSheetActionButton | undefined] [nested]
- nestedDrawer.approveButton.appearance: critical, neutral, primary [nested]
- nestedDrawer.approveButton.counter: [Omit<CounterProps, "size" | "appearance"> | undefined] [nested]
- nestedDrawer.approveButton.disabled: [boolean | undefined] [nested]
- nestedDrawer.approveButton.icon: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- nestedDrawer.approveButton.iconPosition: after, before [nested]
- nestedDrawer.approveButton.label: [string | undefined] [nested]
- nestedDrawer.approveButton.loading: [boolean | undefined] [nested]
- nestedDrawer.approveButton.view: elevated, filled, function, outline, simple, tonal [nested]
- nestedDrawer.cancelButton: [BottomSheetActionButton | undefined] [nested]
- nestedDrawer.cancelButton.appearance: critical, neutral, primary [nested]
- nestedDrawer.cancelButton.counter: [Omit<CounterProps, "size" | "appearance"> | undefined] [nested]
- nestedDrawer.cancelButton.disabled: [boolean | undefined] [nested]
- nestedDrawer.cancelButton.icon: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- nestedDrawer.cancelButton.iconPosition: after, before [nested]
- nestedDrawer.cancelButton.label: [string | undefined] [nested]
- nestedDrawer.cancelButton.loading: [boolean | undefined] [nested]
- nestedDrawer.cancelButton.view: elevated, filled, function, outline, simple, tonal [nested]
- nestedDrawer.closeOnPopstate: [boolean | undefined] [nested]
- nestedDrawer.container: [string | HTMLElement | undefined] [nested]
- nestedDrawer.content: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- nestedDrawer.disclaimer: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- nestedDrawer.footer: [(ReactElement<any, string | JSXElementConstructor<any>> & (string | number | boolean | ReactE...] [nested]
- nestedDrawer.footerActionsOrientation: horizontal, vertical [nested]
- nestedDrawer.heightAuto: [boolean | undefined] [nested]
- nestedDrawer.media: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- nestedDrawer.nestedDrawer: [ReactElement<DrawerProps, string | JSXElementConstructor<any>> | undefined] [nested]
- nestedDrawer.nestedDrawer.additionalButton: [BottomSheetActionButton | undefined] [nested]
- nestedDrawer.nestedDrawer.approveButton: [BottomSheetActionButton | undefined] [nested]
- nestedDrawer.nestedDrawer.cancelButton: [BottomSheetActionButton | undefined] [nested]
- nestedDrawer.nestedDrawer.closeOnPopstate: [boolean | undefined] [nested]
- nestedDrawer.nestedDrawer.container: [string | HTMLElement | undefined] [nested]
- nestedDrawer.nestedDrawer.content: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- nestedDrawer.nestedDrawer.disclaimer: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- nestedDrawer.nestedDrawer.footer: [(ReactElement<any, string | JSXElementConstructor<any>> & (string | number | boolean | ReactE...] [nested]
- nestedDrawer.nestedDrawer.footerActionsOrientation: horizontal, vertical [nested]
- nestedDrawer.nestedDrawer.heightAuto: [boolean | undefined] [nested]
- nestedDrawer.nestedDrawer.media: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- nestedDrawer.nestedDrawer.nestedDrawer: [ReactElement<DrawerProps, string | JSXElementConstructor<any>> | undefined] [nested]
- nestedDrawer.nestedDrawer.open: true, false [nested]
- nestedDrawer.nestedDrawer.position: bottom, left, right, top [nested]
- nestedDrawer.nestedDrawer.rootClassName: [string | undefined] [nested]
- nestedDrawer.nestedDrawer.safeArea: [boolean | undefined] [nested]
- nestedDrawer.nestedDrawer.showBlackout: [boolean | undefined] [nested]
- nestedDrawer.nestedDrawer.slotAfterHeadline: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- nestedDrawer.nestedDrawer.snapIndex: [number | undefined] [nested]
- nestedDrawer.nestedDrawer.snapPoints: [SnapPoint[] | undefined] [nested]
- nestedDrawer.nestedDrawer.subtitle: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- nestedDrawer.nestedDrawer.swipeEnabled: [boolean | undefined] [nested]
- nestedDrawer.nestedDrawer.title: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- nestedDrawer.nestedDrawer.width: [string | number | undefined] [nested]
- nestedDrawer.open: true, false [nested]
- nestedDrawer.position: bottom, left, right, top [nested]
- nestedDrawer.rootClassName: [string | undefined] [nested]
- nestedDrawer.safeArea: [boolean | undefined] [nested]
- nestedDrawer.showBlackout: [boolean | undefined] [nested]
- nestedDrawer.slotAfterHeadline: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- nestedDrawer.snapIndex: [number | undefined] [nested]
- nestedDrawer.snapPoints: [SnapPoint[] | undefined] [nested]
- nestedDrawer.subtitle: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- nestedDrawer.swipeEnabled: [boolean | undefined] [nested]
- nestedDrawer.title: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- nestedDrawer.width: [string | number | undefined] [nested]
- className: [string] [infra]
- data-test-id: [string] [infra]
- nestedDrawer.additionalButton.as: button [infra, nested]
- nestedDrawer.additionalButton.className: [string | undefined] [infra, nested]
- nestedDrawer.additionalButton.data-test-id: [string | undefined] [infra, nested]
- nestedDrawer.additionalButton.innerRef: [((instance: HTMLButtonElement | null) => void | DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_...] [infra, nested]
- nestedDrawer.approveButton.as: button [infra, nested]
- nestedDrawer.approveButton.className: [string | undefined] [infra, nested]
- nestedDrawer.approveButton.data-test-id: [string | undefined] [infra, nested]
- nestedDrawer.approveButton.innerRef: [((instance: HTMLButtonElement | null) => void | DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_...] [infra, nested]
- nestedDrawer.cancelButton.as: button [infra, nested]
- nestedDrawer.cancelButton.className: [string | undefined] [infra, nested]
- nestedDrawer.cancelButton.data-test-id: [string | undefined] [infra, nested]
- nestedDrawer.cancelButton.innerRef: [((instance: HTMLButtonElement | null) => void | DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_...] [infra, nested]
- nestedDrawer.children: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [infra, nested]
- nestedDrawer.className: [string | undefined] [infra, nested]
- nestedDrawer.data-test-id: [string | undefined] [infra, nested]
- nestedDrawer.nestedDrawer.children: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [infra, nested]
- nestedDrawer.nestedDrawer.className: [string | undefined] [infra, nested]
- nestedDrawer.nestedDrawer.data-test-id: [string | undefined] [infra, nested]
- nestedDrawer.nestedDrawer.onBackButtonClick: [(() => void) | undefined] [callback, nested]
- nestedDrawer.nestedDrawer.onClose: [() => void] [callback, nested]
- nestedDrawer.nestedDrawer.onSnapIndexChange: [((snapIndex: number) => void) | undefined] [callback, nested]
- nestedDrawer.onBackButtonClick: [(() => void) | undefined] [callback, nested]
- nestedDrawer.onClose: [() => void] [callback, nested]
- nestedDrawer.onSnapIndexChange: [((snapIndex: number) => void) | undefined] [callback, nested]
- onBackButtonClick: [(() => void)] [callback]
- onClose: [() => void] [callback]
- onSnapIndexChange: [((snapIndex: number) => void)] [callback]

dropdown (DesktopDropdown) [surface: exported-helper]
- bodyPadding: true, false
- closeOnEscapeKey: true, false
- closeOnPopstate: true, false
- container: [RefObject<HTMLElement | null>]
- content: [ReactNode]
- disableSpanWrapper: true, false
- fallbackPlacements: [Placement[]]
- footer: [ReactNode]
- footerDivider: true, false
- headerDivider: true, false
- headline: [ReactNode]
- headlineHint: [ReactNode]
- hoverDelayClose: [number]
- hoverDelayOpen: [number]
- offset: [number]
- open: true, false
- outsideClick: [boolean | OutsideClickHandler]
- placement: bottom, bottom-end, bottom-start, left, left-end, left-start, right, right-end, right-start, top, top-end, top-start
- search: [ReactNode]
- state: [DropdownState]
- trigger: click, clickAndFocusVisible, focus, focusVisible, hover, hoverAndFocus, hoverAndFocusVisible
- triggerClassName: [string]
- triggerClickByKeys: true, false
- triggerRef: [ForwardedRef<ReferenceType | HTMLElement | null>]
- widthStrategy: auto, eq, gte
- className: [string] [infra]
- data-test-id: [string] [infra]
- onOpenChange: true, false [callback]

dropdown (DropdownBody) [surface: exported-helper]
- bodyPadding: true, false
- state: [DropdownState]

dropdown (MobileDropdown) [surface: exported-helper]
- bodyPadding: true, false
- closeOnEscapeKey: true, false
- closeOnPopstate: true, false
- container: [RefObject<HTMLElement | null>]
- content: [ReactNode]
- disableSpanWrapper: true, false
- fallbackPlacements: [Placement[]]
- footer: [ReactNode]
- footerDivider: true, false
- headerDivider: true, false
- headline: [ReactNode]
- headlineHint: [ReactNode]
- hoverDelayClose: [number]
- hoverDelayOpen: [number]
- offset: [number]
- open: true, false
- outsideClick: [boolean | OutsideClickHandler]
- placement: bottom, bottom-end, bottom-start, left, left-end, left-start, right, right-end, right-start, top, top-end, top-start
- search: [ReactNode]
- state: [DropdownState]
- trigger: click, clickAndFocusVisible, focus, focusVisible, hover, hoverAndFocus, hoverAndFocusVisible
- triggerClassName: [string]
- triggerClickByKeys: true, false
- triggerRef: [ForwardedRef<ReferenceType | HTMLElement | null>]
- widthStrategy: auto, eq, gte
- className: [string] [infra]
- data-test-id: [string] [infra]
- onOpenChange: true, false [callback]

dropzone (PrivateDropZone) [surface: exported-helper]
- accept: [AcceptInput]
- capture: [boolean | "user" | "environment"]
- disabled: true, false
- form: [string]
- isOver: true, false
- maxSize: [number]
- mode: multiple, single
- name: [string]
- required: true, false
- size: l, m, s
- children: [ReactNode] [infra]
- className: [string] [infra]
- data-test-id: [string] [infra]
- id: [string] [infra]
- innerRef: [Ref<HTMLInputElement>] [infra]
- onChange: [ChangeEventHandler<HTMLInputElement>] [callback]
- onFilesReject: [((rejections: FileRejection[]) => void)] [callback]
- onFilesUpload: [(files: File[]) => void] [callback]

fields (FieldElementButton) [surface: exported-helper]
- action: [ReactNode]
- disabled: true, false
- loading: true, false
- open: true, false
- size: l, m, s
- variant: after, before
- withDropdownList: true, false
- className: [string] [infra]
- data-test-id: [string] [infra]
- tabIndex: [number] [infra]
- onClick: [(() => void)] [callback]
- onKeyDown: [((event: KeyboardEvent<HTMLButtonElement>) => void)] [callback]

fields (FieldElementButtonList) [surface: exported-helper]
- action: [ReactNode]
- disabled: true, false
- droplist: [FieldElementDroplistProps]
- loading: true, false
- size: l, m, s
- variant: after, before
- droplist.closeDroplistOnItemClick: [boolean | undefined] [nested]
- droplist.items: [Item[]] [nested]
- droplist.items.afterContent: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- droplist.items.autoscrollTo: bottom, right [nested]
- droplist.items.barHideStrategy: leave, move, never, scroll [nested]
- droplist.items.beforeContent: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- droplist.items.checked: [boolean | undefined] [nested]
- droplist.items.clickScrolling: [boolean | undefined] [nested]
- droplist.items.content: [ReactNode | ItemContentProps] [nested]
- droplist.items.disabled: [boolean | undefined] [nested]
- droplist.items.divider: [boolean | undefined] [nested]
- droplist.items.groupVariant: subtitle, subtitleTertiary [nested]
- droplist.items.hidden: [boolean | undefined] [nested]
- droplist.items.href: [string | undefined] [nested]
- droplist.items.icon: [JSXElementConstructor<{ size: number; }> | undefined] [nested]
- droplist.items.itemRef: [RefObject<HTMLElement> | undefined] [nested]
- droplist.items.itemWrapRender: [((item: ReactNode) => ReactNode) | undefined] [nested]
- droplist.items.label: [string | undefined] [nested]
- droplist.items.overflow: [{ x?: "hidden" | "visible" | "scroll" | "visible-hidden" | "visible-scroll"; y?: "hidden" | "...] [nested]
- droplist.items.paddingAbsolute: [boolean | undefined] [nested]
- droplist.items.resize: both, horizontal, none, vertical [nested]
- droplist.items.shortLabel: [string | undefined] [nested]
- droplist.items.showSwitchIcon: [boolean | undefined] [nested]
- droplist.items.size: m, s [nested]
- droplist.items.truncate: [{ variant?: TruncateStringProps["variant"]; } | undefined] [nested]
- droplist.items.untouchableScrollbars: [boolean | undefined] [nested]
- droplist.open: [boolean | undefined] [nested]
- droplist.pinBottom: [Item[] | undefined] [nested]
- droplist.pinBottom.afterContent: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- droplist.pinBottom.autoscrollTo: bottom, right [nested]
- droplist.pinBottom.barHideStrategy: leave, move, never, scroll [nested]
- droplist.pinBottom.beforeContent: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- droplist.pinBottom.checked: [boolean | undefined] [nested]
- droplist.pinBottom.clickScrolling: [boolean | undefined] [nested]
- droplist.pinBottom.content: [ReactNode | ItemContentProps] [nested]
- droplist.pinBottom.disabled: [boolean | undefined] [nested]
- droplist.pinBottom.divider: [boolean | undefined] [nested]
- droplist.pinBottom.groupVariant: subtitle, subtitleTertiary [nested]
- droplist.pinBottom.hidden: [boolean | undefined] [nested]
- droplist.pinBottom.href: [string | undefined] [nested]
- droplist.pinBottom.icon: [JSXElementConstructor<{ size: number; }> | undefined] [nested]
- droplist.pinBottom.itemRef: [RefObject<HTMLElement> | undefined] [nested]
- droplist.pinBottom.itemWrapRender: [((item: ReactNode) => ReactNode) | undefined] [nested]
- droplist.pinBottom.label: [string | undefined] [nested]
- droplist.pinBottom.overflow: [{ x?: "hidden" | "visible" | "scroll" | "visible-hidden" | "visible-scroll"; y?: "hidden" | "...] [nested]
- droplist.pinBottom.paddingAbsolute: [boolean | undefined] [nested]
- droplist.pinBottom.resize: both, horizontal, none, vertical [nested]
- droplist.pinBottom.shortLabel: [string | undefined] [nested]
- droplist.pinBottom.showSwitchIcon: [boolean | undefined] [nested]
- droplist.pinBottom.size: m, s [nested]
- droplist.pinBottom.truncate: [{ variant?: TruncateStringProps["variant"]; } | undefined] [nested]
- droplist.pinBottom.untouchableScrollbars: [boolean | undefined] [nested]
- droplist.pinTop: [Item[] | undefined] [nested]
- droplist.pinTop.afterContent: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- droplist.pinTop.autoscrollTo: bottom, right [nested]
- droplist.pinTop.barHideStrategy: leave, move, never, scroll [nested]
- droplist.pinTop.beforeContent: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- droplist.pinTop.checked: [boolean | undefined] [nested]
- droplist.pinTop.clickScrolling: [boolean | undefined] [nested]
- droplist.pinTop.content: [ReactNode | ItemContentProps] [nested]
- droplist.pinTop.disabled: [boolean | undefined] [nested]
- droplist.pinTop.divider: [boolean | undefined] [nested]
- droplist.pinTop.groupVariant: subtitle, subtitleTertiary [nested]
- droplist.pinTop.hidden: [boolean | undefined] [nested]
- droplist.pinTop.href: [string | undefined] [nested]
- droplist.pinTop.icon: [JSXElementConstructor<{ size: number; }> | undefined] [nested]
- droplist.pinTop.itemRef: [RefObject<HTMLElement> | undefined] [nested]
- droplist.pinTop.itemWrapRender: [((item: ReactNode) => ReactNode) | undefined] [nested]
- droplist.pinTop.label: [string | undefined] [nested]
- droplist.pinTop.overflow: [{ x?: "hidden" | "visible" | "scroll" | "visible-hidden" | "visible-scroll"; y?: "hidden" | "...] [nested]
- droplist.pinTop.paddingAbsolute: [boolean | undefined] [nested]
- droplist.pinTop.resize: both, horizontal, none, vertical [nested]
- droplist.pinTop.shortLabel: [string | undefined] [nested]
- droplist.pinTop.showSwitchIcon: [boolean | undefined] [nested]
- droplist.pinTop.size: m, s [nested]
- droplist.pinTop.truncate: [{ variant?: TruncateStringProps["variant"]; } | undefined] [nested]
- droplist.pinTop.untouchableScrollbars: [boolean | undefined] [nested]
- droplist.placement: bottom, bottom-end, bottom-start, left, left-end, left-start, right, right-end, right-start, top, top-end, top-start [nested]
- droplist.scroll: [boolean | undefined] [nested]
- droplist.scrollToSelectedItem: [boolean | undefined] [nested]
- droplist.search: [SearchState | undefined] [nested]
- droplist.search.loading: [boolean | undefined] [nested]
- droplist.search.placeholder: [string | undefined] [nested]
- droplist.search.value: [string | undefined] [nested]
- droplist.selection: [SelectionMultipleState | SelectionSingleState | undefined] [nested]
- droplist.selection.defaultValue: [ItemId[] | undefined] [nested]
- droplist.selection.mode: ["multiple"] [nested]
- droplist.selection.value: [ItemId[] | undefined] [nested]
- droplist.virtualized: [boolean | undefined] [nested]
- droplist.widthStrategy: auto, eq, gte [nested]
- className: [string] [infra]
- data-test-id: [string] [infra]
- droplist.items.children: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [infra, nested]
- droplist.items.className: [string | undefined] [infra, nested]
- droplist.items.data-test-id: [string | undefined] [infra, nested]
- droplist.items.id: [ItemId | undefined] [infra, nested]
- droplist.pinBottom.children: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [infra, nested]
- droplist.pinBottom.className: [string | undefined] [infra, nested]
- droplist.pinBottom.data-test-id: [string | undefined] [infra, nested]
- droplist.pinBottom.id: [ItemId | undefined] [infra, nested]
- droplist.pinTop.children: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [infra, nested]
- droplist.pinTop.className: [string | undefined] [infra, nested]
- droplist.pinTop.data-test-id: [string | undefined] [infra, nested]
- droplist.pinTop.id: [ItemId | undefined] [infra, nested]
- tabIndex: [number] [infra]
- droplist.items.onBlur: [((e: FocusEvent<HTMLElement>) => void) | undefined] [callback, nested]
- droplist.items.onClick: [((e: MouseEvent<HTMLElement>) => void) | undefined] [callback, nested]
- droplist.items.onFocus: [((e: FocusEvent<HTMLElement>) => void) | undefined] [callback, nested]
- droplist.items.onInitialized: [(() => void) | undefined] [callback, nested]
- droplist.items.onKeyDown: [((e: KeyboardEvent<HTMLElement>) => void) | undefined] [callback, nested]
- droplist.items.onMouseDown: [((e: MouseEvent<HTMLElement>) => void) | undefined] [callback, nested]
- droplist.items.onScroll: [((event?: Event) => void) | undefined] [callback, nested]
- droplist.onOpenChange: [((open: boolean) => void) | undefined] [callback, nested]
- droplist.pinBottom.onBlur: [((e: FocusEvent<HTMLElement>) => void) | undefined] [callback, nested]
- droplist.pinBottom.onClick: [((e: MouseEvent<HTMLElement>) => void) | undefined] [callback, nested]
- droplist.pinBottom.onFocus: [((e: FocusEvent<HTMLElement>) => void) | undefined] [callback, nested]
- droplist.pinBottom.onInitialized: [(() => void) | undefined] [callback, nested]
- droplist.pinBottom.onKeyDown: [((e: KeyboardEvent<HTMLElement>) => void) | undefined] [callback, nested]
- droplist.pinBottom.onMouseDown: [((e: MouseEvent<HTMLElement>) => void) | undefined] [callback, nested]
- droplist.pinBottom.onScroll: [((event?: Event) => void) | undefined] [callback, nested]
- droplist.pinTop.onBlur: [((e: FocusEvent<HTMLElement>) => void) | undefined] [callback, nested]
- droplist.pinTop.onClick: [((e: MouseEvent<HTMLElement>) => void) | undefined] [callback, nested]
- droplist.pinTop.onFocus: [((e: FocusEvent<HTMLElement>) => void) | undefined] [callback, nested]
- droplist.pinTop.onInitialized: [(() => void) | undefined] [callback, nested]
- droplist.pinTop.onKeyDown: [((e: KeyboardEvent<HTMLElement>) => void) | undefined] [callback, nested]
- droplist.pinTop.onMouseDown: [((e: MouseEvent<HTMLElement>) => void) | undefined] [callback, nested]
- droplist.pinTop.onScroll: [((event?: Event) => void) | undefined] [callback, nested]
- droplist.search.onChange: [(value: string, e?: ChangeEvent<HTMLInputElement>) => void] [callback, nested]
- droplist.search.onKeyDown: [((e: KeyboardEvent<HTMLElement>) => void) | undefined] [callback, nested]
- droplist.selection.onChange: [OnChangeHandler<ItemId[]> | undefined] [callback, nested]
- onClick: [(() => void)] [callback]
- onKeyDown: [((event: KeyboardEvent<HTMLButtonElement>) => void)] [callback]

fields (useCopyButton)
- copyButtonRef: [RefObject<HTMLButtonElement | null>]
- dataTestId: [string]
- disabled: true, false
- showCopyButton: true, false
- size: l, m, s
- onCopy: [(event: MouseEvent<HTMLButtonElement, MouseEvent>) => boolean | Promise<boolean>] [callback]

input-private (InputPrivate) [surface: exported-helper]
- autoComplete: [string | boolean]
- autoFocus: true, false
- disabled: true, false
- inputMode: decimal, email, none, numeric, search, tel, text, url
- max: [number]
- maxLength: [number]
- min: [number]
- name: [string]
- pattern: [string]
- placeholder: [string]
- readonly: true, false
- spellCheck: true, false
- step: [string | number]
- type: email, number, password, tel, text, url
- value: [string]
- className: [string] [infra]
- data-test-id: [string] [infra]
- id: [string] [infra]
- tabIndex: [number] [infra]
- onBlur: [FocusEventHandler<HTMLInputElement>] [callback]
- onChange: [((value: string, e?: ChangeEvent<HTMLInputElement>) => void)] [callback]
- onClick: [MouseEventHandler<HTMLInputElement>] [callback]
- onFocus: [FocusEventHandler<HTMLInputElement>] [callback]
- onKeyDown: [KeyboardEventHandler<HTMLInputElement>] [callback]
- onMouseDown: [MouseEventHandler<HTMLInputElement>] [callback]
- onPaste: [ClipboardEventHandler<HTMLInputElement>] [callback]

input-private (useButtonNavigation) [surface: exported-helper]
- inputRef: [RefObject<T | null>]
- postfixButtons: [ButtonProps[]]
- prefixButtons: [ButtonProps[]]
- readonly: true, false
- setInputFocus: [(() => void)]
- submitKeys: [string[]]
- postfixButtons.active: true, false [nested]
- postfixButtons.ref: [RefObject<HTMLButtonElement | null>] [nested]
- postfixButtons.render: [(props: RenderActiveButtonProps) => ReactElement] [nested]
- postfixButtons.show: true, false [nested]
- prefixButtons.active: true, false [nested]
- prefixButtons.ref: [RefObject<HTMLButtonElement | null>] [nested]
- prefixButtons.render: [(props: RenderActiveButtonProps) => ReactElement] [nested]
- prefixButtons.show: true, false [nested]
- postfixButtons.id: [string] [infra, nested]
- prefixButtons.id: [string] [infra, nested]
- onButtonKeyDown: [KeyboardEventHandler<HTMLButtonElement>] [callback]

input-private (useClearButton) [surface: exported-helper]
- clearButtonRef: [RefObject<HTMLButtonElement | null>]
- dataTestId: [string]
- disabled: true, false
- showClearButton: true, false
- size: l, m, s
- onClear: [MouseEventHandler<HTMLButtonElement>] [callback]
- onDown: [MouseEventHandler<HTMLButtonElement>] [callback]

list (buildLevelItems)

list (DesktopDroplist) [surface: exported-helper]
- barHideStrategy: leave, move, never, scroll
- closeDroplistOnItemClick: true, false
- closeOnPopstate: true, false
- collapse: [CollapseState]
- container: [RefObject<HTMLElement | null>]
- contentRender: [((props: ContentRenderProps) => ReactNode)]
- dataError: true, false
- dataFiltered: true, false
- errorDataState: [EmptyStateProps]
- footer: [ReactNode ;]
- footerActiveElementsRefs: [RefObject<HTMLElement>[]]
- footerDivider: true, false
- header: [ReactNode ;]
- headerDivider: true, false
- items: [Item[]]
- limitedScrollHeight: true, false
- listRef: [RefObject<HTMLElement>]
- loading: true, false
- marker: true, false
- noDataState: [EmptyStateProps]
- noResultsState: [EmptyStateProps]
- open: true, false
- pinBottom: [Item[]]
- pinTop: [Item[]]
- placement: bottom, bottom-end, bottom-start, left, left-end, left-start, right, right-end, right-start, top, top-end, top-start
- scroll: true, false
- scrollContainerClassName: [string]
- scrollContainerRef: [Ref<HTMLElement>]
- scrollRef: [Ref<HTMLElement>]
- scrollToSelectedItem: true, false
- search: [SearchState]
- selection: [SelectionSingleState | SelectionMultipleState]
- size: l, m, s
- trigger: click, clickAndFocusVisible, focus, focusVisible, hover, hoverAndFocus, hoverAndFocusVisible
- triggerClassName: [string]
- triggerElemRef: [RefObject<HTMLElement>]
- untouchableScrollbars: true, false
- virtualized: true, false
- widthStrategy: auto, eq, gte
- errorDataState.description: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- errorDataState.footer: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- errorDataState.icon: [IconPredefinedProps | undefined] [nested]
- errorDataState.icon.appearance: blue, green, neutral, orange, pink, primary, red, violet, yellow [nested]
- errorDataState.icon.decor: [boolean | undefined] [nested]
- errorDataState.icon.icon: [((props: { size?: number; className?: string; }, deprecatedLegacyContext?: any) => ReactNode)...] [nested]
- errorDataState.icon.shape: round, square [nested]
- errorDataState.icon.size: 5xl, l, m [nested]
- noDataState.description: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- noDataState.footer: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- noDataState.icon: [IconPredefinedProps | undefined] [nested]
- noDataState.icon.appearance: blue, green, neutral, orange, pink, primary, red, violet, yellow [nested]
- noDataState.icon.decor: [boolean | undefined] [nested]
- noDataState.icon.icon: [((props: { size?: number; className?: string; }, deprecatedLegacyContext?: any) => ReactNode)...] [nested]
- noDataState.icon.shape: round, square [nested]
- noDataState.icon.size: 5xl, l, m [nested]
- noResultsState.description: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- noResultsState.footer: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- noResultsState.icon: [IconPredefinedProps | undefined] [nested]
- noResultsState.icon.appearance: blue, green, neutral, orange, pink, primary, red, violet, yellow [nested]
- noResultsState.icon.decor: [boolean | undefined] [nested]
- noResultsState.icon.icon: [((props: { size?: number; className?: string; }, deprecatedLegacyContext?: any) => ReactNode)...] [nested]
- noResultsState.icon.shape: round, square [nested]
- noResultsState.icon.size: 5xl, l, m [nested]
- children: [ReactNode | ({onKeyDown}) => ReactNode * Рендер функция принимает аргументы `onKeyDown` - хен...] [infra]
- className: [string] [infra]
- data-test-id: [string] [infra]
- errorDataState.className: [string | undefined] [infra, nested]
- errorDataState.data-test-id: [string | undefined] [infra, nested]
- errorDataState.icon.className: [string | undefined] [infra, nested]
- errorDataState.icon.data-test-id: [string | undefined] [infra, nested]
- noDataState.className: [string | undefined] [infra, nested]
- noDataState.data-test-id: [string | undefined] [infra, nested]
- noDataState.icon.className: [string | undefined] [infra, nested]
- noDataState.icon.data-test-id: [string | undefined] [infra, nested]
- noResultsState.className: [string | undefined] [infra, nested]
- noResultsState.data-test-id: [string | undefined] [infra, nested]
- noResultsState.icon.className: [string | undefined] [infra, nested]
- noResultsState.icon.data-test-id: [string | undefined] [infra, nested]
- onOpenChange: true, false [callback]
- onScroll: [((event?: Event) => void)] [callback]

list (MobileDroplist) [surface: exported-helper]
- actionButton: [ReactNode]
- barHideStrategy: leave, move, never, scroll
- closeDroplistOnItemClick: true, false
- closeOnPopstate: true, false
- collapse: [CollapseState]
- container: [RefObject<HTMLElement | null>]
- contentRender: [((props: ContentRenderProps) => ReactNode)]
- dataError: true, false
- dataFiltered: true, false
- errorDataState: [EmptyStateProps]
- footer: [ReactNode ;]
- footerActiveElementsRefs: [RefObject<HTMLElement>[]]
- footerDivider: true, false
- header: [ReactNode ;]
- headerDivider: true, false
- items: [Item[]]
- label: [string]
- limitedScrollHeight: true, false
- loading: true, false
- marker: true, false
- noDataState: [EmptyStateProps]
- noResultsState: [EmptyStateProps]
- open: true, false
- pinBottom: [Item[]]
- pinTop: [Item[]]
- scroll: true, false
- scrollContainerClassName: [string]
- scrollContainerRef: [Ref<HTMLElement>]
- scrollRef: [Ref<HTMLElement>]
- scrollToSelectedItem: true, false
- search: [SearchState]
- selection: [SelectionSingleState | SelectionMultipleState]
- size: l, m, s
- slotAfterHeadline: [ReactNode]
- untouchableScrollbars: true, false
- virtualized: true, false
- errorDataState.description: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- errorDataState.footer: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- errorDataState.icon: [IconPredefinedProps | undefined] [nested]
- errorDataState.icon.appearance: blue, green, neutral, orange, pink, primary, red, violet, yellow [nested]
- errorDataState.icon.decor: [boolean | undefined] [nested]
- errorDataState.icon.icon: [((props: { size?: number; className?: string; }, deprecatedLegacyContext?: any) => ReactNode)...] [nested]
- errorDataState.icon.shape: round, square [nested]
- errorDataState.icon.size: 5xl, l, m [nested]
- noDataState.description: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- noDataState.footer: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- noDataState.icon: [IconPredefinedProps | undefined] [nested]
- noDataState.icon.appearance: blue, green, neutral, orange, pink, primary, red, violet, yellow [nested]
- noDataState.icon.decor: [boolean | undefined] [nested]
- noDataState.icon.icon: [((props: { size?: number; className?: string; }, deprecatedLegacyContext?: any) => ReactNode)...] [nested]
- noDataState.icon.shape: round, square [nested]
- noDataState.icon.size: 5xl, l, m [nested]
- noResultsState.description: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- noResultsState.footer: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- noResultsState.icon: [IconPredefinedProps | undefined] [nested]
- noResultsState.icon.appearance: blue, green, neutral, orange, pink, primary, red, violet, yellow [nested]
- noResultsState.icon.decor: [boolean | undefined] [nested]
- noResultsState.icon.icon: [((props: { size?: number; className?: string; }, deprecatedLegacyContext?: any) => ReactNode)...] [nested]
- noResultsState.icon.shape: round, square [nested]
- noResultsState.icon.size: 5xl, l, m [nested]
- children: [ReactNode | ({onKeyDown}) => ReactNode * Рендер функция принимает аргументы `onKeyDown` - хен...] [infra]
- className: [string] [infra]
- data-test-id: [string] [infra]
- errorDataState.className: [string | undefined] [infra, nested]
- errorDataState.data-test-id: [string | undefined] [infra, nested]
- errorDataState.icon.className: [string | undefined] [infra, nested]
- errorDataState.icon.data-test-id: [string | undefined] [infra, nested]
- noDataState.className: [string | undefined] [infra, nested]
- noDataState.data-test-id: [string | undefined] [infra, nested]
- noDataState.icon.className: [string | undefined] [infra, nested]
- noDataState.icon.data-test-id: [string | undefined] [infra, nested]
- noResultsState.className: [string | undefined] [infra, nested]
- noResultsState.data-test-id: [string | undefined] [infra, nested]
- noResultsState.icon.className: [string | undefined] [infra, nested]
- noResultsState.icon.data-test-id: [string | undefined] [infra, nested]
- onBackButtonClick: [(() => void)] [callback]
- onOpenChange: true, false [callback]
- onScroll: [((event?: Event) => void)] [callback]

list (nextListOption)
- afterContent: [ReactElement]
- barHideStrategy: leave, move, never, scroll
- beforeContent: [ReactElement]
- checked: true, false
- content: [ReactNode | ItemContentProps]
- dataError: true, false
- dataFiltered: true, false
- disabled: true, false
- hidden: true, false
- itemRef: [RefObject<HTMLElement>]
- items: [Item[]]
- itemWrapRender: [((item: ReactNode) => ReactNode)]
- loading: true, false
- placement: left, left-end, left-start, right, right-end, right-start
- scroll: true, false
- scrollContainerRef: [Ref<HTMLElement>]
- scrollRef: [Ref<HTMLElement>]
- showSwitchIcon: true, false
- type: ["next-list"]
- untouchableScrollbars: true, false
- content.caption: [string] [nested]
- content.description: [string] [nested]
- content.disabled: true, false [nested]
- content.option: [string | number] [nested]
- content.truncate: [TruncateProps] [nested]
- content.truncate.description: [number | undefined] [nested]
- content.truncate.option: [number | undefined] [nested]
- content.truncate.variant: end, middle [nested]
- className: [string] [infra]
- content.className: [string] [infra, nested]
- content.data-test-id: [string] [infra, nested]
- data-test-id: [string] [infra]
- id: [ItemId] [infra]
- onBlur: [((e: FocusEvent<HTMLElement, Element>) => void)] [callback]
- onClick: [((e: MouseEvent<HTMLElement, MouseEvent>) => void)] [callback]
- onFocus: [((e: FocusEvent<HTMLElement, Element>) => void)] [callback]
- onKeyDown: [((e: KeyboardEvent<HTMLElement>) => void)] [callback]
- onMouseDown: [((e: MouseEvent<HTMLElement, MouseEvent>) => void)] [callback]
- onScroll: [((event?: Event) => void)] [callback]
- onSublistOpenChanged: true, false [callback]

markdown (ButtonHeading) [surface: exported-helper]
- api: [ToolbarApi]

markdown (Buttons) [surface: exported-helper]

markdown (ButtonsGroup)

markdown (CodeBlock)
- children: [ReactNode] [infra]
- onCopyClick: [((code: string) => void)] [callback]

markdown (CustomizeTableModal) [surface: exported-helper]
- open: true, false
- onClose: [() => void] [callback]
- onSubmit: [(rows: number, cols: number) => void] [callback]

markdown (ImageModal) [surface: exported-helper]
- open: true, false
- onClose: [() => void] [callback]
- onSubmit: [(url: string, alt: string) => void] [callback]

markdown (LinkModal) [surface: exported-helper]
- initial: [LinkProps]
- open: true, false
- onClose: [() => void] [callback]
- onSubmit: [(props: LinkProps) => void] [callback]

markdown (PrivateButton) [surface: exported-helper]
- checked: true, false
- icon: [ReactNode]
- tip: [TipContentProps]
- withChevron: true, false
- data-test-id: [string] [infra]
- innerRef: [Ref<HTMLButtonElement>] [infra]

markdown (TableSelectItem) [surface: exported-helper]
- aria-label: [string]
- checked: true, false
- hovered: true, false
- data-test-id: [string] [infra]
- onClick: [(() => void)] [callback]
- onMouseEnter: [(() => void)] [callback]

markdown (TableSelectSettingsGrid) [surface: exported-helper]
- onPick: [(rows: number, cols: number) => void] [callback]

markdown (Toolbar)
- api: [ToolbarApi]
- items: [ToolbarItemId[]]

modal (ButtonClose) [surface: exported-helper]
- className: [string] [infra]
- data-test-id: [string] [infra]
- onClick: [() => void] [callback]

modal (DesktopModal) [surface: exported-helper]
- additionalButton: [BottomSheetActionButton]
- approveButton: [BottomSheetActionButton]
- cancelButton: [BottomSheetActionButton]
- closeOnPopstate: true, false
- container: [ModalContainer]
- content: [ReactNode]
- disclaimer: [ReactNode]
- footer: [ReactNode]
- footerActionsOrientation: horizontal, vertical
- heightAuto: true, false
- loading: true, false
- loadingState: [ReactNode]
- media: [ReactNode]
- mode: aggressive, forced, regular
- open: true, false
- rootClassName: [string]
- slotAfterHeadline: [ReactNode]
- subtitle: [ReactNode]
- title: [ReactNode]
- truncate: [{ title?: number; subtitle?: number; } | undefined]
- width: l, m, s
- className: [string] [infra]
- data-test-id: [string] [infra]
- onBackButtonClick: [(() => void)] [callback]
- onClose: [() => void] [callback]

modal (DialogBody)
- bodyPadding: true, false
- content: [ReactNode]
- className: [string] [infra]
- data-test-id: [string] [infra]

modal (DialogFooter)
- className: [string] [infra]
- data-test-id: [string] [infra]

modal (DialogHeader)
- actionButton: [ReactNode]
- slotAfterHeadline: [ReactNode]
- subHeadline: [ReactNode]
- subtitle: [ReactNode]
- title: [ReactNode]
- titleId: [string]
- truncate: [{ title?: number; subtitle?: number; } | undefined]
- className: [string] [infra]
- data-test-id: [string] [infra]
- onBackButtonClick: [(() => void)] [callback]

modal (MobileModal) [surface: exported-helper]
- additionalButton: [BottomSheetActionButton]
- approveButton: [BottomSheetActionButton]
- cancelButton: [BottomSheetActionButton]
- closeOnPopstate: true, false
- container: [ModalContainer]
- content: [ReactNode]
- disclaimer: [ReactNode]
- footer: [ReactNode]
- footerActionsOrientation: horizontal, vertical
- heightAuto: true, false
- loading: true, false
- loadingState: [ReactNode]
- media: [ReactNode]
- mode: aggressive, forced, regular
- open: true, false
- rootClassName: [string]
- slotAfterHeadline: [ReactNode]
- subtitle: [ReactNode]
- title: [ReactNode]
- truncate: [{ title?: number; subtitle?: number; } | undefined]
- width: l, m, s
- className: [string] [infra]
- data-test-id: [string] [infra]
- onBackButtonClick: [(() => void)] [callback]
- onClose: [() => void] [callback]

modal (ModalBody) [surface: exported-helper]
- bodyPadding: true, false
- content: [ReactNode]
- className: [string] [infra]
- data-test-id: [string] [infra]

modal (ModalFooter) [surface: exported-helper]
- className: [string] [infra]
- data-test-id: [string] [infra]

modal (ModalHeader) [surface: exported-helper]
- actionButton: [ReactNode]
- slotAfterHeadline: [ReactNode]
- subHeadline: [ReactNode]
- subtitle: [ReactNode]
- title: [ReactNode]
- titleId: [string]
- truncate: [{ title?: number; subtitle?: number; } | undefined]
- className: [string] [infra]
- data-test-id: [string] [infra]
- onBackButtonClick: [(() => void)] [callback]

pagination (PaginationNumberItem)
- activated: true, false
- href: [string]
- label: [string | number]
- setButtonRef: [Ref<HTMLButtonElement | HTMLAnchorElement>]
- data-test-id: [string] [infra]
- onClick: [(event: MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => void] [callback]

pagination (PaginationSliderItem)
- activated: true, false
- setButtonRef: [Ref<HTMLButtonElement>]
- size: s, xs
- data-test-id: [string] [infra]
- onClick: [() => void] [callback]

popover-private (Arrow) [surface: exported-helper]
- arrowContainerClassName: [string]
- arrowElementClassName: [string]
- arrowRef: [RefObject<HTMLDivElement | null>]
- placement: bottom, bottom-end, bottom-start, left, left-end, left-start, right, right-end, right-start, top, top-end, top-start
- x: [number]
- y: [number]

popover-private (getArrowOffset)
- children: [HTMLCollection] [infra]

popover-private (getArrowPositionStyles)
- placement: bottom, bottom-end, bottom-start, left, left-end, left-start, right, right-end, right-start, top, top-end, top-start
- ref: [RefObject<HTMLDivElement | null>]
- x: [number]
- y: [number]

popover-private (getPopoverTriggerJSX)
- disableSpanWrapper: true, false
- getReferenceProps: [(userProps?: HTMLProps<Element> | undefined) => Record<string, unknown>]
- setReference: [(node: ReferenceType | null) => void]
- validElementWrapperClassName: [string]

popover-private (getTriggerProps)

popover-private (mapPopoverActionsToSynthetic)

popover-private (PopoverPrivate) [surface: exported-helper]
- arrowContainerClassName: [string]
- arrowElementClassName: [string]
- closeOnEscapeKey: true, false
- closeOnPopstate: true, false
- container: [RefObject<HTMLElement | null>]
- disableSpanWrapper: true, false
- fallbackPlacements: [Placement[]]
- hasArrow: true, false
- heightStrategy: auto, eq, lte
- hoverDelayClose: [number]
- hoverDelayOpen: [number]
- offset: [number]
- open: true, false
- outsideClick: [boolean | OutsideClickHandler]
- placement: bottom, bottom-end, bottom-start, left, left-end, left-start, right, right-end, right-start, top, top-end, top-start
- popoverContent: [ReactNode | ReactNode[]]
- trigger: click, clickAndFocusVisible, focus, focusVisible, hover, hoverAndFocus, hoverAndFocusVisible
- triggerClassName: [string]
- triggerClickByKeys: true, false
- triggerRef: [ForwardedRef<HTMLElement | ReferenceType | null>]
- widthStrategy: auto, eq, gte
- children: [ReactNode | ChildrenFunction] [infra]
- className: [string] [infra]
- data-test-id: [string] [infra]
- onOpenChange: true, false [callback]

popover-private (referenceActionToEvent)

popover-private (stopPropagationMouse)

popover-private (stopPropagationTouch)

progress-bar (ProgressBarPrivate) [surface: exported-helper]
- animationDuration: [number]
- appearance: blue, green, neutral, orange, pink, primary, red, violet, yellow
- progress: [number]
- size: s, xs
- className: [string] [infra]
- data-test-id: [string] [infra]

rating (RatingStar) [surface: exported-helper]
- appearance: blue, green, orange, pink, primary, red, violet, yellow
- handleClick: [((value: Value) => void)]
- handleKeyDown: [KeyboardEventHandler<HTMLDivElement>]
- handleMouseEnter: [((value: Value) => void)]
- handleMouseLeave: [(() => void)]
- readonly: true, false
- size: s, xs
- value: 0%, 100%, 50%
- className: [string] [infra]
- data-test-id: [string] [infra]

search (ButtonField) [surface: exported-helper]
- action: [ReactNode]
- disabled: true, false
- loading: true, false
- size: l, m, s
- variant: after, before
- withDropdownList: true, false
- data-test-id: [string] [infra]
- onClick: [() => void] [callback]

search-private (SearchPrivate) [surface: exported-helper]
- disabled: true, false
- inputMode: decimal, email, none, numeric, search, tel, text, url
- loading: true, false
- placeholder: [string]
- showClearButton: true, false
- size: l, m, s
- value: [string]
- className: [string] [infra]
- data-test-id: [string] [infra]
- tabIndex: [number] [infra]
- onBlur: [FocusEventHandler<HTMLInputElement>] [callback]
- onChange: [((value: string, e?: ChangeEvent<HTMLInputElement>) => void)] [callback]
- onFocus: [FocusEventHandler<HTMLInputElement>] [callback]
- onKeyDown: [KeyboardEventHandler<HTMLInputElement>] [callback]
- onSubmit: [((value: string) => void)] [callback]

slider (getSortedMarkValues)

stepper (DesktopStep) [surface: exported-helper]
- hideTailLine: true, false
- step: [StepViewData]
- className: [string] [infra]
- data-test-id: [string] [infra]

stepper (DesktopStepper) [surface: exported-helper]
- allowFreeNavigation: true, false
- defaultCurrentStepIndex: [number]
- steps: [StepData[]]
- validator: [StepsValidator]
- children: [(params: StepperApi) => ReactElement<any, string | JSXElementConstructor<any>>] [infra]
- className: [string] [infra]
- data-test-id: [string] [infra]
- onChangeCurrentStep: [((newValue: number, prevValue: number) => void)] [callback]
- onCompleteChange: true, false [callback]

stepper (MobileStep) [surface: exported-helper]
- step: [StepViewData]
- data-test-id: [string] [infra]

stepper (MobileStepper) [surface: exported-helper]
- allowFreeNavigation: true, false
- defaultCurrentStepIndex: [number]
- steps: [StepData[]]
- validator: [StepsValidator]
- children: [(params: StepperApi) => ReactElement<any, string | JSXElementConstructor<any>>] [infra]
- className: [string] [infra]
- data-test-id: [string] [infra]
- onChangeCurrentStep: [((newValue: number, prevValue: number) => void)] [callback]
- onCompleteChange: true, false [callback]

stepper (StepIcon) [surface: exported-helper]
- number: [number]
- state: completed, current, loading, rejected, waiting
- className: [string] [infra]

table (BodyCell) [surface: exported-helper]
- cell: [Cell<TData, unknown>]
- isDraggable: true, false
- role: cell, columnheader
- rowAutoHeight: true, false
- className: [string] [infra]
- onClick: [MouseEventHandler] [callback]
- onMouseUp: [MouseEventHandler] [callback]

table (BodyRow) [surface: exported-helper]
- columnOrder: [ColumnOrder]
- disabledRowAppearance: disabled, hide-toggler
- enableColumnsOrderSortByDrag: true, false
- row: [Row<TData>]
- rowAutoHeight: true, false
- onRowClick: [RowClickHandler<TData>] [callback]

table (buildAllTableColumns)
- columnDefinitions: [ColumnDefinition<TData>[]]
- enableSelection: true, false
- enableSelectPinned: true, false
- expanding: [{ getSubRows: (element: TData) => TData[]; expandingColumnDefinition: TreeColumnDefinitionPro...]
- masterSelection: [MasterSelectionOptions]
- rowSelectionAppearance: disabled, hide-toggler

table (buildColumnPinning)
- left: [ColumnDefinition<TData>[]]
- right: [ColumnDefinition<TData>[]]
- unpinned: [ColumnDefinition<TData>[]]

table (Cell) [surface: exported-helper]
- role: cell, columnheader
- className: [string] [infra]
- style: [CSSProperties] [infra]
- onClick: [MouseEventHandler] [callback]
- onMouseUp: [MouseEventHandler] [callback]

table (ControlsChrome) [surface: exported-helper]
- acrylic: [ControlsAcrylicAttrs]
- className: [string] [infra]

table (getCardsListProps)
- cardColumns: [number]
- cardMinWidth: [number]
- isMobile: true, false

table (getControlsAcrylicAttrs)

table (getLoadingCell)
- align: left, right
- cellClassName: [string]
- columnSettings: [{ label?: string; mode?: ColumnSettingsMode; } | undefined]
- headerAlign: left, right
- headerClassName: [string]
- noBodyCellPadding: true, false
- noHeaderCellBorderOffset: true, false
- noHeaderCellPadding: true, false
- pinned: left, right

table (getSortingIcon)

table (HeaderCell) [surface: exported-helper]
- header: [Header<TData, unknown>]
- isDraggable: true, false
- pinPosition: left, right
- role: cell, columnheader
- rowAutoHeight: true, false
- className: [string] [infra]
- onMouseUp: [MouseEventHandler] [callback]

table (HeaderRow) [surface: exported-helper]
- columnOrder: [ColumnOrder]
- enableColumnsOrderSortByDrag: true, false
- rowAutoHeight: true, false
- suppressSticky: true, false

table (LoadMoreButton) [surface: exported-helper]
- hasMore: true, false
- loading: true, false
- onClick: [(() => void)] [callback]

table (PinnedCells) [surface: exported-helper]
- position: left, right

table (renderColumnsSettingsOverflowButton)
- ariaLabel: [string]
- onClick: [(event: MouseEvent<HTMLElement, MouseEvent>) => void] [callback]

table (renderExportToolbarButton)
- ariaLabel: [string]
- overflow: true, false
- onClick: [(event: MouseEvent<HTMLElement, MouseEvent>) => void] [callback]

table (renderMasterSelectionToggle)
- masterSelection: [MasterSelectionOptions]
- table: [Table<TData>]
- className: [string] [infra]

table (renderTableSortingOverflowButton)
- ariaLabel: [string]
- currentSortDesc: true, false
- selectedSortId: [string]
- onClick: [(event: MouseEvent<HTMLElement, MouseEvent>) => void] [callback]

table (renderToolbarAfterOverflowButton)
- aria-label: [string]
- icon: [ReactNode]
- data-test-id: [string] [infra]
- onClick: [(event: MouseEvent<HTMLElement, MouseEvent>) => void] [callback]

table (ResizeHandle) [surface: exported-helper]
- cellRef: [RefObject<HTMLDivElement>]
- header: [Header<TData, unknown>]

table (Row) [surface: exported-helper]
- rowAutoHeight: true, false
- className: [string] [infra]
- style: [CSSProperties] [infra]
- onClick: [((e: MouseEvent<HTMLDivElement, MouseEvent>) => void)] [callback]

table (RowActionsButton) [surface: exported-helper]
- variant: cell, placeholder

table (stopEventPropagation)

table (TableCardsBody)
- cardSelection: multiple, none, single
- cardsListProps: [{ className: string; style?: CSSProperties | undefined; 'data-fixed-columns'?: boolean | unde...]
- centerRows: [Row<TData>[]]
- emptyState: [ReactNode]
- filteredTopRows: [Row<TData>[]]
- headlineId: [string]
- loadingTable: [Table<TData>]
- loadingTableRows: [Row<TData>[]]
- loadMoreButton: [ReactNode]
- renderCard: [((context: RenderCardContext<TData>) => ReactNode)]
- rowSelectionAppearance: disabled, hide-toggler
- showInfiniteLoadingTail: true, false
- suppressHeader: true, false
- table: [Table<TData>]
- onRowClick: [RowClickHandler<TData>] [callback]

table (TableChrome)
- acrylic: [ControlsAcrylicAttrs | null]
- variant: footer, header

table (TableEmptyState) [surface: exported-helper]
- dataError: true, false
- dataFiltered: true, false
- emptyStates: [{ noDataState: EmptyStateProps; noResultsState: EmptyStateProps; errorDataState: EmptyStatePr...]
- tableRowsLength: [number]
- emptyStates.description: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- emptyStates.footer: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- emptyStates.icon: [IconPredefinedProps | undefined] [nested]
- emptyStates.icon.appearance: blue, green, neutral, orange, pink, primary, red, violet, yellow [nested]
- emptyStates.icon.decor: [boolean | undefined] [nested]
- emptyStates.icon.icon: [((props: { size?: number; className?: string; }, deprecatedLegacyContext?: any) => ReactNode)...] [nested]
- emptyStates.icon.shape: round, square [nested]
- emptyStates.icon.size: 5xl, l, m [nested]
- emptyStates.title: [string | undefined] [nested]
- emptyStates.className: [string | undefined] [infra, nested]
- emptyStates.icon.className: [string | undefined] [infra, nested]
- emptyStates.icon.data-test-id: [string | undefined] [infra, nested]

table (TablePagination) [surface: exported-helper]
- options: [number[]]
- optionsLabel: [string]
- optionsRender: [((value: number, idx: number) => string | number)]
- pageCount: [number]
- table: [Table<TData>]

table (TableRowsBody)
- centerRows: [Row<TData>[]]
- columnOrder: [string[]]
- emptyState: [ReactNode]
- enableColumnsOrderSortByDrag: true, false
- filteredTopRows: [Row<TData>[]]
- loadingTableRows: [Row<TData>[]]
- loadMoreButton: [ReactNode]
- rowAutoHeight: true, false
- rowSelectionAppearance: disabled, hide-toggler
- rowVirtualizer: [Virtualizer<HTMLElement, Element> | null]
- showInfiniteLoadingTail: true, false
- onRowClick: [RowClickHandler<TData>] [callback]

table (TableScrollHost)
- columnSizeVars: [CSSProperties]
- handleScrollInitialized: [() => void]
- internalScrollRef: [RefObject<HTMLElement | null>]
- isCardsView: true, false
- isMobile: true, false
- scrollContainerRef: [RefObject<HTMLDivElement>]
- scrollOverflow: [{ x?: "scroll" | "hidden" | "visible" | "visible-hidden" | "visible-scroll"; y?: "scroll" | "...]
- scrollPaddingAbsolute: true, false
- scrollRef: [Ref<HTMLDivElement>]
- syncHeaderHorizontalScroll: [(() => void)]
- tableHeaderElement: [ReactNode]
- usePageStickyHeader: true, false
- view: cards, table

table (TableSkeletonBody)
- cardsListProps: [{ className: string; style?: CSSProperties | undefined; 'data-fixed-columns'?: boolean | unde...]
- columnOrder: [string[]]
- headlineId: [string]
- loadingTable: [Table<TData>]
- loadingTableRows: [Row<TData>[]]
- rowAutoHeight: true, false
- rowSelectionAppearance: disabled, hide-toggler
- showHeader: true, false
- suppressHeader: true, false
- tableScrollRowsOnly: true, false
- usePageStickyHeader: true, false
- variant: cards, table

table (TableToolbar)
- after: [ReactNode]
- bulkActions: [BulkAction[]]
- checked: true, false
- dataView: [{ show: boolean; value: "list" | "compact"; onChange: (value: "list" | "compact") => void; }]
- filterRow: [(Omit<ChipChoiceRowProps<Record<string, unknown>>, "data-test-id" | "size"> & { open?: boolea...]
- indeterminate: true, false
- moreActions: [Action[]]
- outline: true, false
- persist: [ToolbarPersistConfig<TFilters>]
- search: [{ value: string; onChange: (value: string) => void; loading?: boolean; placeholder?: string; ...]
- selectedCount: [number]
- showBulkCheckbox: true, false
- totalCount: [number]
- onCheck: [(() => void)] [callback]
- onRefresh: [(() => void)] [callback]

table (TreeLine) [surface: exported-helper]
- extended: true, false
- halfHeight: true, false
- horizontal: true, false
- visible: true, false
- className: [string] [infra]

table (useColumnsSettingsToolbarSlot)
- columnsSettings: [[GroupSelectItem]]
- enabled: true, false
- enabledColumns: [string[]]
- setEnabledColumns: [(enabledColumns: string[]) => void]

table (useExportToolbarSlot)
- enabled: true, false
- onExport: [MouseEventHandler<HTMLElement>] [callback]

table (useLoadingTable)
- columnDefinitions: [ColumnDefinition<TData>[]]
- columnPinning: [ColumnPinningState]
- enableSelection: true, false
- enableSelectPinned: true, false
- expanding: [{ getSubRows: (element: TData) => TData[]; expandingColumnDefinition: TreeColumnDefinitionPro...]
- pageSize: [number]
- rowSelectionAppearance: disabled, hide-toggler

table (useTableInstance)
- autoResetPageIndex: true, false
- bulkActionsProp: [BulkAction[]]
- columnOrder: [ColumnOrderState]
- columnPinning: [ColumnPinningState]
- data: [TData[]]
- enableColumnsOrderSortByDrag: true, false
- enabledColumnsDefinitions: [ColumnDefinition<TData>[]]
- enabledTableColumns: [ColumnDefinition<TData>[]]
- enableFuzzySearch: true, false
- enableSelectPinned: true, false
- expanded: [ExpandedState]
- expanding: [{ getSubRows: (element: TData) => TData[]; expandingColumnDefinition: TreeColumnDefinitionPro...]
- getRowId: [((originalRow: TData, index: number, parent?: Row<TData>) => string)]
- globalFilter: [string]
- infiniteLoading: true, false
- keepPinnedRows: true, false
- loading: true, false
- manualFiltering: true, false
- manualPagination: true, false
- manualSorting: true, false
- masterSelection: [MasterSelectionOptions]
- pageCount: [number]
- pageSize: [number]
- pagination: [PaginationState]
- rowAutoHeight: true, false
- rowPinning: [RowPinningState]
- rowSelection: [RowSelectionState]
- rowSelectionProp: [{ initialState?: RowSelectionState | undefined; state?: RowSelectionState | undefined; enable...]
- setColumnOrder: [OnChangeFn<ColumnOrderState>]
- sorting: [SortingState]
- onExpandedChange: [OnChangeFn<ExpandedState>] [callback]
- onGlobalFilterChange: [OnChangeFn<string>] [callback]
- onPaginationChange: [OnChangeFn<PaginationState>] [callback]
- onRefresh: [(() => void)] [callback]
- onRowSelectionChange: [OnChangeFn<RowSelectionState>] [callback]
- onSortingChange: [OnChangeFn<SortingState>] [callback]

table (useTableSorting)
- areColumnsSettingsEnabled: true, false
- columnDefinitions: [ColumnDefinition<TData>[]]
- enabledColumns: [string[]]
- sorting: [SortingState]
- table: [Table<TData>]

table (useTableSortingToolbarSlot)
- areColumnsSettingsEnabled: true, false
- columnDefinitions: [ColumnDefinition<TData>[]]
- enabled: true, false
- enabledColumns: [string[]]
- sorting: [SortingState]
- table: [Table<TData>]

tag (TagBase)
- appearance: blue, green, neutral, orange, pink, primary, red, violet, yellow
- label: [string]
- size: m, s, xs
- className: [string] [infra]
- data-test-id: [string] [infra]
- tabIndex: [number] [infra]
- onDelete: [MouseEventHandler<HTMLButtonElement>] [callback]

tag (TagLink)
- appearance: blue, green, neutral, orange, pink, primary, red, violet, yellow
- label: [string]
- size: m, s, xs
- as: [ElementType] [infra]
- className: [string] [infra]
- data-test-id: [string] [infra]
- tabIndex: [number] [infra]
- onDelete: [MouseEventHandler<HTMLButtonElement>] [callback]

tag (TagList) [surface: exported-helper]
- items: [TagRowItemInner[]]
- setTagRef: [SetTagRef]
- size: m, s, xs
- onItemRemove: [((item: string) => void)] [callback]

tag (TagMore) [surface: exported-helper]
- buttonRef: [Ref<HTMLButtonElement>]
- items: [TagRowItemInner[]]
- size: m, s, xs
- text: [string]
- onItemRemove: [((item: string) => void)] [callback]

tag (TagRowSimple) [surface: exported-helper]
- items: [TagRowItemInner[]]
- setTagRef: [((item: TagRowItemInner, index: number) => Ref<HTMLDivElement>)]
- size: m, s, xs
- className: [string] [infra]
- onItemRemove: [((item: string) => void)] [callback]

tag (TagRowTruncated) [surface: exported-helper]
- items: [TagRowItemInner[]]
- moreButtonLabel: [string]
- rowLimit: [number]
- size: m, s, xs
- className: [string] [infra]
- onItemRemove: [((item: string) => void)] [callback]

theme (StoreProvider)
- store: [ExternalStore<ThemeAppearanceContextValue>]

theme (ThemeScope)
- rootRef: [RefObject<HTMLElement | null>]
- className: [string] [infra]

timeline (TrackDot)
- appearance: blue, green, neutral, orange, pink, primary, red, violet, yellow
- variant: default, subEvent

timeline (TrackLine)
- style: dashed, solid [infra]

toaster (getIcon)

toaster (LoadingStatus) [surface: exported-helper]
- actions: [UploadActions]
- status: error, errorUploaded, loading, pause, uploaded

toaster (renderFlatToasts)

toaster (renderStackToasts)

toaster (Timer) [surface: exported-helper]
- duration: [number]
- className: [string] [infra]

toaster (ToastButton) [surface: exported-helper]
- composition: iconOnly, labelOnly
- critical: true, false
- label: [string]
- as: [ElementType] [infra]
- children: [ReactNode] [infra]
- className: [string] [infra]
- data-test-id: [string] [infra]
- innerRef: [any] [infra]

toaster (ToastButtonAction) [surface: exported-helper]
- label: [string]
- as: [ElementType] [infra]
- className: [string] [infra]
- data-test-id: [string] [infra]
- onClick: [((e: MouseEvent<HTMLElement, MouseEvent>) => void)] [callback]

toaster (ToastSlot)
- containerId: [string]
- draggable: true, false
- draggableDirection: x, y
- isFront: true, false
- stackIndex: [number]
- toast: [ManagedToast]

toaster (ToastSystemEventCloseAll) [surface: exported-helper]

toaster (ToastSystemEventProgress) [surface: exported-helper]
- appearance: error, errorCritical, neutral, success, warning
- durationMs: [number]
- value: [number]

toaster (ToastUploadTitleLine) [surface: exported-helper]
- closable: true, false
- description: [string]
- generalActions: [Omit<UploadActions, "onCancel">]
- isCollapsed: true, false
- progress: [{ current: number; total: number; }]
- status: error, errorUploaded, loading, pause, uploaded
- title: [string]
- onCancelAll: [((e: MouseEvent<HTMLButtonElement, MouseEvent>) => void)] [callback]
- onCloseClick: [(e: MouseEvent<HTMLButtonElement, MouseEvent>) => void] [callback]
- onCollapseClick: [(e: MouseEvent<HTMLButtonElement, MouseEvent>) => void] [callback]

toaster (useToastProgress)

toolbar (buildMobileOverflowActions)
- after: [ReactNode]
- moreActions: [Action[]]
- refreshLabel: [string]
- onRefresh: [(() => void)] [callback]

toolbar (BulkActions) [surface: exported-helper]
- actions: [BulkAction[]]
- checked: true, false
- indeterminate: true, false
- resizingContainerRef: [RefObject<HTMLDivElement>]
- selectedCount: [number]
- showBulkCheckbox: true, false
- totalCount: [number]
- data-test-id: [string] [infra]
- onCheck: [(() => void)] [callback]

toolbar (BulkActionsCheckbox) [surface: exported-helper]
- checked: true, false
- indeterminate: true, false
- className: [string] [infra]
- onCheck: [(() => void)] [callback]

toolbar (BulkActionsControls) [surface: exported-helper]
- actions: [BulkAction[]]
- checked: true, false
- hasSelection: true, false
- indeterminate: true, false
- resizingContainerRef: [RefObject<HTMLDivElement>]
- selectedCount: [number]
- showCheckbox: true, false
- totalCount: [number]
- variant: sheet, toolbar
- onCheck: [(() => void)] [callback]

toolbar (DataView) [surface: exported-helper]
- defaultValue: compact, list
- items: [Segment<DataViewValue>[]]
- value: compact, list
- data-test-id: [string] [infra]
- onChange: [((value: DataViewValue) => void)] [callback]

toolbar (FilterButton) [surface: exported-helper]
- numberOfFilters: [number]
- open: true, false
- data-test-id: [string] [infra]
- onOpenChange: true, false [callback]

toolbar (MobileBulkActionsSheet) [surface: exported-helper]
- actions: [BulkAction[]]
- checked: true, false
- hasSelection: true, false
- indeterminate: true, false
- open: true, false
- selectedCount: [number]
- showBulkCheckbox: true, false
- totalCount: [number]
- onCheck: [(() => void)] [callback]

toolbar (MoreActions) [surface: exported-helper]
- moreActions: [Action[]]
- data-test-id: [string] [infra]

toolbar (Search)
- loading: true, false
- placeholder: [string]
- value: [string]
- data-test-id: [string] [infra]
- onChange: [(value: string) => void] [callback]
- onSubmit: [((value: string) => void)] [callback]

toolbar (SelectionLabel) [surface: exported-helper]
- hasSelection: true, false
- placement: headline, inline
- selectedCount: [number]
- totalCount: [number]
- className: [string] [infra]

tooltip (DesktopQuestionTooltip) [surface: exported-helper]
- closeOnPopstate: true, false
- disableMaxWidth: true, false
- disableSpanWrapper: true, false
- fallbackPlacements: [Placement[]]
- hoverDelayClose: [number]
- hoverDelayOpen: [number]
- offset: [number]
- open: true, false
- placement: bottom, bottom-end, bottom-start, left, left-end, left-start, right, right-end, right-start, top, top-end, top-start
- size: s, xs
- tip: [ReactNode]
- tooltipClassname: [string]
- trigger: click, clickAndFocusVisible, focus, focusVisible, hover, hoverAndFocus, hoverAndFocusVisible
- triggerClassName: [string]
- triggerLabel: [string]
- triggerRef: [ForwardedRef<ReferenceType | HTMLElement | null>]
- children: [ReactNode | ChildrenFunction] [infra]
- className: [string] [infra]
- data-test-id: [string] [infra]
- tabIndex: [number] [infra]
- onOpenChange: true, false [callback]

tooltip (MobileQuestionTooltip) [surface: exported-helper]
- closeOnPopstate: true, false
- disableMaxWidth: true, false
- disableSpanWrapper: true, false
- fallbackPlacements: [Placement[]]
- hoverDelayClose: [number]
- hoverDelayOpen: [number]
- offset: [number]
- open: true, false
- placement: bottom, bottom-end, bottom-start, left, left-end, left-start, right, right-end, right-start, top, top-end, top-start
- size: s, xs
- tip: [ReactNode]
- tooltipClassname: [string]
- trigger: click, clickAndFocusVisible, focus, focusVisible, hover, hoverAndFocus, hoverAndFocusVisible
- triggerClassName: [string]
- triggerLabel: [string]
- triggerRef: [ForwardedRef<ReferenceType | HTMLElement | null>]
- children: [ReactNode | ChildrenFunction] [infra]
- className: [string] [infra]
- data-test-id: [string] [infra]
- tabIndex: [number] [infra]
- onOpenChange: true, false [callback]

tree (ExpandableTreeNode) [surface: exported-helper]
- node: [TreeNodeProps]
- parentNode: [(Pick<TreeNodeProps, "id" | "nested"> & { parentNode?: ParentNode; } & { parentNode?: ParentN...]
- tabIndexAvailable: true, false

tree (TreeContextProvider)
- value: [TreeContextBaseProps]

tree (TreeItem) [surface: exported-helper]
- node: [TreeNodeProps]
- parentNode: [ParentNode]
- tabIndexAvailable: true, false

tree (TreeLine) [surface: exported-helper]
- halfWidth: true, false
- horizontal: true, false
- visible: true, false
- className: [string] [infra]
- style: [CSSProperties] [infra]

tree (TreeNode) [surface: exported-helper]
- collapsedIcon: [ReactNode]
- disabled: true, false
- expandedIcon: [ReactNode]
- href: [string]
- icon: [ReactNode]
- isLoading: true, false
- nested: [(ChildTreeNode | ParentTreeNode)[]]
- parentNode: [ParentNode]
- tabIndexAvailable: true, false
- title: [((value: Pick<BaseTreeNode, "id" | "disabled">) => ReactNode) | ((string | ((value: Pick<Base...]
- className: [string] [infra]
- data-test-id: [string] [infra]
- id: [string] [infra]
- onChevronClick: [MouseEventHandler<HTMLElement>] [callback]
- onClick: [MouseEventHandler] [callback]
- onKeyDown: [KeyboardEventHandler<HTMLElement>] [callback]

tree (TreeNodeActions) [surface: exported-helper]
- focusNode: [() => void]
- getNodeActions: [(node: Omit<TreeNodeProps, "href">) => Item[]]
- isDroplistOpen: true, false
- isDroplistTriggerFocused: true, false
- node: [Omit<TreeNodeProps, "href">]
- setDroplistOpen: true, false
- size: l, m, s
- onBlurActions: [() => void] [callback]

tree (TreeNodeHref) [surface: exported-helper]
- href: [string]
- onClick: [MouseEventHandler<HTMLAnchorElement>] [callback]

truncate-string (TruncateStringEnd) [surface: exported-helper]
- hideTooltip: true, false
- maxLines: [number]
- placement: bottom, bottom-end, bottom-start, left, left-end, left-start, right, right-end, right-start, top, top-end, top-start
- text: [string]
- tooltipClassName: [string]
- trigger: click, clickAndFocusVisible, focus, focusVisible, hover, hoverAndFocus, hoverAndFocusVisible
- className: [string] [infra]
- data-test-id: [string] [infra]

truncate-string (TruncateStringMiddle) [surface: exported-helper]
- hideTooltip: true, false
- placement: bottom, bottom-end, bottom-start, left, left-end, left-start, right, right-end, right-start, top, top-end, top-start
- text: [string]
- tooltipClassName: [string]
- trigger: click, clickAndFocusVisible, focus, focusVisible, hover, hoverAndFocus, hoverAndFocusVisible
- className: [string] [infra]
- data-test-id: [string] [infra]

uikit-product-card-predefined (Body)
- size: l, m, s
- children: [ReactNode] [infra]
- className: [string] [infra]
- data-test-id: [string] [infra]

uikit-product-card-predefined (CardAction) [surface: exported-helper]
- actionLabel: [string]
- className: [string] [infra]

uikit-product-card-predefined (Dimension)
- currentValue: [string]
- dimension: [string]
- oldValue: [string]
- size: l, m, s

uikit-product-card-predefined (Emblem) [surface: exported-helper]
- alt: [string]
- appearance: blue, green, neutral, orange, pink, primary, red, violet, yellow
- decor: true, false
- icon: [JSXElementConstructor<{ size?: number | undefined; className?: string | undefined; }>]
- shape: round, square
- src: [string]

uikit-product-card-predefined (FooterAction)
- button: [Pick<ButtonProps, "label" | "onClick" | "loading" | "icon">]
- secondaryButton: [Pick<ButtonProps, "label" | "onClick" | "loading" | "icon">]
- className: [string] [infra]
- data-test-id: [string] [infra]

uikit-product-card-predefined (FooterCallToAction)
- icon: [ReactNode]
- label: [string]
- className: [string] [infra]
- data-test-id: [string] [infra]

uikit-product-card-predefined (FooterPromo)
- button: [Pick<ButtonProps, "label" | "onClick" | "loading" | "icon">]
- size: l, m, s
- volume: [DimensionProps]
- className: [string] [infra]
- data-test-id: [string] [infra]

uikit-product-card-predefined (FunctionBadge)
- alwaysVisible: true, false
- icon: [ReactNode]
- options: [Option[]]

uikit-product-card-predefined (FunctionBadgeWrapper) [surface: exported-helper]
- alwaysVisible: true, false

uikit-product-card-predefined (Header)
- description: [string]
- emblem: [EmblemProps]
- metadata: [string]
- size: l, m, s
- title: [string]
- truncate: [{ title?: number; description?: number; metadata?: number | undefined; } | undefined]
- className: [string] [infra]
- data-test-id: [string] [infra]

uikit-product-card-predefined (Image)
- alt: [string]
- hideFading: true, false
- mode: background, little, middle
- src: [string]
- data-test-id: [string] [infra]

uikit-product-error-pages (CloudLogo)

uikit-product-error-pages (Illustration)
- data-test-id: [string] [infra]

uikit-product-error-pages (useGetButtonPropsByErrorType)
- custom: [ErrorPageCustomConfig]
- errorType: Custom, FrontendError, Offline, PageNotFound, PageUnavailable, Redirect
- mainPageUrl: [string]

uikit-product-error-pages (useGetContentByErrorType)
- custom: [ErrorPageCustomConfig]
- errorType: Custom, FrontendError, Offline, PageNotFound, PageUnavailable, Redirect

uikit-product-fields-predefined (AbkhaziaSVG)
- size: [number]

uikit-product-fields-predefined (AfghanistanSVG)
- size: [number]

uikit-product-fields-predefined (AlbaniaSVG)
- size: [number]

uikit-product-fields-predefined (AlgeriaSVG)
- size: [number]

uikit-product-fields-predefined (AndorraSVG)
- size: [number]

uikit-product-fields-predefined (AngolaSVG)
- size: [number]

uikit-product-fields-predefined (AntiguaAndBarbudaSVG)
- size: [number]

uikit-product-fields-predefined (ArgentinaSVG)
- size: [number]

uikit-product-fields-predefined (ArmeniaSVG)
- size: [number]

uikit-product-fields-predefined (Attachments)
- files: [AttachmentSquareProps[]]
- isMobile: true, false
- files.checked: [boolean | undefined] [nested]
- files.description: [string | undefined] [nested]
- files.disabled: [boolean | undefined] [nested]
- files.error: [string | undefined] [nested]
- files.file: [File | undefined] [nested]
- files.icon: [JSXElementConstructor<{ size?: number; className?: string; }> | undefined] [nested]
- files.icon.appearance: blue, green, neutral, orange, pink, primary, red, violet, yellow [nested]
- files.icon.decor: [boolean | undefined] [nested]
- files.icon.icon: [((props: { size?: number; className?: string; }, deprecatedLegacyContext?: any) => ReactNode)...] [nested]
- files.icon.shape: round, square [nested]
- files.icon.size: 5xl, l, m [nested]
- files.loading: [boolean | undefined] [nested]
- files.size: m, s [nested]
- files.title: [string | undefined] [nested]
- files.truncateVariant: end, middle [nested]
- files.className: [string | undefined] [infra, nested]
- files.data-test-id: [string | undefined] [infra, nested]
- files.icon.className: [string | undefined] [infra, nested]
- files.icon.data-test-id: [string | undefined] [infra, nested]
- files.onClick: [((event: MouseEvent<HTMLDivElement>) => void) | undefined] [callback, nested]
- files.onDelete: [((file?: File | undefined) => void) | undefined] [callback, nested]
- files.onDownload: [((file?: File | undefined) => void) | undefined] [callback, nested]
- files.onRetry: [(() => void) | undefined] [callback, nested]

uikit-product-fields-predefined (AustraliaSVG)
- size: [number]

uikit-product-fields-predefined (AustriaSVG)
- size: [number]

uikit-product-fields-predefined (AzerbaijanSVG)
- size: [number]

uikit-product-fields-predefined (BahamasSVG)
- size: [number]

uikit-product-fields-predefined (BahrainSVG)
- size: [number]

uikit-product-fields-predefined (BangladeshSVG)
- size: [number]

uikit-product-fields-predefined (BarbadosSVG)
- size: [number]

uikit-product-fields-predefined (BelarusSVG)
- size: [number]

uikit-product-fields-predefined (BelgiumSVG)
- size: [number]

uikit-product-fields-predefined (BelizeSVG)
- size: [number]

uikit-product-fields-predefined (BeninSVG)
- size: [number]

uikit-product-fields-predefined (BhutanSVG)
- size: [number]

uikit-product-fields-predefined (BosniaAndHerzegovinaSVG)
- size: [number]

uikit-product-fields-predefined (BotswanaSVG)
- size: [number]

uikit-product-fields-predefined (BrazilSVG)
- size: [number]

uikit-product-fields-predefined (CambodiaSVG)
- size: [number]

uikit-product-fields-predefined (CameroonSVG)
- size: [number]

uikit-product-fields-predefined (CaymanIslandsSVG)
- size: [number]

uikit-product-fields-predefined (Cell)
- autoComplete: [string | boolean]
- disabled: true, false
- size: l, m, s
- stretchCells: true, false
- validationState: default, error, success, valid, warning
- value: [string]
- className: [string] [infra]
- onChange: [((value: string) => void)] [callback]
- onKeyDown: [KeyboardEventHandler<HTMLInputElement>] [callback]
- onPaste: [ClipboardEventHandler<HTMLInputElement>] [callback]

uikit-product-fields-predefined (CentralAfricanRepublicSVG)
- size: [number]

uikit-product-fields-predefined (ChadSVG)
- size: [number]

uikit-product-fields-predefined (ChileSVG)
- size: [number]

uikit-product-fields-predefined (ColombiaSVG)
- size: [number]

uikit-product-fields-predefined (CongoSVG)
- size: [number]

uikit-product-fields-predefined (CostaRicaSVG)
- size: [number]

uikit-product-fields-predefined (CoteDIvoireSVG)
- size: [number]

uikit-product-fields-predefined (CroatiaSVG)
- size: [number]

uikit-product-fields-predefined (CyprusSVG)
- size: [number]

uikit-product-fields-predefined (DenmarkSVG)
- size: [number]

uikit-product-fields-predefined (DjiboutiSVG)
- size: [number]

uikit-product-fields-predefined (DominicanRepublicSVG)
- size: [number]

uikit-product-fields-predefined (EcuadorSVG)
- size: [number]

uikit-product-fields-predefined (EgyptSVG)
- size: [number]

uikit-product-fields-predefined (EstoniaSVG)
- size: [number]

uikit-product-fields-predefined (EthiopiaSVG)
- size: [number]

uikit-product-fields-predefined (FieldSubmitButton)
- active: true, false
- fullWidth: true, false
- handleClick: [() => void]
- showTooltip: true, false
- className: [string] [infra]
- data-test-id: [string] [infra]

uikit-product-fields-predefined (FieldWithAddButton)
- autoFocusRef: [RefObject<HTMLTextAreaElement | null>]
- size: l, m, s

uikit-product-fields-predefined (FijiSVG)
- size: [number]

uikit-product-fields-predefined (FinlandSVG)
- size: [number]

uikit-product-fields-predefined (FranceSVG)
- size: [number]

uikit-product-fields-predefined (FrenchPolynesiaSVG)
- size: [number]

uikit-product-fields-predefined (GeorgiaSVG)
- size: [number]

uikit-product-fields-predefined (GermanySVG)
- size: [number]

uikit-product-fields-predefined (GhanaSVG)
- size: [number]

uikit-product-fields-predefined (GibraltarSVG)
- size: [number]

uikit-product-fields-predefined (GreeceSVG)
- size: [number]

uikit-product-fields-predefined (GuatemalaSVG)
- size: [number]

uikit-product-fields-predefined (GuernseySVG)
- size: [number]

uikit-product-fields-predefined (GuineaSVG)
- size: [number]

uikit-product-fields-predefined (GuyanaSVG)
- size: [number]

uikit-product-fields-predefined (HaitiSVG)
- size: [number]

uikit-product-fields-predefined (HondurasSVG)
- size: [number]

uikit-product-fields-predefined (HongKongSVG)
- size: [number]

uikit-product-fields-predefined (HungarySVG)
- size: [number]

uikit-product-fields-predefined (IcelandSVG)
- size: [number]

uikit-product-fields-predefined (IndiaSVG)
- size: [number]

uikit-product-fields-predefined (IndonesiaSVG)
- size: [number]

uikit-product-fields-predefined (IranSVG)
- size: [number]

uikit-product-fields-predefined (IraqSVG)
- size: [number]

uikit-product-fields-predefined (IrelandSVG)
- size: [number]

uikit-product-fields-predefined (IsleOfManSVG)
- size: [number]

uikit-product-fields-predefined (IsraelSVG)
- size: [number]

uikit-product-fields-predefined (ItalySVG)
- size: [number]

uikit-product-fields-predefined (JapanSVG)
- size: [number]

uikit-product-fields-predefined (JordanSVG)
- size: [number]

uikit-product-fields-predefined (KazakhstanSVG)
- size: [number]

uikit-product-fields-predefined (KenyaSVG)
- size: [number]

uikit-product-fields-predefined (KiribatiSVG)
- size: [number]

uikit-product-fields-predefined (KosovoSVG)
- size: [number]

uikit-product-fields-predefined (KyrgyzstanSVG)
- size: [number]

uikit-product-fields-predefined (LatviaSVG)
- size: [number]

uikit-product-fields-predefined (LebanonSVG)
- size: [number]

uikit-product-fields-predefined (LesothoSVG)
- size: [number]

uikit-product-fields-predefined (LibyaSVG)
- size: [number]

uikit-product-fields-predefined (LiechtensteinSVG)
- size: [number]

uikit-product-fields-predefined (LithuaniaSVG)
- size: [number]

uikit-product-fields-predefined (LuxembourgSVG)
- size: [number]

uikit-product-fields-predefined (MadagascarSVG)
- size: [number]

uikit-product-fields-predefined (MalaysiaSVG)
- size: [number]

uikit-product-fields-predefined (MaldivesSVG)
- size: [number]

uikit-product-fields-predefined (MaliSVG)
- size: [number]

uikit-product-fields-predefined (MaltaSVG)
- size: [number]

uikit-product-fields-predefined (MauritaniaSVG)
- size: [number]

uikit-product-fields-predefined (MauritiusSVG)
- size: [number]

uikit-product-fields-predefined (MayotteSVG)
- size: [number]

uikit-product-fields-predefined (MoldovaSVG)
- size: [number]

uikit-product-fields-predefined (MonacoSVG)
- size: [number]

uikit-product-fields-predefined (MontenegroSVG)
- size: [number]

uikit-product-fields-predefined (MoroccoSVG)
- size: [number]

uikit-product-fields-predefined (MozambiqueSVG)
- size: [number]

uikit-product-fields-predefined (MyanmarSVG)
- size: [number]

uikit-product-fields-predefined (NamibiaSVG)
- size: [number]

uikit-product-fields-predefined (NetherlandsSVG)
- size: [number]

uikit-product-fields-predefined (NewCaledoniaSVG)
- size: [number]

uikit-product-fields-predefined (NewZealandSVG)
- size: [number]

uikit-product-fields-predefined (NicaraguaSVG)
- size: [number]

uikit-product-fields-predefined (NigeriaSVG)
- size: [number]

uikit-product-fields-predefined (NigerSVG)
- size: [number]

uikit-product-fields-predefined (NorfolkIslandSVG)
- size: [number]

uikit-product-fields-predefined (NorthMacedoniaSVG)
- size: [number]

uikit-product-fields-predefined (NorwaySVG)
- size: [number]

uikit-product-fields-predefined (OmanSVG)
- size: [number]

uikit-product-fields-predefined (PalestineSVG)
- size: [number]

uikit-product-fields-predefined (ParaguaySVG)
- size: [number]

uikit-product-fields-predefined (PeruSVG)
- size: [number]

uikit-product-fields-predefined (PolandSVG)
- size: [number]

uikit-product-fields-predefined (PortugalSVG)
- size: [number]

uikit-product-fields-predefined (QatarSVG)
- size: [number]

uikit-product-fields-predefined (RomaniaSVG)
- size: [number]

uikit-product-fields-predefined (RussiaSVG)
- size: [number]

uikit-product-fields-predefined (RwandaSVG)
- size: [number]

uikit-product-fields-predefined (SaintPierreAndMiquelonSVG)
- size: [number]

uikit-product-fields-predefined (SanMarinoSVG)
- size: [number]

uikit-product-fields-predefined (SaoTomeAndPrincipeSVG)
- size: [number]

uikit-product-fields-predefined (SaudiArabiaSVG)
- size: [number]

uikit-product-fields-predefined (SelectFooter) [surface: exported-helper]
- canCreate: true, false
- createButtonLabel: [string]
- onClick: [() => void] [callback]

uikit-product-fields-predefined (SenegalSVG)
- size: [number]

uikit-product-fields-predefined (SerbiaSVG)
- size: [number]

uikit-product-fields-predefined (SierraLeoneSVG)
- size: [number]

uikit-product-fields-predefined (SingaporeSVG)
- size: [number]

uikit-product-fields-predefined (SintMaartenSVG)
- size: [number]

uikit-product-fields-predefined (SlovakiaSVG)
- size: [number]

uikit-product-fields-predefined (SomalilandSVG)
- size: [number]

uikit-product-fields-predefined (SouthAfricaSVG)
- size: [number]

uikit-product-fields-predefined (SouthKoreaSVG)
- size: [number]

uikit-product-fields-predefined (SouthSudanSVG)
- size: [number]

uikit-product-fields-predefined (SpainSVG)
- size: [number]

uikit-product-fields-predefined (SriLankaSVG)
- size: [number]

uikit-product-fields-predefined (SudanSVG)
- size: [number]

uikit-product-fields-predefined (SurinameSVG)
- size: [number]

uikit-product-fields-predefined (SwedenSVG)
- size: [number]

uikit-product-fields-predefined (SwitzerlandSVG)
- size: [number]

uikit-product-fields-predefined (SyriaSVG)
- size: [number]

uikit-product-fields-predefined (TaiwanSVG)
- size: [number]

uikit-product-fields-predefined (TajikistanSVG)
- size: [number]

uikit-product-fields-predefined (TanzaniaSVG)
- size: [number]

uikit-product-fields-predefined (TextAreaActionsFooter)
- left: [ReactNode]
- right: [ReactNode]

uikit-product-fields-predefined (ThailandSVG)
- size: [number]

uikit-product-fields-predefined (TongaSVG)
- size: [number]

uikit-product-fields-predefined (TransnistriaSVG)
- size: [number]

uikit-product-fields-predefined (TurkeySVG)
- size: [number]

uikit-product-fields-predefined (TurkmenistanSVG)
- size: [number]

uikit-product-fields-predefined (TuvaluSVG)
- size: [number]

uikit-product-fields-predefined (UgandaSVG)
- size: [number]

uikit-product-fields-predefined (UkraineSVG)
- size: [number]

uikit-product-fields-predefined (UnitedArabEmiratesSVG)
- size: [number]

uikit-product-fields-predefined (UruguaySVG)
- size: [number]

uikit-product-fields-predefined (useSelectDataStates)
- entityIcon: [JSXElementConstructor<{ size?: number; className?: string; }> | undefined]
- entityName: [EntityName]
- onRefetch: [(() => void)] [callback]

uikit-product-fields-predefined (UzbekistanSVG)
- size: [number]

uikit-product-fields-predefined (VanuatuSVG)
- size: [number]

uikit-product-fields-predefined (VenezuelaSVG)
- size: [number]

uikit-product-fields-predefined (VietnamSVG)
- size: [number]

uikit-product-fields-predefined (WallisAndFutunaSVG)
- size: [number]

uikit-product-fields-predefined (YemenSVG)
- size: [number]

uikit-product-fields-predefined (ZimbabweSVG)
- size: [number]

uikit-product-info-row (DesktopInfoGroup) [surface: exported-helper]
- columns: double, single
- data: [DataType | undefined]
- formatBoolean: true, false
- items: [InfoGroupItem<T>[]]
- loading: true, false
- width: fixed, full
- className: [string] [infra]
- data-test-id: [string] [infra]

uikit-product-info-row (DesktopInfoRow) [surface: exported-helper]
- bottomDivider: true, false
- column: 1, 2
- content: [ReactNode]
- label: [string]
- labelClassName: [string]
- labelTooltip: [string | Pick<QuestionTooltipProps, "open" | "onOpenChange" | "trigger" | "placement" | "tip"...]
- labelTruncate: [number]
- labelWidth: auto, fixed
- loading: true, false
- maxWidth: true, false
- rowActions: [RowActionsPair]
- rowActionsSlot: [ReactNode]
- rowClassName: [string]
- secondaryContent: [ReactNode]
- secondaryLabel: [string]
- secondaryLabelClassName: [string]
- secondaryLabelTooltip: [string | Pick<QuestionTooltipProps, "open" | "onOpenChange" | "trigger" | "placement" | "tip"...]
- secondaryLabelTruncate: [number]
- secondaryRowActions: [RowActionsPair]
- secondaryRowActionsSlot: [ReactNode]
- topDivider: true, false
- width: fixed, full
- labelTooltip.closeOnPopstate: [boolean | undefined] [nested]
- labelTooltip.disableMaxWidth: [boolean | undefined] [nested]
- labelTooltip.disableSpanWrapper: [boolean | undefined] [nested]
- labelTooltip.fallbackPlacements: [Placement[] | undefined] [nested]
- labelTooltip.hoverDelayClose: [number | undefined] [nested]
- labelTooltip.hoverDelayOpen: [number | undefined] [nested]
- labelTooltip.offset: [number | undefined] [nested]
- labelTooltip.open: [boolean | undefined] [nested]
- labelTooltip.placement: bottom, bottom-end, bottom-start, left, left-end, left-start, right, right-end, right-start, top, top-end, top-start [nested]
- labelTooltip.size: s, xs [nested]
- labelTooltip.tip: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- labelTooltip.tooltipClassname: [string | undefined] [nested]
- labelTooltip.trigger: click, clickAndFocusVisible, focus, focusVisible, hover, hoverAndFocus, hoverAndFocusVisible [nested]
- labelTooltip.triggerClassName: [string | undefined] [nested]
- labelTooltip.triggerLabel: [string | undefined] [nested]
- labelTooltip.triggerRef: [ForwardedRef<HTMLElement | ReferenceType | null> | undefined] [nested]
- secondaryLabelTooltip.closeOnPopstate: [boolean | undefined] [nested]
- secondaryLabelTooltip.disableMaxWidth: [boolean | undefined] [nested]
- secondaryLabelTooltip.disableSpanWrapper: [boolean | undefined] [nested]
- secondaryLabelTooltip.fallbackPlacements: [Placement[] | undefined] [nested]
- secondaryLabelTooltip.hoverDelayClose: [number | undefined] [nested]
- secondaryLabelTooltip.hoverDelayOpen: [number | undefined] [nested]
- secondaryLabelTooltip.offset: [number | undefined] [nested]
- secondaryLabelTooltip.open: [boolean | undefined] [nested]
- secondaryLabelTooltip.placement: bottom, bottom-end, bottom-start, left, left-end, left-start, right, right-end, right-start, top, top-end, top-start [nested]
- secondaryLabelTooltip.size: s, xs [nested]
- secondaryLabelTooltip.tip: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- secondaryLabelTooltip.tooltipClassname: [string | undefined] [nested]
- secondaryLabelTooltip.trigger: click, clickAndFocusVisible, focus, focusVisible, hover, hoverAndFocus, hoverAndFocusVisible [nested]
- secondaryLabelTooltip.triggerClassName: [string | undefined] [nested]
- secondaryLabelTooltip.triggerLabel: [string | undefined] [nested]
- secondaryLabelTooltip.triggerRef: [ForwardedRef<HTMLElement | ReferenceType | null> | undefined] [nested]
- className: [string] [infra]
- data-test-id: [string] [infra]
- labelTooltip.children: [ReactNode | ChildrenFunction] [infra, nested]
- labelTooltip.className: [string | undefined] [infra, nested]
- labelTooltip.data-test-id: [string | undefined] [infra, nested]
- labelTooltip.tabIndex: [number | undefined] [infra, nested]
- secondaryLabelTooltip.children: [ReactNode | ChildrenFunction] [infra, nested]
- secondaryLabelTooltip.className: [string | undefined] [infra, nested]
- secondaryLabelTooltip.data-test-id: [string | undefined] [infra, nested]
- secondaryLabelTooltip.tabIndex: [number | undefined] [infra, nested]
- labelTooltip.onOpenChange: [((isOpen: boolean) => void) | undefined] [callback, nested]
- secondaryLabelTooltip.onOpenChange: [((isOpen: boolean) => void) | undefined] [callback, nested]

uikit-product-info-row (LabelBlock)
- labelWidth: auto, fixed
- layoutClassName: [string]
- text: [string]
- tooltip: [LabelTooltipProp]
- truncate: [number]

uikit-product-info-row (MobileInfoGroup) [surface: exported-helper]
- data: [DataType | undefined]
- formatBoolean: true, false
- items: [MobileInfoGroupItem<T>[]]
- loading: true, false
- className: [string] [infra]
- data-test-id: [string] [infra]

uikit-product-info-row (MobileInfoRow) [surface: exported-helper]
- bottomDivider: true, false
- content: [ReactNode]
- label: [string]
- labelTooltip: [string | Pick<QuestionTooltipProps, "open" | "onOpenChange" | "trigger" | "placement" | "tip"...]
- labelTruncate: [number]
- loading: true, false
- position: first, inner, last
- rowActions: [MobileRowActionsPair]
- topDivider: true, false
- labelTooltip.closeOnPopstate: [boolean | undefined] [nested]
- labelTooltip.disableMaxWidth: [boolean | undefined] [nested]
- labelTooltip.disableSpanWrapper: [boolean | undefined] [nested]
- labelTooltip.fallbackPlacements: [Placement[] | undefined] [nested]
- labelTooltip.hoverDelayClose: [number | undefined] [nested]
- labelTooltip.hoverDelayOpen: [number | undefined] [nested]
- labelTooltip.offset: [number | undefined] [nested]
- labelTooltip.open: [boolean | undefined] [nested]
- labelTooltip.placement: bottom, bottom-end, bottom-start, left, left-end, left-start, right, right-end, right-start, top, top-end, top-start [nested]
- labelTooltip.size: s, xs [nested]
- labelTooltip.tip: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- labelTooltip.tooltipClassname: [string | undefined] [nested]
- labelTooltip.trigger: click, clickAndFocusVisible, focus, focusVisible, hover, hoverAndFocus, hoverAndFocusVisible [nested]
- labelTooltip.triggerClassName: [string | undefined] [nested]
- labelTooltip.triggerLabel: [string | undefined] [nested]
- labelTooltip.triggerRef: [ForwardedRef<HTMLElement | ReferenceType | null> | undefined] [nested]
- className: [string] [infra]
- data-test-id: [string] [infra]
- labelTooltip.children: [ReactNode | ChildrenFunction] [infra, nested]
- labelTooltip.className: [string | undefined] [infra, nested]
- labelTooltip.data-test-id: [string | undefined] [infra, nested]
- labelTooltip.tabIndex: [number | undefined] [infra, nested]
- labelTooltip.onOpenChange: [((isOpen: boolean) => void) | undefined] [callback, nested]

uikit-product-info-row (ValueColumn)
- actions: [RowActionsPair]
- actionsSlot: [ReactNode]
- body: [ReactNode]
- loading: true, false

uikit-product-modal-predefined (DesktopReleaseNotes) [surface: exported-helper]
- closeOnPopstate: true, false
- contentState: data, error, noData
- items: [NoteItemProps[]]
- loading: true, false
- open: true, false
- readLaterButtonProps: [Partial<ButtonProps>]
- items.description: [string] [nested]
- items.image: [{ src: string; alt: string; }] [nested]
- items.title: [string] [nested]
- items.video: [string | undefined] [nested]
- readLaterButtonProps.appearance: critical, neutral, primary [nested]
- readLaterButtonProps.counter: [Omit<CounterProps, "size" | "appearance"> | undefined] [nested]
- readLaterButtonProps.counter.appearance: blue, green, neutral, orange, pink, primary, red, violet, yellow [nested]
- readLaterButtonProps.counter.color: accent, decor [nested]
- readLaterButtonProps.counter.plusLimit: [number | undefined] [nested]
- readLaterButtonProps.counter.size: s, xs [nested]
- readLaterButtonProps.counter.value: [number] [nested]
- readLaterButtonProps.counter.variant: count, count-k, count-plus [nested]
- readLaterButtonProps.disabled: [boolean | undefined] [nested]
- readLaterButtonProps.fullWidth: [boolean | undefined] [nested]
- readLaterButtonProps.icon: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- readLaterButtonProps.iconPosition: after, before [nested]
- readLaterButtonProps.label: [string | undefined] [nested]
- readLaterButtonProps.loading: [boolean | undefined] [nested]
- readLaterButtonProps.size: l, m, s [nested]
- readLaterButtonProps.view: elevated, filled, function, outline, simple, tonal [nested]
- data-test-id: [string] [infra]
- readLaterButtonProps.as: [T | undefined] [infra, nested]
- readLaterButtonProps.className: [string | undefined] [infra, nested]
- readLaterButtonProps.counter.className: [string | undefined] [infra, nested]
- readLaterButtonProps.counter.data-test-id: [string | undefined] [infra, nested]
- readLaterButtonProps.data-test-id: [string | undefined] [infra, nested]
- readLaterButtonProps.innerRef: [PolymorphicRef<T> | undefined] [infra, nested]
- onClose: [() => void] [callback]
- onDataErrorRetryClick: [(() => void)] [callback]
- onReadLaterClick: [(() => void)] [callback]
- onSlideChange: [((slide: number) => void)] [callback]

uikit-product-modal-predefined (InputConfirm) [surface: exported-helper]
- confirmLabel: [string]
- confirmText: [string]
- copyLineAlign: space-between, start
- error: [string]
- hideConfirmCopyButton: true, false
- label: [string]
- placeholder: [string]
- size: l, m, s
- value: [string]
- data-test-id: [string] [infra]
- onChange: [(value: string) => void] [callback]

uikit-product-modal-predefined (MobileReleaseNotes) [surface: exported-helper]
- closeOnPopstate: true, false
- contentState: data, error, noData
- items: [NoteItemProps[]]
- loading: true, false
- open: true, false
- readLaterButtonProps: [Partial<ButtonProps>]
- items.description: [string] [nested]
- items.image: [{ src: string; alt: string; }] [nested]
- items.title: [string] [nested]
- items.video: [string | undefined] [nested]
- readLaterButtonProps.appearance: critical, neutral, primary [nested]
- readLaterButtonProps.counter: [Omit<CounterProps, "size" | "appearance"> | undefined] [nested]
- readLaterButtonProps.counter.appearance: blue, green, neutral, orange, pink, primary, red, violet, yellow [nested]
- readLaterButtonProps.counter.color: accent, decor [nested]
- readLaterButtonProps.counter.plusLimit: [number | undefined] [nested]
- readLaterButtonProps.counter.size: s, xs [nested]
- readLaterButtonProps.counter.value: [number] [nested]
- readLaterButtonProps.counter.variant: count, count-k, count-plus [nested]
- readLaterButtonProps.disabled: [boolean | undefined] [nested]
- readLaterButtonProps.fullWidth: [boolean | undefined] [nested]
- readLaterButtonProps.icon: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- readLaterButtonProps.iconPosition: after, before [nested]
- readLaterButtonProps.label: [string | undefined] [nested]
- readLaterButtonProps.loading: [boolean | undefined] [nested]
- readLaterButtonProps.size: l, m, s [nested]
- readLaterButtonProps.view: elevated, filled, function, outline, simple, tonal [nested]
- data-test-id: [string] [infra]
- readLaterButtonProps.as: [T | undefined] [infra, nested]
- readLaterButtonProps.className: [string | undefined] [infra, nested]
- readLaterButtonProps.counter.className: [string | undefined] [infra, nested]
- readLaterButtonProps.counter.data-test-id: [string | undefined] [infra, nested]
- readLaterButtonProps.data-test-id: [string | undefined] [infra, nested]
- readLaterButtonProps.innerRef: [PolymorphicRef<T> | undefined] [infra, nested]
- onClose: [() => void] [callback]
- onDataErrorRetryClick: [(() => void)] [callback]
- onReadLaterClick: [(() => void)] [callback]
- onSlideChange: [((slide: number) => void)] [callback]

uikit-product-modal-predefined (NoteItem) [surface: exported-helper]
- description: [string]
- image: [{ src: string; alt: string; }]
- surface: bottomSheet, modal
- title: [string]
- video: [string]

uikit-product-modal-predefined (ReleaseNotesContent) [surface: exported-helper]
- contentState: data, error, noData
- errorDescription: [string]
- errorTitle: [string]
- items: [NoteItemProps[]]
- loading: true, false
- noDataDescription: [string]
- noDataTitle: [string]
- pageIndex: [number]
- retryLabel: [string]
- surface: bottomSheet, modal
- items.description: [string] [nested]
- items.image: [{ src: string; alt: string; }] [nested]
- items.title: [string] [nested]
- items.video: [string | undefined] [nested]
- onDataErrorRetryClick: [(() => void)] [callback]
- onPageChange: [(pageIndex: number) => void] [callback]

uikit-product-modal-predefined (ReleaseNotesFooter) [surface: exported-helper]
- counterLabel: [string]
- pageIndex: [number]
- readablePageNumber: [number]
- readLaterButtonProps: [Partial<ButtonProps>]
- readLaterLabel: [string]
- surface: bottomSheet, modal
- total: [number]
- readLaterButtonProps.appearance: critical, neutral, primary [nested]
- readLaterButtonProps.counter: [Omit<CounterProps, "size" | "appearance"> | undefined] [nested]
- readLaterButtonProps.counter.appearance: blue, green, neutral, orange, pink, primary, red, violet, yellow [nested]
- readLaterButtonProps.counter.color: accent, decor [nested]
- readLaterButtonProps.counter.plusLimit: [number | undefined] [nested]
- readLaterButtonProps.counter.size: s, xs [nested]
- readLaterButtonProps.counter.value: [number] [nested]
- readLaterButtonProps.counter.variant: count, count-k, count-plus [nested]
- readLaterButtonProps.disabled: [boolean | undefined] [nested]
- readLaterButtonProps.fullWidth: [boolean | undefined] [nested]
- readLaterButtonProps.icon: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- readLaterButtonProps.iconPosition: after, before [nested]
- readLaterButtonProps.label: [string | undefined] [nested]
- readLaterButtonProps.loading: [boolean | undefined] [nested]
- readLaterButtonProps.size: l, m, s [nested]
- readLaterButtonProps.view: elevated, filled, function, outline, simple, tonal [nested]
- readLaterButtonProps.as: [T | undefined] [infra, nested]
- readLaterButtonProps.className: [string | undefined] [infra, nested]
- readLaterButtonProps.counter.className: [string | undefined] [infra, nested]
- readLaterButtonProps.counter.data-test-id: [string | undefined] [infra, nested]
- readLaterButtonProps.data-test-id: [string | undefined] [infra, nested]
- readLaterButtonProps.innerRef: [PolymorphicRef<T> | undefined] [infra, nested]
- onNextPageClick: [() => void] [callback]
- onPrevPageClick: [() => void] [callback]
- onReadLaterClick: [(event: MouseEvent<HTMLButtonElement, MouseEvent>) => void] [callback]

uikit-product-notification (ActionsButton) [surface: exported-helper]
- actions: [Action[]]
- icon: [ReactElement<any, string | JSXElementConstructor<any>>]
- open: true, false
- setDroplistOpen: true, false
- testIds: [ActionsButtonTestIds]
- triggerAriaLabel: [string]
- className: [string] [infra]

uikit-product-notification (getAppearanceLabel)

uikit-product-notification (getIcon)

uikit-product-notification (NotificationPanelSettingsDroplist)
- actions: [Action[]]
- button: [ButtonProps<ElementType>]
- button.appearance: critical, neutral, primary [nested]
- button.counter: [Omit<CounterProps, "size" | "appearance"> | undefined] [nested]
- button.counter.appearance: blue, green, neutral, orange, pink, primary, red, violet, yellow [nested]
- button.counter.color: accent, decor [nested]
- button.counter.plusLimit: [number | undefined] [nested]
- button.counter.size: s, xs [nested]
- button.counter.value: [number] [nested]
- button.counter.variant: count, count-k, count-plus [nested]
- button.disabled: [boolean | undefined] [nested]
- button.fullWidth: [boolean | undefined] [nested]
- button.icon: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- button.iconPosition: after, before [nested]
- button.label: [string | undefined] [nested]
- button.loading: [boolean | undefined] [nested]
- button.size: l, m, s [nested]
- button.view: elevated, filled, function, outline, simple, tonal [nested]
- button.as: [T | undefined] [infra, nested]
- button.className: [string | undefined] [infra, nested]
- button.counter.className: [string | undefined] [infra, nested]
- button.counter.data-test-id: [string | undefined] [infra, nested]
- button.data-test-id: [string | undefined] [infra, nested]
- button.innerRef: [PolymorphicRef<T> | undefined] [infra, nested]

uikit-product-notification (StackTail) [surface: exported-helper]
- count: [number]
- open: true, false

uikit-product-page-layout (ConditionalPopover) [surface: exported-helper]
- isOpen: true, false
- tip: [ReactNode]
- withPopover: true, false
- onOpenChange: true, false [callback]

uikit-product-page-layout (Menu) [surface: exported-helper]
- enableShrinkMenuButton: true, false
- menuItems: [TreeNodeProps[]]
- menuTitle: [string]
- selected: [string]
- withDefaultOpenedMenuList: true, false
- onSelect: [((selectedKey: string, node: TreeNodeProps) => void)] [callback]

uikit-product-page-layout (SearchContextProvider)

uikit-product-page-layout (SidebarTitle) [surface: exported-helper]
- afterContent: [ReactNode]
- icon: [JSXElementConstructor<{ size?: number | undefined; className?: string | undefined; }>]
- title: [string]
- className: [string] [infra]

uikit-product-page-layout (useButtonWithTooltip)
- tooltip: [TooltipProps]
- view: elevated, filled, function, outline, simple, tonal
- tooltip.closeOnPopstate: [boolean | undefined] [nested]
- tooltip.disableMaxWidth: [boolean | undefined] [nested]
- tooltip.disableSpanWrapper: [boolean | undefined] [nested]
- tooltip.fallbackPlacements: [Placement[] | undefined] [nested]
- tooltip.hoverDelayClose: [number | undefined] [nested]
- tooltip.hoverDelayOpen: [number | undefined] [nested]
- tooltip.offset: [number | undefined] [nested]
- tooltip.open: [boolean | undefined] [nested]
- tooltip.placement: bottom, bottom-end, bottom-start, left, left-end, left-start, right, right-end, right-start, top, top-end, top-start [nested]
- tooltip.tip: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- tooltip.trigger: click, clickAndFocusVisible, focus, focusVisible, hover, hoverAndFocus, hoverAndFocusVisible [nested]
- tooltip.triggerClassName: [string | undefined] [nested]
- tooltip.triggerRef: [ForwardedRef<HTMLElement | ReferenceType | null> | undefined] [nested]
- tooltip.children: [ReactNode | ChildrenFunction] [infra, nested]
- tooltip.className: [string | undefined] [infra, nested]
- tooltip.data-test-id: [string | undefined] [infra, nested]
- tooltip.onOpenChange: [((isOpen: boolean) => void) | undefined] [callback, nested]

uikit-product-page-layout (useSearchFilter) [surface: exported-helper]

uikit-product-price-summary (ContentBlock)
- dataError: true, false
- loading: true, false
- onRetry: [(() => void)] [callback]

uikit-product-price-summary (CoveredByGrantLabel)
- covered: true, false
- className: [string] [infra]

uikit-product-price-summary (DiscountBlock)
- value: [DiscountDetails]

uikit-product-price-summary (DiscountPercentCell)
- discount: [DiscountItem]

uikit-product-price-summary (HeaderBlock)
- period: day, hour, minute, month, year
- periodOptions: [PricePeriod[]]
- promoBadge: [string | Pick<PromoTagProps, "text" | "appearance">]
- vatType: excluding, including
- promoBadge.afterContent: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- promoBadge.appearance: blue, green, neutral, orange, pink, primary, red, violet, yellow [nested]
- promoBadge.beforeContent: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- promoBadge.role: accent, decor [nested]
- promoBadge.size: m, s, xs [nested]
- promoBadge.text: [string | undefined] [nested]
- promoBadge.as: [T | undefined] [infra, nested]
- promoBadge.className: [string | undefined] [infra, nested]
- promoBadge.data-test-id: [string | undefined] [infra, nested]
- promoBadge.innerRef: [PolymorphicRef<T> | undefined] [infra, nested]
- onPeriodChanged: [((period: PricePeriod) => void)] [callback]
- promoBadge.onClick: [MouseEventHandler<HTMLElement> | undefined] [callback, nested]

uikit-product-price-summary (InvoiceBlock)
- invoice: [InvoiceDetails[]]
- invoiceExpandedDefault: true, false

uikit-product-price-summary (InvoiceDetailsBlock)
- invoice: [InvoiceDetails]

uikit-product-price-summary (InvoiceItemBlock)
- index: [number]
- item: [InvoiceItem]
- showCoveredByGrantLabel: true, false

uikit-product-price-summary (InvoiceItemLabelCell)
- item: [InvoiceItem]

uikit-product-price-summary (PeriodDropdown)
- period: day, hour, minute, month, year
- periodOptions: [PricePeriod[]]
- onPeriodChanged: [((period: PricePeriod) => void)] [callback]

uikit-product-price-summary (TotalValueBlock)
- hint: [string]
- hintAppearance: default, systemError, userError, warning
- hintLink: [{ href?: string; text: string; }]
- hintTooltipText: [ReactNode]
- showHintLink: true, false
- showHintTooltip: true, false
- totalSumType: equal, from
- value: [number]
- valueDelta: [PriceDeltaDetails]

uikit-product-quota (Grid) [surface: exported-helper]
- disableSorting: true, false
- isAccordion: true, false
- isLoading: true, false
- quotas: [QuotaItem[]]

uikit-product-quota (ProjectHeader)
- canEditQuota: true, false
- hideIncreaseQuotaButton: true, false
- isError: true, false
- projectName: [string]
- quotasUrl: [string]
- onIncreaseQuotaClick: [(() => void)] [callback]
- onQuotasUrlClick: [(() => void)] [callback]

uikit-product-quota (QuotaCardsGrid) [surface: exported-helper]
- disableSorting: true, false
- isAccordion: true, false
- isError: true, false
- isLoading: true, false
- quotas: [QuotaItem[]]
- onRefresh: [() => void] [callback]

uikit-product-quota (QuotaError) [surface: exported-helper]
- onRefresh: [() => void] [callback]

uikit-product-quota (QuotaTooltip)
- quota: [QuotaItem]

uikit-product-quota (QuotaWidgetCardsSkeleton)
- isLoading: true, false

uikit-product-switch-row (Title)
- disableTitleTruncate: true, false
- tip: [ReactNode]
- title: [string]

uikit-product-title-clickable (TitleClickableContent)
- avatar: [({ 'data-test-id'?: string; } & AriaAttributes & { name: string; src?: string; appearance?: A...]
- before: [ReactNode]
- fullWidth: true, false
- icon: [ReactNode]
- title: [string]
- titleTag: [ElementType]
- children: [ReactNode] [infra]

uikit-product-upload-files (Attachments)
- accept: [UploadFilesAcceptItem[]]
- disabled: true, false
- items: [UploadFileItem<TResult>[]]
- units: [FileSizeUnits]
- className: [string] [infra]
- onDelete: [(id: string) => void] [callback]

uikit-product-upload-files (UploadFilesDropZone)
- buttonLabel: [string]
- description: [ReactNode]
- title: [string]

uikit-product-widget (ActionList) [surface: exported-helper]
- closeOnItemClick: true, false
- items: [WidgetActionListEntry[]]
- className: [string] [infra]
- onItemClick: [(() => void)] [callback]

uikit-product-widget (Actions) [surface: exported-helper]
- actions: [Action[]]
- actionsChildren: [ReactNode]
- fullWidthPrimaryAction: true, false
- layoutType: desktop, mobile
- showOverflowActions: true, false
- state: default, error, loading
- wide: true, false

uikit-product-widget (ActionView) [surface: exported-helper]
- appearance: critical, neutral, primary
- button: [Omit<ButtonProps<"button">, "icon" | "label" | "view"> | (Omit<ButtonProps<"button">, "view" ...]
- commonProps: [{ className?: string; size?: "s" | "m" | "l"; fullWidth?: boolean | undefined; } | undefined]
- counter: [Omit<CounterProps, "appearance" | "size">]
- disabled: true, false
- fullWidth: true, false
- hidden: true, false
- icon: [ReactNode]
- iconPosition: after, before
- label: [string]
- layoutType: desktop, mobile
- list: [WidgetActionListProps]
- loading: true, false
- size: l, m, s
- tooltip: [TooltipProps]
- variant: droplist, filled, function, kebab, outline, simple, tonal
- button.appearance: critical, neutral, primary [nested]
- button.counter: [Omit<CounterProps, "size" | "appearance"> | undefined] [nested]
- button.disabled: [boolean | undefined] [nested]
- button.fullWidth: [boolean | undefined] [nested]
- button.icon: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- button.iconPosition: after, before [nested]
- button.label: [string | undefined] [nested]
- button.loading: [boolean | undefined] [nested]
- button.size: l, m, s [nested]
- button.view: elevated, filled, function, outline, simple, tonal [nested]
- list.closeDroplistOnItemClick: [boolean | undefined] [nested]
- list.items: [WidgetActionListEntry[]] [nested]
- list.open: [boolean | undefined] [nested]
- tooltip.closeOnPopstate: [boolean | undefined] [nested]
- tooltip.disableMaxWidth: [boolean | undefined] [nested]
- tooltip.disableSpanWrapper: [boolean | undefined] [nested]
- tooltip.fallbackPlacements: [Placement[] | undefined] [nested]
- tooltip.hoverDelayClose: [number | undefined] [nested]
- tooltip.hoverDelayOpen: [number | undefined] [nested]
- tooltip.offset: [number | undefined] [nested]
- tooltip.open: [boolean | undefined] [nested]
- tooltip.placement: bottom, bottom-end, bottom-start, left, left-end, left-start, right, right-end, right-start, top, top-end, top-start [nested]
- tooltip.tip: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- tooltip.trigger: click, clickAndFocusVisible, focus, focusVisible, hover, hoverAndFocus, hoverAndFocusVisible [nested]
- tooltip.triggerClassName: [string | undefined] [nested]
- tooltip.triggerRef: [ForwardedRef<HTMLElement | ReferenceType | null> | undefined] [nested]
- as: button [infra]
- button.as: [T | undefined] [infra, nested]
- button.className: [string | undefined] [infra, nested]
- button.data-test-id: [string | undefined] [infra, nested]
- button.innerRef: [PolymorphicRef<T> | undefined] [infra, nested]
- className: [string] [infra]
- data-test-id: [string] [infra]
- innerRef: [((instance: HTMLButtonElement | null) => void) | RefObject<HTMLButtonElement> | null] [infra]
- list.className: [string | undefined] [infra, nested]
- tooltip.children: [ReactNode | ChildrenFunction] [infra, nested]
- tooltip.className: [string | undefined] [infra, nested]
- tooltip.data-test-id: [string | undefined] [infra, nested]
- list.onOpenChange: [((open: boolean) => void) | undefined] [callback, nested]
- tooltip.onOpenChange: [((isOpen: boolean) => void) | undefined] [callback, nested]

uikit-product-widget (ButtonDroplist) [surface: exported-helper]
- button: [(Omit<ButtonProps<"button">, "view" | "appearance"> & { buttonType?: "filled" | undefined; })...]
- layoutType: desktop, mobile
- list: [WidgetActionListProps]
- button.appearance: critical, neutral, primary [nested]
- button.counter: [Omit<CounterProps, "size" | "appearance"> | undefined] [nested]
- button.disabled: [boolean | undefined] [nested]
- button.fullWidth: [boolean | undefined] [nested]
- button.icon: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- button.iconPosition: after, before [nested]
- button.label: [string | undefined] [nested]
- button.loading: [boolean | undefined] [nested]
- button.size: l, m, s [nested]
- button.view: elevated, filled, function, outline, simple, tonal [nested]
- list.closeDroplistOnItemClick: [boolean | undefined] [nested]
- list.items: [WidgetActionListEntry[]] [nested]
- list.open: [boolean | undefined] [nested]
- button.as: [T | undefined] [infra, nested]
- button.className: [string | undefined] [infra, nested]
- button.data-test-id: [string | undefined] [infra, nested]
- button.innerRef: [PolymorphicRef<T> | undefined] [infra, nested]
- list.className: [string | undefined] [infra, nested]
- list.onOpenChange: [((open: boolean) => void) | undefined] [callback, nested]

uikit-product-widget (ButtonKebab) [surface: exported-helper]
- button: [Omit<ButtonProps<"button">, "icon" | "label" | "view">]
- layoutType: desktop, mobile
- list: [WidgetActionListProps]
- button.appearance: critical, neutral, primary [nested]
- button.counter: [Omit<CounterProps, "size" | "appearance"> | undefined] [nested]
- button.disabled: [boolean | undefined] [nested]
- button.fullWidth: [boolean | undefined] [nested]
- button.icon: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- button.iconPosition: after, before [nested]
- button.label: [string | undefined] [nested]
- button.loading: [boolean | undefined] [nested]
- button.size: l, m, s [nested]
- button.view: elevated, filled, function, outline, simple, tonal [nested]
- list.closeDroplistOnItemClick: [boolean | undefined] [nested]
- list.items: [WidgetActionListEntry[]] [nested]
- list.open: [boolean | undefined] [nested]
- button.as: [T | undefined] [infra, nested]
- button.className: [string | undefined] [infra, nested]
- button.data-test-id: [string | undefined] [infra, nested]
- button.innerRef: [PolymorphicRef<T> | undefined] [infra, nested]
- list.className: [string | undefined] [infra, nested]
- list.onOpenChange: [((open: boolean) => void) | undefined] [callback, nested]

uikit-product-widget (Content) [surface: exported-helper]
- errorState: [WidgetErrorStateProps]
- loadingState: [WidgetLoadingStateProps]
- state: default, error, loading
- wide: true, false
- errorState.errorDescription: [string | undefined] [nested]
- errorState.errorIcon: [IconPredefinedProps | undefined] [nested]
- errorState.errorIcon.align: horizontal, vertical [nested]
- errorState.errorIcon.description: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- errorState.errorIcon.footer: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- errorState.errorIcon.icon: [IconPredefinedProps | undefined] [nested]
- errorState.errorIcon.size: l, m, s [nested]
- errorState.errorIcon.title: [string | undefined] [nested]
- errorState.errorTitle: [string | undefined] [nested]
- errorState.updateButtonLabel: [string | undefined] [nested]
- loadingState.loadingContent: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- loadingState.showSkeleton: [boolean | undefined] [nested]
- errorState.errorIcon.className: [string | undefined] [infra, nested]
- errorState.errorIcon.data-test-id: [string | undefined] [infra, nested]
- errorState.onClickUpdate: [(event: MouseEvent<HTMLElement, MouseEvent>) => void] [callback, nested]

uikit-product-widget (ControlBlock) [surface: exported-helper]
- actions: [Action[]]
- actionsChildren: [ReactNode]
- layoutType: desktop, mobile
- segmentControl: [SegmentControlProps]
- state: default, error, loading
- wide: true, false
- segmentControl.defaultValue: [Value | undefined] [nested]
- segmentControl.items: [SegmentType<Value>[]] [nested]
- segmentControl.items.counter: [string | number | undefined] [nested]
- segmentControl.items.disabled: [boolean | undefined] [nested]
- segmentControl.items.icon: [string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable...] [nested]
- segmentControl.items.iconPosition: after, before [nested]
- segmentControl.items.label: [string | undefined] [nested]
- segmentControl.items.renderWrapSegment: [((segment: ReactNode) => ReactNode) | undefined] [nested]
- segmentControl.items.value: [Value] [nested]
- segmentControl.name: [string | undefined] [nested]
- segmentControl.outline: [boolean | undefined] [nested]
- segmentControl.size: l, m, s [nested]
- segmentControl.value: [Value | undefined] [nested]
- segmentControl.width: auto, full [nested]
- segmentControl.className: [string | undefined] [infra, nested]
- segmentControl.data-test-id: [string | undefined] [infra, nested]
- segmentControl.onChange: [((value: Value) => void) | undefined] [callback, nested]


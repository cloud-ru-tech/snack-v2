import { isMobileLayout, useAdaptiveLayout } from '@ds/adaptive';
import { Hint, SIZE as HINT_SIZE } from '@ds/field-decorator';
import { useValueControl } from '@ds/utils';
import cn from 'classnames';
import {
  Children,
  KeyboardEvent,
  MouseEvent,
  ReactElement,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';

import { SEARCH_TRIGGER, SEND_STATE, TEST_IDS } from '../../constants';
import {
  ActionListHandle,
  ActionListHost,
  AiFieldInputContext,
  AiFieldInputContextValue,
  EditorHandle,
} from '../../context';
import {
  Attachments,
  Editor,
  MobileActionListSheet,
  ScrollButton,
  SearchActionList,
  SecureInput,
  SecureToggleButton,
} from '../../helperComponents';
import { aiFieldInputLocale } from '../../locale';
import { AiFieldInputActionListItem, AiFieldInputProps, AiFieldInputValue, SearchTrigger } from '../../types';
import {
  findSearchSegment,
  isValueEmpty,
  replaceSearchSegment,
  serializeSegments,
  toChipSegment,
  toSecureValue,
} from '../../utils';
import { AiFieldInputSendButton } from '../AiFieldInputSendButton';
import styles from './styles.module.scss';

const DEFAULT_SCROLL_STEP = 92;
const EMPTY_VALUE: AiFieldInputValue = [];

export function AiFieldInput({
  value: valueProp,
  defaultValue,
  onChange,
  onSubmit,
  placeholder,
  searchPlaceholder,
  disabled = false,
  secure = false,
  error,
  length,
  banner,
  skills,
  mentions,
  onActionSelect,
  attachments,
  attachmentsScrollStep = DEFAULT_SCROLL_STEP,
  footerLeftActions,
  footerRightActions,
  send,
  scrollButton,
  disclaimer,
  className,
  'data-test-id': dataTestId = TEST_IDS.root,
  ...rest
}: AiFieldInputProps): ReactElement {
  const { t } = aiFieldInputLocale.useTranslations();
  const errorId = useId();
  const hasError = Boolean(error) && !disabled;
  const [value = EMPTY_VALUE, setValue] = useValueControl<AiFieldInputValue>({
    value: valueProp,
    defaultValue: defaultValue ?? EMPTY_VALUE,
    onChange,
  });

  const actionListRef = useRef<ActionListHandle | null>(null);
  const editorRef = useRef<EditorHandle | null>(null);
  const searchListRef = useRef<HTMLDivElement>(null);

  const registerActionList = useCallback((handle: ActionListHandle | null) => {
    actionListRef.current = handle;
  }, []);
  const getActionList = useCallback(() => actionListRef.current, []);
  const getEditor = useCallback(() => editorRef.current, []);
  const [detachedTrigger, setDetachedTrigger] = useState<SearchTrigger | null>(null);
  const { layoutType } = useAdaptiveLayout();
  const isMobile = isMobileLayout(layoutType);
  const actionListHostRef = useRef<ActionListHost | null>(null);
  const [mobileSheetTrigger, setMobileSheetTrigger] = useState<SearchTrigger | null>(null);
  const [secureRevealed, setSecureRevealed] = useState(false);
  const [prevSecure, setPrevSecure] = useState(secure);
  // Секрет на момент выхода из `secure`. Пока родитель не прислал другое значение (controlled-режим может
  // обновить `value` асинхронно или не обновить вовсе), редактор его не показывает.
  const [secretOnExit, setSecretOnExit] = useState<AiFieldInputValue | null>(null);
  const [secureEntered, setSecureEntered] = useState(false);

  if (prevSecure !== secure) {
    setPrevSecure(secure);
    setSecureRevealed(false);
    setSecretOnExit(!secure && value.length > 0 ? value : null);
    setSecureEntered(secure);
  } else if (secretOnExit !== null && value !== secretOnExit) {
    setSecretOnExit(null);
  }

  const isSecretHidden = secretOnExit !== null && value === secretOnExit;
  const secureValue = useMemo(() => toSecureValue(value), [value]);
  const effectiveValue = secure ? secureValue : value;

  const setValueRef = useRef(setValue);
  setValueRef.current = setValue;

  useEffect(() => {
    if (secretOnExit) setValueRef.current(EMPTY_VALUE);
  }, [secretOnExit]);

  // Вход в `secure`: из значения убираются чипы, иначе снаружи осталось бы не то, что видно в поле.
  useEffect(() => {
    if (!secureEntered) return;
    setSecureEntered(false);
    if (serializeSegments(secureValue) !== serializeSegments(value)) setValueRef.current(secureValue);
  }, [secureEntered, secureValue, value]);

  const handleSecureToggle = useCallback(() => setSecureRevealed(prev => !prev), []);

  const hostActionList = useCallback((host: ActionListHost | null) => {
    actionListHostRef.current = host;
  }, []);

  const pickActionListItem = useCallback(
    (item: AiFieldInputActionListItem, trigger: SearchTrigger) => {
      item.onClick?.();
      editorRef.current?.insertChip(toChipSegment(item, trigger));
      onActionSelect?.(item, trigger);
    },
    [onActionSelect],
  );

  const openActionList = useCallback(
    (trigger: SearchTrigger) => {
      if (disabled || secure) return;

      if (isMobile) {
        const items = trigger === SEARCH_TRIGGER.Skill ? skills : mentions;
        if (!items) return;
        if (actionListHostRef.current) actionListHostRef.current.open(items, trigger);
        else setMobileSheetTrigger(trigger);
        return;
      }

      editorRef.current?.dismissSearch();
      setDetachedTrigger(trigger);
    },
    [disabled, secure, isMobile, skills, mentions],
  );
  const closeDetachedList = useCallback(() => setDetachedTrigger(null), []);
  const focusDetachedPanel = useCallback(() => searchListRef.current?.focus(), []);
  const closeMobileSheet = useCallback(() => setMobileSheetTrigger(null), []);
  const handleMobileSheetPick = useCallback(
    (item: AiFieldInputActionListItem) => {
      if (mobileSheetTrigger) pickActionListItem(item, mobileSheetTrigger);
    },
    [mobileSheetTrigger, pickActionListItem],
  );

  const contextValue = useMemo<AiFieldInputContextValue>(
    () => ({
      disabled,
      registerActionList,
      getActionList,
      getEditor,
      openActionList,
      hostActionList,
      pickActionListItem,
    }),
    [disabled, registerActionList, getActionList, getEditor, openActionList, hostActionList, pickActionListItem],
  );

  const sendState = send?.state ?? (isValueEmpty(effectiveValue) ? SEND_STATE.Disabled : SEND_STATE.Active);
  const resolvedSendState = disabled ? SEND_STATE.Disabled : sendState;

  const isBusy = resolvedSendState === SEND_STATE.Loading || resolvedSendState === SEND_STATE.Stop;

  const handleSubmit = useCallback(
    (current: AiFieldInputValue) => {
      if (disabled || isBusy || isValueEmpty(current)) return;
      onSubmit?.(current);
      // Следующий секрет начинается скрытым.
      if (secure) setSecureRevealed(false);
    },
    [disabled, isBusy, onSubmit, secure],
  );

  const handleSendClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      if (resolvedSendState === SEND_STATE.Active) handleSubmit(effectiveValue);
      send?.onClick?.(resolvedSendState, effectiveValue);
    },
    [send, resolvedSendState, handleSubmit, effectiveValue],
  );

  const search = useMemo(() => findSearchSegment(value), [value]);
  const listTrigger = search?.trigger ?? detachedTrigger;
  const searchItems = listTrigger === SEARCH_TRIGGER.Skill ? skills : mentions;
  const searchTriggers = useMemo(
    () =>
      isMobile || secure
        ? []
        : ([skills && SEARCH_TRIGGER.Skill, mentions && SEARCH_TRIGGER.Mention].filter(Boolean) as SearchTrigger[]),
    [isMobile, secure, skills, mentions],
  );
  const isActionListOpen = Boolean(listTrigger && searchItems) && !disabled && !secure;
  const isDetached = !search && Boolean(detachedTrigger);

  const handleActionSelect = useCallback(
    (item: AiFieldInputActionListItem) => {
      if (!listTrigger) return;
      if (search) {
        item.onClick?.();
        setValue(replaceSearchSegment(value, item, search.trigger));
        onActionSelect?.(item, search.trigger);
      } else {
        pickActionListItem(item, listTrigger);
        setDetachedTrigger(null);
      }
    },
    [listTrigger, search, value, setValue, onActionSelect, pickActionListItem],
  );

  useEffect(() => {
    if (!isDetached || !isActionListOpen) return;
    // Меню кнопки возвращает фокус своей кнопке через кадр (клик) или такт (клавиатура) — переводим его в список после обоих.
    let timer: ReturnType<typeof setTimeout> | undefined;
    const frame = requestAnimationFrame(() => {
      timer = setTimeout(() => searchListRef.current?.focus());
    });
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, [isDetached, isActionListOpen]);

  useEffect(() => {
    if (!isActionListOpen) return;

    const handleOutsideClick = (event: Event) => {
      const target = event.target as Node;
      if (searchListRef.current?.contains(target) || editorRef.current?.contains(target)) return;
      editorRef.current?.dismissSearch();
      if (detachedTrigger) {
        setDetachedTrigger(null);
        editorRef.current?.focus();
      }
    };

    document.addEventListener('click', handleOutsideClick, true);
    return () => document.removeEventListener('click', handleOutsideClick, true);
  }, [isActionListOpen, detachedTrigger]);

  const handleDetachedListKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.target !== event.currentTarget) return;
      const list = actionListRef.current;

      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        if (event.key === 'ArrowDown') list?.focusFirst();
        else list?.focusLast();
      } else if (event.key === 'Enter') {
        event.preventDefault();
        list?.selectFirst();
      } else if (event.key === 'Escape') {
        event.preventDefault();
        closeDetachedList();
        editorRef.current?.focus();
      }
    },
    [closeDetachedList],
  );

  const hasAttachments = Children.toArray(attachments).length > 0 && !disabled;
  const disclaimerContent = disclaimer === undefined ? t('disclaimer') : disclaimer;

  return (
    <AiFieldInputContext.Provider value={contextValue}>
      <div
        {...rest}
        className={cn(styles.root, className)}
        data-disabled={disabled || undefined}
        data-error={hasError || undefined}
        data-test-id={dataTestId}
      >
        {scrollButton && !isActionListOpen && <ScrollButton {...scrollButton} />}

        {banner && (
          <div className={styles.banner} data-hidden={isActionListOpen || undefined} data-test-id={TEST_IDS.banner}>
            {banner}
          </div>
        )}

        <div className={styles.fieldArea}>
          {isActionListOpen && listTrigger && searchItems && (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions -- панель только передаёт стрелки строкам списка внутри, своей роли у неё нет
            <div
              ref={searchListRef}
              className={styles.searchList}
              tabIndex={isDetached ? -1 : undefined}
              onKeyDown={isDetached ? handleDetachedListKeyDown : undefined}
            >
              <SearchActionList
                key={listTrigger}
                items={searchItems}
                query={search?.query ?? ''}
                detached={isDetached}
                onSelect={handleActionSelect}
                onClose={closeDetachedList}
                onLevelChange={isDetached ? focusDetachedPanel : undefined}
              />
            </div>
          )}

          <div className={styles.field} data-test-id={TEST_IDS.field}>
            {hasAttachments && <Attachments scrollStep={attachmentsScrollStep}>{attachments}</Attachments>}

            {secure ? (
              <SecureInput
                value={secureValue}
                onChange={setValue}
                onSubmit={handleSubmit}
                placeholder={placeholder}
                disabled={disabled}
                invalid={hasError}
                describedBy={hasError ? errorId : undefined}
                masked={!secureRevealed}
              />
            ) : (
              <Editor
                value={isSecretHidden ? EMPTY_VALUE : value}
                onChange={setValue}
                onSubmit={handleSubmit}
                placeholder={placeholder}
                searchPlaceholder={searchPlaceholder}
                searchTriggers={searchTriggers}
                disabled={disabled}
                invalid={hasError}
                describedBy={hasError ? errorId : undefined}
                handleRef={editorRef}
              />
            )}

            <div className={styles.footer} data-test-id={TEST_IDS.footer}>
              <div className={styles.footerLeft} data-test-id={TEST_IDS.footerLeft}>
                {secure && <SecureToggleButton revealed={secureRevealed} onToggle={handleSecureToggle} />}
                {footerLeftActions}
              </div>
              <div className={styles.footerRight}>
                <div className={styles.footerRightSlot} data-test-id={TEST_IDS.footerRight}>
                  {footerRightActions}
                </div>
                <AiFieldInputSendButton state={resolvedSendState} onClick={handleSendClick} />
              </div>
            </div>
          </div>
        </div>

        {isMobile && mobileSheetTrigger && (
          <MobileActionListSheet
            items={(mobileSheetTrigger === SEARCH_TRIGGER.Skill ? skills : mentions) ?? []}
            onPick={handleMobileSheetPick}
            onClose={closeMobileSheet}
          />
        )}

        {hasError && (
          <div id={errorId}>
            <Hint error={error} length={length} size={HINT_SIZE.S} data-test-id={TEST_IDS.error} />
          </div>
        )}

        <div className={styles.disclaimer} data-test-id={TEST_IDS.disclaimer}>
          {disclaimerContent}
        </div>
      </div>
    </AiFieldInputContext.Provider>
  );
}

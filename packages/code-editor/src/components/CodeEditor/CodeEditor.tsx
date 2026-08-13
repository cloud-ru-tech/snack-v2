import { Spinner } from '@ds/loader';
import { useThemeContext } from '@ds/theme';
import { Typography } from '@ds/typography';
import { CopyButton } from '@ds/uikit-product-copy';
import { extractSupportProps, isBrowser, useLayoutEffect, WithSupportProps } from '@ds/utils';
import { Editor, OnMount, useMonaco } from '@monaco-editor/react';
import cn from 'classnames';
import { useCallback, useId, useMemo, useRef, useState } from 'react';

import { CODE_EDITOR_OPTIONS, DEFAULT_THEME_OPTIONS, DEFAULT_THEME_VALUES, TEST_IDS } from '../../constants';
import { EditorBaseProps, EditorWithJsonSchemaProps } from '../../types';
import { hexWithAlpha, isDark, uppercaseFirstLetter } from '../../utils';
import { useApplyJsonSchema, useCalculatedThemeValues } from './hooks';
import styles from './styles.module.scss';

export type CodeEditorProps = WithSupportProps<{
  /** Используется как trigger в effect deps для перепересчёта theme tokens при смене темы. Уникальное значение на каждую тему. */
  themeName?: string;
  /** Включение/отключение псевдобекграунда. */
  background?: boolean;
  /** Включение/отключение шапки. */
  hasHeader?: boolean;
  /** Включение/отключение колонки с номерами строк. */
  showRowNumber?: boolean;
  /** Клик по кнопке копирования. */
  onCopyClick?(): void;
  /**
   * Имя зарегистрированной monaco-темы из глобального реестра
   * (`monaco.editor.defineTheme(name, …)`). По умолчанию подбирается
   * автоматически по DS-теме провайдера: `'snack'` для светлой, `'snackDark'`
   * для тёмной. Передавай вручную только если регистрируешь свою кастомную
   * тему — иначе оставляй `undefined`.
   */
  theme?: string;
}> &
  (EditorBaseProps | EditorWithJsonSchemaProps);

// monaco theme parser принимает только hex (#RRGGBB / #RRGGBBAA);
// rgba(...) он не понимает и подставляет fail-safe red. См. utils.hexWithAlpha.
const withAlpha = hexWithAlpha;

function CodeEditorClient({
  themeName,
  className,
  theme,
  options,
  loading,
  background = true,
  onMount,
  language,
  onCopyClick,
  hasHeader,
  showRowNumber = true,
  value,
  defaultValue,
  ...props
}: CodeEditorProps) {
  const monaco = useMonaco();
  // TODO(FF-8312): live theme switch без перезагрузки страницы. useThemeContext
  // отдаёт класс из стора провайдера, который в микрофронт-режиме обновляется
  // через явный re-publish от хост-приложения; в standalone (Storybook, docs) при
  // toggle темы CSS-классы DS-провайдера меняются на корне, но themeClassName
  // отсюда не пересчитывается — нужен либо MutationObserver на родительские
  // theme-классы, либо подписка на сам тогглер. Сейчас обходится reload'ом.
  const { themeClassName } = useThemeContext();
  const [wrapperElement, setWrapperElement] = useState<HTMLDivElement | null>(null);
  const setWrapperRef = useCallback((el: HTMLDivElement | null) => setWrapperElement(el), []);
  const instanceId = useId();
  const unmountedRef = useRef(false);

  const { jsonSchemaProps, jsonSchemaOptions } = useApplyJsonSchema(
    language,
    'jsonSchema' in props ? props.jsonSchema : undefined,
  );

  useLayoutEffect(
    () => () => {
      unmountedRef.current = true;
    },
    [],
  );

  const onEditorMount = useCallback<OnMount>(
    (editor, monacoInstance) => {
      if (monacoInstance && isBrowser()) {
        // document.fonts.ready resolves в произвольный момент; не вызываем
        // remeasureFonts, если редактор уже размонтирован — иначе монако
        // обращается к disposed editor instance.
        document?.fonts?.ready.then(() => {
          if (!unmountedRef.current) monacoInstance.editor.remeasureFonts();
        });
      }
      onMount?.(editor, monacoInstance);
    },
    [onMount],
  );

  const themeValues = useCalculatedThemeValues({
    themeName: themeName ?? themeClassName,
    stylesOriginNode: wrapperElement,
  });

  const themeDataWithoutBase = useMemo(
    () => ({
      // inherit=true — наследуем дефолты monaco (vs/vs-dark) под слоты,
      // которые не задаются явно (например, hint colors, error squiggles).
      // Иначе monaco подставляет жёсткие фолбэки, не вяжущиеся с темой DS.
      inherit: true,
      ...(themeValues?.palette
        ? {
            semanticTokenColors: {
              parameter: { foreground: themeValues.palette.violet },
              property: { foreground: themeValues.palette.blue },
              enumMember: { foreground: themeValues.palette.blue },
              variable: { foreground: themeValues.palette.red },
              'variable.constant': { foreground: themeValues.palette.orange },
              function: { foreground: themeValues.palette.blue },
              method: { foreground: themeValues.palette.blue },
              type: { foreground: themeValues.palette.yellow },
              class: { foreground: themeValues.palette.yellow },
            },
            rules: [
              { foreground: themeValues.palette.green, token: 'comment' },
              { foreground: themeValues.palette.green, token: 'string' },
              // JSON: keys — blue, values — green
              { foreground: themeValues.palette.blue, token: 'string.key.json' },
              { foreground: themeValues.palette.green, token: 'string.value.json' },
              { foreground: themeValues.palette.orange, token: 'number' },
              { foreground: themeValues.palette.violet, token: 'keyword' },
              { foreground: themeValues.palette.violet, token: 'keyword.json' },
              { foreground: themeValues.palette.blue, token: 'operator' },
              { foreground: themeValues.palette.red, token: 'variable' },
              { foreground: themeValues.palette.yellow, token: 'type' },
              { foreground: themeValues.palette.red, token: 'regexp' },
              { foreground: themeValues.palette.red, token: 'invalid' },
              { foreground: themeValues.text.main, token: 'delimiter' },
              { foreground: themeValues.text.main, token: 'delimiter.bracket' },
              { foreground: themeValues.text.main, token: 'identifier' },
              { foreground: themeValues.text.main, token: '' },
            ],
            colors: {
              focusBorder: '#00000000',
              'editor.background': '#00000000',
              'editor.foreground': themeValues.text.main,
              'editor.selectionBackground': themeValues.stateLayer.border,
              // inactive (на blur) — наследует тёмный дефолт vs; задаём явно
              // тот же stateLayer.border, чтобы blur не «темнил» выделение.
              'editor.inactiveSelectionBackground': themeValues.stateLayer.border,
              'editor.lineHighlightBackground': themeValues.stateLayer.filled,
              'editor.lineHighlightBorder': '#00000000',
              'editorCursor.foreground': themeValues.brand.accent,
              'editorWhitespace.foreground': themeValues.text.secondary,
              'scrollbarSlider.background': withAlpha(themeValues.text.main, 0.16),
              'scrollbarSlider.hoverBackground': withAlpha(themeValues.text.main, 0.28),
              'scrollbarSlider.activeBackground': withAlpha(themeValues.text.main, 0.4),
              'editorLineNumber.foreground': themeValues.text.secondary,
              'editorLineNumber.activeForeground': themeValues.text.main,
              // monaco red-rainbow bracket pair colorization → нейтрализуем
              // на theme-уровне (опция bracketPairColorization не всегда
              // отключает встроенные CSS-классы).
              'editorBracketHighlight.foreground1': themeValues.text.main,
              'editorBracketHighlight.foreground2': themeValues.text.main,
              'editorBracketHighlight.foreground3': themeValues.text.main,
              'editorBracketHighlight.foreground4': themeValues.text.main,
              'editorBracketHighlight.foreground5': themeValues.text.main,
              'editorBracketHighlight.foreground6': themeValues.text.main,
              'editorBracketHighlight.unexpectedBracket.foreground': themeValues.palette.red,
            },
          }
        : DEFAULT_THEME_VALUES),
    }),
    [themeValues],
  );

  const dark = useMemo(() => {
    const bg = themeValues?.bg;
    return bg ? isDark(bg) : false;
  }, [themeValues?.bg]);

  // defineTheme writes to monaco's global theme registry. Run via layoutEffect
  // so the theme is registered before <Editor theme=... /> mounts (avoid FOUC),
  // then re-register whenever the computed token values change.
  useLayoutEffect(() => {
    if (!monaco) return;
    monaco.editor.defineTheme('snackDark', { ...themeDataWithoutBase, base: 'vs-dark' });
    monaco.editor.defineTheme('snack', { ...themeDataWithoutBase, base: 'vs' });
  }, [monaco, themeDataWithoutBase]);

  const mergedOptions = useMemo(
    () => ({
      ...CODE_EDITOR_OPTIONS,
      ...jsonSchemaOptions,
      ...(themeValues?.mono
        ? {
            fontSize: Number.parseFloat(themeValues.mono.body.s['font-size']),
            fontWeight: themeValues.mono.body.s['font-weight'],
            fontFamily: themeValues.mono.body.s['font-family'],
          }
        : DEFAULT_THEME_OPTIONS.mono.s),
      ...options,
      lineNumbers: showRowNumber ? ('on' as const) : ('off' as const),
      lineDecorationsWidth: showRowNumber ? CODE_EDITOR_OPTIONS.lineDecorationsWidth : 0,
      lineNumbersMinChars: showRowNumber ? CODE_EDITOR_OPTIONS.lineNumbersMinChars : 0,
    }),
    [options, themeValues?.mono, jsonSchemaOptions, showRowNumber],
  );

  const isLoading = loading === true;

  return (
    <div
      className={cn(styles.root, className)}
      data-background={background ? 'true' : undefined}
      data-has-header={hasHeader ? 'true' : undefined}
      data-loading={isLoading ? 'true' : undefined}
      data-language={language || undefined}
      data-test-id={TEST_IDS.root}
      {...extractSupportProps(props)}
      ref={setWrapperRef}
    >
      {hasHeader && (
        <div className={styles.header} data-test-id={TEST_IDS.header}>
          {language && (
            <Typography variant='label' size='s' className={styles.language} data-test-id={TEST_IDS.language}>
              {uppercaseFirstLetter(language)}
            </Typography>
          )}
          <CopyButton
            valueToCopy={value ?? defaultValue ?? ''}
            size='s'
            onClick={onCopyClick}
            data-test-id={TEST_IDS.copyButton}
          />
        </div>
      )}
      {isLoading ? (
        <div className={styles.loadingOverlay} data-test-id={TEST_IDS.loading}>
          <Spinner />
        </div>
      ) : (
        // Собственный flex-обёрточный div: @monaco-editor/react рендерит вокруг
        // редактора <section style="height: 100%">, и эта `height: 100%`
        // считается от ближайшего элемента с определённой высотой. Если бы
        // section жил прямо в .root, его «100%» равнялось бы полной высоте
        // root'а — и при toggle `hasHeader` редактор бы оверфлоил вниз
        // (header добавляется сверху, section не сжимается). Прокладка с
        // `flex: 1; min-height: 0` корректно отдаёт section ровно оставшееся
        // место в flex-колонке и позволяет automaticLayout пересчитать монако.
        <div className={styles.editorWrap}>
          <Editor
            {...jsonSchemaProps}
            {...props}
            // Без явного path Monaco генерит инкрементный inmemory:/model/N
            // на каждое создание модели — при повторных mount/unmount компонента
            // (например, при toggle hasHeader через decorator) копии моделей
            // остаются в глобальном реестре monaco. Стабильный path по language
            // гарантирует одну модель на язык в рамках инстанса страницы.
            path={
              jsonSchemaProps.path ?? (language ? `inmemory://ds-code-editor/${instanceId}/${language}` : undefined)
            }
            value={value}
            defaultValue={defaultValue}
            theme={theme ?? (dark ? 'snackDark' : 'snack')}
            className={styles.editor}
            // Boolean `loading` управляется нашим overlay'ем — Monaco-prop принимает только ReactNode/undefined.
            loading={typeof loading === 'boolean' ? <Spinner /> : (loading ?? <Spinner />)}
            options={mergedOptions}
            onMount={onEditorMount}
            language={language}
          />
        </div>
      )}
    </div>
  );
}

export function CodeEditor(props: CodeEditorProps) {
  // monaco-editor обращается к `window` / `document.fonts` на module-init и
  // спавнит web-workers, поэтому на SSR падает. Внешний компонент — без хуков:
  // на сервере рендерим placeholder-шейп (root-div с теми же data-*-атрибутами,
  // чтобы layout не прыгал при гидрации); на клиенте делегируем в подкомпонент,
  // где живут все хуки monaco.
  if (!isBrowser()) {
    const { className, background = true, hasHeader, language } = props;
    return (
      <div
        className={cn(styles.root, className)}
        data-background={background ? 'true' : undefined}
        data-has-header={hasHeader ? 'true' : undefined}
        data-language={language || undefined}
        data-test-id={TEST_IDS.root}
        {...extractSupportProps(props as unknown as Record<string, unknown>)}
      />
    );
  }
  return <CodeEditorClient {...props} />;
}

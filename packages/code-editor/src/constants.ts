export const TEST_IDS = {
  root: 'code-editor',
  header: 'code-editor__header',
  language: 'code-editor__language',
  copyButton: 'code-editor__copy-button',
  loading: 'code-editor__loading',
} as const;

export const DEFAULT_SCHEMA_URI = 'schema://editor-schema';

export const DEFAULT_THEME_VALUES = {
  semanticTokenColors: {
    enumMember: { foreground: '#6b9fe3' },
    'variable.constant': { foreground: '#a2532f' },
    'variable.defaultLibrary': { foreground: '#80461b' },
  },
  rules: [
    { foreground: '#898989', token: 'comment' },
    { foreground: '#335747', token: 'string' },
    { foreground: '#80461b', token: 'constant' },
    { foreground: '#3280e8', token: 'keyword' },
  ],
  colors: {
    'editor.background': '#00000000',
    'editor.foreground': '#333333',
    'editor.selectionBackground': '#decdfb',
    'editor.lineHighlightBackground': '#decdfb',
    'editorCursor.foreground': '#794ed3',
    'editorWhitespace.foreground': '#dedede',
    'scrollbarSlider.background': '#75757552',
    'scrollbarSlider.hoverBackground': '#7575757B',
    'scrollbarSlider.activeBackground': '#757575A4',
    'editorLineNumber.foreground': '#333333',
    'editorLineNumber.activeForeground': '#898989',
  },
};

export const DEFAULT_THEME_OPTIONS = {
  mono: {
    s: {
      fontWeight: '400',
      fontSize: 12,
      fontFamily: 'SB Sans Text Mono',
    },
  },
};

// THEME_VARS — CSS-переменные, считываемые в рантайме через getComputedStyle
// корневого узла редактора.
//
//   palette.{red,orange,yellow,green,blue,violet} — 6 цветов подсветки синтаксиса
//   text.main          — основной текст (variable, brackets)
//   text.secondary     — приглушённый текст (line numbers, comments)
//   bg                 — фон редактора (--sn-theme-color-neutral-background)
//   stateLayer.filled  — фон активной строки editor.lineHighlightBackground
//   stateLayer.border  — фон выделения editor.selectionBackground
export const THEME_VARS = {
  bg: '--sn-theme-color-neutral-background',
  text: {
    main: '--sn-theme-color-available-version-textMain',
    secondary: '--sn-theme-color-available-version-textTertiary',
  },
  stateLayer: {
    filled: '--sn-theme-color-material-stateLayer-onColor-default-filled',
    border: '--sn-theme-color-material-stateLayer-regular-default-borderColor',
  },
  palette: {
    red: '--sn-theme-color-red-text',
    orange: '--sn-theme-color-orange-text',
    yellow: '--sn-theme-color-yellow-text',
    green: '--sn-theme-color-green-text',
    blue: '--sn-theme-color-blue-text',
    violet: '--sn-theme-color-violet-text',
  },
  brand: {
    accent: '--sn-theme-color-primary-accent',
  },
  mono: {
    body: {
      s: {
        'font-weight': '--sn-mono-body-s-fontWeight',
        'font-size': '--sn-mono-body-s-fontSize',
        'font-family': '--sn-mono-body-s-fontFamily',
      },
    },
  },
};

export const CODE_EDITOR_OPTIONS = {
  // Monaco не пересчитывает layout при изменении размеров контейнера
  // (например, при toggle hasHeader, который добавляет/убирает шапку и
  // меняет высоту области редактора). automaticLayout вешает ResizeObserver
  // и вызывает editor.layout() автоматически.
  automaticLayout: true,
  minimap: {
    enabled: false,
  },
  padding: {
    top: 4,
    bottom: 4,
  },
  tabSize: 4,
  scrollBeyondLastLine: false,
  fixedOverflowWidgets: true,
  lineDecorationsWidth: 4,
  lineNumbersMinChars: 2,
  scrollbar: {
    verticalScrollbarSize: 8,
    horizontalScrollbarSize: 8,
    useShadows: false,
  },
  contextmenu: false,
  guides: {
    indentation: false,
  },
  // monaco по умолчанию красит парные скобки rainbow-цветами. В DS-теме
  // скобки должны быть нейтральными — отключаем встроенную раскраску.
  bracketPairColorization: {
    enabled: false,
  },
  // sticky-scroll рендерит pinned parent-scope при прокрутке. У нас
  // editor.background = #00000000 (фон даёт .root), и monaco не закрашивает
  // gutter внутри sticky-widget через theme-токены — pinned-строки получают
  // прозрачный gutter, через который просвечивает обычный код. Для embedded-
  // редактора в DS фичу выключаем целиком.
  stickyScroll: {
    enabled: false,
  },
};

export const YAML_CODE_EDITOR_OPTIONS = {
  quickSuggestions: {
    strings: true,
  },
};

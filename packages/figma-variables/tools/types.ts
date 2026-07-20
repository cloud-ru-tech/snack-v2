// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyRecord = Record<string, any>;

type FormatType = 'css' | 'scss' | 'ts';

export type ValidateMode = 'strict' | 'warning' | 'off';

export type LogLevel = 'error' | 'warning' | 'info' | 'debug';

export type BaseConfig = {
  formats: FormatType[];
  cssModules: boolean;
  scssModules: boolean;
  cssClassPrefix: string;
  validate: ValidateMode;
  logLevel: LogLevel;
  /**
   * Группы токенов, которые должны быть исключены из сборки
   * Например: ['06_languageMode', '07_acrylicMode']
   */
  excludeGroups?: string[];
  /**
   * Путь к файлу для сохранения логов
   * Если указан, логи будут сохраняться в этот файл в дополнение к выводу в консоль
   */
  logFile?: string;
  /**
   * Включать ли вычисленные fallback значения в цепочки зависимостей
   * Если true, будет генерироваться: var(--var1, var(--var2, computedValue))
   * Если false, будет генерироваться: var(--var1, var(--var2))
   * По умолчанию: true
   */
  includeFallbackValues?: boolean;
};

export type NodeConfig = {
  input: string;
  output: string;
  watch: boolean;
} & BaseConfig;

export type BrowserConfig = {
  tokens: Record<string, AnyRecord>;
} & BaseConfig;

export type BuildResult = {
  css: Record<string, string>;
  scss: Record<string, string>;
  ts: Record<string, string>;
  errors?: string[];
  warnings?: string[];
};

export type TokenSet = {
  group: string;
  name: string;
  path: string;
  filePath?: string;
  content?: AnyRecord;
};

export enum TransformName {
  CustomPx = 'custom/px',
  CustomCssVariable = 'custom/css/variable',
}

export enum FormatName {
  CSSBaseStyles = 'custom/css/base',
  CSSFigmaStyles = 'custom/css/figma',
  CSSComponent = 'custom/css/component',
  SCSSBaseStyles = 'custom/scss/base',
  SCSSComponent = 'custom/scss/component',
  TSBaseStyles = 'custom/ts/base',
}

export enum ValueFormat {
  Original = 'Original',
  CSSVar = 'CSSVar',
}

export enum FilterName {
  SourceTokens = 'source-tokens',
  GroupFilter = 'group-filter',
  ExcludeGroups = 'exclude-groups',
}

export enum CompositeToken {
  BoxShadow = 'boxShadow',
  Typography = 'typography',
  Composition = 'composition',
}

export const BOX_SHADOW_CSS_PROP = CompositeToken.BoxShadow;

export const AUTO_GENERATED_COMMENT = `/**
 * Do not edit directly, this file was auto-generated.
 */`;

export const VARIABLES_WITHOUT_PX = ['font-weight', 'opacity', 'background-opacity'];

/**
 * Подстроки в имени переменной (kebab-case), указывающие на токен opacity в формате Figma (0–100%).
 * При генерации CSS/SCSS значения приводятся к диапазону 0–1.
 */
export const OPACITY_VARIABLE_SUBSTRINGS = ['opacity'] as const;

export function isOpacityVariable(kebabVariableName: string): boolean {
  return OPACITY_VARIABLE_SUBSTRINGS.some(sub => kebabVariableName.includes(sub));
}

export const BASE_INDENT = '  ';

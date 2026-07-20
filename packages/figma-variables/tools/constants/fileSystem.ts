export const FILE_EXTENSIONS = {
  JSON: '.json',
  CSS: '.css',
  SCSS: '.scss',
  TS: '.ts',
} as const;

export const SPECIAL_FILES = {
  METADATA: '$metadata.json',
  THEMES: '$themes.json',
} as const;

export const SPECIAL_PREFIXES = {
  SYSTEM_FILE: '$',
} as const;

export const BUILD_DIRECTORIES = {
  CSS: 'css',
  SCSS: 'scss',
  TS: 'ts',
} as const;

export const MODULE_SUFFIXES = {
  CSS: '.module.css',
  SCSS: '.module.scss',
} as const;

export type FileExtension = (typeof FILE_EXTENSIONS)[keyof typeof FILE_EXTENSIONS];
export type BuildDirectory = (typeof BUILD_DIRECTORIES)[keyof typeof BUILD_DIRECTORIES];

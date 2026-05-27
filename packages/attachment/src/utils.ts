import { IconPredefinedProps, SIZE as IP_SIZE } from '@ds/icon-predefined';

import { Size } from './types';

export const EMBLEM_ICON_SIZE: Record<Size, IconPredefinedProps['size']> = {
  s: IP_SIZE.M,
  m: IP_SIZE.L,
};

export function getBaseFileName(fileName?: string) {
  if (!fileName) {
    return fileName;
  }

  const parts = fileName.split('.');
  parts.pop();

  // Файлы без имени (.bashrc, .gitignore) — возвращаем исходное имя.
  if (parts.length === 1 && parts[0] === '') return fileName;

  return parts.join('.');
}

export function getFileExtension(fileName?: string) {
  return fileName?.split('.').pop()?.toLocaleUpperCase();
}

export function isFileImage(file: File) {
  return Boolean(file.type.match(/image\/(png|jpg|jpeg|gif|webp|bmp|svg)/i));
}

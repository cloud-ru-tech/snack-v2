import { FileSizeUnits, UploadFilesAcceptItem } from './types';

function getFileExtension(fileName?: string) {
  return fileName?.split('.').pop()?.toUpperCase();
}

/**
 * Подбирает иконку для файла по его расширению из списка accept.
 * Возвращает undefined, если расширение не описано — тогда Attachment
 * использует свою дефолтную иконку.
 */
export function resolveFileIcon(
  file: File,
  accept: UploadFilesAcceptItem[],
): UploadFilesAcceptItem['icon'] | undefined {
  const extension = getFileExtension(file.name);

  if (!extension) {
    return undefined;
  }

  const match = accept.find(item => item.extention.replace(/^\./, '').toUpperCase() === extension);

  return match?.icon;
}

export function makeId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `upload-file-${crypto.randomUUID()}`;
  }

  return `upload-file-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/**
 * Объединяет значения в перечисление: разделитель «, » между элементами,
 * а последние два соединяются союзом (`PDF, TXT и DOCX`).
 */
export function joinWithConjunction(parts: string[], conjunction: string): string {
  if (parts.length <= 1) {
    return parts.join('');
  }

  const head = parts.slice(0, -1).join(', ');
  const last = parts[parts.length - 1];

  return `${head} ${conjunction} ${last}`;
}

export function formatFileSize(bytes: number, units: FileSizeUnits): string {
  if (bytes < 1024) {
    return `${bytes} ${units.b}`;
  }

  if (bytes < 1024 * 1024) {
    const kb = bytes / 1024;
    const rounded = kb >= 10 ? Math.round(kb) : Math.round(kb * 10) / 10;

    return `${rounded} ${units.kb}`;
  }

  if (bytes < 1024 * 1024 * 1024) {
    const mb = bytes / (1024 * 1024);
    const rounded = mb >= 10 ? Math.round(mb) : Math.round(mb * 10) / 10;

    return `${rounded} ${units.mb}`;
  }

  const gb = bytes / (1024 * 1024 * 1024);
  const rounded = gb >= 10 ? Math.round(gb) : Math.round(gb * 10) / 10;

  return `${rounded} ${units.gb}`;
}

export function formatFileDescription(file: File, units: FileSizeUnits, descriptionOverride?: string): string {
  if (descriptionOverride) {
    return descriptionOverride;
  }

  const extension = getFileExtension(file.name) ?? '';
  const size = formatFileSize(file.size, units);

  return extension ? `${extension}, ${size}` : size;
}

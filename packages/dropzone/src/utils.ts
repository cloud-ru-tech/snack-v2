export const FILE_REJECTION_REASON = {
  MaxSize: 'maxSize',
  Mime: 'mime',
} as const;

export type FileRejectionReason = (typeof FILE_REJECTION_REASON)[keyof typeof FILE_REJECTION_REASON];

export type FileRejection = {
  file: File;
  reason: FileRejectionReason;
};

export type AcceptInput = string | string[] | undefined;

/**
 * Нормализует значение `accept` в массив отдельных токенов
 * (MIME-типы вида `image/png`, MIME-шаблоны `image/*`, расширения `.pdf`).
 * Принимает строку с запятыми (как в нативном HTML-атрибуте), массив или undefined.
 */
export function normalizeAccept(accept: AcceptInput): string[] {
  if (!accept) return [];
  const list = Array.isArray(accept) ? accept : accept.split(',');
  return list.map(token => token.trim().toLowerCase()).filter(Boolean);
}

/**
 * Преобразует нормализованный `accept` в строку для нативного `<input accept>`
 * (через запятую). Возвращает undefined, если список пуст — чтобы не задавать
 * атрибут в DOM и не ограничивать picker.
 */
export function buildAcceptAttribute(accept: AcceptInput): string | undefined {
  const tokens = normalizeAccept(accept);
  return tokens.length ? tokens.join(',') : undefined;
}

function fileMatchesAccept(file: File, acceptTokens: string[]): boolean {
  if (!acceptTokens.length) return true;
  const fileType = (file.type || '').toLowerCase();
  const fileName = (file.name || '').toLowerCase();

  return acceptTokens.some(token => {
    if (token.startsWith('.')) {
      return fileName.endsWith(token);
    }
    if (token.endsWith('/*')) {
      const prefix = token.slice(0, -1);
      return fileType.startsWith(prefix);
    }
    return fileType === token;
  });
}

export type PartitionOptions = {
  maxSize?: number;
  accept?: AcceptInput;
};

export type PartitionResult = {
  accepted: File[];
  rejected: FileRejection[];
};

/**
 * Разделяет список файлов на принятые и отклонённые согласно ограничениям
 * `maxSize` (байты) и `accept` (MIME-типы / шаблоны / расширения).
 * Размер проверяется раньше MIME: файл, превысивший лимит, отклоняется с
 * причиной `maxSize`, даже если его MIME не совпадает с `accept`.
 */
export function partitionFiles(files: File[], options: PartitionOptions): PartitionResult {
  const { maxSize, accept } = options;
  const acceptTokens = normalizeAccept(accept);

  const accepted: File[] = [];
  const rejected: FileRejection[] = [];

  for (const file of files) {
    if (typeof maxSize === 'number' && file.size > maxSize) {
      rejected.push({ file, reason: FILE_REJECTION_REASON.MaxSize });
      continue;
    }
    if (!fileMatchesAccept(file, acceptTokens)) {
      rejected.push({ file, reason: FILE_REJECTION_REASON.Mime });
      continue;
    }
    accepted.push(file);
  }

  return { accepted, rejected };
}

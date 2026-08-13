import {
  DEFAULT_ACCEPT,
  DEFAULT_MAX_FILES,
  DEFAULT_MAX_SIZE,
  UPLOAD_STATUS,
  UploadFileItem,
  UploadFilesAcceptItem,
} from '@ds/uikit-product-upload-files';
import { useEffect, useState } from 'react';

import pictureUrl from './assets/picture.jpg?url';

export const mockUpload = async (file: File) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return { id: file.name, url: `https://example.com/${file.name}` };
};

export function createMockFile(name: string, sizeBytes = 1024, type = 'application/pdf'): File {
  const content = new Uint8Array(sizeBytes);
  return new File([content], name, { type });
}

export function createMockItem(name: string, overrides: Partial<UploadFileItem> = {}): UploadFileItem {
  return {
    id: `mock-${name}`,
    file: createMockFile(name),
    status: UPLOAD_STATUS.Success,
    ...overrides,
  };
}

export const VALID_ITEMS: UploadFileItem[] = [
  createMockItem('Файл_1.pdf'),
  createMockItem('Файл_2.pdf'),
  createMockItem('Файл_3.pdf'),
];

const JPG_ITEM_SIZE = 3.1 * 1024 * 1024;

/**
 * Настоящий JPEG для превью вложения: `createMockFile` отдаёт нулевые байты, и
 * `Attachment` рисует по такому файлу битую картинку. Хвост нулей добивает файл
 * до размера, который показывает матрица.
 */
export function useSampleImageFile(): File | undefined {
  const [file, setFile] = useState<File>();

  useEffect(() => {
    let cancelled = false;

    fetch(pictureUrl)
      .then(response => response.blob())
      .then(blob => {
        if (cancelled) return;
        const padding = new Uint8Array(Math.max(0, JPG_ITEM_SIZE - blob.size));
        setFile(new File([blob, padding], 'Файл_1.jpg', { type: 'image/jpeg' }));
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return file;
}

export function createFormatErrorItem(file: File): UploadFileItem {
  return createMockItem('Файл_1.jpg', {
    status: UPLOAD_STATUS.Error,
    error: 'Поддерживаются только PDF и TXT',
    file,
  });
}

export const SIZE_ERROR_ITEM = createMockItem('Файл_1.pdf', {
  status: UPLOAD_STATUS.Error,
  error: 'Размер файла превышает 5 Мб',
  file: createMockFile('Файл_1.pdf', 6 * 1024 * 1024),
});

export const LIMIT_ITEMS: UploadFileItem[] = [
  createMockItem('Файл_1.pdf', { file: createMockFile('Файл_1.pdf', 3.1 * 1024 * 1024) }),
  createMockItem('Файл_2.txt', { file: createMockFile('Файл_2.txt', 2.3 * 1024 * 1024, 'text/plain') }),
  createMockItem('Файл_3.pdf'),
  createMockItem('Файл_4.pdf'),
];

export const STORY_DEFAULTS = {
  label: 'Label text',
  hint: 'Подсказка к полю загрузки файлов',
  accept: DEFAULT_ACCEPT,
  maxFiles: DEFAULT_MAX_FILES,
  maxSize: DEFAULT_MAX_SIZE,
  upload: mockUpload,
} as const;

/** Ограниченный accept для сценариев валидации формата (дефолт — любые файлы). */
export const PDF_TXT_ACCEPT: UploadFilesAcceptItem[] = [
  { extention: '.pdf', displayExtension: 'PDF' },
  { extention: '.txt', displayExtension: 'TXT' },
];

export type ValidationScenario = 'valid' | 'errorRequired' | 'errorFileFormat' | 'errorFileSize' | 'errorFileLimit';

export function getScenarioProps(scenario: ValidationScenario, imageFile?: File) {
  switch (scenario) {
    case 'valid':
      return { value: VALID_ITEMS };
    case 'errorRequired':
      return { value: [], error: 'Обязательное поле' };
    case 'errorFileFormat':
      return {
        value: [
          createFormatErrorItem(imageFile ?? createMockFile('Файл_1.jpg', JPG_ITEM_SIZE, 'image/jpeg')),
          createMockItem('Файл_2.txt', { file: createMockFile('Файл_2.txt', 2.3 * 1024 * 1024, 'text/plain') }),
          createMockItem('Файл_3.pdf', { file: createMockFile('Файл_3.pdf', 1.2 * 1024 * 1024) }),
        ],
      };
    case 'errorFileSize':
      return {
        value: [
          SIZE_ERROR_ITEM,
          createMockItem('Файл_2.pdf', { file: createMockFile('Файл_2.pdf', 2.3 * 1024 * 1024) }),
        ],
      };
    case 'errorFileLimit':
      return { value: LIMIT_ITEMS };
    default:
      return {};
  }
}

export const VALIDATION_SCENARIOS: { key: ValidationScenario; label: string }[] = [
  { key: 'valid', label: 'valid' },
  { key: 'errorRequired', label: 'errorRequired' },
  { key: 'errorFileFormat', label: 'errorFileFormat' },
  { key: 'errorFileSize', label: 'errorFileSize' },
  { key: 'errorFileLimit', label: 'errorFileLimit' },
];

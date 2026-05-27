import { useEffect, useState } from 'react';

import picture from '../demos/examples/picture.jpg';

// Astro globals типизируют `*.jpg` как `ImageMetadata`, но в Storybook (vite) импорт
// возвращает строку с URL. Берём `.src` если рантайм пришёл из Astro, иначе сам импорт.
const pictureUrl: string = typeof picture === 'string' ? picture : picture.src;

export const SAMPLE_TEXT_FILE = new File(['hello world'], 'document.pdf', { type: 'application/pdf' });

export function useSampleImageFile(): File | undefined {
  const [file, setFile] = useState<File>();

  useEffect(() => {
    let cancelled = false;
    fetch(pictureUrl)
      .then(r => r.blob())
      .then(blob => {
        if (!cancelled) setFile(new File([blob], 'picture.jpg', { type: 'image/jpg' }));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return file;
}

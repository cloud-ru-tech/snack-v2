import { useEffect, useState } from 'react';

import pictureUrl from '../demos/examples/picture.jpg?url';

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

import { useEffect, useState } from 'react';

import { isFileImage } from './utils';

export function useImage(file?: File) {
  const [imageData, setImageData] = useState<string | undefined>(undefined);
  const [loading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!file || !isFileImage(file)) {
      setImageData(undefined);
      return undefined;
    }

    const reader = new FileReader();
    let aborted = false;

    reader.onloadstart = () => {
      if (!aborted) setIsLoading(true);
    };

    reader.onloadend = () => {
      if (aborted) return;
      setIsLoading(false);
      const { result } = reader;
      if (result) setImageData(result.toString());
    };

    reader.readAsDataURL(file);

    return () => {
      aborted = true;
      if (reader.readyState === FileReader.LOADING) {
        reader.abort();
      }
    };
  }, [file]);

  return { imageData, loading };
}

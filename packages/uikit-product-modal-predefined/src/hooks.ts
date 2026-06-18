import { useCallback, useState } from 'react';

type TextFieldValidationParams = {
  target?: string;
  errorText: string;
};

export function useTextFieldValidation({ target, errorText }: TextFieldValidationParams) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleChange = useCallback(
    (nextValue: string) => {
      setValue(nextValue);

      if (target === nextValue) {
        setError('');
      }
    },
    [target],
  );

  const reset = useCallback(() => {
    setValue('');
    setError('');
  }, []);

  const validate = useCallback(() => {
    if (!target || target === value) {
      setError('');
      return true;
    }

    setError(errorText);
    return false;
  }, [errorText, target, value]);

  return { value, error, handleChange, reset, validate };
}

type ReleaseNotesNavigationParams = {
  onClose(): void;
  onReadLaterClick?(): void;
  onSlideChange?(slide: number): void;
};

export function useReleaseNotesNavigation({ onClose, onReadLaterClick, onSlideChange }: ReleaseNotesNavigationParams) {
  const [pageIndex, setPageIndex] = useState(0);

  const setPage = useCallback(
    (nextPage: number) => {
      setPageIndex(nextPage);
      onSlideChange?.(nextPage);
    },
    [onSlideChange],
  );

  const handleClose = useCallback(() => {
    setPageIndex(0);
    onClose();
  }, [onClose]);

  const handleReadLaterClick = useCallback(() => {
    setPageIndex(0);
    onReadLaterClick?.();
    onClose();
  }, [onClose, onReadLaterClick]);

  const handleNextPageClick = useCallback(
    (totalPages: number) => {
      setPage(Math.min(totalPages - 1, pageIndex + 1));
    },
    [pageIndex, setPage],
  );

  const handlePrevPageClick = useCallback(() => {
    setPage(Math.max(0, pageIndex - 1));
  }, [pageIndex, setPage]);

  return {
    pageIndex,
    readablePageNumber: pageIndex + 1,
    setPage,
    handleClose,
    handleReadLaterClick,
    handleNextPageClick,
    handlePrevPageClick,
  };
}

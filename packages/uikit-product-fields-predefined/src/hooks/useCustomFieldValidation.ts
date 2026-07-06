import { useCallback } from 'react';
import { AnySchema, ValidationError } from 'yup';

export type UseFieldValidationProps = {
  schema: AnySchema;
};

export const useCustomFieldValidation = ({ schema }: UseFieldValidationProps) => {
  const validate = useCallback(
    (value: string) => {
      try {
        schema.validateSync(value);
        return { error: null };
      } catch (err: unknown) {
        if (err instanceof ValidationError) {
          return { error: err };
        }
        return { error: null };
      }
    },
    [schema],
  );

  const validateRHF = useCallback(
    (value: string) => {
      try {
        schema.validateSync(value);
        return true;
      } catch (err: unknown) {
        if (err instanceof ValidationError) return err.message;
        return;
      }
    },
    [schema],
  );

  return { validate, validateRHF };
};

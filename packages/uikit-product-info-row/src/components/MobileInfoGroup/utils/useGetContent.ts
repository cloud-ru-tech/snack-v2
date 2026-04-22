import { isArray, isBoolean, isNil, isObject, isString } from '../../InfoGroup/utils/typeGuards';
import { DataType } from '../../InfoRow';
import { NO_DATA_PLACEHOLDER } from '../../InfoRow/constants';
import { MobileInfoGroupItem, MobileInfoGroupProps } from '../types';

type Props<T extends DataType> = Pick<MobileInfoGroupProps<T>, 'data'> &
  Pick<MobileInfoGroupItem<T>, 'accessorKey' | 'render'>;

const defaultFormatBoolean = (value: boolean) => (value ? 'Да' : 'Нет');

export function useGetContent(options?: { formatBoolean?: (value: boolean) => string }) {
  const formatBoolean = options?.formatBoolean ?? defaultFormatBoolean;

  return function getContent<T extends DataType>({ data, accessorKey, render }: Props<T>) {
    if (!data) {
      return NO_DATA_PLACEHOLDER;
    }

    const value = accessorKey ? data[accessorKey] : undefined;

    if (!isNil(value)) {
      if (isBoolean(value)) {
        return formatBoolean(value);
      }

      if (isString(value)) {
        return value ? value : NO_DATA_PLACEHOLDER;
      }

      if (isArray(value)) {
        return value.length ? value.join(', ') : NO_DATA_PLACEHOLDER;
      }

      if (isObject(value)) {
        return Object.keys(value).length ? JSON.stringify(value) : NO_DATA_PLACEHOLDER;
      }

      return String(value);
    }

    if (render) {
      return render(data, NO_DATA_PLACEHOLDER);
    }

    return NO_DATA_PLACEHOLDER;
  };
}

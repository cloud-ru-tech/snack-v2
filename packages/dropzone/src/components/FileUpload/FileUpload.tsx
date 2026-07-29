import { extractDataTestProps, WithSupportProps } from '@ds/utils';
import {
  ChangeEvent,
  ChangeEventHandler,
  cloneElement,
  InputHTMLAttributes,
  MouseEvent,
  MouseEventHandler,
  MutableRefObject,
  ReactElement,
  Ref,
  useRef,
} from 'react';

import { TEST_IDS, UPLOAD_MODE } from '../../constants';
import { UploadMode } from '../../types';
import { AcceptInput, buildAcceptAttribute, FileRejection, partitionFiles } from '../../utils';
import styles from './styles.module.scss';

/**
 * Нативные атрибуты `<input type="file">`, проксируемые на скрытый input:
 * `name`, `id`, `required`, `capture`, `form`, `onBlur` и т.п. — всё, что нужно
 * для работы в HTML-форме и интеграции с react-hook-form (`{...register(name)}`).
 * Управляемые самим компонентом поля исключены.
 */
type NativeInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'accept' | 'multiple' | 'disabled' | 'value' | 'defaultValue' | 'onChange' | 'children'
>;

export type FileUploadProps = WithSupportProps<
  {
    /** Триггер открытия диалога выбора файлов (кнопка / лейбл). Клонируется, к нему добавляется `onClick`. */
    children: ReactElement;
    /** Колбек с принятыми файлами (прошедшими проверку `maxSize` и `accept`). */
    onFilesUpload(files: File[]): void;
    /**
     * Колбек с отклонёнными файлами и причиной отказа (`maxSize` / `mime`).
     * Вызывается только когда задан `maxSize` и/или `accept` и есть отклонённые файлы.
     */
    onFilesReject?(rejections: FileRejection[]): void;
    /**
     * Нативный `onChange` скрытого input. Вызывается до валидации с исходным событием —
     * точка интеграции с react-hook-form и другими form-библиотеками.
     */
    onChange?: ChangeEventHandler<HTMLInputElement>;
    /**
     * Режим выбора файлов
     * @default multiple
     */
    mode?: UploadMode;
    /**
     * Разрешённые типы файлов: MIME-тип (`image/png`), шаблон (`image/*`) или расширение (`.pdf`).
     * Строка (через запятую, как нативный `accept`) или массив. Задаёт нативный `accept` и валидацию.
     */
    accept?: AcceptInput;
    /** Максимальный размер одного файла в байтах. Превысившие уходят в `onFilesReject`. */
    maxSize?: number;
    /** Деактивирует триггер и input. */
    disabled?: boolean;
    /** Ссылка на нативный `<input type="file">` — для интеграции с формами (react-hook-form `ref`). */
    innerRef?: Ref<HTMLInputElement>;
  } & NativeInputProps
>;

// eslint-disable-next-line ds/require-inner-ref-support -- innerRef ведёт на скрытый <input type="file">, а не на корень: маркер соврал бы поповеру.
export function FileUpload({
  mode = UPLOAD_MODE.Multiple,
  onFilesUpload,
  onFilesReject,
  onChange,
  accept,
  maxSize,
  disabled = false,
  innerRef,
  children,
  ...rest
}: FileUploadProps) {
  const hiddenFileInput = useRef<HTMLInputElement | null>(null);

  const setInputRef = (node: HTMLInputElement | null) => {
    hiddenFileInput.current = node;
    if (typeof innerRef === 'function') {
      innerRef(node);
    } else if (innerRef) {
      (innerRef as MutableRefObject<HTMLInputElement | null>).current = node;
    }
  };

  const handleButtonClick = (cb?: MouseEventHandler<HTMLElement>) => (e: MouseEvent<HTMLElement>) => {
    if (disabled) return;

    hiddenFileInput.current?.click();
    cb?.(e);
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);

    const { files } = e.target;
    if (!files) return;

    const filesArray = Array.from(files);

    if (typeof maxSize === 'number' || accept) {
      const { accepted, rejected } = partitionFiles(filesArray, { maxSize, accept });
      if (rejected.length) {
        onFilesReject?.(rejected);
      }
      onFilesUpload(accepted);
      return;
    }

    onFilesUpload(filesArray);
  };

  const handleClick = (e: MouseEvent<HTMLInputElement>) => {
    (e.target as HTMLInputElement).value = '';
  };

  const childProps = children.props as { onClick?: MouseEventHandler<HTMLElement>; disabled?: boolean };
  const mergedProps = {
    onClick: handleButtonClick(childProps?.onClick),
    disabled: childProps?.disabled ?? disabled,
  };

  return (
    <>
      {cloneElement(children, mergedProps)}
      <input
        {...rest}
        onChange={handleFileSelect}
        multiple={mode === UPLOAD_MODE.Multiple}
        ref={setInputRef}
        className={styles.hiddenInput}
        type='file'
        accept={buildAcceptAttribute(accept)}
        disabled={disabled}
        onClick={handleClick}
        data-test-id={TEST_IDS.fileUpload.nativeInput}
        {...extractDataTestProps(rest)}
      />
    </>
  );
}

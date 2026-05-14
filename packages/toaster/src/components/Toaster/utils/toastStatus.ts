/**
 * Литералы статусов жизненного цикла тоста. Совпадают с `ManagedToastStatus` из
 * manager/types — продублированы здесь как `as const`-объект, чтобы код мог
 * писать `TOAST_STATUS.Leaving` вместо магических строк.
 */
export const TOAST_STATUS = {
  Entering: 'entering',
  Visible: 'visible',
  Leaving: 'leaving',
} as const;

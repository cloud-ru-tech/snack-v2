import { Spinner } from '@design-system/loader';
import { extractSupportProps, WithSupportProps } from '@design-system/utils';
import { type ReactNode, useId, useMemo } from 'react';

import { MODE, TEST_IDS, WIDTH } from '../../constants';
import { BodyProps, HeaderProps } from '../../helperComponents';
import { ModalCustom, type ModalCustomProps } from '../ModalCustom';
import styles from './styles.module.scss';

export type ModalProps = WithSupportProps<
  Pick<HeaderProps, 'onBackButtonClick' | 'title' | 'slotAfterHeadline' | 'subtitle' | 'truncate'> &
    Pick<BodyProps, 'content'> &
    Pick<
      ModalCustomProps,
      'open' | 'onClose' | 'mode' | 'rootClassName' | 'width' | 'heightAuto' | 'container' | 'closeOnPopstate'
    > & {
      /** Медиа-контент */
      media?: ReactNode;
      /** Контент футера */
      footer?: ReactNode;
      /** CSS-класс для окна */
      className?: string;
      /** Состояние загрузки: в теле показывается спиннер или `loadingState`, футер скрыт */
      loading?: boolean;
      /** Контент тела вместо спиннера при `loading` */
      loadingState?: ReactNode;
    }
>;

/**
 * Модальное окно с пресетной разметкой (шапка, тело, футер) поверх ModalCustom.
 */
export function Modal({
  open = false,
  onClose,
  mode = MODE.Regular,
  title,
  truncate,
  slotAfterHeadline,
  subtitle,
  content,
  loading = false,
  loadingState,
  media,
  footer,
  className,
  rootClassName,
  width = WIDTH.S,
  heightAuto = true,
  onBackButtonClick,
  container,
  closeOnPopstate,
  ...rest
}: ModalProps) {
  const titleId = useId();
  const hasFooter = footer != null && !loading;
  const hasTitle = Boolean(title);
  const supportProps = extractSupportProps(rest);

  const headerProps = {
    title,
    titleId: hasTitle ? titleId : undefined,
    subtitle,
    truncate,
    slotAfterHeadline,
    onBackButtonClick,
    'data-test-id': TEST_IDS.header,
  };

  const bodyContent = useMemo(() => {
    if (loading) {
      if (loadingState) {
        return loadingState;
      }

      return (
        <div className={styles.loaderWrapper}>
          <Spinner size='m' data-test-id={TEST_IDS.loadingSpinner} />
        </div>
      );
    }

    return content;
  }, [content, loading, loadingState]);

  return (
    <ModalCustom
      open={open}
      onClose={onClose}
      mode={mode}
      className={className}
      rootClassName={rootClassName}
      width={width}
      heightAuto={heightAuto}
      container={container}
      closeOnPopstate={closeOnPopstate}
      aria-labelledby={hasTitle ? titleId : undefined}
      {...supportProps}
    >
      {media}

      <div className={styles.safeAreaTop} />

      <ModalCustom.Header {...headerProps} />

      <ModalCustom.Body content={bodyContent} />

      <div className={styles.safeAreaBottom} />

      {hasFooter && <ModalCustom.Footer data-test-id={TEST_IDS.footer}>{footer}</ModalCustom.Footer>}
    </ModalCustom>
  );
}

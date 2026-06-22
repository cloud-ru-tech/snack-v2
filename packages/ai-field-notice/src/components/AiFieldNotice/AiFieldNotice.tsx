import { AiFieldBanner, TYPE as BANNER_TYPE } from '@ds/ai-field-banner';
import { AiQueue } from '@ds/ai-queue';
import { extractSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ReactElement, ReactNode, useCallback, useMemo, useRef } from 'react';

import { SIZE, TEST_IDS, VARIANT } from '../../constants';
import { resolveVariantBanner } from '../../resolveVariantBanner';
import { AiFieldNoticeAnimatedDescriptionHandle, AiFieldNoticeProps } from '../../types';
import { isDescriptionItemsArray } from '../../utils';
import { AiFieldNoticeAnimatedDescription } from '../AiFieldNoticeAnimatedDescription';
import styles from './styles.module.scss';

export function AiFieldNotice(props: AiFieldNoticeProps): ReactElement {
  const {
    className,
    size = SIZE.S,
    variant,
    onActionClick,
    'data-test-id': dataTestId = TEST_IDS.root,
    ...rest
  } = props;

  const isQueueVariant = variant === VARIANT.Queue;
  const vmName = variant === VARIANT.VmAgent ? props.vmName : undefined;
  const vmIp = variant === VARIANT.VmAgent ? props.vmIp : undefined;

  const animatedDescriptionRef = useRef<AiFieldNoticeAnimatedDescriptionHandle>(null);

  const resolvedBanner = useMemo(
    () => (!isQueueVariant ? resolveVariantBanner(variant, size, vmName, vmIp) : null),
    [isQueueVariant, variant, size, vmName, vmIp],
  );

  const bannerDescription = resolvedBanner?.description;
  const isAnimatedDescription = isDescriptionItemsArray(bannerDescription);

  const handleMainLineMouseEnter = useCallback(() => animatedDescriptionRef.current?.onMouseEnter(), []);

  const handleMainLineMouseLeave = useCallback(() => animatedDescriptionRef.current?.onMouseLeave(), []);

  const resolvedDescription = useMemo((): ReactNode => {
    if (bannerDescription === undefined || bannerDescription === null) {
      return null;
    }

    if (isAnimatedDescription) {
      return <AiFieldNoticeAnimatedDescription ref={animatedDescriptionRef} items={bannerDescription} size={size} />;
    }

    return bannerDescription as ReactNode;
  }, [bannerDescription, isAnimatedDescription, size]);

  const queueProps = isQueueVariant ? props.queue : null;
  const { className: queueClassName, 'data-test-id': queueTestId = TEST_IDS.queue, ...queueRest } = queueProps ?? {};

  return (
    <div
      {...extractSupportProps(rest)}
      className={cn(styles.root, className)}
      data-size={size}
      data-variant={variant}
      data-test-id={dataTestId}
    >
      {isQueueVariant && queueProps ? (
        <AiFieldBanner
          variant={BANNER_TYPE.Information}
          size={size}
          className={styles.queueBanner}
          data-content-only
          data-test-id={TEST_IDS.banner}
        >
          <AiQueue {...queueRest} className={cn(styles.queue, queueClassName)} data-test-id={queueTestId} />
        </AiFieldBanner>
      ) : (
        resolvedBanner && (
          <AiFieldBanner
            variant={resolvedBanner.bannerVariant}
            description={resolvedDescription}
            icon={resolvedBanner.icon}
            actionLabel={resolvedBanner.actionLabel}
            onActionClick={onActionClick}
            size={size}
            data-test-id={TEST_IDS.banner}
            onMouseEnter={isAnimatedDescription ? handleMainLineMouseEnter : undefined}
            onMouseLeave={isAnimatedDescription ? handleMainLineMouseLeave : undefined}
          />
        )
      )}
    </div>
  );
}

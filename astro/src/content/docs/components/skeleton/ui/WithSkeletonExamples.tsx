import { Skeleton, SkeletonText, WithSkeleton } from '@design-system/skeleton';
import { Typography } from '@design-system/typography';

export function WithSkeletonBasicLoading() {
  return (
    <WithSkeleton loading={true} skeleton={<SkeletonText loading variant='body' size='m' width={200} />}>
      <Typography variant='body' size='m'>
        Контент после загрузки
      </Typography>
    </WithSkeleton>
  );
}

export function WithSkeletonBasicContent() {
  return (
    <WithSkeleton loading={false} skeleton={<SkeletonText loading variant='body' size='m' width={200} />}>
      <Typography variant='body' size='m' as='div'>
        Контент после загрузки.
        <br />
        Текст заменяет скелетон,
        <br />
        когда loading=false.
      </Typography>
    </WithSkeleton>
  );
}

export function WithSkeletonCompositionExample() {
  return (
    <WithSkeleton
      loading={true}
      skeleton={
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Skeleton loading width={48} height={48} borderRadius='50%' />
          <SkeletonText loading lines={2} variant='body' size='m' width={180} />
          <Skeleton loading width={120} height={32} borderRadius={4} />
        </div>
      }
    >
      <div>Карточка пользователя</div>
    </WithSkeleton>
  );
}

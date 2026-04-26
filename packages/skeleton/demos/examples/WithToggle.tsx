import { SkeletonText, WithSkeleton } from '@ds/skeleton';

export function WithToggle() {
  const loading = true;
  return (
    <WithSkeleton loading={loading} skeleton={<SkeletonText loading lines={2} variant='body' size='m' />}>
      <p>Реальный контент после загрузки.</p>
    </WithSkeleton>
  );
}

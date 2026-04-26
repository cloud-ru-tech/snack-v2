import { SkeletonText } from '@ds/skeleton';

export function TextLines() {
  return <SkeletonText loading lines={3} variant='body' size='m' />;
}

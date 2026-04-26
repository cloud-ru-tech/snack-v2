import { Rating } from '@ds/rating';

export function HalfStars() {
  return <Rating count={5} defaultValue={3.5} allowHalf allowClear={false} readonly={false} />;
}

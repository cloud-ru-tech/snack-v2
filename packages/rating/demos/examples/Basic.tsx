import { Rating } from '@ds/rating';

export function Basic() {
  return <Rating count={5} defaultValue={3} allowHalf={false} allowClear={false} readonly={false} />;
}

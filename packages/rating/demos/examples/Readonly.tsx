import { Rating } from '@ds/rating';

export function Readonly() {
  return <Rating count={5} defaultValue={4} readonly allowHalf={false} allowClear={false} />;
}

import { Counter } from '@ds/counter';

export function PlusThreshold() {
  return <Counter value={42} variant='count-plus' plusLimit={10} />;
}

import { Button } from '@ds/button';

export function Views() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button view='filled' label='Filled' />
      <Button view='outline' label='Outline' />
      <Button view='tonal' label='Tonal' />
      <Button view='simple' label='Simple' />
      <Button view='elevated' label='Elevated' />
      <Button view='function' label='Function' />
    </div>
  );
}

import { Button } from '@ds/button';
import { Flex } from '@ds/uikit-product-flex';

export function Stack() {
  return (
    <Flex direction='column' gap='1m' width={220}>
      <Button label='Первый' fullWidth />
      <Button label='Второй' fullWidth view='outline' appearance='neutral' />
      <Button label='Третий' fullWidth view='outline' appearance='neutral' />
    </Flex>
  );
}

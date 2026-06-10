import { Button } from '@ds/button';
import { Flex } from '@ds/uikit-product-flex';

export function Toolbar() {
  return (
    <Flex justify='space-between' align='center' gap='2m' fullWidth>
      <Button label='Назад' view='outline' appearance='neutral' />
      <Flex gap='1m'>
        <Button label='Отмена' view='outline' appearance='neutral' />
        <Button label='Сохранить' />
      </Flex>
    </Flex>
  );
}

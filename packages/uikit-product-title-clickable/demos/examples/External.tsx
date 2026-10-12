import { TitleClickable } from '@ds/uikit-product-title-clickable';

export function External() {
  return (
    <TitleClickable
      href='https://example.com'
      target='_blank'
      content={<TitleClickable.SimpleTitle title='Внешняя ссылка' />}
    />
  );
}

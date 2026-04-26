import { PromoTag } from '@ds/promo-tag';

export function Basic() {
  // eslint-disable-next-line jsx-a11y/aria-role -- `role` здесь — пропс компонента PromoTag, не ARIA-атрибут
  return <PromoTag text='NEW' appearance='primary' role='accent' />;
}

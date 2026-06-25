import { AvatarDetail } from '@ds/uikit-product-avatar-detail';

export function Full() {
  return (
    <AvatarDetail
      name='Новиков Дмитрий'
      contactData='novikov@example.com'
      description='DevOps-инженер, Cloud Platform'
      avatar={{ appearance: 'green', status: 'green' }}
    />
  );
}

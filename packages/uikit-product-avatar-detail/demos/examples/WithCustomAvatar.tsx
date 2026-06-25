import { AvatarDetail } from '@ds/uikit-product-avatar-detail';

export function WithCustomAvatar() {
  return (
    <AvatarDetail
      name='Козлова Анна'
      contactData='kozlova@example.com'
      avatar={{ appearance: 'violet', status: 'green' }}
    />
  );
}

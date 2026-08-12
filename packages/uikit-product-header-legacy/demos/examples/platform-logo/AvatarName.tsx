import { PlatformLogo } from '@ds/uikit-product-header-legacy';

export function AvatarName() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <PlatformLogo avatarName='Название проекта 1' />
      <PlatformLogo avatarName='Staging environment' compact />
    </div>
  );
}

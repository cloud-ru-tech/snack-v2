import { FieldSecure } from '@ds/fields';

export function SecureReadonly() {
  return <FieldSecure label='API Token' readonly defaultValue='sk-XXXXXXXXXXXXXXXXXXXXXXXX' />;
}

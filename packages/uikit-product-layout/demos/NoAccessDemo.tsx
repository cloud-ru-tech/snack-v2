import { LocaleProvider } from '@ds/locale';
import { NoAccess } from '@ds/uikit-product-layout';

import { Canvas } from '#docs/components/Canvas';

import doc from '../docs/props.json';

export function NoAccessDemo() {
  return (
    <LocaleProvider lang='ru-RU'>
      <Canvas
        component={NoAccess}
        componentDoc={doc.NoAccess}
        defaultProps={{
          serviceName: 'Название сервиса',
          'data-test-id': 'no-access-demo',
        }}
        controls={{
          serviceName: { type: 'text' },
        }}
      />
    </LocaleProvider>
  );
}

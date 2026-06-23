import { LocaleProvider } from '@ds/locale';
import { NoAccess } from '@ds/uikit-product-layout';

export function NoAccessBasic() {
  return (
    <LocaleProvider lang='ru-RU'>
      <NoAccess serviceName='Название сервиса' />
    </LocaleProvider>
  );
}

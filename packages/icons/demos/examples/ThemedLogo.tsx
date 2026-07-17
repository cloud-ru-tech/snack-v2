import { CloudLogo } from '@ds/icons/logos';

// Логотип сам переключает Light/Dark исполнение по активной теме DS —
// отдельного пропа не требуется, достаточно быть внутри провайдера темы.
export function ThemedLogo() {
  return <CloudLogo size={40} aria-label='Cloud.ru' />;
}

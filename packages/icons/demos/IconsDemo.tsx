import { RussiaSVG } from '@ds/icons/flags';
import { CheckSVG, PlusSVG, SearchSVG, TrashSVG } from '@ds/icons/interface/system';
import { CloudLogo } from '@ds/icons/logos';

export function IconsDemo() {
  return (
    <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <SearchSVG size={24} aria-label='Поиск' />
      <CheckSVG size={24} aria-label='Готово' />
      <PlusSVG size={24} aria-label='Добавить' />
      <TrashSVG size={24} aria-label='Удалить' />
      <RussiaSVG size={24} aria-label='Флаг России' />
      <CloudLogo size={28} aria-label='Cloud.ru' />
    </div>
  );
}

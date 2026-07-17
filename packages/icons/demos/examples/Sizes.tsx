import { CheckSVG, PlusSVG, SearchSVG, TrashSVG } from '@ds/icons/interface/system';

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
      <SearchSVG size={16} aria-label='Поиск 16' />
      <CheckSVG size={20} aria-label='Готово 20' />
      <PlusSVG size={24} aria-label='Добавить 24' />
      <TrashSVG size={32} aria-label='Удалить 32' />
    </div>
  );
}

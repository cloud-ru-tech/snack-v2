import { SearchPrivate } from '@ds/search-private';
import { preventScrollOnVerticalArrows } from '@ds/utils';
import { FocusEvent, KeyboardEvent, RefObject } from 'react';

import { ITEM_PREFIXES, TEST_IDS } from '../../../constants';
import { SearchState } from '../../../types';
import { stopPropagation } from '../../../utils';
import { useNewListContext } from '../../Lists/contexts';
import styles from './styles.module.scss';

export type SearchItemProps = {
  search?: SearchState;
  itemRef?: RefObject<HTMLElement>;
  /**
   * Доп. обработчик клавиш навигации по списку. Нужен, когда поле поиска вынесено
   * из `<ul>` в шапку dropdown (topBar) и события клавиатуры больше не всплывают
   * на `<ul>`-onKeyDown — DropList передаёт сюда `handleListKeyDown` (factory).
   */
  onNavKeyDown?(e: KeyboardEvent<HTMLElement>): void;
  /** onFocus поля (синхронизация активного item, когда search вне `<ul>`). */
  onFocus?(e: FocusEvent<HTMLInputElement>): void;
  /** Рендер для шапки dropdown — без `.listItem`-обёртки. */
  inTopBar?: boolean;
};

export function SearchItem({ search, itemRef, onNavKeyDown, onFocus, inTopBar }: SearchItemProps) {
  // Размер поиска следует за размером айтемов списка (size из контекста), а не фиксирован 's'.
  const { firstItemId, size = 'm' } = useNewListContext();

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Поиск — текстовый input: гасим только Up/Down (навигация по списку), горизонтальные
    // стрелки оставляем каретке.
    preventScrollOnVerticalArrows(e);

    search?.onKeyDown?.(e);
    onNavKeyDown?.(e);
  };

  if (!search) {
    return null;
  }

  return (
    <div className={styles.searchItem} data-in-top-bar={inTopBar || undefined} data-test-id={TEST_IDS.searchItem}>
      <SearchPrivate
        size={size}
        tabIndex={ITEM_PREFIXES.search === firstItemId ? 0 : -1}
        onKeyDown={handleKeyDown}
        onFocus={onFocus ?? stopPropagation}
        {...search}
        ref={itemRef as RefObject<HTMLInputElement>}
      />
    </div>
  );
}

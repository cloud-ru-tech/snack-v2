import { ExtendedTreeNodeProps } from '../types';
import { extractTreeNodeTitle } from './extractTreeNodeTitle';

const isMatchedTreeItem = (search: string) => {
  const searchLower = search.toLocaleLowerCase();
  return (treeItem: ExtendedTreeNodeProps) => {
    const currentValue = extractTreeNodeTitle(treeItem);
    return currentValue.toLocaleLowerCase().includes(searchLower);
  };
};

type SearchParams = {
  /** Корневые узлы дерева, по которым выполняется поиск. */
  tree: ExtendedTreeNodeProps[];
  searchOptions?: Partial<{
    /** Поисковая строка (case-insensitive substring match по `title` узла). */
    query: string;
    /**
     * Если `true` и parent матчит query — в результат попадают **все** его дети
     * без дополнительной фильтрации. По умолчанию `false`: и parent, и дети
     * фильтруются независимо.
     */
    includeChildrenMatchedParent: boolean;
  }>;
};

/**
 * Фильтрует дерево по поисковой строке с сохранением иерархии подходящих узлов.
 *
 * @param params {@link SearchParams} — дерево и опции поиска.
 * @returns Новое дерево, содержащее только совпавшие узлы и их путь в иерархии.
 */
export const getSearchedTreeItems = ({ tree, searchOptions }: SearchParams) => {
  if (!searchOptions?.query) return tree;

  const { query = '', includeChildrenMatchedParent } = searchOptions;

  const matchFunc = isMatchedTreeItem(query);

  const searchItems = (treeItems: ExtendedTreeNodeProps[]): ExtendedTreeNodeProps[] =>
    treeItems.reduce<ExtendedTreeNodeProps[]>((acc, item) => {
      const hasMatchingTitle = matchFunc(item);
      const needDeepSearch = !(hasMatchingTitle && includeChildrenMatchedParent);

      const matchedChildren = item.nested && (needDeepSearch ? searchItems(item.nested) : item.nested);

      if (hasMatchingTitle || matchedChildren?.length) {
        const newItem = { ...item };

        if (matchedChildren?.length) {
          newItem.nested = matchedChildren;
        } else {
          delete newItem.nested;
        }

        acc.push(newItem);
      }

      return acc;
    }, []);

  return searchItems(tree);
};

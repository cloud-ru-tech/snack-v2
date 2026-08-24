import { ValueOf } from '@ds/utils';

export const FUZZY_SEARCH_THRESHOLD = 0.3;

/** Поля `LinksGroup`, по которым идёт fuzzy-поиск (ключи Fuse). */
export const SEARCH_GROUPS_ACCESSOR = {
  GroupId: 'id',
  GroupLabelText: 'label.text',
  GroupAliases: 'aliases',
  ItemId: 'items.id',
  ItemLabelText: 'items.label',
  ItemAliases: 'items.aliases',
  ItemNestedId: 'items.items.id',
  ItemNestedLabelText: 'items.items.label',
  ItemNestedAliases: 'items.items.aliases',
} as const;

export type SearchGroupsAccessor = ValueOf<typeof SEARCH_GROUPS_ACCESSOR>;

const enCharacters = "qwertyuiop[]asdfghjkl;'zxcvbnm,./`";
const ruCharacters = 'йцукенгшщзхъфывапролджэячсмитьбю.ё';

export const enToRuMap: Record<string, string> = {};
export const ruToEnMap: Record<string, string> = {};

for (let i = 0; i < enCharacters.length; i++) {
  enToRuMap[enCharacters[i]] = ruCharacters[i];
  ruToEnMap[ruCharacters[i]] = enCharacters[i];
}

export const FUZZY_SEARCH_THRESHOLD = 0.3;

export enum SearchGroupsAccessor {
  GroupId = 'id',
  GroupLabelText = 'label.text',
  GroupAliases = 'aliases',
  ItemId = 'items.id',
  ItemLabelText = 'items.label',
  ItemAliases = 'items.aliases',
}

const enCharacters = "qwertyuiop[]asdfghjkl;'zxcvbnm,./`";
const ruCharacters = 'йцукенгшщзхъфывапролджэячсмитьбю.ё';

export const enToRuMap: Record<string, string> = {};
export const ruToEnMap: Record<string, string> = {};

for (let i = 0; i < enCharacters.length; i++) {
  enToRuMap[enCharacters[i]] = ruCharacters[i];
  ruToEnMap[ruCharacters[i]] = enCharacters[i];
}

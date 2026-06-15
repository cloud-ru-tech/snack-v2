import { CommonFlattenProps, FlattenNextListItem, ItemId } from '../types';

export type NextListItemProps = Omit<FlattenNextListItem, 'type'> & CommonFlattenProps & { focusId?: ItemId };

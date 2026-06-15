import { Separator } from '../../../helperComponents';
import { useGroupItemSelection, useRenderItems } from '../hooks';
import { CommonFlattenProps, FlattenGroupSelectListItem } from '../types';

type GroupSelectItemProps = Omit<FlattenGroupSelectListItem, 'type'> & CommonFlattenProps;

export function GroupSelectItem({
  label,
  beforeContent,
  truncate,
  divider,
  items,
  groupVariant,
  id,
  itemRef,
  allChildIds,
  selectButtonLabel,
}: GroupSelectItemProps) {
  const { indeterminate, checked, handleOnSelect } = useGroupItemSelection({
    items,
    id,
    disabled: false,
    allChildIds,
  });

  const itemsJSX = useRenderItems(items);

  return (
    <>
      <Separator
        label={label}
        beforeContent={beforeContent}
        truncate={truncate}
        divider={divider}
        groupVariant={groupVariant}
        selectButton={{
          indeterminate,
          checked,
          itemRef,
          onClick: handleOnSelect,
          label: selectButtonLabel,
        }}
      />

      {itemsJSX}
    </>
  );
}

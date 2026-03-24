import { PlaceholderSVG } from '@design-system/icons';
import { Search } from '@design-system/search';

/** Для `client:load`: узел в `buttonField.action` не сериализуется из MDX — держим разметку внутри модуля острова. */
export function SearchButtonFieldExample() {
  return (
    <Search
      placeholder='Поиск с действием'
      background={true}
      outline={true}
      size='l'
      buttonField={{
        action: <PlaceholderSVG size={24} />,
        onClick: () => {},
        withDropdownList: true,
      }}
    />
  );
}

import { ButtonGroup } from '@ds/button';
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { EmptyBlock } from '@ds/uikit-product-layout';

export function EmptyBlockWithFooter() {
  return (
    <EmptyBlock
      icon={{ icon: PlaceholderSVG }}
      title='Нет данных'
      content='Создайте первую запись, чтобы начать работу'
      footer={<ButtonGroup primaryAction={{ label: 'Создать' }} secondaryAction={{ label: 'Импортировать' }} />}
    />
  );
}

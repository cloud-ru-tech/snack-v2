import { ButtonGroup } from '@ds/button';
import { PlaceholderSVG } from '@ds/icons';
import { EmptyBlock } from '@ds/uikit-product-layout';

export function EmptyBlockWithFooter() {
  return (
    <EmptyBlock
      icon={{ icon: PlaceholderSVG }}
      title='Нет данных'
      description='Создайте первую запись, чтобы начать работу'
      footer={<ButtonGroup primaryAction={{ label: 'Создать' }} secondaryAction={{ label: 'Импортировать' }} />}
    />
  );
}

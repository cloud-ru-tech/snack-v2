import { FileSVG, FolderSVG, StarSVG } from '@ds/icons/interface/system';
import { List } from '@ds/list';

import styles from './styles.module.scss';

export function ItemContentSlots() {
  return (
    <div className={styles.box}>
      <List
        size='m'
        items={[
          {
            id: 'reports',
            beforeContent: <FolderSVG />,
            content: { label: 'Отчёты', caption: '24' },
            afterContent: <StarSVG />,
          },
          {
            id: 'invoice',
            beforeContent: <FileSVG />,
            content: { label: 'invoice-2024.pdf', caption: '1.2 МБ' },
          },
        ]}
      />
    </div>
  );
}

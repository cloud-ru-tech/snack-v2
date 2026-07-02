import { APPEARANCE, Button, SIZE, VIEW } from '@ds/button';
import { ProductIcons, SearchSVG } from '@ds/icons';
import { Tooltip } from '@ds/tooltip';

import { TEST_IDS } from '../../../../constants';
import { pageLayoutLocale } from '../../../../locale';
import { useSearchContext } from '../../contexts';
import styles from './styles.module.scss';

export function SidebarSearchToggle() {
  const { searchOpened, setSearchValue, setSearchOpened } = useSearchContext();

  const { t } = pageLayoutLocale.useTranslations();

  const toggle = () => {
    setSearchValue('');
    setSearchOpened(prev => !prev);
  };

  return (
    <Tooltip
      tip={searchOpened ? t('PageSidebar.closeSearch') : t('PageSidebar.openSearch')}
      triggerClassName={styles.trigger}
    >
      <Button
        view={VIEW.Function}
        appearance={APPEARANCE.Neutral}
        size={SIZE.M}
        data-test-id={TEST_IDS.sidebarSearch.trigger}
        onClick={toggle}
        icon={searchOpened ? <ProductIcons.VerticalMenuRightCloseSVG /> : <SearchSVG />}
      />
    </Tooltip>
  );
}

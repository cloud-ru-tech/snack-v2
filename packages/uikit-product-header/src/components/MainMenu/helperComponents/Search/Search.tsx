import { Search as SearchSnack } from '@ds/search';
import { forwardRef } from 'react';

import { TEST_IDS } from '../../../../constants';
import { headerLocale } from '../../../../locale';
import { SearchProps } from '../../types';
import styles from './styles.module.scss';

type SearchComponentProps = SearchProps & {
  isMobile?: boolean;
};

export const Search = forwardRef<HTMLInputElement, SearchComponentProps>(
  ({ value, onChange, onBlur, onFocus, isMobile = false }, ref) => {
    const { t } = headerLocale.useTranslations();

    return (
      <div className={styles.searchWrap} data-mobile={isMobile || undefined}>
        <SearchSnack
          ref={ref}
          size='m'
          outline={!isMobile}
          placeholder={t('searchByServices')}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          data-test-id={TEST_IDS.mainMenu.search}
          className={styles.search}
          background={isMobile}
        />
      </div>
    );
  },
);

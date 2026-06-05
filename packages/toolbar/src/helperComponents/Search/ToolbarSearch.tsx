import { Search as SearchComponent } from '@ds/search';
import { WithSupportProps } from '@ds/utils';
import { useState } from 'react';

import { TEST_IDS } from '../../testIds';
import styles from './styles.module.scss';

export type SearchProps = {
  value: string;
  onChange(value: string): void;
  onSubmit?(value: string): void;
  placeholder?: string;
  loading?: boolean;
};

export function Search({
  value,
  onChange,
  onSubmit,
  placeholder,
  loading,
  'data-test-id': dataTestId,
}: WithSupportProps<SearchProps>) {
  const [focusVisible, setFocusVisible] = useState(false);

  return (
    <div className={styles.root} data-focusvisible={focusVisible || undefined} data-loading={loading || undefined}>
      <span className={styles.focusFrame} aria-hidden />
      <SearchComponent
        value={value}
        onChange={onChange}
        onSubmit={onSubmit}
        placeholder={placeholder}
        loading={loading}
        background={false}
        size='m'
        className={styles.search}
        data-test-id={dataTestId ?? TEST_IDS.search}
        onFocus={event => {
          setFocusVisible(event.target.matches(':focus-visible'));
        }}
        onBlur={() => {
          setFocusVisible(false);
        }}
      />
    </div>
  );
}

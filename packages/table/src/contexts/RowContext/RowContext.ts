import { createContext, Dispatch, SetStateAction, useContext } from 'react';

import { RowAppearance } from '../../components/types';

type RowContextValue = {
  dropListOpened: boolean;
  setDropListOpen: Dispatch<SetStateAction<boolean>>;
  disabledRowAppearance: RowAppearance;
};

export const RowContext = createContext<RowContextValue>({
  dropListOpened: false,
  setDropListOpen() {},
  disabledRowAppearance: RowAppearance.Disabled,
});

export const useRowContext = () => useContext(RowContext);

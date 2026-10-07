import { createContext, useContext } from 'react';

import { ORIENTATION } from './constants';
import { TabBarContextValue, TabsContextValue } from './types';

export const TabsContext = createContext<TabsContextValue>({
  orientation: ORIENTATION.Horizontal,
  setSelectedTab: function () {},
});

export const useTabsContext = () => useContext(TabsContext);

export const TabBarContext = createContext<TabBarContextValue>({});

export const useTabBarContext = () => useContext(TabBarContext);

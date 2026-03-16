import { useValueControl } from '@design-system/utils';
import cn from 'classnames';
import { Children, isValidElement, ReactElement, ReactNode } from 'react';

import { ORIENTATION } from '../../constants';
import { TabsContext } from '../../context';
import { Orientation } from '../../types';
import { Tab as TabComponent } from '../Tab';
import { TabBar as TabBarComponent } from '../TabBar';
import { TabContent as TabContentComponent } from '../TabContent';
import styles from './styles.module.scss';

export type TabsProps<T extends string = string> = {
  /** Текущая вкладка */
  value?: T;
  /** Выбранная вкладка по умолчанию */
  defaultValue?: T;
  /** Колбек выбора вкладки */
  onChange?(id: T): void;
  children?: ReactNode;
};

function getOrientationFromChildren(children: ReactNode): Orientation {
  const array = Children.toArray(children);

  const tabBar = array.find(
    (child): child is ReactElement<{ orientation?: string }> => isValidElement(child) && child.type === TabBarComponent,
  );

  return tabBar?.props?.orientation === ORIENTATION.Vertical ? ORIENTATION.Vertical : ORIENTATION.Horizontal;
}

export function Tabs<T extends string = string>({ children, onChange, value, defaultValue }: TabsProps<T>) {
  const [selectedTab, setSelectedTab] = useValueControl({
    value,
    defaultValue,
    onChange: onChange as TabsProps<T>['onChange'],
  });

  const orientation = getOrientationFromChildren(children);
  const isVertical = orientation === ORIENTATION.Vertical;

  return (
    <TabsContext.Provider
      value={{
        selectedTab,
        setSelectedTab,
      }}
    >
      <div className={cn(styles.root, isVertical && styles.rootVertical)}>{children}</div>
    </TabsContext.Provider>
  );
}

export namespace Tabs {
  export const Tab = TabComponent;
  export const TabBar = TabBarComponent;
  export const TabContent = TabContentComponent;
}

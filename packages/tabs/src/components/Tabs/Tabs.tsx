import { useValueControl } from '@ds/utils';
import cn from 'classnames';
import { ReactNode } from 'react';

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
  /** Дополнительный класс на корневой контейнер */
  className?: string;
  /** Ориентация вкладок */
  orientation?: Orientation;
};

export function Tabs<T extends string = string>({
  children,
  onChange,
  value,
  defaultValue,
  className,
  orientation = ORIENTATION.Horizontal,
}: TabsProps<T>) {
  const [selectedTab, setSelectedTab] = useValueControl({
    value,
    defaultValue,
    onChange: onChange as TabsProps<T>['onChange'],
  });

  const isVertical = orientation === ORIENTATION.Vertical;

  return (
    <TabsContext.Provider
      value={{
        orientation,
        selectedTab,
        setSelectedTab,
      }}
    >
      <div className={cn(styles.root, className, { [styles.rootVertical]: isVertical })}>{children}</div>
    </TabsContext.Provider>
  );
}

export namespace Tabs {
  export const Tab = TabComponent;
  export const TabBar = TabBarComponent;
  export const TabContent = TabContentComponent;
}

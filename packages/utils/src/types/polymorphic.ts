import { ComponentPropsWithRef, ElementType } from 'react';

/** Тип ref'а для полиморфного компонента: то, что примет элемент/компонент, переданный в `as`. */
export type PolymorphicRef<T extends ElementType> = ComponentPropsWithRef<T>['ref'];

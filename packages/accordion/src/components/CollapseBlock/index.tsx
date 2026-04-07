import { CollapseBlock, type CollapseBlockProps as CollapseBlockPropsOriginal } from './CollapseBlock';

export type CollapseBlockComponent = CollapseBlockPropsOriginal['component'];

export type { CollapseBlockProps } from './CollapseBlock';

type CollapseBlockPropsWithoutComponent = Omit<CollapseBlockPropsOriginal, 'component'>;

function getCollapseBlock<T extends CollapseBlockPropsWithoutComponent>(component: CollapseBlockComponent) {
  return function (props: T) {
    return <CollapseBlock {...props} component={component} />;
  };
}

export type CollapseBlockPrimaryProps = CollapseBlockPropsWithoutComponent;
export const CollapseBlockPrimary = getCollapseBlock<CollapseBlockPrimaryProps>('accordionPrimary');

export type CollapseBlockSecondaryProps = CollapseBlockPropsWithoutComponent;
export const CollapseBlockSecondary = getCollapseBlock<CollapseBlockSecondaryProps>('accordionSecondary');

export type CollapseBlockTertiaryProps = Omit<CollapseBlockPropsWithoutComponent, 'appearance' | 'view'>;
export const CollapseBlockTertiary = getCollapseBlock<CollapseBlockTertiaryProps>('accordionTertiary');

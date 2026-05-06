import { BACKGROUND_PREDEFINED_FILL, type BackgroundPredefinedFill } from '@ds/materials';
import type { Meta } from '@storybook/react';
import cn from 'classnames';

import { StoryTable } from '#storybook/components';

import { BackgroundPredefinedDemo } from './components/BackgroundPredefinedDemo';
import styles from './styles.module.scss';

/** Как на макете: красный … розовый (theme.color). */
const FILLS_THEME_COLOR: BackgroundPredefinedFill[] = [
  BACKGROUND_PREDEFINED_FILL.RedBackground,
  BACKGROUND_PREDEFINED_FILL.OrangeBackground,
  BACKGROUND_PREDEFINED_FILL.YellowBackground,
  BACKGROUND_PREDEFINED_FILL.GreenBackground,
  BACKGROUND_PREDEFINED_FILL.BlueBackground,
  BACKGROUND_PREDEFINED_FILL.VioletBackground,
  BACKGROUND_PREDEFINED_FILL.PinkBackground,
];

/** Transparent, decorTransparent, primary, neutral 1Level. */
const FILLS_OTHER: BackgroundPredefinedFill[] = [
  BACKGROUND_PREDEFINED_FILL.Transparent,
  BACKGROUND_PREDEFINED_FILL.DecorTransparent,
  BACKGROUND_PREDEFINED_FILL.PrimaryBackground,
  BACKGROUND_PREDEFINED_FILL.NeutralBackground1Level,
];

const meta = {
  title: 'Materials/Background Predefined Visual Matrix',
  component: BackgroundPredefinedDemo,
  parameters: {
    controls: { disable: true },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=5537-358&m=dev',
    },
    docs: {
      description: {
        component:
          "Слот backgroundPredefined: blur 1Level на корне и acrylic на слоте. Варианты fill — в `@ds/materials` (`backgroundPredefinedFills.ts`); acrylic на слоте — миксин `with-material('acrylic', …)`.",
      },
    },
  },
} satisfies Meta<typeof BackgroundPredefinedDemo>;

export default meta;

function horizontalRowTable(fills: BackgroundPredefinedFill[]) {
  return (
    <StoryTable
      firstColumnHeader=''
      columnHeaders={fills}
      rows={[
        {
          variantLabel: '\u00a0',
          cells: fills.map(fill => <BackgroundPredefinedDemo key={fill} slotFill={fill} />),
        },
      ]}
    />
  );
}

const Template = () => (
  <div className={cn(styles.externalWrapper, styles.backgroundPredefinedVisualMatrix)}>
    {horizontalRowTable(FILLS_THEME_COLOR)}
    {horizontalRowTable(FILLS_OTHER)}
  </div>
);

export const BackgroundPredefinedVisualMatrix = {
  tags: ['dev', 'test'],
  render: Template,
};

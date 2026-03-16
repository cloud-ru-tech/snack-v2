import type { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import togglesReadme from '../../README.md?raw';
import { Favourite, FAVOURITE_ICON, FavouriteProps, SIZE } from '../../src';
import styles from './styles.module.scss';

const meta: Meta<FavouriteProps> = {
  title: 'Components/Toggles/Favourite',
  component: Favourite,
  parameters: {
    readme: { content: togglesReadme },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BnDZww7tvszWBemlYQS1Pg/%D0%A1%D0%BE%D1%81%D1%82%D0%BE%D1%8F%D0%BD%D0%B8%D1%8F-%D0%B4%D0%BB%D1%8F-list--tab--toggles--FF-8135-?node-id=2852-26425&m=dev',
    },
  },
  args: {
    size: 'xs',
    icon: FAVOURITE_ICON.Star,
    checked: false,
    loading: false,
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<FavouriteProps>;

const sizes = Object.values(SIZE);
const icons = [FAVOURITE_ICON.Star, FAVOURITE_ICON.Heart] as const;

export const VisualMatrix: Story = {
  tags: ['dev', 'test'],
  render: () => (
    <div className={styles.wrapper}>
      {icons.map(iconVariant => (
        <div key={iconVariant} className={styles.iconSection}>
          <h3 className={styles.sectionTitle}>Icon: {iconVariant}</h3>
          {sizes.map(size => (
            <StoryTable
              key={`${iconVariant}-${size}`}
              sectionTitle={`States (size ${size})`}
              firstColumnHeader=''
              columnHeaders={['unchecked', 'checked']}
              rows={[
                {
                  variantLabel: 'Regular',
                  cells: [
                    <Favourite key='unchecked' size={size} icon={iconVariant} />,
                    <Favourite key='checked' checked size={size} icon={iconVariant} />,
                  ],
                },
                {
                  variantLabel: 'Disabled',
                  cells: [
                    <Favourite key='unchecked' disabled size={size} icon={iconVariant} />,
                    <Favourite key='checked' checked disabled size={size} icon={iconVariant} />,
                  ],
                },
                {
                  variantLabel: 'Load',
                  cells: [<Favourite key='loading' loading size={size} icon={iconVariant} />],
                },
              ]}
            />
          ))}
        </div>
      ))}
    </div>
  ),
};

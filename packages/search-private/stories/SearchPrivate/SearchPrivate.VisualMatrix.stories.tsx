import { APPEARANCE, Button, VIEW } from '@ds/button';
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { SearchPrivate, SIZE } from '@ds/search-private';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const meta: Meta<typeof SearchPrivate> = {
  title: 'Components/SearchPrivate',
  component: SearchPrivate,
  parameters: { layout: 'padded', figma: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof SearchPrivate>;

const keySizes = Object.values(SIZE);
const keyStates = ['default', 'disabled', 'loading'] as const;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='State × Size'
        firstColumnHeader='State'
        columnHeaders={keySizes.map(s => s.toUpperCase())}
        rows={keyStates.map(state => ({
          variantLabel: state,
          cells: keySizes.map(size => (
            <SearchPrivate
              key={`${state}-${size}`}
              size={size}
              placeholder='Поиск'
              disabled={state === 'disabled'}
              loading={state === 'loading'}
            />
          )),
        }))}
      />

      <StoryTable
        sectionTitle='AfterContent × Size'
        firstColumnHeader='Слот'
        columnHeaders={keySizes.map(s => s.toUpperCase())}
        rows={[
          {
            variantLabel: 'без afterContent',
            cells: keySizes.map(size => <SearchPrivate key={`no-slot-${size}`} size={size} placeholder='Поиск' />),
          },
          {
            variantLabel: 'с afterContent',
            cells: keySizes.map(size => (
              <SearchPrivate
                key={`slot-${size}`}
                size={size}
                placeholder='Поиск'
                afterContent={
                  <Button
                    size={size}
                    view={VIEW.Function}
                    appearance={APPEARANCE.Neutral}
                    icon={<PlaceholderSVG />}
                    minWidth={false}
                    onClick={() => {}}
                  />
                }
              />
            )),
          },
        ]}
      />
    </div>
  ),
};

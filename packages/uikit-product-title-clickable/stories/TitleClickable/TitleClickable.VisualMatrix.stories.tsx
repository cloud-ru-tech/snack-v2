import { PlaceholderSVG } from '@ds/icons/interface/system';
import { TitleClickable } from '@ds/uikit-product-title-clickable';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';
import { STORY_TEST_IDS } from './testIds';

const meta: Meta<typeof TitleClickable> = {
  title: 'Uikit Product/TitleClickable',
  component: TitleClickable,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof TitleClickable>;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        cellAlign='start'
        sectionTitle='Standalone content'
        firstColumnHeader='component'
        columnHeaders={['rendered']}
        rows={[
          {
            variantLabel: 'SimpleTitle',
            cells: [
              <TitleClickable.SimpleTitle
                key='simple'
                title='Standalone title'
                className='custom-simple'
                data-test-id={STORY_TEST_IDS.standaloneSimple}
                aria-label='Simple title'
              />,
            ],
          },
          {
            variantLabel: 'UserTitle',
            cells: [
              <TitleClickable.UserTitle
                key='user'
                name='Standalone user'
                subtitle='Administrator'
                className='custom-user'
                data-test-id={STORY_TEST_IDS.standaloneUser}
                aria-label='User title'
                showTwoSymbols
              />,
            ],
          },
        ]}
      />
      <StoryTable
        cellAlign='start'
        sectionTitle='Width × Icon'
        firstColumnHeader='width'
        columnHeaders={['no icon', 'with icon']}
        rows={(['auto', 'full'] as const).map(width => ({
          variantLabel: width,
          cells: [undefined, <PlaceholderSVG key='icon' />].map((icon, idx) => (
            <div key={idx} className={width === 'full' ? styles.fullWidthCell : undefined}>
              <TitleClickable
                href='#'
                content={<TitleClickable.SimpleTitle title='Title' icon={icon} />}
                fullWidth={width === 'full'}
              />
            </div>
          )),
        }))}
      />

      <StoryTable
        cellAlign='start'
        sectionTitle='showArrow × long title (truncation)'
        firstColumnHeader='showArrow'
        columnHeaders={['short', 'long']}
        rows={[true, false].map(showArrow => ({
          variantLabel: String(showArrow),
          cells: ['Title', 'Very long title that should definitely truncate on a single line'].map((title, idx) => (
            <div key={idx} className={styles.fullWidthCell}>
              <TitleClickable
                href='#'
                content={<TitleClickable.SimpleTitle title={title} icon={<PlaceholderSVG />} />}
                fullWidth
                showArrow={showArrow}
              />
            </div>
          )),
        }))}
      />

      <StoryTable
        cellAlign='start'
        sectionTitle='Arrow icon (auto: chevron / external by target)'
        firstColumnHeader='target'
        columnHeaders={['no icon', 'with icon']}
        rows={(['_self', '_blank'] as const).map(target => ({
          variantLabel: target,
          cells: [undefined, <PlaceholderSVG key='icon' />].map((icon, idx) => (
            <TitleClickable
              key={idx}
              href='#'
              target={target}
              content={<TitleClickable.SimpleTitle title='Title' icon={icon} />}
            />
          )),
        }))}
      />

      <StoryTable
        cellAlign='start'
        sectionTitle='SimpleTitle and custom content'
        firstColumnHeader='variant'
        columnHeaders={['rendered']}
        rows={[
          {
            variantLabel: 'icon before title',
            cells: [
              <TitleClickable
                key='icon'
                href='#'
                content={<TitleClickable.SimpleTitle title='With icon' icon={<PlaceholderSVG />} />}
              />,
            ],
          },
          {
            variantLabel: 'custom children',
            cells: [
              <TitleClickable
                key='custom'
                href='#'
                content={<span data-test-id={STORY_TEST_IDS.customChildren}>Custom children</span>}
              />,
            ],
          },
        ]}
      />

      <StoryTable
        cellAlign='start'
        sectionTitle='UserTitle'
        firstColumnHeader='variant'
        columnHeaders={['rendered']}
        rows={[
          {
            variantLabel: 'without subtitle',
            cells: [<TitleClickable key='name' href='#' content={<TitleClickable.UserTitle name='John Doe' />} />],
          },
          {
            variantLabel: 'long user title',
            cells: [
              <div key='long-user' className={styles.fullWidthCell}>
                <TitleClickable
                  href='#'
                  fullWidth
                  content={
                    <TitleClickable.UserTitle
                      name='Very long user name that must truncate'
                      subtitle='very.long.email.address@example.com'
                    />
                  }
                />
              </div>,
            ],
          },
          {
            variantLabel: 'avatar + name + subtitle',
            cells: [
              <div key='avatar' className={styles.fullWidthCell}>
                <TitleClickable
                  href='#'
                  fullWidth
                  content={<TitleClickable.UserTitle name='John Doe' subtitle='jdoe@example.com' />}
                />
              </div>,
            ],
          },
        ]}
      />
    </div>
  ),
};

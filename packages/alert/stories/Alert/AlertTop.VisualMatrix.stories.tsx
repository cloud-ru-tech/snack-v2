import { AdaptiveProvider, LAYOUT_TYPE } from '@ds/adaptive';
import { AlertTop, APPEARANCE } from '@ds/alert';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const meta: Meta<typeof AlertTop> = {
  title: 'Components/Alert/AlertTop',
  component: AlertTop,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof AlertTop>;

const keyAppearances = Object.values(APPEARANCE);

const adaptiveLayouts = [LAYOUT_TYPE.Desktop, LAYOUT_TYPE.Mobile] as const;

// Длинный контент в узком (mobile-репрезентативном) контейнере — чтобы preset `collapsible`
// (desktop false → mobile true) дал видимую разницу: плоский баннер с close-кнопкой на
// desktop против свёрнутого с шевроном раскрытия на mobile.
const ADAPTIVE_COLLAPSE_TITLE = 'Длинное системное уведомление, заголовок которого не помещается в одну строку';
const ADAPTIVE_COLLAPSE_DESCRIPTION =
  'Подробное описание системного события: что произошло, кого касается и какие действия нужно предпринять. На mobile этот текст скрыт до раскрытия по клику.';

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='Appearance × Icon'
        firstColumnHeader='Appearance'
        columnHeaders={['icon=true', 'icon=false']}
        rows={keyAppearances.map(appearance => ({
          variantLabel: appearance,
          cells: [true, false].map(icon => (
            <div key={String(icon)} className={styles.wide}>
              <AlertTop
                appearance={appearance}
                icon={icon}
                title={`AlertTop ${appearance}`}
                content='Краткое описание системного уведомления.'
              />
            </div>
          )),
        }))}
      />
      <StoryTable
        sectionTitle='Appearance × Actions/onClose'
        firstColumnHeader='Appearance'
        columnHeaders={['with actions', 'with onClose']}
        rows={keyAppearances.map(appearance => ({
          variantLabel: appearance,
          cells: [
            <div key='actions' className={styles.wide}>
              <AlertTop
                appearance={appearance}
                title={`AlertTop ${appearance}`}
                content='Краткое описание системного уведомления.'
                actions={{
                  primary: { label: 'Принять' },
                  secondary: { label: 'Отклонить' },
                }}
              />
            </div>,
            <div key='close' className={styles.wide}>
              <AlertTop
                appearance={appearance}
                title={`AlertTop ${appearance}`}
                content='Краткое описание системного уведомления.'
                onClose={fn()}
              />
            </div>,
          ],
        }))}
      />

      <StoryTable
        sectionTitle='Adaptive preset — collapsible (desktop плоский → mobile свёрнутый)'
        firstColumnHeader='layoutType'
        columnHeaders={['Длинный контент в узком контейнере']}
        rows={adaptiveLayouts.map(layoutType => ({
          variantLabel: layoutType,
          cells: [
            <AdaptiveProvider key={layoutType} layoutType={layoutType}>
              <div className={styles.adaptiveCell}>
                <AlertTop
                  appearance={APPEARANCE.Warning}
                  icon
                  title={ADAPTIVE_COLLAPSE_TITLE}
                  content={ADAPTIVE_COLLAPSE_DESCRIPTION}
                  onClose={fn()}
                />
              </div>
            </AdaptiveProvider>,
          ],
        }))}
      />
    </div>
  ),
};

import { Button } from '@ds/button';
import { FieldTextArea, SIZE, VALIDATION_STATE } from '@ds/fields';
import { BoldSVG, BulletListSVG, ImageSVG, InlineCodeSVG, LinkSVG } from '@ds/icons';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './stories.module.scss';

const meta: Meta<typeof FieldTextArea> = {
  title: 'Components/Fields/FieldTextArea',
  component: FieldTextArea,
};

export default meta;
type Story = StoryObj<typeof FieldTextArea>;

const keySizes = Object.values(SIZE);
const keyStates = Object.values(VALIDATION_STATE);

const LONG_VALUE = [
  'Line one of a long message',
  'Line two extends the content',
  'Line three forces overflow',
  'Line four hits the scroll',
  'Line five keeps going further',
].join('\n');

const stateRows = [
  { key: 'empty', extra: { defaultValue: '', placeholder: 'Type your message' } },
  { key: 'filled', extra: { defaultValue: 'Sample multi-line\ncontent in textarea.' } },
  { key: 'with length', extra: { defaultValue: 'Hello world', maxLength: 80 } },
  // current > max + allowMoreThanMaxLength → счётчик уходит в красный (data-limit-exceeded).
  { key: 'limit exceeded', extra: { defaultValue: 'Far beyond the cap', maxLength: 10, allowMoreThanMaxLength: true } },
  // maxRows=3 ограничивает высоту: длинный текст скроллится кастомным скроллбаром @ds/scroll.
  { key: 'maxRows reached', extra: { defaultValue: LONG_VALUE, minRows: 1, maxRows: 3 } },
  { key: 'resizable', extra: { defaultValue: 'Drag bottom-right to resize.', resizable: true } },
  {
    key: 'with footer',
    extra: { defaultValue: 'Filled value above footer.', footer: <Button size='s' label='Отправить' /> },
  },
  // Тулбар-ряд над textarea (Figma elementWrapperBefore / slotBeforeContent).
  {
    key: 'with header',
    extra: {
      defaultValue: 'Value below a header toolbar.',
      header: (
        <>
          <Button size='s' view='function' appearance='neutral' icon={<BoldSVG />} />
          <Button size='s' view='function' appearance='neutral' icon={<BulletListSVG />} />
          <Button size='s' view='function' appearance='neutral' icon={<InlineCodeSVG />} />
        </>
      ),
    },
  },
  // Слоты до и после одновременно (before/after) — иконочные тулбары сверху и снизу,
  // как в Figma-мастере (elementWrapperBefore + elementWrapperAfter).
  {
    key: 'before + after toolbars',
    extra: {
      defaultValue: 'Toolbars above and below the value.',
      header: (
        <>
          <Button size='s' view='function' appearance='neutral' icon={<BoldSVG />} />
          <Button size='s' view='function' appearance='neutral' icon={<BulletListSVG />} />
          <Button size='s' view='function' appearance='neutral' icon={<InlineCodeSVG />} />
        </>
      ),
      footer: (
        <>
          <Button size='s' view='function' appearance='neutral' icon={<LinkSVG />} />
          <Button size='s' view='function' appearance='neutral' icon={<ImageSVG />} />
        </>
      ),
    },
  },
  { key: 'no background', extra: { defaultValue: 'No acrylic background.', background: false } },
  { key: 'readonly', extra: { defaultValue: 'Read-only multi-line value.', readonly: true } },
  { key: 'disabled', extra: { defaultValue: 'Disabled value.', disabled: true } },
  // error wins over validationState=success: красная тонировка фона + красный hint.
  {
    key: 'error overrides success',
    extra: {
      defaultValue: 'Resolved with an error.',
      validationState: VALIDATION_STATE.Success,
      error: 'Server rejected the comment',
    },
  },
] as const;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='Size × ValidationState'
        firstColumnHeader='Size'
        columnHeaders={keyStates.map(s => s.toUpperCase())}
        rows={keySizes.map(size => ({
          variantLabel: size,
          cells: keyStates.map(state => (
            <FieldTextArea
              key={state}
              size={size}
              validationState={state}
              label='Comment'
              hint={state === VALIDATION_STATE.Default ? 'Hint' : `${state} hint`}
              showHintIcon
              defaultValue={'Multi-line value\nsecond line\nthird line'}
              minRows={2}
            />
          )),
        }))}
      />

      <StoryTable
        sectionTitle='State (size=m)'
        firstColumnHeader='State'
        columnHeaders={['Render']}
        rows={stateRows.map(({ key, extra }) => ({
          variantLabel: key,
          cells: [
            <FieldTextArea
              key={key}
              size={SIZE.M}
              validationState={VALIDATION_STATE.Default}
              label='Comment'
              minRows={2}
              {...extra}
            />,
          ],
        }))}
      />
    </div>
  ),
};

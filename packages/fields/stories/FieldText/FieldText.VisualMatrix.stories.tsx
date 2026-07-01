import { FieldText, SIZE, VALIDATION_STATE } from '@ds/fields';
import { CalendarSVG, ChevronDownSVG, PlaceholderSVG, SearchSVG } from '@ds/icons';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './stories.module.scss';

const meta: Meta<typeof FieldText> = {
  title: 'Components/Fields/FieldText',
  component: FieldText,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof FieldText>;

const keySizes = [SIZE.S, SIZE.M, SIZE.L] as const;
const keyStates = [
  VALIDATION_STATE.Default,
  VALIDATION_STATE.Error,
  VALIDATION_STATE.Warning,
  VALIDATION_STATE.Success,
  VALIDATION_STATE.Valid,
] as const;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      {/* Поле тонирует acrylic-фон по валидации (error→red, warning→yellow, success→green;
          default/valid — нейтральный фон). Это field-специфика, а не chrome FieldDecorator. */}
      <StoryTable
        sectionTitle='Size × ValidationState'
        firstColumnHeader='Size'
        columnHeaders={keyStates.map(s => s.toUpperCase())}
        rows={keySizes.map(size => ({
          variantLabel: size,
          cells: keyStates.map(state => (
            <FieldText
              key={state}
              size={size}
              validationState={state}
              label='Label'
              hint={state === VALIDATION_STATE.Default ? 'Hint' : `${state} hint`}
              showHintIcon
              defaultValue='Value'
            />
          )),
        }))}
      />

      <StoryTable
        sectionTitle='Slot composition (size=m, default)'
        firstColumnHeader='Composition'
        columnHeaders={['Render']}
        rows={[
          {
            variantLabel: 'icon before',
            cells: [
              <FieldText
                key='ib'
                size={SIZE.M}
                validationState={VALIDATION_STATE.Default}
                placeholder='Search'
                iconBefore={<SearchSVG />}
              />,
            ],
          },
          {
            variantLabel: 'icon after',
            cells: [
              <FieldText
                key='ia'
                size={SIZE.M}
                validationState={VALIDATION_STATE.Default}
                defaultValue='user@example.com'
                iconAfter={<CalendarSVG />}
              />,
            ],
          },
          {
            variantLabel: 'prefix + postfix',
            cells: [
              <FieldText
                key='pp'
                size={SIZE.M}
                validationState={VALIDATION_STATE.Default}
                defaultValue='100'
                prefix='$'
                postfix='USD'
              />,
            ],
          },
          {
            variantLabel: 'icon + prefix + postfix',
            cells: [
              <FieldText
                key='ipp'
                size={SIZE.M}
                validationState={VALIDATION_STATE.Default}
                defaultValue='100'
                iconBefore={<SearchSVG />}
                prefix='$'
                postfix='USD'
              />,
            ],
          },
          {
            variantLabel: 'prefixIcon (alias → iconBefore)',
            cells: [
              <FieldText
                key='pi'
                size={SIZE.M}
                validationState={VALIDATION_STATE.Default}
                placeholder='prefixIcon'
                prefixIcon={<SearchSVG />}
              />,
            ],
          },
          {
            variantLabel: 'no background',
            cells: [
              <FieldText
                key='nb'
                size={SIZE.M}
                validationState={VALIDATION_STATE.Default}
                defaultValue='Borderless'
                background={false}
              />,
            ],
          },
          {
            variantLabel: 'with length counter',
            cells: [
              <FieldText
                key='lc'
                size={SIZE.M}
                validationState={VALIDATION_STATE.Default}
                defaultValue='12 chars in'
                length={{ current: 11, max: 100 }}
              />,
            ],
          },
          {
            variantLabel: 'limit exceeded (current > max)',
            cells: [
              <FieldText
                key='le'
                size={SIZE.M}
                validationState={VALIDATION_STATE.Default}
                defaultValue='Over the configured limit'
                length={{ current: 105, max: 100 }}
              />,
            ],
          },
          {
            // error форсит красную тонировку поверх validationState=success.
            variantLabel: 'error overrides validationState=success',
            cells: [
              <FieldText
                key='eo'
                size={SIZE.M}
                validationState={VALIDATION_STATE.Success}
                defaultValue='value@bad'
                error='Введите корректное значение'
                showHintIcon
              />,
            ],
          },
        ]}
      />

      <StoryTable
        sectionTitle='Element slots (size=m)'
        firstColumnHeader='Slot'
        columnHeaders={['Render']}
        rows={[
          {
            variantLabel: 'elementBefore (action)',
            cells: [
              <FieldText
                key='eb'
                size={SIZE.M}
                validationState={VALIDATION_STATE.Default}
                placeholder='Pick'
                elementBefore={{ action: <PlaceholderSVG /> }}
              />,
            ],
          },
          {
            variantLabel: 'elementAfter (chevron-only)',
            cells: [
              <FieldText
                key='ea'
                size={SIZE.M}
                validationState={VALIDATION_STATE.Default}
                defaultValue='100'
                elementAfter={{ action: <PlaceholderSVG />, withDropdownList: true }}
              />,
            ],
          },
          {
            variantLabel: 'elementAfter (loading)',
            cells: [
              <FieldText
                key='el'
                size={SIZE.M}
                validationState={VALIDATION_STATE.Default}
                defaultValue='Async lookup…'
                elementAfter={{ action: <ChevronDownSVG />, loading: true }}
              />,
            ],
          },
          {
            // readonly форсит disabled на слот-кнопке (renderElement: disabled || readOnly).
            variantLabel: 'readonly + elementAfter (slot disabled)',
            cells: [
              <FieldText
                key='re'
                size={SIZE.M}
                validationState={VALIDATION_STATE.Default}
                defaultValue='Readonly value'
                readonly
                elementAfter={{ action: <PlaceholderSVG />, withDropdownList: true }}
              />,
            ],
          },
          {
            // Полная композиция всех слотов — набор и порядок по Figma-мастеру:
            // elementBefore (buttonField: action + chevron
            // через withDropdownList) | iconBefore | prefix | value + clear | postfix | iconAfter |
            // elementAfter (action + chevron). Тексты prefix/postfix/value — иллюстративные.
            variantLabel: 'all slots (Figma master)',
            cells: [
              <FieldText
                key='all'
                size={SIZE.M}
                validationState={VALIDATION_STATE.Default}
                defaultValue='Input value'
                iconBefore={<SearchSVG />}
                iconAfter={<CalendarSVG />}
                prefix='Prefix'
                postfix='Postfix'
                elementBefore={{ action: <PlaceholderSVG />, withDropdownList: true }}
                elementAfter={{ action: <PlaceholderSVG />, withDropdownList: true }}
              />,
            ],
          },
        ]}
      />

      <StoryTable
        sectionTitle='State (size=m, default validation)'
        firstColumnHeader='State'
        columnHeaders={['Render']}
        rows={[
          {
            variantLabel: 'default (empty)',
            cells: [<FieldText key='d' size={SIZE.M} label='Label' defaultValue='' />],
          },
          {
            variantLabel: 'placeholder',
            cells: [<FieldText key='p' size={SIZE.M} label='Label' defaultValue='' placeholder='Placeholder' />],
          },
          {
            variantLabel: 'filled (+ clear)',
            cells: [<FieldText key='f' size={SIZE.M} label='Label' defaultValue='Sample value' showClearButton />],
          },
          {
            variantLabel: 'disabled + value',
            cells: [<FieldText key='ds' size={SIZE.M} label='Label' defaultValue='Sample value' disabled />],
          },
          {
            variantLabel: 'readonly + value (+ copy)',
            cells: [
              <FieldText key='ro' size={SIZE.M} label='Label' defaultValue='readonly value' readonly showCopyButton />,
            ],
          },
        ]}
      />
    </div>
  ),
};

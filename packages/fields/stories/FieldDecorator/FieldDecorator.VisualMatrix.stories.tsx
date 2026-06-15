import { FieldDecorator, SIZE, VALIDATION_STATE } from '@ds/fields';
import { PortalContextProvider } from '@ds/portal-context';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './stories.module.scss';

const meta: Meta<typeof FieldDecorator> = {
  title: 'Components/Fields/FieldDecorator',
  component: FieldDecorator,
};

export default meta;
type Story = StoryObj<typeof FieldDecorator>;

const keySizes = Object.values(SIZE);
const keyStates = Object.values(VALIDATION_STATE);

const LONG_LABEL = 'Очень длинный заголовок поля, который не помещается в одну строку';
const LONG_CAPTION = 'Длинная подпись справа, тоже не помещающаяся в строку';
const LONG_HINT = 'Подсказка с непереносимым токеном supercalifragilisticexpialidocious-token-value внутри';

const stub = <div className={styles.narrow}>Field content</div>;
const truncateStub = <div className={styles.truncate}>Field content</div>;

// FieldDecorator — обвязка: интерактивные состояния (hover/focus/active) живут на содержимом
// (FieldText/FieldSelect/…), не на ней. Здесь снимаем только статические оси хрома.
export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <PortalContextProvider>
      <div className={styles.grid}>
        {/* Канонический Size × ValidationState матрица хрома — единственный источник этой сетки
            для всего пакета полей. На уровне декоратора `valid` ≡ `default`: getHintIcon возвращает
            null для обоих, цветной зелёный тон validation=valid живёт в потребляющем поле, не здесь. */}
        <StoryTable
          sectionTitle='Size × ValidationState (canonical chrome matrix)'
          firstColumnHeader='Size'
          columnHeaders={keyStates.map(s => s.toUpperCase())}
          rows={keySizes.map(size => ({
            variantLabel: size,
            cells: keyStates.map(state => (
              <FieldDecorator
                key={state}
                size={size}
                validationState={state}
                label='Label'
                hint={state === VALIDATION_STATE.Default ? 'Hint' : `${state} hint`}
                showHintIcon
                required
              >
                {stub}
              </FieldDecorator>
            )),
          }))}
        />

        <StoryTable
          sectionTitle='Header & footer composition (size=m, default)'
          firstColumnHeader='Variant'
          columnHeaders={['Render']}
          rows={[
            {
              variantLabel: 'minimal',
              cells: [
                <FieldDecorator key='minimal' size={SIZE.M}>
                  {stub}
                </FieldDecorator>,
              ],
            },
            {
              variantLabel: 'label only',
              cells: [
                <FieldDecorator key='label' size={SIZE.M} label='Label'>
                  {stub}
                </FieldDecorator>,
              ],
            },
            {
              variantLabel: 'label + required + tooltip',
              cells: [
                <FieldDecorator
                  key='label-required-tooltip'
                  size={SIZE.M}
                  label='Label'
                  required
                  labelTooltip={{ tip: 'Подсказка к заголовку' }}
                >
                  {stub}
                </FieldDecorator>,
              ],
            },
            {
              variantLabel: 'label + caption',
              cells: [
                <FieldDecorator key='label-caption' size={SIZE.M} label='Label' caption='Caption'>
                  {stub}
                </FieldDecorator>,
              ],
            },
            {
              variantLabel: 'with hint',
              cells: [
                <FieldDecorator key='hint' size={SIZE.M} label='Label' hint='Hint text'>
                  {stub}
                </FieldDecorator>,
              ],
            },
            {
              variantLabel: 'with length (current/max)',
              cells: [
                <FieldDecorator key='length' size={SIZE.M} label='Label' hint='Hint' length={{ current: 12, max: 100 }}>
                  {stub}
                </FieldDecorator>,
              ],
            },
            {
              // length.max опционален — счётчик показывает только current без `/max`.
              variantLabel: 'length without max',
              cells: [
                <FieldDecorator key='length-no-max' size={SIZE.M} label='Label' hint='Hint' length={{ current: 12 }}>
                  {stub}
                </FieldDecorator>,
              ],
            },
            {
              // showHintIcon=false — текст подсказки без иконки валидации, даже при validationState≠default.
              variantLabel: 'showHintIcon=false',
              cells: [
                <FieldDecorator
                  key='no-hint-icon'
                  size={SIZE.M}
                  validationState={VALIDATION_STATE.Warning}
                  label='Label'
                  hint='Hint without icon'
                  showHintIcon={false}
                >
                  {stub}
                </FieldDecorator>,
              ],
            },
          ]}
        />

        <StoryTable
          sectionTitle='Error / icon branches (size=m)'
          firstColumnHeader='Variant'
          columnHeaders={['Render']}
          rows={[
            {
              // error непустой → validationState форсится в error и hint подменяется текстом ошибки.
              variantLabel: 'error overrides hint',
              cells: [
                <FieldDecorator
                  key='error-hint'
                  size={SIZE.M}
                  label='Label'
                  hint='Hint'
                  error='Validation error message'
                  showHintIcon
                >
                  {stub}
                </FieldDecorator>,
              ],
            },
            {
              // current > max → data-limit-exceeded, текущее значение счётчика красное.
              variantLabel: 'limit exceeded (current > max)',
              cells: [
                <FieldDecorator
                  key='limit'
                  data-test-id='field-decorator-limit-exceeded'
                  size={SIZE.M}
                  label='Label'
                  hint='Hint'
                  length={{ current: 120, max: 100 }}
                >
                  {stub}
                </FieldDecorator>,
              ],
            },
            {
              // validationState=success, но error непустой → иконка CRITICAL (не success): error побеждает.
              variantLabel: 'error coerces critical icon',
              cells: [
                <FieldDecorator
                  key='error-coerces-icon'
                  size={SIZE.M}
                  validationState={VALIDATION_STATE.Success}
                  label='Label'
                  error='Error wins over success'
                  showHintIcon
                >
                  {stub}
                </FieldDecorator>,
              ],
            },
          ]}
        />

        <StoryTable
          sectionTitle='Inactive states (size=m)'
          firstColumnHeader='Variant'
          columnHeaders={['Render']}
          rows={[
            {
              // disabled нейтрализует validation: иконка скрыта, счётчик скрыт, текст в textDisabled.
              variantLabel: 'disabled (validationState=error)',
              cells: [
                <FieldDecorator
                  key='disabled'
                  size={SIZE.M}
                  validationState={VALIDATION_STATE.Error}
                  label='Label'
                  hint='Hint'
                  showHintIcon
                  disabled
                  length={{ current: 12, max: 100 }}
                >
                  {stub}
                </FieldDecorator>,
              ],
            },
            {
              // readonly также нейтрализует validation и прячет счётчик.
              variantLabel: 'readonly (validationState=warning)',
              cells: [
                <FieldDecorator
                  key='readonly'
                  size={SIZE.M}
                  validationState={VALIDATION_STATE.Warning}
                  label='Label'
                  hint='Hint'
                  showHintIcon
                  readonly
                  length={{ current: 12, max: 100 }}
                >
                  {stub}
                </FieldDecorator>,
              ],
            },
          ]}
        />

        <StoryTable
          sectionTitle='Truncation & wrapping (fixed-width)'
          firstColumnHeader='Variant'
          columnHeaders={['Render']}
          rows={[
            {
              variantLabel: 'long label (ellipsis)',
              cells: [
                <div key='long-label' className={styles.truncate}>
                  <FieldDecorator size={SIZE.M} label={LONG_LABEL}>
                    {truncateStub}
                  </FieldDecorator>
                </div>,
              ],
            },
            {
              variantLabel: 'long caption (line-clamp)',
              cells: [
                <div key='long-caption' className={styles.truncate}>
                  <FieldDecorator size={SIZE.M} label='Label' caption={LONG_CAPTION}>
                    {truncateStub}
                  </FieldDecorator>
                </div>,
              ],
            },
            {
              variantLabel: 'long label + caption competing',
              cells: [
                <div key='long-both' className={styles.truncate}>
                  <FieldDecorator size={SIZE.M} label={LONG_LABEL} caption={LONG_CAPTION}>
                    {truncateStub}
                  </FieldDecorator>
                </div>,
              ],
            },
            {
              variantLabel: 'long hint, non-breaking token (counter intact)',
              cells: [
                <div key='long-hint' className={styles.truncate}>
                  <FieldDecorator size={SIZE.M} label='Label' hint={LONG_HINT} length={{ current: 12, max: 100 }}>
                    {truncateStub}
                  </FieldDecorator>
                </div>,
              ],
            },
          ]}
        />
      </div>
    </PortalContextProvider>
  ),
};
